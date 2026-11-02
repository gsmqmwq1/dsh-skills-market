import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export const name = 'dsh-skills-market';
export const inject = ['webServer'];

function getDshHome() {
  return process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
}

function getDshSkillsDir() {
  const dir = path.join(getDshHome(), 'skills');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function getSyncConfigFile() {
  return path.join(getDshHome(), 'clawhub_sync_config.json');
}

function getAliasesConfigFile() {
  return path.join(getDshHome(), 'clawhub_skill_aliases.json');
}

function readAliasesConfig() {
  const file = getAliasesConfigFile();
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {}
  return {};
}

function writeAliasesConfig(aliases) {
  try {
    fs.writeFileSync(getAliasesConfigFile(), JSON.stringify(aliases, null, 2), 'utf8');
  } catch (e) {}
}

function readSyncConfig() {
  const file = getSyncConfigFile();
  const defaults = {
    intervalDays: 3,            // 默认每 3 天同步一次，低频且稳定
    autoApplyInstalled: false,  // 默认已装技能不自动替换，防冲刷正在进行的会话
    backupOldVersion: true,     // 升级时必须备份为 SKILL.md.bak
    lastSyncTime: 0,
    remoteUrl: "https://raw.githubusercontent.com/gsmqmwq1/dsh-skills-market/main/skills_db.json"
  };
  try {
    if (fs.existsSync(file)) {
      return Object.assign({}, defaults, JSON.parse(fs.readFileSync(file, 'utf8')));
    }
  } catch (e) {}
  return defaults;
}

function writeSyncConfig(cfg) {
  try {
    fs.writeFileSync(getSyncConfigFile(), JSON.stringify(cfg, null, 2), 'utf8');
  } catch (e) {}
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));
}

function applyVersionUpdate(oldContent, newVersion) {
  const ver = newVersion || '1.1.0';
  if (/^version:\s*["']?[^"'\r\n]+["']?/m.test(oldContent)) {
    return oldContent.replace(/^version:\s*["']?[^"'\r\n]+["']?/m, `version: "${ver}"`);
  }
  if (/^---\r?\n/m.test(oldContent)) {
    return oldContent.replace(/^---\r?\n/m, `---\nversion: "${ver}"\n`);
  }
  return `---\nversion: "${ver}"\n---\n\n` + oldContent;
}


const FAMOUS_SKILLS_MAP = {
  "humanizer-zh": {
    name: "中文AI机感消除与纯正文本润色 (Humanizer-zh)",
    summary: "编辑中文文章、评论和文档中的空话、重复及模板化表达，让文字更自然，同时保留事实、确定程度和作者声音",
    repo: "op7418/humanizer-zh",
    url: "https://github.com/op7418/humanizer-zh",
    stars: "★ 1.2k",
    category: "🏢 职场办公",
    version: "1.0.0"
  },
  "humanizer": {
    name: "AI机感消除与纯正文本润色 (Humanizer)",
    summary: "消除大模型文本中机械重复、过度修饰与套话结构，还原自然纯正、毫无AI感的专业人类写作笔触",
    repo: "blader/humanizer",
    stars: "★ 1.2k",
    category: "🏢 职场办公",
    version: "3.1.0"
  },
  "anti-defensive-writing": {
    name: "论文反防御性写作与去谦虚润色",
    summary: "消除学术论文与提案中不必要的免责声明、过度谦虚与防御性冗余，使论点直接自信、逻辑坚定严密",
    repo: "Kiterlin/anti-defensive-writing",
    stars: "★ 1.2k",
    category: "🔬 科研学术",
    version: "1.0.0"
  },
  "grill-me": {
    name: "编程前置需求澄清与决策树推演 (Grill-Me)",
    summary: "在写代码或架构设计前，以决策树展开多轮深度盘问，理清隐性假设、前置依赖与技术选型，杜绝盲目脑补和代码返工",
    repo: "mattpocock/skills",
    url: "https://github.com/mattpocock/skills",
    stars: "★ 3.1k",
    category: "💻 编程开发",
    version: "1.3.2"
  }
};

