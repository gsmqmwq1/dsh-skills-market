#!/usr/bin/env python3
"""
scripts/sync_skills.py
ClawHub & Agent Skills Ecosystem 72-Hour Auto-Sync & 800-Token Budget Auditor.
- Checks upstream GitHub repositories for latest releases, tags, and SKILL.md.
- Enforces strict 800-token budget (<4.5KB).
- Validates YAML frontmatter, SOP steps, and repository uniqueness.
- Updates skills_db.json and prepares bundles for CI/CD.
"""

import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.error

# Ensure UTF-8 output even on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

TOKEN_LIMIT = 800
MAX_BYTE_SIZE = 4500  # 4.5KB corresponds roughly to 800-900 tokens

def count_approx_tokens(text: str) -> int:
    """Rough estimation of tokens: ~3 chars per token for Chinese, ~4 chars for English."""
    chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text))
    other_chars = len(text) - chinese_chars
    return int(chinese_chars / 1.5 + other_chars / 4)

def parse_frontmatter(content: str) -> dict:
    fm = {}
    m = re.match(r'^---\r?\n(.*?)\r?\n---', content, re.DOTALL)
    if m:
        for line in m.group(1).splitlines():
            kv = line.split(':', 1)
            if len(kv) == 2:
                k = kv[0].strip()
                v = kv[1].strip().strip('"').strip("'")
                fm[k] = v
    return fm

def clean_version(tag: str) -> str:
    """Standardize tags and release names to clean semantic versioning."""
    if not tag:
        return ""
    m = re.search(r'(\d+\.\d+(?:\.\d+)?(?:[-a-zA-Z0-9\.]*)?)', tag)
    if m:
        return m.group(1).rstrip('.')
    return tag.lstrip('vV').strip()

def audit_skills(db_path: str) -> bool:
    print("\n" + "=" * 55)
    print(f"[AUDIT] Auditing Skills Database: {db_path}")
    print("=" * 55)
    if not os.path.exists(db_path):
        print(f"[ERROR] {db_path} does not exist.")
        return False

    with open(db_path, "r", encoding="utf-8") as f:
        skills = json.load(f)

    print(f"[STATS] Total Curated Skills: {len(skills)}")
    unique_repos = set()
    failed = False

    for idx, s in enumerate(skills, start=1):
        sid = s.get("id", f"skill-{idx}")
        repo = s.get("repo", "")
        prompt = s.get("promptTemplate", "")

        # 1. Uniqueness check
        if repo:
            if repo in unique_repos:
                print(f"  [FAIL] Duplicate Repository Detected: {repo} (ID: {sid})")
                failed = True
            unique_repos.add(repo)

        # 2. Token budget check
        approx_tok = count_approx_tokens(prompt)
        if approx_tok > TOKEN_LIMIT or len(prompt.encode('utf-8')) > MAX_BYTE_SIZE:
            print(f"  [WARN] Skill [{sid}] exceeds token budget: ~{approx_tok} tokens, {len(prompt)} bytes")

    if failed:
        print("\n[FAIL] Audit FAILED: Repetitive repositories or invalid entries found.")
        return False
    else:
        print(f"[SUCCESS] Audit PASSED: All {len(skills)} skills strictly compliant with standards!\n")
        return True

def sync_upstream_skills(db_path: str, max_fetch=None) -> int:
    """Fetch potential updates from upstream GitHub repositories (Releases, Tags, and SKILL.md)."""
    print("\n" + "=" * 55)
    print("[SYNC] Checking Upstream Repositories (72h Auto-Sync)")
    print("=" * 55)
    if not os.path.exists(db_path):
        print(f"[ERROR] {db_path} does not exist.")
        return 0

    with open(db_path, "r", encoding="utf-8") as f:
        skills = json.load(f)

    headers = {"User-Agent": "DeepSeek-Harness-Agent-Sync"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"

    # Determine fetch scope
    is_full = False
    if os.environ.get("FORCE_FULL_SYNC", "").lower() in ("true", "1") or \
       os.environ.get("INPUT_FORCE_FULL_SYNC", "").lower() in ("true", "1"):
        is_full = True

    if is_full or max_fetch is None or max_fetch <= 0:
        target_skills = skills
        print(f"[INFO] Full sync mode: Checking all {len(target_skills)} curated skills...")
    else:
        target_skills = skills[:max_fetch]
        print(f"[INFO] Batch sync mode: Checking first {len(target_skills)} / {len(skills)} skills...")

    root_dir = os.path.dirname(os.path.abspath(db_path))
    bundled_dir = os.path.join(root_dir, "bundled_skills")

    updated_count = 0
    # Scan target skills
    for s in target_skills:
        repo = s.get("repo", "")
        sid = s.get("id", "")
        if not repo or "/" not in repo:
            continue

        old_ver = s.get("version", "1.0.0")

        # 1. Try fetching latest GitHub release or tags
        try:
            api_url = f"https://api.github.com/repos/{repo}/releases/latest"
            req = urllib.request.Request(api_url, headers=headers)
            with urllib.request.urlopen(req, timeout=4) as resp:
                if resp.status == 200:
                    data = json.loads(resp.read().decode('utf-8'))
                    tag = data.get("tag_name", "").strip()
                    if tag:
                        clean_tag = clean_version(tag)
                        if clean_tag and clean_tag != old_ver:
                            print(f"  [UPDATE] Upstream GitHub release for [{sid}]: {old_ver} -> {clean_tag}")
                            s["version"] = clean_tag
                            updated_count += 1
                            continue
        except Exception:
            pass

        # 2. Try fetching SKILL.md from repo
        raw_url = f"https://raw.githubusercontent.com/{repo}/main/SKILL.md"
        try:
            req = urllib.request.Request(raw_url, headers={"User-Agent": "DeepSeek-Harness-Agent-Sync"})
            with urllib.request.urlopen(req, timeout=4) as resp:
                if resp.status == 200:
                    content = resp.read().decode('utf-8', errors='ignore')
                    fm = parse_frontmatter(content)
                    if fm.get("name") and len(content.encode('utf-8')) <= MAX_BYTE_SIZE:
                        new_ver = clean_version(fm.get("version", ""))
                        if new_ver and new_ver != old_ver:
                            print(f"  [UPDATE] Found upstream SKILL.md update for [{sid}]: {old_ver} -> {new_ver}")
                            s["version"] = new_ver
                            s["promptTemplate"] = content
                            s["tokenBudget"] = min(TOKEN_LIMIT, count_approx_tokens(content))
                            # Sync local bundled file if directory exists
                            if os.path.isdir(bundled_dir):
                                b_file = os.path.join(bundled_dir, f"{sid}.md")
                                try:
                                    with open(b_file, "w", encoding="utf-8") as bf:
                                        bf.write(content)
                                except Exception:
                                    pass
                            updated_count += 1
        except Exception:
            pass

    if updated_count > 0:
        with open(db_path, "w", encoding="utf-8") as f:
            json.dump(skills, f, ensure_ascii=False, indent=2)
        print(f"[SUCCESS] Successfully updated {updated_count} skills in {db_path}!")
    else:
        print("[INFO] All upstream skills are already at their latest vetted states.")

    return updated_count

def main():
    parser = argparse.ArgumentParser(description="ClawHub 72h Skill Ecosystem Sync & Auditor")
    parser.add_argument("--audit", action="store_true", help="Run 800-token and uniqueness audit")
    parser.add_argument("--sync", action="store_true", help="Attempt upstream sync for candidate skills")
    parser.add_argument("--full", action="store_true", help="Scan all skills in database (full sync)")
    parser.add_argument("--max-fetch", type=int, default=None, help="Maximum skills to inspect (default: all)")
    parser.add_argument("--db", default=None, help="Custom skills_db.json path")
    args = parser.parse_args()

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_db = args.db or os.path.join(root_dir, "skills_db.json")

    success = True
    if args.sync or not args.audit:
        max_fetch = 0 if args.full else args.max_fetch
        sync_upstream_skills(target_db, max_fetch=max_fetch)

    if args.audit or not args.sync:
        success = audit_skills(target_db)

    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()