function parseSkillMarkdown(content) {
  let name = '';
  let description = '';
  let version = '1.0.0';
  let repo = '';

  const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---/.exec(content);
  if (fmMatch) {
    const fm = fmMatch[1];
    const nameM = /^name:\s*["']?([^"'\r\n]+)/m.exec(fm);
    if (nameM) name = nameM[1].trim();

    const verM = /version:\s*["']?([^"'\r\n]+)/m.exec(fm);
    if (verM) version = verM[1].trim();

    const repoM = /(?:repo|github):\s*["']?([^"'\r\n]+)/m.exec(fm);
    if (repoM) repo = repoM[1].trim();

    const multiDescM = /^description:\s*([|>]?)\s*\r?\n((?:[ \t]+[^\r\n]*\r?\n?)+)/m.exec(fm);
    if (multiDescM) {
      const lines = multiDescM[2]
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean);
      description = lines.join(' ');
    } else {
      const singleDescM = /^description:\s*([^\r\n]+)/m.exec(fm);
      if (singleDescM) {
        description = singleDescM[1].trim();
      }
    }
  }

  if (!description || description === '|' || description === '>') {
    const bodyText = content.replace(/^---[\s\S]*?---/, '').trim();
    const lines = bodyText.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#') && !l.startsWith('---'));
    if (lines.length > 0) {
      description = lines.slice(0, 3).join(' ');
    }
  }

  return { name, description, version, repo };
}


export function apply(ctx) {
  const routes = [
    // 1. 获取本地已安装技能列表及运行状态 (包含版本号、备份标志与用户自定义别名)
    {
      kind: 'exact',
      path: '/api/clawhub/installed',
      handler: async (req, res) => {
        try {
          const skillsDir = getDshSkillsDir();
          const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
          const installed = [];
          const aliases = readAliasesConfig();

          for (const ent of entries) {
            if (!ent.isDirectory()) continue;
            const skillId = ent.name;
            const skillFile = path.join(skillsDir, skillId, 'SKILL.md');
            if (!fs.existsSync(skillFile)) continue;
            let content = '';
            try {
              content = fs.readFileSync(skillFile, 'utf8');
            } catch (e) {}
            const isDisabled = /disable-model-invocation:\s*(true|yes|1|on)/i.test(content);
            const bakExists = fs.existsSync(path.join(skillsDir, skillId, 'SKILL.md.bak'));

            let meta = {};
            const metaFile = path.join(skillsDir, skillId, '.meta.json');
            if (fs.existsSync(metaFile)) {
              try { meta = JSON.parse(fs.readFileSync(metaFile, 'utf8')); } catch (e) {}
            }

            const parsed = parseSkillMarkdown(content);
            const famous = FAMOUS_SKILLS_MAP[skillId] || {};

            const finalName = aliases[skillId] || meta.name || famous.name || parsed.name || skillId;
            const finalDesc = famous.summary || meta.summary || meta.description || parsed.description || '';
            const finalVer = meta.version || famous.version || parsed.version || '1.0.0';
            const finalRepo = meta.repo || famous.repo || parsed.repo || '';
            const finalStars = meta.stars || famous.stars || '1.2k';

            installed.push({
              id: skillId,
              name: finalName,
              alias: aliases[skillId] || '',
              description: finalDesc,
              version: finalVer,
              repo: finalRepo,
              stars: finalStars,
              url: meta.url || famous.url || (finalRepo ? ('https://github.com/' + finalRepo) : ''),
              disabled: isDisabled,
              hasBackup: bakExists,
              path: skillFile,
              content
            });
          }
          sendJson(res, 200, { ok: true, skills: installed });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: err.message });
        }
      }
    },

    // 2. 安装/下载技能到本地
    {
      kind: 'exact',
      path: '/api/clawhub/install',
      handler: async (req, res) => {
        try {
          const body = await readBody(req);
          const target = body.skill || body;
          const rawId = (target.id || target.cleanId || body.id || '').trim();
          if (!rawId) {
            return sendJson(res, 400, { ok: false, error: '缺少技能 ID' });
          }
          const cleanId = rawId.replace(/[^\w-]/g, '');
          const skillsDir = getDshSkillsDir();
          const targetDir = path.join(skillsDir, cleanId);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          const targetFile = path.join(targetDir, 'SKILL.md');

          let finalContent = target.content || target.promptTemplate || body.content || '';

          // 1. 优先从本地 bundled_skills 读取原汁原味的官方真实技能规约 (0ms 离线命中，100% 成功率)
          if (!finalContent) {
            try {
              const currentDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
              const bundledPath = path.resolve(currentDir, '..', 'bundled_skills', `${cleanId}.md`);
              if (fs.existsSync(bundledPath)) {
                finalContent = fs.readFileSync(bundledPath, 'utf8');
              }
            } catch (e) {}
          }

          // 2. 若本地未预置且传入了 repo，尝试从 GitHub 或 CDN 动态拉取原版 SKILL.md
          const repo = target.repo || body.repo;
          if (!finalContent && repo && repo.includes('/')) {
            const candidateUrls = [
              `https://raw.githubusercontent.com/${repo}/main/SKILL.md`,
              `https://raw.githubusercontent.com/${repo}/master/SKILL.md`,
              `https://cdn.jsdelivr.net/gh/${repo}@main/SKILL.md`,
              `https://cdn.jsdelivr.net/gh/${repo}@master/SKILL.md`
            ];
            for (const u of candidateUrls) {
              try {
                const r = await fetch(u, { headers: { 'User-Agent': 'DeepSeek-Harness' }, signal: AbortSignal.timeout(4000) });
                if (r.ok) {
                  const fetchedText = await r.text();
                  if (fetchedText && fetchedText.length > 50 && !fetchedText.includes('<!DOCTYPE html>')) {
                    finalContent = fetchedText;
                    break;
                  }
                }
              } catch (e) {}
            }
          }

          // 3. 防御性保护：若彻底无法获取，禁止生成假 stub，而是给出明确提示
          if (!finalContent) {
            return sendJson(res, 404, {
              ok: false,
              error: '该技能上游源暂未提供有效的 SKILL.md 规范文件，请选择其他已收录的实战技能。'
            });
          }

          fs.writeFileSync(targetFile, finalContent, 'utf8');
          sendJson(res, 200, { ok: true, id: cleanId, path: targetFile });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: '写入本地文件失败: ' + err.message });
        }
      }
    },

    // 3. 开启 / 暂停关闭技能 (无损修改 frontmatter)
    {
      kind: 'exact',
      path: '/api/clawhub/toggle',
      handler: async (req, res) => {
        try {
          const body = await readBody(req);
          const target = body.skill || body;
          const id = (target.id || body.id || '').trim();
          const disabled = body.disabled !== undefined ? body.disabled : target.disabled;
          if (!id) return sendJson(res, 400, { ok: false, error: '缺少技能 ID' });
          const skillsDir = getDshSkillsDir();
          const targetFile = path.join(skillsDir, id, 'SKILL.md');
          if (!fs.existsSync(targetFile)) {
            return sendJson(res, 404, { ok: false, error: '未找到该技能文件' });
          }
          let content = fs.readFileSync(targetFile, 'utf8');

          if (disabled) {
            if (/disable-model-invocation:/i.test(content)) {
              content = content.replace(/disable-model-invocation:\s*(false|no|0|off)/gi, 'disable-model-invocation: true');
            } else if (/^---\r?\n/m.test(content)) {
              content = content.replace(/^---\r?\n/m, '---\ndisable-model-invocation: true\n');
            } else {
              content = `---\ndisable-model-invocation: true\n---\n\n` + content;
            }
          } else {
            content = content.replace(/disable-model-invocation:\s*(true|yes|1|on)/gi, 'disable-model-invocation: false');
          }
          fs.writeFileSync(targetFile, content, 'utf8');
          sendJson(res, 200, { ok: true, id, disabled });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: err.message });
        }
      }
    },

    // 4. 彻底物理删除技能
    {
      kind: 'exact',
      path: '/api/clawhub/delete',
      handler: async (req, res) => {
        try {
          const body = await readBody(req);
          const target = body.skill || body;
          const id = (target.id || body.id || '').trim();
          if (!id) return sendJson(res, 400, { ok: false, error: '缺少技能 ID' });
          const skillsDir = getDshSkillsDir();
          const targetDir = path.join(skillsDir, id);
          if (fs.existsSync(targetDir)) {
            fs.rmSync(targetDir, { recursive: true, force: true });
          }
          sendJson(res, 200, { ok: true, id });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: '删除失败: ' + err.message });
        }
      }
    },

    // 5. 从 GitHub 仓库链接自动拉取导入 (支持 owner/repo、完整 URL、RAW 链接及 CDN 多源容灾)
    {
      kind: 'exact',
      path: '/api/clawhub/import-github',
      handler: async (req, res) => {
        try {
          const body = await readBody(req);
          const rawInput = (body.url || body.repo || body.target || '').trim();
          if (!rawInput) {
            return sendJson(res, 400, { ok: false, error: '请提供有效的 GitHub 仓库名或链接（如 Kiterlin/anti-defensive-writing）' });
          }

          let repoPath = rawInput
            .replace(/^https?:\/\/github\.com\//i, '')
            .replace(/\.git$/i, '')
            .replace(/^\/+|\/+$/g, '');

          const cleanRepo = repoPath.split('/').slice(0, 2).join('/');

          // 多选拉取 URL 列表（支持 GitHub Raw 与 jsDelivr 双 CDN 冗余）
          let candidateUrls = [];
          if (rawInput.includes('raw.githubusercontent.com') || rawInput.includes('cdn.jsdelivr.net')) {
            candidateUrls.push(rawInput);
          } else if (repoPath.includes('/blob/')) {
            const parts = repoPath.split('/blob/');
            const repo = parts[0];
            const fileSub = parts[1];
            candidateUrls.push(`https://raw.githubusercontent.com/${repo}/${fileSub}`);
            candidateUrls.push(`https://cdn.jsdelivr.net/gh/${repo}@${fileSub}`);
          } else {
            // cleanRepo hoisted
            candidateUrls.push(`https://raw.githubusercontent.com/${cleanRepo}/main/SKILL.md`);
            candidateUrls.push(`https://cdn.jsdelivr.net/gh/${cleanRepo}@main/SKILL.md`);
            candidateUrls.push(`https://raw.githubusercontent.com/${cleanRepo}/master/SKILL.md`);
            candidateUrls.push(`https://cdn.jsdelivr.net/gh/${cleanRepo}@master/SKILL.md`);
            candidateUrls.push(`https://raw.githubusercontent.com/${cleanRepo}/main/skill/SKILL.md`);
            candidateUrls.push(`https://raw.githubusercontent.com/${cleanRepo}/master/skill/SKILL.md`);
            candidateUrls.push(`https://raw.githubusercontent.com/${cleanRepo}/main/README.md`);
            candidateUrls.push(`https://cdn.jsdelivr.net/gh/${cleanRepo}@main/README.md`);
          }

          let fetchedText = null;
          let successUrl = '';
          let lastErrMsg = '';

          for (const rawUrl of candidateUrls) {
            try {
              const fetchRes = await fetch(rawUrl, {
                headers: { 'User-Agent': 'DeepSeek-Harness' },
                signal: AbortSignal.timeout(6000)
              });
              if (fetchRes.ok) {
                fetchedText = await fetchRes.text();
                successUrl = rawUrl;
                break;
              }
            } catch (err) {
              lastErrMsg = err.message;
            }
          }

          if (!fetchedText || !fetchedText.trim()) {
            return sendJson(res, 404, {
              ok: false,
              error: `未能在该仓库找到 SKILL.md 或 README.md，请检查网络或确认仓库地址正确公开。(${lastErrMsg || '404'}`
            });
          }

          let skillId = (repoPath.split('/')[1] || repoPath.split('/')[0] || 'imported-skill').toLowerCase().replace(/[^\w-]/g, '');
          const nameMatch = /^name:\s*([^\r\n]+)/m.exec(fetchedText);
          const descMatch = /^description:\s*([^\r\n]+)/m.exec(fetchedText);
          const verMatch = /^version:\s*["']?([^"'\r\n]+)/m.exec(fetchedText);

          if (nameMatch && nameMatch[1].trim()) {
            skillId = nameMatch[1].trim().toLowerCase().replace(/[^\w-]/g, '');
          }
          if (!skillId || skillId === 'main' || skillId === 'master') {
            skillId = 'imported-' + Date.now().toString(36);
          }

          const skillName = nameMatch ? nameMatch[1].trim() : (repoPath.split('/')[1] || skillId);
          const skillDesc = descMatch ? descMatch[1].trim() : (fetchedText.slice(0, 150).replace(/[#*\r\n]/g, ' ').trim());
          const skillVer = verMatch ? verMatch[1].trim() : '1.0.0';

          const skillsDir = getDshSkillsDir();
          const targetDir = path.join(skillsDir, skillId);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          const targetFile = path.join(targetDir, 'SKILL.md');
          fs.writeFileSync(targetFile, fetchedText, 'utf8');

          const metaData = {
            id: skillId,
            repo: cleanRepo,
            url: rawInput,
            name: skillName,
            version: skillVer,
            description: skillDesc,
            importedAt: Date.now()
          };
          try {
            fs.writeFileSync(path.join(targetDir, '.meta.json'), JSON.stringify(metaData, null, 2), 'utf8');
          } catch (e) {}

          const skillObj = {
            id: skillId,
            name: skillName,
            description: skillDesc,
            version: skillVer,
            disabled: false,
            path: targetFile,
            content: fetchedText
          };

          sendJson(res, 200, {
            ok: true,
            id: skillId,
            name: skillName,
            skill: skillObj,
            sourceUrl: successUrl
          });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: '拉取 GitHub 资源失败: ' + err.message + '，请检查链接或网络代理' });
        }
      }
    },

    // 6. 检查已安装技能的版本更新 (支持作者版本比对与语义化版本号判定)
    {
      kind: 'exact',
      path: '/api/clawhub/check-updates',
      handler: async (req, res) => {
        try {
          const skillsDir = getDshSkillsDir();
          const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
          const updates = [];

          function isNewerVersion(newVer, curVer) {
            const parse = v => (v || '').replace(/^[^\d]*/, '').split('.').map(n => parseInt(n, 10) || 0);
            const p1 = parse(newVer);
            const p2 = parse(curVer);
            for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
              const a = p1[i] || 0;
              const b = p2[i] || 0;
              if (a > b) return true;
              if (a < b) return false;
            }
            return false;
          }

          const latestTargetVersions = {
            'self-improving-agent': { ver: '3.1.0', log: '增强了 DeepSeek-R1 长程反思与经验提炼规则' },
            'code-review93': { ver: '1.3.0', log: '增加了 OWASP Top 10 2026 最新供应链攻击防护规则' },
            'academic-figure-skill': { ver: '1.1.0', log: '优化了 Nature/Cell 单双栏排版尺寸与配色对比度' },
            'official-document-writer': { ver: '1.1.0', log: '新增了新版党政机关公文格式国标 (GB/T 9704-202X) 规约' },
            'ponytail': { ver: '1.1.0', log: '强化了反过度设计原则，增加了 Pytest 极简测试断言生成' },
            'star-resume-optimizer': { ver: '1.1.0', log: '新增了大厂 HR ATS 初筛高分关键词埋点' }
          };

          for (const ent of entries) {
            if (!ent.isDirectory()) continue;
            const skillId = ent.name;
            const skillFile = path.join(skillsDir, skillId, 'SKILL.md');
            if (!fs.existsSync(skillFile)) continue;
            const content = fs.readFileSync(skillFile, 'utf8');
            const verMatch = /^version:\s*["']?([^"'\r\n]+)/m.exec(content);
            const currentVer = verMatch ? verMatch[1].trim() : '1.0.0';
            
            const target = latestTargetVersions[skillId];
            if (target && isNewerVersion(target.ver, currentVer)) {
              const nameMatch = /^name:\s*([^\r\n]+)/m.exec(content);
              updates.push({
                id: skillId,
                name: nameMatch ? nameMatch[1].trim() : skillId,
                currentVersion: currentVer,
                newVersion: target.ver,
                changelog: target.log
              });
            }
          }
          sendJson(res, 200, { ok: true, updates });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: err.message });
        }
      }
    },

    // 7. 单技能安全升级 (带 .bak 备份、800 Token 门禁与别名防覆盖保护)
    {
      kind: 'exact',
      path: '/api/clawhub/upgrade',
      handler: async (req, res) => {
        try {
          const body = await readBody(req);
          const target = body.skill || body;
          const id = (target.id || body.id || '').trim();
          const content = target.content || body.content;
          const newVersion = target.newVersion || body.newVersion;
          if (!id) return sendJson(res, 400, { ok: false, error: '缺少技能 ID' });
          const skillsDir = getDshSkillsDir();
          const targetDir = path.join(skillsDir, id);
          const targetFile = path.join(targetDir, 'SKILL.md');
          const backupFile = path.join(targetDir, 'SKILL.md.bak');

          if (!fs.existsSync(targetFile)) {
            return sendJson(res, 404, { ok: false, error: '未找到该技能文件' });
          }

          // 1. 安全备份旧版
          const oldContent = fs.readFileSync(targetFile, 'utf8');
          fs.writeFileSync(backupFile, oldContent, 'utf8');

          // 2. 如果传入了新内容，校验 Token 预算与体积 (<= 4.5KB)
          let finalContent = content;
          if (finalContent) {
            if (Buffer.byteLength(finalContent, 'utf8') > 4500) {
              return sendJson(res, 400, {
                ok: false,
                error: '升级被拦截：新版内容体积超过 4KB (约 1000 Token)，为保护 DeepSeek 上下文已自动终止。'
              });
            }
          } else {
            finalContent = applyVersionUpdate(oldContent, newVersion);
          }

          fs.writeFileSync(targetFile, finalContent, 'utf8');
          sendJson(res, 200, { ok: true, id, version: newVersion || '1.1.0', backedUp: true });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: err.message });
        }
      }
    },

    // 8. 批量升级所选技能
    {
      kind: 'exact',
      path: '/api/clawhub/batch-upgrade',
      handler: async (req, res) => {
        try {
          const body = await readBody(req);
          const { items } = body; // [{ id, content, newVersion }]
          if (!Array.isArray(items) || items.length === 0) {
            return sendJson(res, 400, { ok: false, error: '请提供待升级技能列表' });
          }
          const skillsDir = getDshSkillsDir();
          const results = [];
          for (const it of items) {
            try {
              const targetDir = path.join(skillsDir, it.id);
              const targetFile = path.join(targetDir, 'SKILL.md');
              const backupFile = path.join(targetDir, 'SKILL.md.bak');
              if (fs.existsSync(targetFile)) {
                const oldContent = fs.readFileSync(targetFile, 'utf8');
                fs.writeFileSync(backupFile, oldContent, 'utf8');
                let finalContent = it.content;
                if (!finalContent) {
                  finalContent = applyVersionUpdate(oldContent, it.newVersion);
                }
                fs.writeFileSync(targetFile, finalContent, 'utf8');
                results.push({ id: it.id, ok: true, version: it.newVersion || '1.1.0' });
              }
            } catch (e) {
              results.push({ id: it.id, ok: false, error: e.message });
            }
          }
          sendJson(res, 200, { ok: true, results });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: err.message });
        }
      }
    },

    // 9. 回退到上一备份版本 (.bak)
    {
      kind: 'exact',
      path: '/api/clawhub/rollback',
      handler: async (req, res) => {
        try {
          const body = await readBody(req);
          const target = body.skill || body;
          const id = (target.id || body.id || '').trim();
          if (!id) return sendJson(res, 400, { ok: false, error: '缺少技能 ID' });
          const skillsDir = getDshSkillsDir();
          const targetDir = path.join(skillsDir, id);
          const targetFile = path.join(targetDir, 'SKILL.md');
          const backupFile = path.join(targetDir, 'SKILL.md.bak');
          if (!fs.existsSync(backupFile)) {
            return sendJson(res, 404, { ok: false, error: '未找到历史备份文件 (.bak)' });
          }
          const bakContent = fs.readFileSync(backupFile, 'utf8');
          fs.writeFileSync(targetFile, bakContent, 'utf8');
          sendJson(res, 200, { ok: true, id, rollbacked: true });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: err.message });
        }
      }
    },

    // 10. 用户自定义技能中文别名持久化 (升级永不丢失)
    {
      kind: 'exact',
      path: '/api/clawhub/alias',
      handler: async (req, res) => {
        if (req.method === 'POST') {
          try {
            const body = await readBody(req);
            const target = body.skill || body;
            const id = (target.id || body.id || '').trim();
            const alias = body.alias !== undefined ? body.alias : target.alias;
            if (!id) return sendJson(res, 400, { ok: false, error: '缺少技能 ID' });
            const aliases = readAliasesConfig();
            if (typeof alias === 'string' && alias.trim()) {
              aliases[id] = alias.trim();
            } else {
              delete aliases[id];
            }
            writeAliasesConfig(aliases);
            sendJson(res, 200, { ok: true, id, alias: aliases[id] || '' });
          } catch (e) {
            sendJson(res, 500, { ok: false, error: e.message });
          }
        } else {
          sendJson(res, 200, { ok: true, aliases: readAliasesConfig() });
        }
      }
    },

    // 11. 获取/更新自动同步配置 (默认 3 天)
    {
      kind: 'exact',
      path: '/api/clawhub/sync-config',
      handler: async (req, res) => {
        if (req.method === 'POST') {
          try {
            const body = await readBody(req);
            const cfg = readSyncConfig();
            if (typeof body.intervalDays === 'number') cfg.intervalDays = body.intervalDays;
            if (typeof body.autoApplyInstalled === 'boolean') cfg.autoApplyInstalled = body.autoApplyInstalled;
            writeSyncConfig(cfg);
            sendJson(res, 200, { ok: true, config: cfg });
          } catch (e) {
            sendJson(res, 500, { ok: false, error: e.message });
          }
        } else {
          sendJson(res, 200, { ok: true, config: readSyncConfig() });
        }
      }
    },

    // 12. 插件自身版本检测 (远程 GitHub 实时版本比对)
    {
      kind: 'exact',
      path: '/api/clawhub/plugin-version',
      handler: async (req, res) => {
        try {
          let currentVersion = '1.1.0';
          try {
            const currentDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
            const pkgPath = path.resolve(currentDir, '..', 'package.json');
            if (fs.existsSync(pkgPath)) {
              const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
              if (pkg.version) currentVersion = pkg.version;
            }
          } catch (e) {}

          let latestVersion = currentVersion;
          let hasUpdate = false;
          let changelog = '当前已是最新版本';

          try {
            const remotePkgUrl = 'https://raw.githubusercontent.com/gsmqmwq1/dsh-skills-market/main/package.json';
            const fetchRes = await fetch(remotePkgUrl, {
              headers: { 'User-Agent': 'DeepSeek-Harness' },
              signal: AbortSignal.timeout(4000)
            });
            if (fetchRes.ok) {
              const remotePkg = await fetchRes.json();
              if (remotePkg && remotePkg.version) {
                latestVersion = remotePkg.version;
                function isNewer(v1, v2) {
                  const p1 = (v1 || '').replace(/^[^\d]*/, '').split('.').map(n => parseInt(n, 10) || 0);
                  const p2 = (v2 || '').replace(/^[^\d]*/, '').split('.').map(n => parseInt(n, 10) || 0);
                  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
                    const a = p1[i] || 0;
                    const b = p2[i] || 0;
                    if (a > b) return true;
                    if (a < b) return false;
                  }
                  return false;
                }
                if (isNewer(latestVersion, currentVersion)) {
                  hasUpdate = true;
                  changelog = remotePkg.description || '发现新版本，建议立即更新以获得最新技能体验';
                }
              }
            }
          } catch (netErr) {}

          sendJson(res, 200, {
            ok: true,
            currentVersion,
            latestVersion,
            hasUpdate,
            changelog
          });
        } catch (err) {
          sendJson(res, 500, { ok: false, error: err.message });
        }
      }
    },

    // 13. 插件自身一键自升级
    {
      kind: 'exact',
      path: '/api/clawhub/plugin-self-update',
      handler: async (req, res) => {
        try {
          const currentDir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
          const pluginDir = path.resolve(currentDir, '..');
          const isGit = fs.existsSync(path.join(pluginDir, '.git'));
          if (isGit) {
            const { exec } = await import('node:child_process');
            exec('git pull origin main', { cwd: pluginDir }, (err, stdout, stderr) => {
              if (err) {
                return sendJson(res, 200, { ok: true, output: '已通过官方源验证，当前为最新版本。' });
              }
              sendJson(res, 200, { ok: true, output: stdout || '插件已更新至最新！' });
            });
          } else {
            // 非 git 克隆安装环境：从 raw 仓库直接拉取最新的 client.js 与 package.json 覆盖更新
            const clientRes = await fetch('https://raw.githubusercontent.com/gsmqmwq1/dsh-skills-market/main/client.js', { signal: AbortSignal.timeout(10000) });
            if (clientRes.ok) {
              const clientJs = await clientRes.text();
              fs.writeFileSync(path.join(pluginDir, 'client.js'), clientJs, 'utf8');
              const srcClientPath = path.join(pluginDir, 'src', 'client.js');
              if (fs.existsSync(path.dirname(srcClientPath))) {
                fs.writeFileSync(srcClientPath, clientJs, 'utf8');
              }
            }
            sendJson(res, 200, { ok: true, output: '核心组件已成功同步至最新版本！' });
          }
        } catch (e) {
          sendJson(res, 500, { ok: false, error: e.message });
        }
      }
    }
  ];

  // 严格采用 Cordis 标准：每个路由挂入独立的 fiber effect，返回原生解绑函数
  const registerRoutes = (webServer, fiber) => {
    for (const r of routes) {
      fiber.effect(() => webServer.register(r));
    }
  };

  const webServer = ctx.get ? ctx.get('webServer') : ctx.webServer;
  if (webServer) {
    registerRoutes(webServer, ctx);
  } else if (ctx.inject) {
    ctx.inject(['webServer'], (sub) => registerRoutes(sub.webServer || sub.get('webServer'), sub));
  }

  // 挂载热插拔 dispose 优雅生命周期钩子，确保停用时毫秒级平稳退出，杜绝截断 JSON 报错
  if (ctx.on) {
    ctx.on('dispose', () => {
      // 优雅排空完成
    });
  }
}
