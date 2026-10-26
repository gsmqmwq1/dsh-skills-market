# -*- coding: utf-8 -*-
"""
Builder script to generate client.js for dsh-clawhub-multiskill.
Restores the golden 3-column card grid (matching media_1792481904893_4cde65e2.png),
macOS / iOS segmented controls without black borders/bricks,
expanded squircle icon set for cards and composer popover,
restores favorites (我的收藏 ★) and shielded updates (屏蔽更新),
cleans up all verbose junk text,
and puts low-frequency actions into the card's ··· menu.
"""

import json
import os
import sys

def generate():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(root_dir, "skills_db.json")
    with open(db_path, "r", encoding="utf-8") as f:
        skills = json.load(f)
    print(f"Loaded {len(skills)} authentic skills from {db_path}")

    skills_json = json.dumps(skills, ensure_ascii=False)

    template = r'''/**
 * dsh-clawhub-multiskill — Native AI Agent Skill Market & Multi-Skill Loader
 * 专为 DeepSeek Harness 打造的大模型 Agent 技能集市 (100% 真实精选星标集)
 * 原生深色/浅色自适应 · iOS/macOS 纯净扁平微胶囊 · 呼吸感 3 列卡片
 */

var _pluginBundleId = "dsh-skills-market";
try {
  if (typeof document !== "undefined" && document.currentScript && document.currentScript.src) {
    if (document.currentScript.src.indexOf("dsh-clawhub-multiskill") !== -1) {
      _pluginBundleId = "dsh-clawhub-multiskill";
    }
  }
} catch (e) {}

window.__ModuleLoader__.load({
  id: _pluginBundleId,
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    var React = require("react");
    var h = React.createElement;
    var useState = React.useState;
    var useEffect = React.useEffect;
    var useMemo = React.useMemo;
    var useRef = React.useRef;
    var useCallback = React.useCallback;

    var PANEL_ID = "clawhub-market";
    var PANEL_ORDER = 15;

    // ── 100% 真实精选开源 GitHub 技能数据库 ───────────────────────────────────────
    var SKILLS_CATALOG = __SKILLS_DATA__;

    // ── 定位 DeepSeek Harness 对话输入框 (支持 Lexical contenteditable 与原生 Textarea 双引擎) ─
    function findComposerInput(anchorEl) {
      if (anchorEl) {
        var card = anchorEl.closest('[data-composer-card="true"]') ||
                   anchorEl.closest('form, [class*="composer"], [class*="input"], [class*="chat-box"], [class*="card"]');
        if (card) {
          var el = card.querySelector('[data-composer-input="true"], [contenteditable="true"], textarea');
          if (el && el.offsetParent !== null && !el.closest(".ch-pk-popover-portal") && !el.closest(".mkt-panel")) {
            return el;
          }
        }
        var parent = anchorEl.parentElement;
        for (var depth = 0; depth < 8 && parent; depth++) {
          var el = parent.querySelector('[data-composer-input="true"], [contenteditable="true"], textarea');
          if (el && el.offsetParent !== null && !el.closest(".ch-pk-popover-portal") && !el.closest(".mkt-panel")) {
            return el;
          }
          parent = parent.parentElement;
        }
      }

      var candidates = Array.from(document.querySelectorAll('[data-composer-input="true"], [contenteditable="true"], textarea')).filter(function(el) {
        return el.offsetParent !== null &&
               !el.closest(".ch-pk-popover-portal") &&
               !el.closest(".mkt-panel") &&
               !el.closest(".mkt-modal-sheet");
      });

      var composer = candidates.find(function(el) {
        return el.getAttribute("data-composer-input") === "true";
      });
      if (composer) return composer;

      if (candidates.length === 1) return candidates[0];
      if (candidates.length > 1) {
        candidates.sort(function(a, b) {
          return b.getBoundingClientRect().top - a.getBoundingClientRect().top;
        });
        return candidates[0];
      }
      return null;
    }

    // ── 多斜杠指令智能插入到输入框 ──────────────────────────────────────────────────
    function insertSlashCommands(text) {
      try {
        var inputEl = findComposerInput();
        if (!inputEl) return false;
        inputEl.focus();

        var isTextarea = inputEl.tagName.toLowerCase() === "textarea" || inputEl.tagName.toLowerCase() === "input";
        var currentText = isTextarea ? (inputEl.value || "") : (inputEl.innerText || inputEl.textContent || "");
        currentText = currentText.replace(/\r?\n$/, "");

        var needSpace = currentText.length > 0 && !currentText.endsWith(" ") && !currentText.endsWith("\n");
        var insertText = (needSpace ? " " : "") + text + " ";

        if (isTextarea) {
          inputEl.selectionStart = inputEl.selectionEnd = inputEl.value.length;
          var ok = false;
          try { ok = document.execCommand("insertText", false, insertText); } catch(e) {}
          if (!ok) {
            var newVal = currentText + insertText;
            var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
            if (setter) setter.call(inputEl, newVal);
            else inputEl.value = newVal;
            inputEl.dispatchEvent(new Event("input", { bubbles: true }));
            inputEl.dispatchEvent(new Event("change", { bubbles: true }));
          }
          return true;
        } else {
          var sel = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(inputEl);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
          var ok = false;
          try { ok = document.execCommand("insertText", false, insertText); } catch(e) {}
          if (!ok) {
            try {
              var ev = new InputEvent("beforeinput", { bubbles: true, cancelable: true, inputType: "insertText", data: insertText });
              inputEl.dispatchEvent(ev);
            } catch(ie) {}
          }
          return true;
        }
      } catch (e) {
        console.warn("[dsh-skills-market] insertSlashCommands error:", e);
      }
      return false;
    }

    // ── 原生深色/浅色自适应 CSS (零生硬黑框，macOS/iOS 扁平微胶囊规范) ──────────────
    var CSS = `
:root, [data-theme="dark"] {
  --ch-bg: var(--dsw-alias-bg, #141418);
  --ch-surface: var(--dsw-alias-surface, #1e1e24);
  --ch-surface-hover: var(--dsw-alias-surface-hover, #282832);
  --ch-card-bg: var(--dsw-alias-card-bg, #18191e);
  --ch-card-border: var(--dsw-alias-border, rgba(255, 255, 255, 0.08));
  --ch-card-hover-border: rgba(255, 255, 255, 0.22);
  --ch-text-primary: var(--dsw-alias-text-primary, #f0f0f5);
  --ch-text-secondary: var(--dsw-alias-text-secondary, #9090a2);
  --ch-text-muted: rgba(255, 255, 255, 0.4);
  --ch-brand: #3b82f6;
  --ch-brand-hover: #2563eb;
  --ch-segmented-bg: rgba(255, 255, 255, 0.07);
  --ch-segmented-active: rgba(255, 255, 255, 0.18);
  --ch-segmented-active-text: #ffffff;
  --ch-pill-bg: rgba(255, 255, 255, 0.06);
  --ch-pill-hover: rgba(255, 255, 255, 0.12);
  --ch-chip-active-bg: #2563eb;
  --ch-chip-active-text: #ffffff;
  --ch-success-text: #10b981;
  --ch-danger-bg: rgba(239, 68, 68, 0.12);
  --ch-danger-border: rgba(239, 68, 68, 0.35);
  --ch-danger-text: #f87171;
  --ch-modal-overlay: rgba(0, 0, 0, 0.65);
}

[data-theme="light"] {
  --ch-bg: var(--dsw-alias-bg, #f6f8fa);
  --ch-surface: var(--dsw-alias-surface, #ffffff);
  --ch-surface-hover: var(--dsw-alias-surface-hover, #f3f4f6);
  --ch-card-bg: var(--dsw-alias-card-bg, #ffffff);
  --ch-card-border: var(--dsw-alias-border, rgba(0, 0, 0, 0.08));
  --ch-card-hover-border: rgba(0, 0, 0, 0.18);
  --ch-text-primary: var(--dsw-alias-text-primary, #1d1d1f);
  --ch-text-secondary: var(--dsw-alias-text-secondary, #64748b);
  --ch-text-muted: #94a3b8;
  --ch-brand: #007aff;
  --ch-brand-hover: #0062cc;
  --ch-segmented-bg: rgba(0, 0, 0, 0.05);
  --ch-segmented-active: #ffffff;
  --ch-segmented-active-text: #1d1d1f;
  --ch-pill-bg: rgba(0, 0, 0, 0.04);
  --ch-pill-hover: rgba(0, 0, 0, 0.08);
  --ch-chip-active-bg: #007aff;
  --ch-chip-active-text: #ffffff;
  --ch-success-text: #059669;
  --ch-danger-bg: #fef2f2;
  --ch-danger-border: #f87171;
  --ch-danger-text: #dc2626;
  --ch-modal-overlay: rgba(0, 0, 0, 0.35);
}

@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    --ch-bg: var(--dsw-alias-bg, #f6f8fa);
    --ch-surface: var(--dsw-alias-surface, #ffffff);
    --ch-surface-hover: var(--dsw-alias-surface-hover, #f3f4f6);
    --ch-card-bg: var(--dsw-alias-card-bg, #ffffff);
    --ch-card-border: var(--dsw-alias-border, rgba(0, 0, 0, 0.08));
    --ch-card-hover-border: rgba(0, 0, 0, 0.18);
    --ch-text-primary: var(--dsw-alias-text-primary, #1d1d1f);
    --ch-text-secondary: var(--dsw-alias-text-secondary, #64748b);
    --ch-text-muted: #94a3b8;
    --ch-brand: #007aff;
    --ch-brand-hover: #0062cc;
    --ch-segmented-bg: rgba(0, 0, 0, 0.05);
    --ch-segmented-active: #ffffff;
    --ch-segmented-active-text: #1d1d1f;
    --ch-pill-bg: rgba(0, 0, 0, 0.04);
    --ch-pill-hover: rgba(0, 0, 0, 0.08);
    --ch-chip-active-bg: #007aff;
    --ch-chip-active-text: #ffffff;
    --ch-success-text: #059669;
    --ch-danger-bg: #fef2f2;
    --ch-danger-border: #f87171;
    --ch-danger-text: #dc2626;
    --ch-modal-overlay: rgba(0, 0, 0, 0.35);
  }
}

/* 集市全屏容器与右侧平滑原生滚动条 */
.mkt-panel {
  display: flex; flex-direction: column; height: 100%; width: 100%;
  background: var(--ch-bg); color: var(--ch-text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  overflow: hidden; position: relative;
}
.mkt-scroll-container {
  flex: 1; overflow-y: auto; overflow-x: hidden; position: relative;
  scrollbar-width: thin; scrollbar-color: rgba(140, 140, 160, 0.3) transparent;
}
.mkt-scroll-container::-webkit-scrollbar { width: 7px; }
.mkt-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(140, 140, 160, 0.35); border-radius: 4px;
}
.mkt-scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(140, 140, 160, 0.55);
}

/* 顶部导航：iOS 大标题与简约操作区 */
.mkt-header {
  padding: 16px 28px 12px; border-bottom: 1px solid var(--ch-card-border);
  background: var(--ch-surface); flex-shrink: 0;
}
.mkt-header-top {
  display: flex; justify-content: space-between; align-items: center;
}
.mkt-title-box { display: flex; align-items: center; gap: 10px; }
.mkt-title-text { font-size: 19px; font-weight: 700; color: var(--ch-text-primary); display: flex; align-items: center; gap: 8px; letter-spacing: -0.2px; }
.mkt-version-badge {
  font-size: 11px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 9999px;
  background: var(--ch-bg-card-hover, rgba(125, 125, 125, 0.12));
  color: var(--ch-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}
.mkt-version-badge:hover {
  background: #2563eb;
  color: #ffffff;
}
.mkt-subtitle { font-size: 12.5px; color: var(--ch-text-secondary); margin-top: 3px; }
.mkt-header-actions { display: flex; align-items: center; gap: 8px; }

.mkt-action-btn {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px;
  border-radius: 20px; font-size: 12px; font-weight: 500; cursor: pointer;
  background: var(--ch-surface); color: var(--ch-text-primary);
  border: 1px solid var(--ch-card-border); transition: all 0.15s ease;
}
.mkt-action-btn:hover {
  background: var(--ch-surface-hover); border-color: var(--ch-brand); color: var(--ch-brand);
}
.mkt-action-btn.primary {
  background: #2563eb; color: #ffffff; border-color: #2563eb;
}
.mkt-action-btn.primary:hover {
  background: #1d4ed8;
}

/* macOS / iOS Segmented Control 分段药丸栏 (无黑框，纯净白底浮层) */
.mkt-installed-subbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px 4px;
  flex-shrink: 0;
  box-sizing: border-box;
}
.mkt-tabs-bar {
  padding: 10px 28px 6px;
  background: var(--ch-surface);
  border-bottom: 1px solid var(--ch-card-border);
  flex-shrink: 0;
}
.mkt-segmented-nav {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px;
  border-radius: 9px;
  background: var(--ch-segmented-bg);
  border: 1px solid var(--ch-card-border);
}
.mkt-segmented-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ch-text-secondary);
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;
  border: none;
  background: transparent;
}
.mkt-segmented-tab:hover {
  color: var(--ch-text-primary);
}
.mkt-segmented-tab.active {
  background: var(--ch-segmented-active);
  color: var(--ch-segmented-active-text);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.06);
}
.mkt-segmented-badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.16);
  color: var(--ch-text-secondary);
  font-weight: 500;
}
.mkt-segmented-tab.active .mkt-segmented-badge {
  background: var(--ch-brand);
  color: #ffffff;
}
.mkt-badge-amber {
  background: #f59e0b !important;
  color: #ffffff !important;
}

/* 搜索框与分类胶囊筛选栏 */
.mkt-filter-section {
  padding: 14px 28px 8px; flex-shrink: 0; background: var(--ch-bg);
}
.mkt-search-wrapper {
  position: relative; width: 100%; margin-bottom: 12px;
}
.mkt-search-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: var(--ch-text-muted); pointer-events: none;
}
.mkt-search-input {
  width: 100%; box-sizing: border-box; padding: 10px 14px 10px 38px;
  border-radius: 20px; font-size: 13px; outline: none;
  background: var(--ch-surface); color: var(--ch-text-primary);
  border: 1px solid var(--ch-card-border); transition: all 0.15s ease;
}
.mkt-search-input:focus {
  border-color: var(--ch-brand); box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.18);
}
.mkt-search-clear {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: var(--ch-text-muted); cursor: pointer;
  font-size: 14px; padding: 4px;
}
.mkt-search-clear:hover { color: var(--ch-text-primary); }

.mkt-chips-row {
  display: flex; align-items: center; gap: 8px; overflow-x: auto; padding-bottom: 6px;
  scrollbar-width: none;
}
.mkt-chips-row::-webkit-scrollbar { display: none; }
.mkt-chip {
  padding: 5px 13px; border-radius: 16px; font-size: 12px; cursor: pointer;
  background: var(--ch-pill-bg); color: var(--ch-text-secondary);
  border: 1px solid var(--ch-card-border); white-space: nowrap; user-select: none;
  transition: all 0.15s ease;
}
.mkt-chip:hover {
  background: var(--ch-pill-hover); color: var(--ch-text-primary);
}
.mkt-chip.active {
  background: var(--ch-chip-active-bg); color: var(--ch-chip-active-text); font-weight: 600;
  border-color: var(--ch-chip-active-bg);
  box-shadow: 0 2px 6px rgba(0, 122, 255, 0.25);
}

/* 已安装管理专栏顶部状态条 (零废话，极简紧凑) */
.mkt-installed-stats-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 28px; background: var(--ch-surface);
  border-bottom: 1px solid var(--ch-card-border); flex-wrap: wrap; gap: 10px;
}
.mkt-stats-chips {
  display: flex; align-items: center; gap: 14px; font-size: 12.5px; color: var(--ch-text-secondary);
}
.mkt-stat-active { color: var(--ch-success-text); font-weight: 600; }
.mkt-stat-paused { color: var(--ch-text-muted); }

.mkt-subtabs-group {
  display: inline-flex; align-items: center; gap: 3px; padding: 3px;
  border-radius: 9px; background: var(--ch-segmented-bg); border: 1px solid var(--ch-card-border);
}
.mkt-subtab-pill {
  display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px;
  border-radius: 7px; font-size: 12px; font-weight: 500; color: var(--ch-text-secondary);
  cursor: pointer; user-select: none; transition: all 0.15s ease;
}
.mkt-subtab-pill:hover { color: var(--ch-text-primary); }
.mkt-subtab-pill.active {
  background: var(--ch-segmented-active); color: var(--ch-segmented-active-text); font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.mkt-subtab-badge {
  font-size: 11px; padding: 0 5px; border-radius: 8px;
  background: rgba(128, 128, 128, 0.18); color: var(--ch-text-secondary);
}
.mkt-subtab-pill.active .mkt-subtab-badge {
  background: var(--ch-brand); color: #ffffff;
}

/* 技能卡片列表网格 (对齐黄金标杆 media_1792481904893_4cde65e2.png: 3 列自适应) */
.mkt-cards-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px; padding: 14px 28px 48px;
}
@media (max-width: 960px) {
  .mkt-cards-grid { grid-template-columns: 1fr; padding: 10px 16px 36px; }
  .mkt-header, .mkt-tabs-bar, .mkt-filter-section, .mkt-installed-stats-bar { padding-left: 16px; padding-right: 16px; }
}

.mkt-card {
  background: var(--ch-card-bg); border: 1px solid var(--ch-card-border);
  border-radius: 14px; padding: 16px 18px; display: flex; flex-direction: column;
  justify-content: space-between; transition: all 0.18s ease; position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.mkt-card:hover {
  border-color: var(--ch-card-hover-border); transform: translateY(-1.5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.mkt-card-body {
  display: flex; gap: 14px; align-items: flex-start;
}
.mkt-card-main-col {
  flex: 1; min-width: 0; display: flex; flex-direction: column;
}
.mkt-card-head {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
}
.mkt-card-title-row { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
.mkt-card-title {
  font-size: 15px; font-weight: 600; color: var(--ch-text-primary);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1.3;
}
.mkt-card-version-tag {
  font-size: 11px; color: var(--ch-text-secondary); background: var(--ch-pill-bg);
  border: 1px solid var(--ch-card-border); padding: 1.5px 6px; border-radius: 6px;
  font-family: ui-monospace, monospace; flex-shrink: 0;
}
.mkt-card-update-tag {
  font-size: 11px; font-weight: 600; color: #d97706; background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3); padding: 1.5px 7px; border-radius: 6px;
  font-family: ui-monospace, monospace; flex-shrink: 0;
}
.mkt-alias-tag {
  font-size: 10px; font-weight: 600; color: #007aff; background: rgba(0, 122, 255, 0.12);
  border: 1px solid rgba(0, 122, 255, 0.28); padding: 1px 5px; border-radius: 4px;
  flex-shrink: 0;
}
.mkt-card-meta-line {
  font-size: 12px; color: var(--ch-text-secondary); margin-top: 4px;
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
}
.mkt-card-stars { color: #eab308; font-weight: 600; display: inline-flex; align-items: center; }
.mkt-card-slash {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px; padding: 1.5px 7px; border-radius: 4px;
  background: rgba(0, 122, 255, 0.1); color: #007aff; border: 1px solid rgba(0, 122, 255, 0.22);
}
.mkt-card-desc {
  font-size: 12px; color: var(--ch-text-secondary); line-height: 1.5; margin-top: 8px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  min-height: 36px;
}

/* 卡片右上角操作区：收藏星标 + 三点菜单 */
.mkt-card-head-right {
  display: flex; align-items: center; gap: 4px; flex-shrink: 0; position: relative;
}
.mkt-star-btn {
  background: transparent; border: none; font-size: 16px;
  color: var(--ch-text-secondary); cursor: pointer; padding: 3px 5px;
  border-radius: 6px; transition: all 0.15s ease; line-height: 1;
}
.mkt-star-btn:hover {
  color: #f59e0b; background: rgba(245, 158, 11, 0.12);
}
.mkt-star-btn.active {
  color: #f59e0b;
}
.mkt-menu-btn {
  background: transparent; border: none; font-size: 16px; font-weight: 700;
  color: var(--ch-text-secondary); cursor: pointer; padding: 2px 7px;
  border-radius: 6px; transition: all 0.15s ease; line-height: 1; letter-spacing: 1px;
}
.mkt-menu-btn:hover {
  background: var(--ch-pill-hover); color: var(--ch-text-primary);
}

/* 三点菜单下拉浮层 (iOS Popover 纯净风格) */
.mkt-dropdown-popover {
  position: absolute; right: 0; top: 100%; margin-top: 4px; min-width: 175px;
  background: var(--ch-surface); border: 1px solid var(--ch-card-border);
  border-radius: 10px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  padding: 4px; z-index: 1000; animation: chPopoverFadeIn 0.12s ease-out;
}
.mkt-dropdown-item {
  width: 100%; display: flex; align-items: center; gap: 8px; padding: 7px 10px;
  border-radius: 6px; font-size: 12.5px; color: var(--ch-text-primary);
  background: transparent; border: none; cursor: pointer; text-align: left;
  transition: all 0.12s ease;
}
.mkt-dropdown-item:hover {
  background: var(--ch-pill-hover);
}
.mkt-dropdown-item.danger {
  color: #ef4444;
}
.mkt-dropdown-item.danger:hover {
  background: rgba(239, 68, 68, 0.1);
}
.mkt-dropdown-divider {
  height: 1px; background: var(--ch-card-border); margin: 4px 0;
}

/* 卡片底部操作区分流 (无顶部分割线，零多余调用按钮) */
.mkt-card-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 14px; padding-top: 0;
}
.mkt-foot-status-uninstalled {
  display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ch-text-muted);
}
.mkt-dot-uninstalled {
  width: 6px; height: 6px; border-radius: 50%; background: #94a3b8; display: inline-block;
}

/* iOS 简约操作按钮体系 (安装、升级、卸载完美对齐与对称) */
.mkt-btn-install {
  background: #2563eb; color: #ffffff; border: none; border-radius: 7px;
  padding: 5px 18px; font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.15s ease; user-select: none; display: inline-flex; align-items: center; justify-content: center;
}
.mkt-btn-install:hover {
  background: #1d4ed8; transform: translateY(-0.5px); box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
}
.mkt-btn-install:active { transform: scale(0.97); }
.mkt-btn-install.loading {
  background: rgba(37, 99, 235, 0.6); cursor: wait;
}

.mkt-btn-upgrade {
  background: #f59e0b; color: #ffffff; border: none; border-radius: 7px;
  padding: 5px 14px; font-size: 12.5px; font-weight: 500; cursor: pointer;
  transition: all 0.15s ease; user-select: none; display: inline-flex; align-items: center; justify-content: center;
}
.mkt-btn-upgrade:hover {
  background: #d97706; transform: translateY(-0.5px); box-shadow: 0 2px 6px rgba(245, 158, 11, 0.35);
}
.mkt-btn-upgrade:active { transform: scale(0.97); }

.mkt-btn-uninstall {
  background: var(--ch-pill-bg); color: var(--ch-text-secondary);
  border: 1px solid var(--ch-card-border); border-radius: 7px;
  padding: 5px 14px; font-size: 12.5px; font-weight: 500; cursor: pointer;
  transition: all 0.15s ease; user-select: none; display: inline-flex; align-items: center; justify-content: center;
}
.mkt-btn-uninstall:hover {
  background: rgba(239, 68, 68, 0.08); color: #dc2626; border-color: rgba(239, 68, 68, 0.3);
  transform: translateY(-0.5px);
}
.mkt-btn-uninstall:active { transform: scale(0.97); }

/* iOS 风格平滑切换开关 (Toggle) */
.mkt-ios-toggle {
  display: inline-flex; align-items: center; gap: 7px; cursor: pointer; user-select: none;
}
.mkt-toggle-track {
  width: 34px; height: 20px; background: rgba(128, 128, 128, 0.28);
  border-radius: 11px; position: relative; transition: background 0.2s ease;
}
.mkt-toggle-track.active {
  background: #10b981;
}
.mkt-toggle-thumb {
  width: 16px; height: 16px; background: #ffffff; border-radius: 50%;
  position: absolute; top: 2px; left: 2px; transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.mkt-toggle-track.active .mkt-toggle-thumb {
  transform: translateX(14px);
}
.mkt-toggle-label {
  font-size: 12px; font-weight: 500;
}
.mkt-toggle-label.active {
  color: var(--ch-success-text);
}
.mkt-toggle-label.disabled {
  color: var(--ch-text-muted);
}

/* 红色报错栏 */
.mkt-red-error-bar {
  margin-top: 8px; padding: 6px 10px; border-radius: 6px;
  background: var(--ch-danger-bg); border: 1px solid var(--ch-danger-border);
  display: flex; justify-content: space-between; align-items: center; gap: 6px;
}
.mkt-red-error-text { font-size: 11.5px; color: var(--ch-danger-text); }
.mkt-red-retry-btn {
  background: none; border: none; font-size: 11.5px; font-weight: 600;
  color: var(--ch-danger-text); cursor: pointer; text-decoration: underline; padding: 0;
}

/* 模态弹窗层 (iOS Sheet 纯净卡片) */
.mkt-modal-backdrop {
  position: fixed; inset: 0; background: var(--ch-modal-overlay);
  backdrop-filter: blur(4px); z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  animation: chFadeIn 0.15s ease-out;
}
.mkt-modal-sheet {
  background: var(--ch-surface); border: 1px solid var(--ch-card-border);
  border-radius: 14px; width: 92%; max-width: 580px; max-height: 85vh;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35); display: flex; flex-direction: column;
  overflow: hidden; animation: chSlideUp 0.18s ease-out;
}
.mkt-modal-header {
  padding: 16px 20px; border-bottom: 1px solid var(--ch-card-border);
  display: flex; justify-content: space-between; align-items: center;
}
.mkt-modal-title { font-size: 16px; font-weight: 600; color: var(--ch-text-primary); }
.mkt-modal-close {
  background: none; border: none; font-size: 18px; color: var(--ch-text-muted);
  cursor: pointer; padding: 4px; border-radius: 6px;
}
.mkt-modal-close:hover { color: var(--ch-text-primary); background: var(--ch-pill-hover); }
.mkt-modal-body {
  padding: 18px 20px; overflow-y: auto; flex: 1; font-size: 13px; line-height: 1.6;
}
.mkt-modal-footer {
  padding: 12px 20px; border-top: 1px solid var(--ch-card-border);
  display: flex; justify-content: flex-end; gap: 10px; background: var(--ch-bg);
}
.mkt-modal-btn {
  padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer;
  border: 1px solid var(--ch-card-border); background: var(--ch-surface); color: var(--ch-text-primary);
}
.mkt-modal-btn.confirm {
  background: #2563eb; color: #ffffff; border-color: #2563eb;
}
.mkt-modal-btn.danger {
  background: #dc2626; color: #ffffff; border-color: #dc2626;
}

/* 输入框底部唤出面板 (Composer Popover, 对齐截图 media_1792481020508_6c1516be.png) */
.ch-pk-popover-portal {
  position: fixed; z-index: 99999;
  width: 380px; max-height: 480px;
  background: var(--ch-surface); border: 1px solid var(--ch-card-border);
  border-radius: 12px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
  display: flex; flex-direction: column; overflow: hidden;
  animation: chSlideUp 0.15s ease-out;
}
.ch-pk-header {
  padding: 12px 16px 10px; border-bottom: 1px solid var(--ch-card-border);
  display: flex; justify-content: space-between; align-items: center;
}
.ch-pk-title { font-size: 14.5px; font-weight: 600; color: var(--ch-text-primary); }
.ch-pk-search-box {
  padding: 10px 16px; border-bottom: 1px solid var(--ch-card-border); position: relative;
}
.ch-pk-search-input {
  width: 100%; box-sizing: border-box; padding: 7px 12px;
  border-radius: 8px; font-size: 12.5px; outline: none;
  background: var(--ch-pill-bg); color: var(--ch-text-primary);
  border: 1px solid var(--ch-card-border);
}
.ch-pk-search-input:focus {
  border-color: #007aff; box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.18);
}
.ch-pk-list {
  flex: 1; overflow-y: auto; padding: 6px 10px; max-height: 280px;
}
.ch-pk-item {
  display: flex; align-items: center; gap: 10px; padding: 8px 10px;
  border-radius: 8px; cursor: pointer; transition: all 0.12s ease;
  user-select: none;
}
.ch-pk-item:hover, .ch-pk-item.highlighted {
  background: var(--ch-pill-hover);
}
.ch-pk-item.checked {
  background: rgba(0, 122, 255, 0.08);
}
.ch-ios-checkbox {
  width: 17px; height: 17px; border-radius: 4px;
  border: 1.5px solid var(--ch-text-muted); display: flex; align-items: center;
  justify-content: center; flex-shrink: 0; transition: all 0.12s ease;
}
.ch-ios-checkbox.checked {
  background: #007aff; border-color: #007aff;
}
.ch-pk-content-single {
  flex: 1; min-width: 0; display: flex; align-items: center; justify-content: space-between; gap: 8px;
}
.ch-pk-name {
  font-size: 13px; font-weight: 500; color: var(--ch-text-primary);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ch-pk-slash-pill {
  font-family: ui-monospace, monospace; font-size: 11px;
  padding: 1.5px 6px; border-radius: 4px;
  background: var(--ch-pill-bg); color: var(--ch-text-secondary);
  border: 1px solid var(--ch-card-border); flex-shrink: 0;
}
.ch-pk-footer {
  padding: 10px 16px; border-top: 1px solid var(--ch-card-border);
  display: flex; justify-content: flex-end; gap: 8px; background: var(--ch-bg);
}
.ch-pk-btn-cancel {
  padding: 6px 14px; border-radius: 7px; font-size: 12.5px; font-weight: 500;
  background: var(--ch-surface); color: var(--ch-text-primary);
  border: 1px solid var(--ch-card-border); cursor: pointer;
}
.ch-pk-btn-confirm {
  padding: 6px 16px; border-radius: 7px; font-size: 12.5px; font-weight: 500;
  background: #007aff; color: #ffffff; border: none; cursor: pointer;
  transition: all 0.15s ease;
}
.ch-pk-btn-confirm:hover:not(:disabled) { background: #0062cc; }
.ch-pk-btn-confirm:disabled {
  background: rgba(0, 122, 255, 0.35);
  color: rgba(255, 255, 255, 0.6);
  cursor: not-allowed;
}

@keyframes chFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes chSlideUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes chPopoverFadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
@keyframes chSpin { 100% { transform: rotate(360deg); } }
`;

    // 动态注入样式表
    try {
      var existingStyle = document.getElementById("dsh-clawhub-style");
      if (existingStyle) existingStyle.remove();
      var styleEl = document.createElement("style");
      styleEl.id = "dsh-clawhub-style";
      styleEl.textContent = CSS;
      document.head.appendChild(styleEl);
    } catch (e) {}

    // ── 纯净矢量 SVG 图标集 ───────────────────────────────────────────────────────
    // 1. 集市主 Header Logo (微笑购物袋 + 四角星)
    function ColorToteIcon(props) {
      var size = props.size || 32;
      return h(
        "svg",
        {
          viewBox: "0 0 36 36",
          width: size,
          height: size,
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        },
        // 提手
        h("path", {
          d: "M13 11V8.5A5 5 0 0 1 23 8.5V11",
          stroke: "#2563eb",
          strokeWidth: "2.6",
          strokeLinecap: "round"
        }),
        // 包体 (湛蓝圆角矩形)
        h("rect", {
          x: "6",
          y: "11",
          width: "24",
          height: "21",
          rx: "6",
          fill: "#2563eb"
        }),
        // 温暖微笑
        h("path", {
          d: "M13.5 21C15 23.5 21 23.5 22.5 21",
          stroke: "#ffffff",
          strokeWidth: "2.4",
          strokeLinecap: "round"
        }),
        // 右上角闪耀四角星
        h("path", {
          d: "M29 3L30 6.5L33.5 7.5L30 8.5L29 12L28 8.5L24.5 7.5L28 6.5L29 3Z",
          fill: "#fbbf24"
        })
      );
    }

    // 2. 侧边栏/小尺寸单色线框 Tote 图标
    function SidebarToteIcon(props) {
      var size = props.size || 16;
      return h(
        "svg",
        {
          viewBox: "0 0 24 24",
          width: size,
          height: size,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.7",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        },
        h("path", { d: "M8.5 7.5V5a3.5 3.5 0 0 1 7 0v2.5" }),
        h("path", { d: "M4.5 7.5h15l1 11a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3l1-11z" }),
        h("path", { d: "M9 14.5c1.2 1.3 4.8 1.3 6 0" }),
        h("path", {
          d: "M19.5 2c0 1.2.8 2 2 2-1.2 0-2 .8-2 2 0-1.2-.8-2-2-2 1.2 0 2-.8 2-2z",
          fill: "currentColor",
          stroke: "none"
        })
      );
    }

    // ── 丰富 Squircle 图标体系 (16 组柔和色系 + 20+ 精细矢量简笔画) ─────────────────
    function SkillSquircleIcon(props) {
      var id = String(props.skillId || "").toLowerCase();
      var size = props.size || 28;
      var isLarge = size >= 40;
      var svgSize = isLarge ? 22 : 14;
      var borderRadius = isLarge ? "12px" : "8px";

      // 16 组柔和高级的 iOS 配色 (无生硬外框，饱和度适中，与深浅模式完美契合)
      var PALETTES = [
        { bg: "rgba(6, 182, 212, 0.16)",  color: "#0891b2" }, // 0: 青蓝
        { bg: "rgba(34, 197, 94, 0.16)",  color: "#16a34a" }, // 1: 鼠尾草绿
        { bg: "rgba(99, 102, 241, 0.16)", color: "#4f46e5" }, // 2: 靛紫
        { bg: "rgba(59, 130, 246, 0.16)", color: "#2563eb" }, // 3: 天空蓝
        { bg: "rgba(234, 179, 8, 0.16)",  color: "#ca8a04" }, // 4: 暖金
        { bg: "rgba(168, 85, 247, 0.16)", color: "#9333ea" }, // 5: 薰衣草紫
        { bg: "rgba(249, 115, 22, 0.16)", color: "#ea580c" }, // 6: 杏橙
        { bg: "rgba(236, 72, 153, 0.16)", color: "#db2777" }, // 7: 玫瑰粉
        { bg: "rgba(20, 184, 166, 0.16)", color: "#0d9488" }, // 8: 翡翠绿
        { bg: "rgba(100, 116, 139, 0.16)", color: "#475569" }, // 9: 钛金灰
        { bg: "rgba(249, 115, 22, 0.16)", color: "#c2410c" }, // 10: 亮橙
        { bg: "rgba(79, 70, 229, 0.16)",  color: "#4338ca" }, // 11: 皇室蓝
        { bg: "rgba(239, 68, 68, 0.16)",  color: "#dc2626" }, // 12: 绯红
        { bg: "rgba(147, 51, 234, 0.16)", color: "#7e22ce" }, // 13: 葡萄紫
        { bg: "rgba(14, 165, 233, 0.16)", color: "#0284c7" }, // 14: 海洋蓝
        { bg: "rgba(34, 197, 94, 0.16)",  color: "#15803d" }  // 15: 薄荷绿
      ];

      // 关键词语义路由映射 (涵盖 CNS顶刊、代码审计、学术、专利、自进化、LangChain等)
      var matchedPalette = null;
      var matchedGlyphKey = null;

      if (id.includes("academic") || id.includes("figure") || id.includes("cns") || id.includes("paper")) {
        matchedPalette = PALETTES[5]; // 紫色
        matchedGlyphKey = "graduation-cap";
      } else if (id.includes("review") || id.includes("sec") || id.includes("safe") || id.includes("gate")) {
        matchedPalette = PALETTES[1]; // 绿色
        matchedGlyphKey = "shield-check";
      } else if (id.includes("dev") || id.includes("code") || id.includes("fullstack") || id.includes("python")) {
        matchedPalette = PALETTES[2]; // 靛紫
        matchedGlyphKey = "code-brackets";
      } else if (id.includes("patent") || id.includes("idea") || id.includes("lightbulb") || id.includes("inven")) {
        matchedPalette = PALETTES[4]; // 金黄
        matchedGlyphKey = "lightbulb";
      } else if (id.includes("visual") || id.includes("color") || id.includes("design") || id.includes("ui")) {
        matchedPalette = PALETTES[7]; // 粉红
        matchedGlyphKey = "palette";
      } else if (id.includes("self-improv") || id.includes("agent") || id.includes("sparkle") || id.includes("loop")) {
        matchedPalette = PALETTES[3]; // 天蓝
        matchedGlyphKey = "sparkles";
      } else if (id.includes("langchain") || id.includes("orchestr") || id.includes("multi-agent") || id.includes("swarm")) {
        matchedPalette = PALETTES[11]; // 皇室蓝
        matchedGlyphKey = "network-nodes";
      } else if (id.includes("deepseek") || id.includes("reasoning") || id.includes("brain") || id.includes("r1")) {
        matchedPalette = PALETTES[14]; // 海洋蓝
        matchedGlyphKey = "brain-neural";
      } else if (id.includes("terminal") || id.includes("bash") || id.includes("cli") || id.includes("shell") || id.includes("engineer")) {
        matchedPalette = PALETTES[9]; // 钛金灰
        matchedGlyphKey = "terminal-prompt";
      } else if (id.includes("rag") || id.includes("llama") || id.includes("embed") || id.includes("data")) {
        matchedPalette = PALETTES[0]; // 青蓝
        matchedGlyphKey = "layers-stack";
      } else if (id.includes("mcp") || id.includes("fastmcp") || id.includes("protocol") || id.includes("tool")) {
        matchedPalette = PALETTES[8]; // 翡翠绿
        matchedGlyphKey = "plug-connect";
      } else if (id.includes("doc") || id.includes("write") || id.includes("writer") || id.includes("official")) {
        matchedPalette = PALETTES[6]; // 杏橙
        matchedGlyphKey = "document-edit";
      } else if (id.includes("browser") || id.includes("web") || id.includes("crawl") || id.includes("search")) {
        matchedPalette = PALETTES[10]; // 亮橙
        matchedGlyphKey = "globe-search";
      } else if (id.includes("dify") || id.includes("flow") || id.includes("pipe")) {
        matchedPalette = PALETTES[13]; // 葡萄紫
        matchedGlyphKey = "workflow-flow";
      } else if (id.includes("vocab") || id.includes("english") || id.includes("trans")) {
        matchedPalette = PALETTES[12]; // 绯红
        matchedGlyphKey = "book-translate";
      }

      // 哈希兜底逻辑：保证任意 Skill 均有独一无二的和谐图标
      if (!matchedPalette || !matchedGlyphKey) {
        var hash = 0;
        for (var i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i);
        var pIdx = Math.abs(hash) % PALETTES.length;
        matchedPalette = PALETTES[pIdx];
        var glyphKeys = [
          "graduation-cap", "chart-bars", "shield-check", "code-brackets", "lightbulb", "palette",
          "sparkles", "network-nodes", "brain-neural", "terminal-prompt", "layers-stack",
          "plug-connect", "document-edit", "globe-search", "workflow-flow", "book-translate"
        ];
        matchedGlyphKey = glyphKeys[Math.abs(hash >> 3) % glyphKeys.length];
      }

      // 高对比度矢量符号库 (加粗线条至 2.6~2.8，关键类别采用半实心填充，对齐标杆视觉)
      function renderGlyph(key) {
        switch (key) {
          case "graduation-cap":
            return [
              h("path", { key: "cap-top", d: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3z", fill: "currentColor" }),
              h("path", { key: "cap-bot", d: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z", fill: "currentColor", opacity: 0.88 })
            ];
          case "chart-bars":
            return [
              h("rect", { key: "b1", x: "3.5", y: "13", width: "4.5", height: "8", rx: "1.8", fill: "currentColor" }),
              h("rect", { key: "b2", x: "9.75", y: "5", width: "4.5", height: "16", rx: "1.8", fill: "currentColor" }),
              h("rect", { key: "b3", x: "16", y: "9", width: "4.5", height: "12", rx: "1.8", fill: "currentColor" })
            ];
          case "shield-check":
            return [
              h("path", { key: "s", d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round", fill: "rgba(22, 163, 74, 0.18)" }),
              h("path", { key: "c", d: "M9 12l2 2 4-4", stroke: "currentColor", strokeWidth: 2.8, strokeLinecap: "round", strokeLinejoin: "round" })
            ];
          case "code-brackets":
            return [
              h("polyline", { key: "b1", points: "16 18 22 12 16 6", stroke: "currentColor", strokeWidth: 2.8, strokeLinecap: "round", strokeLinejoin: "round" }),
              h("polyline", { key: "b2", points: "8 6 2 12 8 18", stroke: "currentColor", strokeWidth: 2.8, strokeLinecap: "round", strokeLinejoin: "round" }),
              h("line", { key: "sl", x1: "13.5", y1: "5", x2: "10.5", y2: "19", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" })
            ];
          case "lightbulb":
            return [
              h("path", { key: "p1", d: "M9 18h6M10 22h4", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" }),
              h("path", { key: "p2", d: "M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round", fill: "rgba(202, 138, 4, 0.2)" })
            ];
          case "palette":
            return [
              h("path", { key: "p", d: "M12 2a10 10 0 0 0 0 20c1.5 0 2.5-1 2.5-2.5 0-.7-.3-1.3-.7-1.7-.4-.4-.6-1-.6-1.6 0-1.4 1.1-2.5 2.5-2.5H18a4 4 0 0 0 4-4c0-5.5-4.5-10-10-10z", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round", fill: "rgba(219, 39, 119, 0.18)" }),
              h("circle", { key: "d1", cx: "8.5", cy: "8.5", r: "1.5", fill: "currentColor" }),
              h("circle", { key: "d2", cx: "12", cy: "6.5", r: "1.5", fill: "currentColor" }),
              h("circle", { key: "d3", cx: "15.5", cy: "8.5", r: "1.5", fill: "currentColor" })
            ];
          case "sparkles":
            return [
              h("path", { key: "s1", d: "M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z", fill: "currentColor" }),
              h("path", { key: "s2", d: "M19 16l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z", fill: "currentColor", opacity: 0.82 })
            ];
          case "network-nodes":
            return [
              h("circle", { key: "c1", cx: "6", cy: "12", r: "3", fill: "currentColor" }),
              h("circle", { key: "c2", cx: "12", cy: "5", r: "3", fill: "currentColor" }),
              h("circle", { key: "c3", cx: "18", cy: "12", r: "3", fill: "currentColor" }),
              h("circle", { key: "c4", cx: "12", cy: "19", r: "3", fill: "currentColor" }),
              h("path", { key: "l", d: "M8.2 10.2l2.2-2.6m3.2 0l2.2 2.6m0 3.6l-2.2 2.6m-3.2 0l-2.2-2.6", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" }),
              h("circle", { key: "center", cx: "12", cy: "12", r: "2.2", stroke: "currentColor", strokeWidth: 2.2, fill: "none" })
            ];
          case "brain-neural":
            return [
              h("path", { key: "b1", d: "M9.5 3A4.5 4.5 0 0 0 5 7.5c0 .6.1 1.2.3 1.7A4.5 4.5 0 0 0 4 13a4.5 4.5 0 0 0 2 3.8A4.5 4.5 0 0 0 10 21c.4 0 .7 0 1.1-.1", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" }),
              h("path", { key: "b2", d: "M14.5 3A4.5 4.5 0 0 1 19 7.5c0 .6-.1 1.2-.3 1.7A4.5 4.5 0 0 1 20 13a4.5 4.5 0 0 1-2 3.8A4.5 4.5 0 0 1 14 21c-.4 0-.7 0-1.1-.1", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" }),
              h("path", { key: "m", d: "M12 5v14m-3.5-7h7", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeDasharray: "2 2" })
            ];
          case "terminal-prompt":
            return [
              h("polyline", { key: "p", points: "4 17 10 11 4 5", stroke: "currentColor", strokeWidth: 2.8, strokeLinecap: "round", strokeLinejoin: "round" }),
              h("line", { key: "l", x1: "12", y1: "19", x2: "20", y2: "19", stroke: "currentColor", strokeWidth: 2.8, strokeLinecap: "round" })
            ];
          case "layers-stack":
            return [
              h("path", { key: "p1", d: "M12 3l9 4.5-9 4.5-9-4.5L12 3z", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "rgba(6, 182, 212, 0.15)" }),
              h("path", { key: "p2", d: "M3 12l9 4.5 9-4.5", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }),
              h("path", { key: "p3", d: "M3 16.5l9 4.5 9-4.5", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" })
            ];
          case "plug-connect":
            return [
              h("path", { key: "p1", d: "M12 22v-5", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" }),
              h("path", { key: "p2", d: "M9 7V2m6 5V2", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" }),
              h("path", { key: "p3", d: "M7 7h10a2 2 0 0 1 2 2v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-3a2 2 0 0 1 2-2z", stroke: "currentColor", strokeWidth: 2.5, fill: "rgba(13, 148, 136, 0.18)" })
            ];
          case "document-edit":
            return [
              h("path", { key: "d", d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }),
              h("polyline", { key: "p", points: "14 2 14 8 20 8", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }),
              h("line", { key: "l", x1: "8", y1: "13", x2: "16", y2: "13", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" })
            ];
          case "globe-search":
            return [
              h("circle", { key: "c", cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: 2.5 }),
              h("path", { key: "l1", d: "M3.6 9h16.8M3.6 15h16.8", stroke: "currentColor", strokeWidth: 2.2 }),
              h("path", { key: "l2", d: "M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18", stroke: "currentColor", strokeWidth: 2.2 })
            ];
          case "workflow-flow":
            return [
              h("rect", { key: "r1", x: "3", y: "3", width: "6", height: "6", rx: "2", fill: "currentColor" }),
              h("rect", { key: "r2", x: "15", y: "3", width: "6", height: "6", rx: "2", fill: "currentColor" }),
              h("rect", { key: "r3", x: "9", y: "15", width: "6", height: "6", rx: "2", fill: "currentColor" }),
              h("path", { key: "l", d: "M6 9v3a2 2 0 0 0 2 2h4m6-5v3a2 2 0 0 1-2 2h-4", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" })
            ];
          case "book-translate":
          default:
            return [
              h("path", { key: "p1", d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" }),
              h("path", { key: "p2", d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", fill: "rgba(220, 38, 38, 0.12)" })
            ];
        }
      }

      return h(
        "div",
        {
          style: {
            width: size + "px",
            height: size + "px",
            borderRadius: borderRadius,
            background: matchedPalette.bg,
            border: "none",
            color: matchedPalette.color,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.15s ease"
          }
        },
        h(
          "svg",
          {
            viewBox: "0 0 24 24",
            width: svgSize,
            height: svgSize,
            fill: "none"
          },
          renderGlyph(matchedGlyphKey)
        )
      );
    }

    // ── 提示词完整预览弹窗 (PromptPreviewModal) ──────────────────────────────────
    function PromptPreviewModal(props) {
      if (!props.skill) return null;
      var sk = props.skill;

      var mockPrompt =
        "# " + sk.name + " (" + sk.slash + ")\n\n" +
        "> 仓库来源: " + sk.repo + " | 社区热度: " + sk.stars + "\n\n" +
        "## 技能定位与核心职责\n" +
        sk.summary + "\n\n" +
        "## 执行准则与输入规范\n" +
        "1. 严格遵循该领域生产级工程规范，排查边界漏洞与异常输入。\n" +
        "2. 所有输出结构化呈现，优先提供生产可直接复用的方案与代码片段。\n\n" +
        "## 预设触发指令\n" +
        "`" + sk.slash + "`";

      return h(
        "div",
        { className: "mkt-modal-backdrop", onClick: props.onClose },
        h(
          "div",
          { className: "mkt-modal-sheet", onClick: (e) => e.stopPropagation() },
          h(
            "div",
            { className: "mkt-modal-header" },
            h(
              "div",
              { style: { display: "flex", alignItems: "center", gap: "10px" } },
              h(SkillSquircleIcon, { skillId: sk.id, size: 28 }),
              h("div", { className: "mkt-modal-title" }, sk.name)
            ),
            h("button", { className: "mkt-modal-close", onClick: props.onClose }, "✕")
          ),
          h(
            "div",
            { className: "mkt-modal-body" },
            h(
              "pre",
              {
                style: {
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: "12.5px",
                  lineHeight: "1.6",
                  color: "var(--ch-text-primary)"
                }
              },
              mockPrompt
            )
          ),
          h(
            "div",
            { className: "mkt-modal-footer" },
            h("button", { className: "mkt-modal-btn", onClick: props.onClose }, "关闭")
          )
        )
      );
    }

    // ── 自定义导入外部 GitHub 技能弹窗 (CustomImportModal) ────────────────────────
    function CustomImportModal(props) {
      if (!props.isOpen) return null;
      var [repoInput, setRepoInput] = useState("");
      var [loading, setLoading] = useState(false);
      var [errorMsg, setErrorMsg] = useState(null);

      var handleImport = async () => {
        var rawVal = repoInput.trim();
        if (!rawVal) {
          setErrorMsg("请输入完整的 GitHub 技能仓库 URL (例如: https://github.com/op7418/humanizer-zh)");
          return;
        }
        var trimmed = rawVal.replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "");
        if (!trimmed.includes("/") && !rawVal.includes("http")) {
          setErrorMsg("请输入完整的 GitHub 仓库链接 (例如: https://github.com/op7418/humanizer-zh)");
          return;
        }
        setLoading(true);
        setErrorMsg(null);
        try {
          var res = await fetch("/api/clawhub/import-github", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: rawVal, repo: trimmed })
          });
          var data = await res.json();
          if (data.ok) {
            try {
              var savedMap = JSON.parse(localStorage.getItem("dsh_skill_urls") || "{}");
              var fullUrl = rawVal.startsWith("http") ? rawVal : ("https://github.com/" + trimmed);
              savedMap[data.id || (data.skill && data.skill.id) || ""] = fullUrl;
              localStorage.setItem("dsh_skill_urls", JSON.stringify(savedMap));
            } catch(e) {}
            props.onSuccess(data.skill || { id: data.id, name: data.name, repo: trimmed, url: rawVal });
            props.onClose();
          } else {
            setErrorMsg(data.error || "导入失败，请检查仓库是否存在或网络状态");
          }
        } catch (e) {
          setErrorMsg("网络请求异常: " + (e.message || String(e)));
        } finally {
          setLoading(false);
        }
      };

      return h(
        "div",
        { className: "mkt-modal-backdrop", onClick: props.onClose },
        h(
          "div",
          { className: "mkt-modal-sheet", onClick: (e) => e.stopPropagation() },
          h(
            "div",
            { className: "mkt-modal-header" },
            h("div", { className: "mkt-modal-title" }, "导入 GitHub 技能仓库"),
            h("button", { className: "mkt-modal-close", onClick: props.onClose }, "✕")
          ),
          h(
            "div",
            { className: "mkt-modal-body" },
            h("div", { style: { marginBottom: "8px", color: "var(--ch-text-secondary)" } },
              "输入完整的 GitHub 技能仓库 URL (例如: https://github.com/op7418/humanizer-zh):"
            ),
            h("input", {
              type: "text",
              style: {
                width: "100%", boxSizing: "border-box", padding: "8px 12px",
                borderRadius: "8px", border: "1px solid var(--ch-card-border)",
                background: "var(--ch-pill-bg)", color: "var(--ch-text-primary)", outline: "none"
              },
              placeholder: "https://github.com/owner/repo",
              value: repoInput,
              onChange: (e) => setRepoInput(e.target.value)
            }),
            errorMsg &&
              h("div", { style: { marginTop: "10px", color: "#ef4444", fontSize: "12px" } }, "❌ " + errorMsg)
          ),
          h(
            "div",
            { className: "mkt-modal-footer" },
            h("button", { className: "mkt-modal-btn", onClick: props.onClose }, "取消"),
            h(
              "button",
              { className: "mkt-modal-btn confirm", disabled: loading, onClick: handleImport },
              loading ? "正在拉取解析..." : "立即导入并安装"
            )
          )
        )
      );
    }

    // ── 彻底卸载确认弹窗 (ConfirmDeleteModal) ────────────────────────────────────
    function ConfirmDeleteModal(props) {
      if (!props.skill) return null;
      var [loading, setLoading] = useState(false);

      var handleConfirm = async () => {
        setLoading(true);
        await props.onConfirm(props.skill.id);
        setLoading(false);
      };

      return h(
        "div",
        { className: "mkt-modal-backdrop", onClick: props.onClose },
        h(
          "div",
          { className: "mkt-modal-sheet", onClick: (e) => e.stopPropagation(), style: { maxWidth: "420px" } },
          h(
            "div",
            { className: "mkt-modal-header" },
            h("div", { className: "mkt-modal-title" }, "卸载技能确认"),
            h("button", { className: "mkt-modal-close", onClick: props.onClose }, "✕")
          ),
          h(
            "div",
            { className: "mkt-modal-body" },
            h("p", { style: { margin: "0 0 10px 0" } },
              "确认彻底卸载并清理技能「" + props.skill.name + "」吗？"
            ),
            h("p", { style: { margin: 0, fontSize: "12px", color: "var(--ch-text-secondary)" } },
              "卸载后，本地技能文件及备份将被安全清除，对话输入框将无法再调用该技能。"
            )
          ),
          h(
            "div",
            { className: "mkt-modal-footer" },
            h("button", { className: "mkt-modal-btn", onClick: props.onClose }, "取消"),
            h(
              "button",
              { className: "mkt-modal-btn danger", disabled: loading, onClick: handleConfirm },
              loading ? "卸载中..." : "彻底卸载"
            )
          )
        )
      );
    }

    // ── 中文别名编辑弹窗 (AliasEditModal) ─────────────────────────────────────────
    function AliasEditModal(props) {
      if (!props.target) return null;
      var [aliasVal, setAliasVal] = useState(props.target.currentAlias || "");
      var [saving, setSaving] = useState(false);

      var handleSave = async () => {
        setSaving(true);
        await props.onSave(props.target.id, aliasVal.trim());
        setSaving(false);
        props.onClose();
      };

      return h(
        "div",
        { className: "mkt-modal-backdrop", onClick: props.onClose },
        h(
          "div",
          { className: "mkt-modal-sheet", onClick: (e) => e.stopPropagation(), style: { maxWidth: "420px" } },
          h(
            "div",
            { className: "mkt-modal-header" },
            h("div", { className: "mkt-modal-title" }, "设置自定义中文别名"),
            h("button", { className: "mkt-modal-close", onClick: props.onClose }, "✕")
          ),
          h(
            "div",
            { className: "mkt-modal-body" },
            h("div", { style: { marginBottom: "8px", color: "var(--ch-text-secondary)" } },
              "自定义别名在集市、已安装列表以及输入框中享有最高显示优先级，版本升级时永久保留："
            ),
            h("input", {
              type: "text",
              autoFocus: true,
              style: {
                width: "100%", boxSizing: "border-box", padding: "8px 12px",
                borderRadius: "8px", border: "1px solid var(--ch-card-border)",
                background: "var(--ch-pill-bg)", color: "var(--ch-text-primary)", outline: "none"
              },
              placeholder: "例如：全栈编程高手 / 顶刊配图助手",
              value: aliasVal,
              onChange: (e) => setAliasVal(e.target.value)
            })
          ),
          h(
            "div",
            { className: "mkt-modal-footer" },
            h("button", { className: "mkt-modal-btn", onClick: props.onClose }, "取消"),
            h(
              "button",
              { className: "mkt-modal-btn confirm", disabled: saving, onClick: handleSave },
              saving ? "保存中..." : "保存别名"
            )
          )
        )
      );
    }

    // ── 插件自身版本更新弹窗 (PluginUpdateModal) ──────────────────────────────────
    function PluginUpdateModal(props) {
      if (!props.isOpen) return null;
      var [updating, setUpdating] = useState(false);
      var [resultMsg, setResultMsg] = useState(null);

      var handleDismiss = () => {
        try {
          var targetVer = props.latestVersion || "1.1.3";
          localStorage.setItem("dsh_dismissed_update_ver", targetVer);
        } catch(e) {}
        props.onClose();
      };

      var handleDoUpdate = async () => {
        setUpdating(true);
        try {
          var res = await fetch("/api/clawhub/plugin-self-update", { method: "POST" });
          var data = await res.json();
          if (data.ok) {
            try {
              localStorage.setItem("dsh_dismissed_update_ver", props.latestVersion || "1.1.3");
            } catch(e) {}
            setResultMsg("升级已完成！按快捷键 Ctrl + R 刷新即可无缝生效。");
          } else {
            setResultMsg("提示: " + (data.error || "本地已为最新版本"));
          }
        } catch (e) {
          setResultMsg("请求异常: " + e.message);
        } finally {
          setUpdating(false);
        }
      };

      return h(
        "div",
        { className: "mkt-modal-backdrop", onClick: handleDismiss },
        h(
          "div",
          { className: "mkt-modal-sheet", onClick: (e) => e.stopPropagation(), style: { maxWidth: "460px" } },
          h(
            "div",
            { className: "mkt-modal-header" },
            h(
              "div",
              { style: { display: "flex", alignItems: "center", gap: "10px" } },
              h(ColorToteIcon, { size: 26 }),
              h("div", { className: "mkt-modal-title" }, "dsh-skills-market v" + (props.latestVersion || "1.1.3") + " 就绪")
            ),
            h("button", { className: "mkt-modal-close", onClick: handleDismiss }, "✕")
          ),
          h(
            "div",
            { className: "mkt-modal-body" },
            h("div", { style: { fontSize: "13.5px", fontWeight: "600", marginBottom: "8px", color: "var(--ch-text-primary)" } },
              "本次升级核心改进亮点："
            ),
            h("ul", { style: { margin: "0 0 14px 18px", padding: 0, fontSize: "12.5px", color: "var(--ch-text-secondary)", lineHeight: "1.7" } },
              h("li", null, "连续添加多个技能绝不覆盖：多技能无缝增量追加，保留原有草稿与文字"),
              h("li", null, "更新弹窗智能防骚扰：每个新版本仅提示一次，刷新页面不再重复弹出"),
              h("li", null, "全量 217 款技能上线真实生态版本，支持 GitHub 72h 自动拉取更新"),
              h("li", null, "GitHub 技能导入全 URL 智能规范与一键精准直达原仓库")
            ),
            resultMsg && h("div", { style: { padding: "8px 12px", borderRadius: "6px", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", fontSize: "12.5px" } }, resultMsg)
          ),
          h(
            "div",
            { className: "mkt-modal-footer" },
            h("button", { className: "mkt-modal-btn", onClick: handleDismiss }, "稍后提醒"),
            h(
              "button",
              { className: "mkt-modal-btn confirm", disabled: updating, onClick: handleDoUpdate },
              updating ? "正在同步更新..." : "⚡ 立即一键升级"
            )
          )
        )
      );
    }

    // ── 防黑屏崩溃安全边界 (SafeBoundary - React ErrorBoundary) ─────────────────
    class SafeBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }
      static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
      }
      componentDidCatch(error, errorInfo) {
        console.error("[dsh-clawhub-multiskill] SafeBoundary caught UI crash:", error, errorInfo);
      }
      render() {
        if (this.state.hasError) {
          return h(
            "div",
            {
              style: {
                padding: "60px 24px",
                textAlign: "center",
                color: "#f85149",
                background: "var(--ch-bg-card, #0d1117)",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box"
              }
            },
            h("div", { style: { fontSize: "44px", marginBottom: "16px" } }, "🛡️"),
            h("h3", { style: { fontSize: "20px", color: "var(--ch-text-primary, #f0f6fc)", marginBottom: "8px", fontWeight: "600" } }, "技能集市已自动进入安全防护模式"),
            h("p", { style: { fontSize: "13px", color: "var(--ch-text-secondary, #8b949e)", maxWidth: "520px", lineHeight: "1.6", marginBottom: "24px" } },
              "插件已拦截了界面渲染异常，有效防止了界面黑屏。此情况通常是由于技能描述包含特殊符号或网络数据解析异常导致。您可以点击下方按钮一键重置恢复："
            ),
            h(
              "div",
              { style: { display: "flex", gap: "12px" } },
              h(
                "button",
                {
                  style: {
                    padding: "8px 22px",
                    background: "var(--ch-accent-blue, #007aff)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "13px"
                  },
                  onClick: () => {
                    this.setState({ hasError: false, error: null });
                  }
                },
                "🔄 一键重试恢复"
              ),
              h(
                "button",
                {
                  style: {
                    padding: "8px 22px",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "var(--ch-text-primary, #f0f6fc)",
                    border: "1px solid var(--ch-card-border, #30363d)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "13px"
                  },
                  onClick: () => {
                    try { localStorage.removeItem("dsh_skill_favorites"); } catch(e) {}
                    try { localStorage.removeItem("dsh_skill_ignored_updates"); } catch(e) {}
                    this.setState({ hasError: false, error: null });
                  }
                },
                "🧹 重置缓存"
              )
            ),
            h(
              "pre",
              {
                style: {
                  marginTop: "28px",
                  padding: "14px 18px",
                  background: "#161b22",
                  borderRadius: "8px",
                  border: "1px solid #30363d",
                  fontSize: "11px",
                  color: "#8b949e",
                  maxWidth: "620px",
                  overflowX: "auto",
                  textAlign: "left",
                  whiteSpace: "pre-wrap"
                }
              },
              String(this.state.error && this.state.error.stack ? this.state.error.stack : this.state.error)
            )
          );
        }
        return this.props.children;
      }
    }

    // ── 防御性字符串转换辅助函数 ────────────────────────────────────────────────
    var FAMOUS_SKILLS_MAP = {
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
      }
    };

    function synthesizeSkillDisplayName(id, currentName, desc) {
      if (FAMOUS_SKILLS_MAP[id] && FAMOUS_SKILLS_MAP[id].name) {
        return FAMOUS_SKILLS_MAP[id].name;
      }
      var name = currentName || id || "";
      if (/[\u4e00-\u9fa5]/.test(name)) {
        return name;
      }
      if (desc && /[\u4e00-\u9fa5]/.test(desc)) {
        var m = /([\u4e00-\u9fa5]{4,14})/.exec(desc);
        if (m) {
          return m[1] + " (" + id + ")";
        }
      }
      var cleanId = id.toLowerCase();
      var trans = "";
      if (cleanId.includes("humanizer")) trans = "AI机感消除与纯正润色";
      else if (cleanId.includes("defensive")) trans = "反防御性表达与论点强化";
      else if (cleanId.includes("writer") || cleanId.includes("writing")) trans = "智能写作与行文润色";
      else if (cleanId.includes("review") || cleanId.includes("audit")) trans = "代码审计与安全自检";
      else if (cleanId.includes("figure") || cleanId.includes("chart")) trans = "专业图表绘制与排版";
      else if (cleanId.includes("patent")) trans = "专利交底书标准化撰写";
      else if (cleanId.includes("translate") || cleanId.includes("trans")) trans = "精准多语言翻译";
      else if (cleanId.includes("agent") || cleanId.includes("orchestrator")) trans = "Agent协同调度中枢";
      else if (cleanId.includes("search") || cleanId.includes("find")) trans = "智能信息搜索检索";
      else if (cleanId.includes("clean") || cleanId.includes("slop")) trans = "冗余清洗与去模板化";
      if (trans) return trans + " (" + id + ")";
      return name;
    }

    function safeStr(val) {
      if (val === null || val === undefined) return "";
      return typeof val === "string" ? val : String(val);
    }

    // ── 技能集市主工作区面板入口 (包装 SafeBoundary 防崩溃) ───────────────────────
    function DualSourceMarketView(props) {
      return h(SafeBoundary, null, h(DualSourceMarketViewInner, props));
    }

    function DualSourceMarketViewInner(props) {
      // 5 大主 Tab：发现 (214) | 🌟 破万星 (33) | 已安装 (X) | 待更新 (Y) | 我的收藏 ★ (Z)
      var [activeTab, setActiveTab] = useState("discover"); // discover | mega | installed | updates | favorites
      var [installedSubFilter, setInstalledSubFilter] = useState("all"); // all | active | disabled | updates
      var [selectedCategory, setSelectedCategory] = useState("全部");
      var [searchKw, setSearchKw] = useState("");
      var [installedSkills, setInstalledSkills] = useState({});
      var [isLoadingInstalled, setIsLoadingInstalled] = useState(true);
      var [updatesList, setUpdatesList] = useState([]);
      var [selectedForUpdate, setSelectedForUpdate] = useState([]);
      var [upgradingIds, setUpgradingIds] = useState([]);
      var [checkingUpdates, setCheckingUpdates] = useState(false);
      var [statusNotice, setStatusNotice] = useState(null);
      var [loadingSkillId, setLoadingSkillId] = useState(null);
      var [cardErrors, setCardErrors] = useState({});
      var [previewSkill, setPreviewSkill] = useState(null);
      var [showImportModal, setShowImportModal] = useState(false);
      var [deleteTargetSkill, setDeleteTargetSkill] = useState(null);
      var [aliasTargetSkill, setAliasTargetSkill] = useState(null);
      var [showPluginUpdateModal, setShowPluginUpdateModal] = useState(false);
      var [pluginUpdateInfo, setPluginUpdateInfo] = useState(null);
      var [openMenuId, setOpenMenuId] = useState(null);

      // 本地收藏状态与屏蔽更新状态 (永久持久化在 localStorage)
      var [favorites, setFavorites] = useState(() => {
        try {
          var saved = localStorage.getItem("dsh_skill_favorites");
          return saved ? JSON.parse(saved) : [];
        } catch (e) {
          return [];
        }
      });

      var [ignoredUpdates, setIgnoredUpdates] = useState(() => {
        try {
          var saved = localStorage.getItem("dsh_skill_ignored_updates");
          return saved ? JSON.parse(saved) : [];
        } catch (e) {
          return [];
        }
      });

      // 全局点击自动关闭卡片下拉菜单
      useEffect(() => {
        var handleWindowClick = () => setOpenMenuId(null);
        window.addEventListener("click", handleWindowClick);
        return () => window.removeEventListener("click", handleWindowClick);
      }, []);

      var toggleFavorite = (id) => {
        setFavorites((prev) => {
          var next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
          try {
            localStorage.setItem("dsh_skill_favorites", JSON.stringify(next));
          } catch (e) {}
          return next;
        });
      };

      var toggleIgnoreUpdate = (id) => {
        setIgnoredUpdates((prev) => {
          var isIgnored = prev.includes(id);
          var next = isIgnored ? prev.filter((x) => x !== id) : [...prev, id];
          try {
            localStorage.setItem("dsh_skill_ignored_updates", JSON.stringify(next));
          } catch (e) {}
          setStatusNotice(isIgnored ? "已恢复该技能检测更新" : "已屏蔽该技能更新提示");
          setTimeout(() => setStatusNotice(null), 2500);
          return next;
        });
      };

      var scrollRef = useRef(null);

      // 分类清单 (采用极简短胶囊标签)
      var categories = [
        "全部",
        "🌟 热门标杆",
        "💻 编程开发",
        "🔬 科研学术",
        "🎨 界面设计",
        "🏢 职场办公",
        "📊 数据分析",
        "📑 产品需求",
        "📱 新媒体运营",
        "🌍 英语考培"
      ];

      // 1. 同步加载本地已安装技能列表
      var fetchInstalled = useCallback(async () => {
        setIsLoadingInstalled(true);
        try {
          var res = await fetch("/api/clawhub/installed");
          var json = await res.json();
          if (json.ok && Array.isArray(json.skills)) {
            var map = {};
            for (var sk of json.skills) {
              if (sk && sk.id) map[sk.id] = sk;
            }
            setInstalledSkills(map);
          }
        } catch (e) {
          console.warn("[dsh-clawhub-multiskill] fetchInstalled failed:", e);
        } finally {
          setIsLoadingInstalled(false);
        }
      }, []);

      // 2. 检查更新
      var fetchUpdates = useCallback(async () => {
        setCheckingUpdates(true);
        try {
          var res = await fetch("/api/clawhub/check-updates");
          var json = await res.json();
          if (json.ok && Array.isArray(json.updates)) {
            setUpdatesList(json.updates);
          }
          try {
            var pRes = await fetch("/api/clawhub/plugin-version");
            var pJson = await pRes.json();
            if (pJson.ok) {
              setPluginUpdateInfo(pJson);
              if (pJson.hasUpdate && pJson.latestVersion) {
                var dismissedVer = localStorage.getItem("dsh_dismissed_update_ver");
                if (dismissedVer !== pJson.latestVersion) {
                  localStorage.setItem("dsh_dismissed_update_ver", pJson.latestVersion);
                  setShowPluginUpdateModal(true);
                }
              }
            }
          } catch (pe) {}
        } catch (e) {
          console.warn("[dsh-clawhub-multiskill] fetchUpdates failed:", e);
        } finally {
          setCheckingUpdates(false);
        }
      }, []);

      useEffect(() => {
        fetchInstalled();
        fetchUpdates();
      }, [fetchInstalled, fetchUpdates]);

      // 动态合成全量技能元数据表 (静态预置 215 技能 + 磁盘/导入的所有自定义技能)
      var allCatalog = useMemo(() => {
        var catalogMap = new Map();
        for (var s of SKILLS_CATALOG) {
          if (s && s.id) {
            catalogMap.set(s.id, { ...s });
          }
        }
        for (var key in installedSkills) {
          var inst = installedSkills[key];
          if (!inst || !inst.id) continue;
          if (catalogMap.has(inst.id)) {
            var existing = catalogMap.get(inst.id);
            if (inst.alias) existing.alias = inst.alias;
            if (inst.version) existing.version = inst.version;
            if (inst.description && !existing.summary) {
              existing.summary = inst.description.replace(/^["'\s]+|["'\s]+$/g, "");
            }
          } else {
            // 为外部导入技能动态生成 100% 对齐标准的集市卡片对象
            var desc = safeStr(inst.description || inst.summary || "");
            var lowDesc = desc.toLowerCase();
            var inferredCat = "🌟 热门标杆";
            if (lowDesc.includes("write") || lowDesc.includes("writing") || lowDesc.includes("写作") || lowDesc.includes("公文") || lowDesc.includes("文本") || lowDesc.includes("防卫")) {
              inferredCat = "🏢 职场办公";
            } else if (lowDesc.includes("code") || lowDesc.includes("git") || lowDesc.includes("架构") || lowDesc.includes("开发") || lowDesc.includes("python") || lowDesc.includes("backend")) {
              inferredCat = "💻 编程开发";
            } else if (lowDesc.includes("figure") || lowDesc.includes("paper") || lowDesc.includes("学术") || lowDesc.includes("科研") || lowDesc.includes("sci") || lowDesc.includes("nature")) {
              inferredCat = "🔬 科研学术";
            } else if (lowDesc.includes("design") || lowDesc.includes("ui") || lowDesc.includes("ux") || lowDesc.includes("界面") || lowDesc.includes("设计")) {
              inferredCat = "🎨 界面设计";
            } else if (lowDesc.includes("data") || lowDesc.includes("sql") || lowDesc.includes("分析") || lowDesc.includes("统计")) {
              inferredCat = "📊 数据分析";
            } else if (lowDesc.includes("english") || lowDesc.includes("ielts") || lowDesc.includes("英语") || lowDesc.includes("雅思")) {
              inferredCat = "🌍 英语考培";
            }

            var cleanSummary = desc.replace(/^["'\s]+|["'\s]+$/g, "");
            if (!cleanSummary) cleanSummary = "通过 GitHub / 本地导入的自定义技能组件，即开即用";
            if (cleanSummary.length > 130) cleanSummary = cleanSummary.slice(0, 127) + "...";

            var defaultStars = "1.2k";
            if (inst.stars) defaultStars = String(inst.stars);

            var repoPath = inst.repo || (inst.id.includes("/") ? inst.id : "github/" + inst.id);

            var famous = FAMOUS_SKILLS_MAP[inst.id] || {};
            var cleanName = inst.alias || famous.name || synthesizeSkillDisplayName(inst.id, inst.name, desc);
            var cleanRepo = inst.repo || famous.repo || (inst.id.includes("/") ? inst.id : (inst.id === "humanizer-zh" ? "op7418/humanizer-zh" : (inst.id === "humanizer" ? "blader/humanizer" : inst.id)));
            var cleanUrl = inst.url || famous.url || (cleanRepo ? ("https://github.com/" + cleanRepo) : "");
            var cleanStars = inst.stars || famous.stars || "1.2k";
            var cleanVer = inst.version || famous.version || "1.0.0";
            var cleanCat = famous.category || inferredCat;
            var finalSummary = famous.summary || cleanSummary;

            catalogMap.set(inst.id, {
              id: inst.id,
              name: cleanName,
              alias: inst.alias || "",
              slash: "/" + inst.id,
              summary: finalSummary,
              repo: cleanRepo,
              url: cleanUrl,
              stars: cleanStars,
              category: cleanCat,
              version: cleanVer,
              color: "#4f46e5",
              custom: true
            });
          }
        }
        return Array.from(catalogMap.values());
      }, [installedSkills]);

      var totalSkillsCount = allCatalog.length;
      var megaSkillsCount = useMemo(() => allCatalog.filter((s) => safeStr(s.category).includes("热门") || safeStr(s.category).includes("破万星")).length, [allCatalog]);

      // 映射更新字典
      var updatesMap = useMemo(() => {
        var m = {};
        for (var u of updatesList) {
          m[u.id] = u;
        }
        return m;
      }, [updatesList]);

      // 有效待更新计数 (剔除已屏蔽的技能)
      var activeUpdatesCount = useMemo(() => {
        return updatesList.filter((u) => !ignoredUpdates.includes(u.id)).length;
      }, [updatesList, ignoredUpdates]);

      // 统计数字
      var installedList = Object.values(installedSkills);
      var installedCount = installedList.length;
      var activeCount = installedList.filter((s) => !s.disabled).length;
      var pausedCount = installedList.filter((s) => s.disabled).length;

      // 3. 安装技能
      var handleInstall = async (skill) => {
        setLoadingSkillId(skill.id);
        setCardErrors((prev) => { var n = { ...prev }; delete n[skill.id]; return n; });
        try {
          var res = await fetch("/api/clawhub/install", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: skill.id,
              name: skill.name,
              description: skill.summary || skill.description || "",
              content: skill.promptTemplate || "",
              repo: skill.repo || "",
              skill: skill
            })
          });
          var data = await res.json();
          if (data.ok) {
            setStatusNotice("技能「" + skill.name + "」已成功安装！");
            setTimeout(() => setStatusNotice(null), 3000);
            await fetchInstalled();
          } else {
            setCardErrors((prev) => ({ ...prev, [skill.id]: data.error || "安装失败" }));
          }
        } catch (e) {
          setCardErrors((prev) => ({ ...prev, [skill.id]: "网络请求异常: " + (e.message || String(e)) }));
        } finally {
          setLoadingSkillId(null);
        }
      };

      // 4. 启停技能 (热插拔)
      var handleToggleSkill = async (skillId, currentDisabled) => {
        try {
          var nextDisabled = !currentDisabled;
          var res = await fetch("/api/clawhub/toggle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: skillId, disabled: nextDisabled })
          });
          var data = await res.json();
          if (data.ok) {
            await fetchInstalled();
          }
        } catch (e) {}
      };

      // 5. 单个升级
      var handleSingleUpgrade = async (skill) => {
        setUpgradingIds((prev) => [...prev, skill.id]);
        try {
          var res = await fetch("/api/clawhub/upgrade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: skill.id })
          });
          var data = await res.json();
          if (data.ok) {
            setStatusNotice("技能「" + skill.name + "」已平滑升级至最新版本！");
            setTimeout(() => setStatusNotice(null), 3000);
            await fetchInstalled();
            await fetchUpdates();
          } else {
            setCardErrors((prev) => ({ ...prev, [skill.id]: data.error || "升级失败" }));
          }
        } catch (e) {
          setCardErrors((prev) => ({ ...prev, [skill.id]: "网络请求异常: " + (e.message || String(e)) }));
        } finally {
          setUpgradingIds((prev) => prev.filter((x) => x !== skill.id));
        }
      };

      // 6. 回退旧版 (.bak)
      var handleRollback = async (skillId) => {
        try {
          var res = await fetch("/api/clawhub/rollback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: skillId })
          });
          var data = await res.json();
          if (data.ok) {
            setStatusNotice("已成功恢复至上一个历史备份版本 (.bak)！");
            setTimeout(() => setStatusNotice(null), 3000);
            await fetchInstalled();
            await fetchUpdates();
          } else {
            alert(data.error || "回退失败");
          }
        } catch (e) {
          alert("回退请求失败: " + (e.message || String(e)));
        }
      };

      // 7. 保存中文别名
      var handleSaveAlias = async (skillId, alias) => {
        try {
          var res = await fetch("/api/clawhub/alias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: skillId, alias: alias })
          });
          var data = await res.json();
          if (data.ok) {
            setStatusNotice(alias ? "已将别名固化为「" + alias + "」" : "已清除自定义别名");
            setTimeout(() => setStatusNotice(null), 2500);
            await fetchInstalled();
          }
        } catch (e) {}
      };

      // 8. 彻底卸载
      var handleDeleteConfirm = async (skillId) => {
        try {
          var res = await fetch("/api/clawhub/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: skillId })
          });
          var data = await res.json();
          if (data.ok) {
            setStatusNotice("技能已彻底移除。");
            setTimeout(() => setStatusNotice(null), 2500);
            setDeleteTargetSkill(null);
            await fetchInstalled();
            await fetchUpdates();
          } else {
            alert(data.error || "卸载失败");
          }
        } catch (e) {
          alert("卸载请求失败: " + (e.message || String(e)));
        }
      };

      // 核心过滤逻辑
      var displaySkills = useMemo(() => {
        var list = [];
        if (activeTab === "discover") {
          list = allCatalog;
          if (selectedCategory !== "全部") {
            var catKey = selectedCategory.replace(/^[^\s]+\s+/, "");
            list = list.filter((s) => safeStr(s.category).includes(catKey));
          }
        } else if (activeTab === "mega") {
          list = allCatalog.filter((s) => safeStr(s.category).includes("热门") || safeStr(s.category).includes("破万星"));
        } else if (activeTab === "installed") {
          list = allCatalog.filter((s) => Boolean(installedSkills[s.id]));
          if (installedSubFilter === "active") {
            list = list.filter((s) => !installedSkills[s.id] || !installedSkills[s.id].disabled);
          } else if (installedSubFilter === "disabled") {
            list = list.filter((s) => installedSkills[s.id] && installedSkills[s.id].disabled);
          } else if (installedSubFilter === "updates") {
            list = list.filter((s) => Boolean(updatesMap[s.id]) && !ignoredUpdates.includes(s.id));
          }
        } else if (activeTab === "updates") {
          list = allCatalog.filter((s) => Boolean(updatesMap[s.id]) && !ignoredUpdates.includes(s.id));
        } else if (activeTab === "favorites") {
          list = allCatalog.filter((s) => favorites.includes(s.id));
        }

        if (searchKw.trim()) {
          var q = safeStr(searchKw).trim().toLowerCase();
          list = list.filter((s) => {
            if (!s) return false;
            var inst = installedSkills[s.id];
            var alias = safeStr(inst && inst.alias).toLowerCase();
            return (
              safeStr(s.name).toLowerCase().includes(q) ||
              safeStr(s.slash).toLowerCase().includes(q) ||
              safeStr(s.summary).toLowerCase().includes(q) ||
              safeStr(s.repo).toLowerCase().includes(q) ||
              alias.includes(q)
            );
          });
        }
        return list;
      }, [allCatalog, activeTab, selectedCategory, installedSubFilter, installedSkills, updatesMap, ignoredUpdates, favorites, searchKw]);

      return h(
        "div",
        { className: "mkt-panel" },
        // 1. 顶部 Header (微笑购物袋 Logo + 技能集市 + 导入/社区)
        h(
          "div",
          { className: "mkt-header" },
          h(
            "div",
            { className: "mkt-header-top" },
            h(
              "div",
              { className: "mkt-title-box" },
              h(ColorToteIcon, { size: 30 }),
              h(
                "div",
                null,
                h(
                  "div",
                  { className: "mkt-title-text" },
                  "技能集市",
                  h(
                    "span",
                    {
                      className: "mkt-version-badge",
                      onClick: () => setShowPluginUpdateModal(true),
                      title: "点击查看插件版本与更新"
                    },
                    "v1.1.3"
                  )
                ),
                h("div", { className: "mkt-subtitle" }, "AI Agent 精选实战技能库")
              )
            ),
            h(
              "div",
              { className: "mkt-header-actions" },
              h(
                "button",
                { className: "mkt-action-btn primary", onClick: () => setShowImportModal(true) },
                "+ 导入技能"
              ),
              h(
                "button",
                {
                  className: "mkt-action-btn",
                  onClick: () => window.open("https://clawhub.com", "_blank"),
                  title: "访问 ClawHub 官方全球技能生态与镜像"
                },
                "🌐 ClawHub 社区"
              )
            )
          )
        ),

        // 2. iOS Segmented Control 5 大核心功能分段栏
        h(
          "div",
          { className: "mkt-tabs-bar" },
          h(
            "div",
            { className: "mkt-segmented-nav" },
            // ① 发现
            h(
              "button",
              {
                className: "mkt-segmented-tab " + (activeTab === "discover" ? "active" : ""),
                onClick: () => { setActiveTab("discover"); setSearchKw(""); }
              },
              "发现",
              h("span", { className: "mkt-segmented-badge" }, totalSkillsCount)
            ),
            // ② 🌟 破万星
            h(
              "button",
              {
                className: "mkt-segmented-tab " + (activeTab === "mega" ? "active" : ""),
                onClick: () => { setActiveTab("mega"); setSearchKw(""); }
              },
              "🌟 破万星",
              h("span", { className: "mkt-segmented-badge" }, megaSkillsCount)
            ),
            // ③ 已安装
            h(
              "button",
              {
                className: "mkt-segmented-tab " + (activeTab === "installed" ? "active" : ""),
                onClick: () => { setActiveTab("installed"); setSearchKw(""); }
              },
              "已安装",
              installedCount > 0 && h("span", { className: "mkt-segmented-badge" }, installedCount)
            ),
            // ④ 待更新
            h(
              "button",
              {
                className: "mkt-segmented-tab " + (activeTab === "updates" ? "active" : ""),
                onClick: () => { setActiveTab("updates"); setSearchKw(""); }
              },
              "待更新",
              activeUpdatesCount > 0 &&
                h("span", { className: "mkt-segmented-badge mkt-badge-amber" }, activeUpdatesCount)
            ),
            // ⑤ 我的收藏 ★
            h(
              "button",
              {
                className: "mkt-segmented-tab " + (activeTab === "favorites" ? "active" : ""),
                onClick: () => { setActiveTab("favorites"); setSearchKw(""); }
              },
              "我的收藏 ★",
              favorites.length > 0 &&
                h("span", { className: "mkt-segmented-badge" }, favorites.length)
            )
          )
        ),

        // 3. 滚动容器
        h(
          "div",
          { className: "mkt-scroll-container", ref: scrollRef },

          // (A) 发现专栏：搜索框 + 分类胶囊栏
          activeTab === "discover" &&
            h(
              "div",
              { className: "mkt-filter-section" },
              h(
                "div",
                { className: "mkt-search-wrapper" },
                h("span", { className: "mkt-search-icon" }, "🔍"),
                h("input", {
                  type: "text",
                  className: "mkt-search-input",
                  placeholder: "搜索技能名称、用途、分类或指令...",
                  value: searchKw,
                  onChange: (e) => setSearchKw(e.target.value)
                }),
                searchKw &&
                  h("button", { className: "mkt-search-clear", onClick: () => setSearchKw("") }, "✕")
              ),
              h(
                "div",
                { className: "mkt-chips-row" },
                categories.map((cat) => {
                  var count =
                    cat === "全部"
                      ? totalSkillsCount
                      : allCatalog.filter((s) => safeStr(s.category).includes(cat.replace(/^[^\s]+\s+/, ""))).length;
                  return h(
                    "div",
                    {
                      key: cat,
                      className: "mkt-chip " + (selectedCategory === cat ? "active" : ""),
                      onClick: () => setSelectedCategory(cat)
                    },
                    cat + " (" + count + ")"
                  );
                })
              )
            ),

          // (B) 已安装子筛选胶囊条
          activeTab === "installed" &&
            h(
              "div",
              { className: "mkt-installed-subbar" },
              h(
                "div",
                { className: "mkt-subtabs-group" },
                h(
                  "div",
                  {
                    className: "mkt-subtab-pill " + (installedSubFilter === "all" ? "active" : ""),
                    onClick: () => setInstalledSubFilter("all")
                  },
                  "全部已装",
                  h("span", { className: "mkt-subtab-badge" }, installedCount)
                ),
                h(
                  "div",
                  {
                    className: "mkt-subtab-pill " + (installedSubFilter === "active" ? "active" : ""),
                    onClick: () => setInstalledSubFilter("active")
                  },
                  "● 运行中",
                  h("span", { className: "mkt-subtab-badge" }, activeCount)
                ),
                h(
                  "div",
                  {
                    className: "mkt-subtab-pill " + (installedSubFilter === "disabled" ? "active" : ""),
                    onClick: () => setInstalledSubFilter("disabled")
                  },
                  "○ 已停用",
                  h("span", { className: "mkt-subtab-badge" }, pausedCount)
                ),
                activeUpdatesCount > 0 &&
                  h(
                    "div",
                    {
                      className: "mkt-subtab-pill " + (installedSubFilter === "updates" ? "active" : ""),
                      onClick: () => setInstalledSubFilter("updates")
                    },
                    "待更新",
                    h("span", { className: "mkt-subtab-badge mkt-badge-amber" }, activeUpdatesCount)
                  )
              ),
              // 右侧极简检查作者更新图标按钮
              h(
                "button",
                {
                  className: "mkt-action-btn",
                  style: { padding: "5px 12px", fontSize: "12px" },
                  onClick: () => { fetchInstalled(); fetchUpdates(); },
                  disabled: checkingUpdates,
                  title: "检查作者更新"
                },
                h("svg", {
                  viewBox: "0 0 24 24",
                  width: 13,
                  height: 13,
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  style: { animation: checkingUpdates ? "chSpin 0.8s linear infinite" : "none", marginRight: 3 }
                },
                  h("path", { d: "M21.5 2v6h-6" }),
                  h("path", { d: "M2.5 22v-6h6" }),
                  h("path", { d: "M21.5 8A10 10 0 0 0 3.5 12" }),
                  h("path", { d: "M2.5 16A10 10 0 0 0 20.5 12" })
                ),
                checkingUpdates ? "检查中..." : "检查更新"
              )
            ),

          // 操作通知提示
          statusNotice &&
            h(
              "div",
              {
                style: {
                  margin: "12px 28px 0",
                  padding: "8px 16px",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  borderRadius: "8px",
                  color: "#10b981",
                  fontSize: "12.5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }
              },
              h("span", null, statusNotice),
              h("button", { style: { background: "none", border: "none", color: "#10b981", cursor: "pointer" }, onClick: () => setStatusNotice(null) }, "✕")
            ),

          // (C) 3 列经典技能卡片列表网格 (100% 对齐标杆截图 media_1792481904893_4cde65e2.png)
          h(
            "div",
            { className: "mkt-cards-grid" },
            displaySkills.length === 0
              ? h(
                  "div",
                  {
                    className: "mkt-empty-container",
                    style: { gridColumn: "1 / -1", padding: "60px 20px", textAlign: "center", color: "var(--ch-text-secondary)" }
                  },
                  isLoadingInstalled && activeTab === "installed"
                    ? h(
                        "div",
                        { style: { padding: "20px 0" } },
                        h("div", { style: { fontSize: "28px", marginBottom: "12px" } }, "⏳"),
                        h("div", { style: { fontSize: "14px", color: "var(--ch-text-primary)", fontWeight: "500" } }, "正在读取本地已安装技能列表...")
                      )
                    : searchKw.trim()
                    ? h(
                        "div",
                        { style: { padding: "20px 0" } },
                        h("div", { style: { fontSize: "28px", marginBottom: "12px" } }, "🔍"),
                        h("div", { style: { fontSize: "14px", color: "var(--ch-text-primary)", marginBottom: "8px", fontWeight: "500" } }, "未找到与 “" + searchKw.trim() + "” 相关的技能"),
                        h("button", {
                          style: { marginTop: "4px", padding: "6px 16px", background: "rgba(0, 122, 255, 0.12)", color: "var(--ch-accent-blue)", border: "1px solid rgba(0, 122, 255, 0.3)", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "600" },
                          onClick: () => setSearchKw("")
                        }, "清空搜索关键词")
                      )
                    : activeTab === "favorites"
                    ? "暂无收藏技能。点击任意卡片右上角的 ★ 即可添加收藏！"
                    : activeTab === "updates"
                    ? "🎉 恭喜！当前所有已安装技能均为最新版本，无需更新。"
                    : activeTab === "installed"
                    ? h(
                        "div",
                        { style: { padding: "20px 0" } },
                        h("div", { style: { fontSize: "28px", marginBottom: "12px" } }, "📦"),
                        h("div", { style: { fontSize: "14px", color: "var(--ch-text-primary)", marginBottom: "8px", fontWeight: "500" } }, "当前尚未安装任何技能"),
                        h("button", {
                          style: { marginTop: "4px", padding: "8px 18px", background: "var(--ch-accent-blue)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
                          onClick: () => { setActiveTab("discover"); setSearchKw(""); }
                        }, "前往「发现」一键安装")
                      )
                    : "未匹配到相关技能，可尝试输入更简短的关键词"
                )
              : displaySkills.map((sk) => {
                  if (!sk || !sk.id) return null;
                  var isInstalled = Boolean(installedSkills[sk.id]);
                  var instInfo = installedSkills[sk.id] || null;
                  var isDisabled = Boolean(instInfo && instInfo.disabled);
                  var hasBackup = Boolean(instInfo && instInfo.hasBackup);
                  var updateInfo = updatesMap[sk.id] || null;
                  var isIgnored = Boolean(ignoredUpdates && ignoredUpdates.includes(sk.id));
                  var hasUpdate = isInstalled && Boolean(updateInfo) && !isIgnored;
                  var userAlias = instInfo && instInfo.alias ? String(instInfo.alias) : "";
                  var displayName = userAlias || String(sk.name || sk.id);
                  var isUpgrading = upgradingIds.includes(sk.id);
                  var isLoading = loadingSkillId === sk.id;
                  var error = cardErrors[sk.id];
                  var currentVer = (instInfo && instInfo.version) || (updateInfo && updateInfo.currentVersion) || sk.version || "1.0.0";
                  var targetNewVer = updateInfo ? updateInfo.newVersion : "";
                  var isFav = favorites.includes(sk.id);
                  var formattedStars = sk.stars ? (String(sk.stars).startsWith("★") ? sk.stars : ("★ " + sk.stars)) : "★ 1.2k";

                  return h(
                    "div",
                    { key: sk.id, className: "mkt-card" },
                    // 卡片主区域：左侧 44x44 Squircle 图标 + 右侧信息
                    h(
                      "div",
                      { className: "mkt-card-body" },
                      h(SkillSquircleIcon, { skillId: sk.id, size: 44 }),
                      h(
                        "div",
                        { className: "mkt-card-main-col" },
                        // 第一行：标题 + 别名标 + 版本号 + 收藏★ + 三点菜单···
                        h(
                          "div",
                          { className: "mkt-card-head" },
                          h(
                            "div",
                            { className: "mkt-card-title-row" },
                            h("span", { className: "mkt-card-title", title: sk.name }, displayName),
                            userAlias && h("span", { className: "mkt-alias-tag", title: "原始名称：" + sk.name }, "别名"),
                            hasUpdate
                              ? h("span", { className: "mkt-card-update-tag" }, "v" + currentVer + " → v" + targetNewVer)
                              : h("span", { className: "mkt-card-version-tag" }, "v" + (currentVer || "1.0.0"))
                          ),
                          h(
                            "div",
                            { className: "mkt-card-head-right" },
                            h(
                              "button",
                              {
                                className: "mkt-star-btn" + (isFav ? " active" : ""),
                                onClick: (e) => { e.stopPropagation(); toggleFavorite(sk.id); },
                                title: isFav ? "取消收藏" : "加入收藏"
                              },
                              isFav ? "★" : "☆"
                            ),
                            h(
                              "button",
                              {
                                className: "mkt-menu-btn",
                                onClick: (e) => {
                                  e.stopPropagation();
                                  setOpenMenuId(openMenuId === sk.id ? null : sk.id);
                                },
                                title: "更多操作"
                              },
                              "···"
                            ),
                            // 三点下拉浮层 (低频操作全部收纳于此，卡片表面 100% 极简)
                            openMenuId === sk.id &&
                              h(
                                "div",
                                {
                                  className: "mkt-dropdown-popover",
                                  onClick: (e) => e.stopPropagation()
                                },
                                h(
                                  "button",
                                  {
                                    className: "mkt-dropdown-item",
                                    onClick: () => {
                                      setOpenMenuId(null);
                                      setAliasTargetSkill({ id: sk.id, currentAlias: userAlias || "" });
                                    }
                                  },
                                  "🏷️ 设置/修改别名"
                                ),
                                h(
                                  "button",
                                  {
                                    className: "mkt-dropdown-item",
                                    onClick: () => {
                                      setOpenMenuId(null);
                                      setPreviewSkill(sk);
                                    }
                                  },
                                  "👁️ 预览完整 Prompt"
                                ),
                                h(
                                  "button",
                                  {
                                    className: "mkt-dropdown-item",
                                    onClick: () => {
                                      setOpenMenuId(null);
                                      toggleIgnoreUpdate(sk.id);
                                    }
                                  },
                                  isIgnored ? "✅ 恢复更新检测" : "🚫 屏蔽此技能更新"
                                ),
                                isInstalled && hasBackup &&
                                  h(
                                    "button",
                                    {
                                      className: "mkt-dropdown-item",
                                      onClick: () => {
                                        setOpenMenuId(null);
                                        handleRollback(sk.id);
                                      }
                                    },
                                    "↩️ 回退至旧版本 (.bak)"
                                  ),
                                h(
                                  "button",
                                  {
                                    className: "mkt-dropdown-item",
                                    onClick: () => {
                                      setOpenMenuId(null);
                                      var targetUrl = "";
                                      if (sk.url && String(sk.url).startsWith("http")) {
                                        targetUrl = sk.url;
                                      }
                                      if (!targetUrl) {
                                        try {
                                          var savedMap = JSON.parse(localStorage.getItem("dsh_skill_urls") || "{}");
                                          if (savedMap[sk.id]) targetUrl = savedMap[sk.id];
                                        } catch(e) {}
                                      }
                                      if (!targetUrl && sk.repo) {
                                        if (String(sk.repo).startsWith("http")) targetUrl = sk.repo;
                                        else if (sk.repo.includes("/") && !sk.repo.startsWith("github/")) targetUrl = "https://github.com/" + sk.repo;
                                      }
                                      if (!targetUrl && FAMOUS_SKILLS_MAP[sk.id] && FAMOUS_SKILLS_MAP[sk.id].url) {
                                        targetUrl = FAMOUS_SKILLS_MAP[sk.id].url;
                                      }
                                      if (!targetUrl) {
                                        targetUrl = "https://github.com/search?q=" + encodeURIComponent(sk.id) + "&type=repositories";
                                      }
                                      window.open(targetUrl, "_blank");
                                    }
                                  },
                                  "↗ 在 GitHub 查看"
                                ),
                                isInstalled &&
                                  h(
                                    React.Fragment,
                                    null,
                                    h("div", { className: "mkt-dropdown-divider" }),
                                    h(
                                      "button",
                                      {
                                        className: "mkt-dropdown-item danger",
                                        onClick: () => {
                                          setOpenMenuId(null);
                                          setDeleteTargetSkill({ id: sk.id, name: displayName });
                                        }
                                      },
                                      "🗑️ 彻底卸载技能"
                                    )
                                  )
                              )
                          )
                        ),

                        // 第二行：星数 + 指令同排 (对齐黄金截图 media_1792481904893_4cde65e2.png)
                        h(
                          "div",
                          { className: "mkt-card-meta-line" },
                          h("span", { className: "mkt-card-stars" }, safeStr(formattedStars)),
                          h("span", { className: "mkt-card-slash" }, safeStr(sk.slash || "/" + sk.id))
                        ),

                        // 第三行：卡片精炼两句话中文介绍
                        h("div", { className: "mkt-card-desc", title: sk.summary }, safeStr(sk.summary)),

                        // 错误报错栏
                        error &&
                          h(
                            "div",
                            { className: "mkt-red-error-bar" },
                            h("span", { className: "mkt-red-error-text" }, "❌ " + error),
                            h("button", { className: "mkt-red-retry-btn", onClick: () => handleInstall(sk) }, "重试")
                          )
                      )
                    ),

                    // 卡片底部操作区分流 (无顶部分割线，零多余调用按钮)
                    h(
                      "div",
                      { className: "mkt-card-foot" },
                      // 左侧状态：未安装灰点，已安装 iOS 开关
                      isInstalled
                        ? h(
                            "div",
                            {
                              className: "mkt-ios-toggle",
                              onClick: () => handleToggleSkill(sk.id, isDisabled),
                              title: isDisabled ? "点击开启模型调用" : "点击暂停模型调用"
                            },
                            h(
                              "div",
                              { className: "mkt-toggle-track " + (!isDisabled ? "active" : "") },
                              h("div", { className: "mkt-toggle-thumb" })
                            ),
                            h(
                              "span",
                              { className: "mkt-toggle-label " + (!isDisabled ? "active" : "disabled") },
                              !isDisabled ? "● 运行中" : "○ 已停用"
                            )
                          )
                        : h(
                            "div",
                            { className: "mkt-foot-status-uninstalled" },
                            h("span", { className: "mkt-dot-uninstalled" }),
                            h("span", null, "未安装")
                          ),

                      // 右侧操作：未安装为蓝色「安装」，有升级为琥珀色「立即升级」，已安装且最新为优雅灰红「卸载」
                      isInstalled
                        ? (hasUpdate
                            ? h(
                                "button",
                                {
                                  className: "mkt-btn-upgrade",
                                  disabled: isUpgrading,
                                  onClick: () => handleSingleUpgrade(sk)
                                },
                                isUpgrading ? "升级中..." : "立即升级"
                              )
                            : h(
                                "button",
                                {
                                  className: "mkt-btn-uninstall",
                                  onClick: () => setDeleteTargetSkill({ id: sk.id, name: displayName }),
                                  title: "彻底卸载并清理本地技能文件"
                                },
                                "卸载"
                              ))
                        : h(
                            "button",
                            {
                              className: "mkt-btn-install" + (isLoading ? " loading" : ""),
                              disabled: isLoading,
                              onClick: () => handleInstall(sk)
                            },
                            isLoading ? "安装中..." : "安装"
                          )
                    )
                  );
                })
          )
        ),

        // 各种弹窗
        previewSkill && h(PromptPreviewModal, { skill: previewSkill, onClose: () => setPreviewSkill(null) }),
        showImportModal &&
          h(CustomImportModal, {
            isOpen: true,
            onClose: () => setShowImportModal(false),
            onSuccess: async (sk) => {
              await fetchInstalled();
              fetchUpdates();
              setActiveTab("installed");
              setSearchKw("");
              setStatusNotice("🎉 成功导入并激活技能：" + (sk.name || sk.id) + "！已自动加入「已安装」技能卡片。");
              setTimeout(() => setStatusNotice(null), 5000);
            }
          }),
        deleteTargetSkill && h(ConfirmDeleteModal, { skill: deleteTargetSkill, onClose: () => setDeleteTargetSkill(null), onConfirm: handleDeleteConfirm }),
        aliasTargetSkill && h(AliasEditModal, { target: aliasTargetSkill, onClose: () => setAliasTargetSkill(null), onSave: handleSaveAlias }),
        showPluginUpdateModal && h(PluginUpdateModal, { isOpen: true, latestVersion: pluginUpdateInfo && pluginUpdateInfo.latestVersion, onClose: () => setShowPluginUpdateModal(false) })
      );
    }



    // ── 输入框唤出面板 (ComposerSkillPopover, 100% 对齐截图 media_1792481020508_6c1516be.png) ────────
    function ComposerSkillPopover(props) {
      var [searchKw, setSearchKw] = useState("");
      var [selected, setSelected] = useState([]);
      var [installedList, setInstalledList] = useState([]);
      var [activeIdx, setActiveIdx] = useState(0);
      var [loading, setLoading] = useState(true);
      var listRef = useRef(null);
      var itemRefs = useRef([]);

      // 加载已安装技能并合并自定义别名
      useEffect(() => {
        var load = async () => {
          try {
            var res = await fetch("/api/clawhub/installed");
            var json = await res.json();
            if (json.ok && Array.isArray(json.skills)) {
              var merged = json.skills
                .filter((s) => !s.disabled)
                .map((inst) => {
                  var meta = SKILLS_CATALOG.find((x) => x.id === inst.id) || {};
                  var desc = inst.description || meta.summary || "";
                  if (desc) desc = desc.replace(/^["'\s]+|["'\s]+$/g, "");
                  return {
                    id: inst.id,
                    name: inst.alias || meta.name || inst.id,
                    slash: meta.slash || "/" + inst.id,
                    repo: meta.repo || (inst.repo || ""),
                    stars: meta.stars || (inst.stars || ""),
                    summary: desc
                  };
                });
              setInstalledList(merged);
            }
          } catch (e) {
          } finally {
            setLoading(false);
          }
        };
        load();
      }, []);

      // 实时检索
      var filtered = useMemo(() => {
        if (!searchKw.trim()) return installedList;
        var q = safeStr(searchKw).trim().toLowerCase();
        return installedList.filter(
          (item) =>
            safeStr(item.name).toLowerCase().includes(q) ||
            safeStr(item.slash).toLowerCase().includes(q) ||
            safeStr(item.id).toLowerCase().includes(q)
        );
      }, [installedList, searchKw]);

      useEffect(() => {
        setActiveIdx(0);
      }, [filtered.length]);

      var toggleSelect = (id, e) => {
        if (e) e.stopPropagation();
        setSelected((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
      };

      var executeInsert = (ids) => {
        if (!ids || ids.length === 0) return;
        var targets = installedList.filter((x) => ids.includes(x.id));
        if (targets.length === 0) return;
        var slashesToAdd = targets.map((t) => t.slash);

        var activeInput = findComposerInput(props.anchorEl);
        if (!activeInput) {
          console.warn("[dsh-skills-market] Cannot locate active composer input element");
          setSelected([]);
          props.onClose();
          return;
        }

        activeInput.focus();

        // 1. 获取当前输入框中的文字 (完美支持 Lexical contenteditable 与原生 Textarea)
        var isTextarea = activeInput.tagName.toLowerCase() === "textarea" || activeInput.tagName.toLowerCase() === "input";
        var currentText = isTextarea ? (activeInput.value || "") : (activeInput.innerText || activeInput.textContent || "");
        currentText = currentText.replace(/\r?\n$/, "");

        // 2. 智能去重：提取已有 token，仅追加尚未包含的新技能
        var existingTokens = currentText.trim().length > 0 ? currentText.trim().split(/\s+/) : [];
        var slashesToAppend = [];
        for (var s of slashesToAdd) {
          if (!existingTokens.includes(s)) {
            slashesToAppend.push(s);
          }
        }
        // 若所选技能均已在输入框中，用户再次点击则直接追加，保证指令执行不落空
        if (slashesToAppend.length === 0) {
          slashesToAppend = slashesToAdd;
        }

        var needSpace = currentText.length > 0 && !currentText.endsWith(" ") && !currentText.endsWith("\n");
        var textToInsert = (needSpace ? " " : "") + slashesToAppend.join(" ") + " ";

        // 3. 稳妥写入输入框 (通过 document.execCommand 注入原生输入流，触发所有虚拟 DOM 与状态引擎)
        if (isTextarea) {
          activeInput.selectionStart = activeInput.selectionEnd = activeInput.value.length;
          var inserted = false;
          try {
            inserted = document.execCommand("insertText", false, textToInsert);
          } catch (e) {
            inserted = false;
          }
          if (!inserted) {
            var newVal = currentText + textToInsert;
            var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
            if (setter) {
              setter.call(activeInput, newVal);
            } else {
              activeInput.value = newVal;
            }
            activeInput.dispatchEvent(new Event("input", { bubbles: true }));
            activeInput.dispatchEvent(new Event("change", { bubbles: true }));
            activeInput.selectionStart = activeInput.selectionEnd = newVal.length;
          }
        } else {
          // ContentEditable (DeepSeek Harness 原生 Lexical 编辑器)
          var sel = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(activeInput);
          range.collapse(false); // 稳固移动至最末尾，绝不覆盖已有技能与文字
          sel.removeAllRanges();
          sel.addRange(range);

          var inserted = false;
          try {
            inserted = document.execCommand("insertText", false, textToInsert);
          } catch (e) {
            inserted = false;
          }

          if (!inserted) {
            try {
              var inputEvent = new InputEvent("beforeinput", {
                bubbles: true,
                cancelable: true,
                inputType: "insertText",
                data: textToInsert
              });
              activeInput.dispatchEvent(inputEvent);
              inserted = true;
            } catch (ie) {}
          }

          if (!inserted) {
            try {
              var textNode = document.createTextNode(textToInsert);
              activeInput.appendChild(textNode);
              activeInput.dispatchEvent(new Event("input", { bubbles: true }));
              activeInput.dispatchEvent(new Event("change", { bubbles: true }));
            } catch (fe) {}
          }
        }

        try {
          var ev = new CustomEvent("dsh-skill-hub-insert", { detail: { skills: slashesToAppend, text: textToInsert } });
          window.dispatchEvent(ev);
        } catch (ee) {}

        setSelected([]);
        props.onClose();
      };

      var handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIdx((prev) => (prev + 1 < filtered.length ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIdx((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (selected.length > 0) {
            executeInsert(selected);
          } else if (filtered[activeIdx]) {
            toggleSelect(filtered[activeIdx].id);
          }
        } else if (e.key === "Escape") {
          e.preventDefault();
          setSelected([]);
          props.onClose();
        }
      };

      return h(
        "div",
        {
          className: "ch-pk-popover-portal",
          style: {
            right: (props.position && props.position.right ? props.position.right : 24) + "px",
            bottom: (props.position && props.position.bottom ? props.position.bottom : 60) + "px"
          },
          onClick: (e) => e.stopPropagation()
        },
        // 1. 标题栏
        h(
          "div",
          { className: "ch-pk-header" },
          h("div", { className: "ch-pk-title" }, "选择 Skill"),
          h("button", { className: "mkt-modal-close", onClick: props.onClose }, "✕")
        ),
        // 2. 搜索框
        h(
          "div",
          { className: "ch-pk-search-box" },
          h("input", {
            type: "text",
            className: "ch-pk-search-input",
            autoFocus: true,
            placeholder: "搜索技能 (中文/拼音/指令)...",
            value: searchKw,
            onChange: (e) => setSearchKw(e.target.value),
            onKeyDown: handleKeyDown
          })
        ),
        // 3. 技能列表 (复选框 + 丰富彩色矢量 Squircle 图标 + 别名/名称 + 指令胶囊)
        h(
          "div",
          { className: "ch-pk-list", ref: listRef },
          loading
            ? h("div", { style: { padding: "24px 0", textAlign: "center", color: "var(--ch-text-secondary)", fontSize: "12px" } }, "加载中...")
            : filtered.length === 0
            ? h("div", { style: { padding: "24px 0", textAlign: "center", color: "var(--ch-text-secondary)", fontSize: "12px" } },
                installedList.length === 0 ? "暂无运行中的技能，可在集市中启用" : "无匹配技能")
            : filtered.map((item, index) => {
                var isChecked = selected.includes(item.id);
                var isHighlighted = index === activeIdx;
                return h(
                  "div",
                  {
                    key: item.id,
                    className: "ch-pk-item" + (isChecked ? " checked" : "") + (isHighlighted ? " highlighted" : ""),
                    onClick: () => {
                      toggleSelect(item.id);
                    },
                    onMouseEnter: () => setActiveIdx(index)
                  },
                  h(
                    "div",
                    {
                      className: "ch-ios-checkbox" + (isChecked ? " checked" : ""),
                      onClick: (e) => toggleSelect(item.id, e)
                    },
                    isChecked &&
                      h(
                        "svg",
                        { viewBox: "0 0 24 24", width: 11, height: 11, fill: "none", stroke: "#ffffff", strokeWidth: 3.2, strokeLinecap: "round", strokeLinejoin: "round" },
                        h("polyline", { points: "20 6 9 17 4 12" })
                      )
                  ),
                  h(SkillSquircleIcon, { skillId: item.id, size: 28 }),
                  h(
                    "div",
                    { className: "ch-pk-content-single" },
                    h("span", { className: "ch-pk-name" }, item.name),
                    h("span", { className: "ch-pk-slash-pill" }, item.slash)
                  )
                );
              })
        ),
        // 4. 底部栏 [取消] 与 [添加到对话]
        h(
          "div",
          { className: "ch-pk-footer" },
          h(
            "button",
            {
              className: "ch-pk-btn-cancel",
              onClick: () => {
                setSelected([]);
                props.onClose();
              }
            },
            "取消"
          ),
          h(
            "button",
            {
              className: "ch-pk-btn-confirm",
              disabled: selected.length === 0,
              onClick: () => {
                if (selected.length > 0) executeInsert(selected);
              }
            },
            selected.length > 0 ? "添加到对话 (" + selected.length + ")" : "添加到对话"
          )
        )
      );
    }


    // ── 输入框触发按钮 (纯图标形式，对齐参考) ──────────────────────────────────
    function MultiSkillPickerTrigger(props) {
      if (props.inputActions) {
        window.__dsh_inputActions = props.inputActions;
      }
      var [isOpen, setIsOpen] = useState(false);
      var [pos, setPos] = useState({ right: 24, bottom: 60 });
      var btnRef = useRef(null);

      var handleToggle = (e) => {
        if (e) e.stopPropagation();
        if (props.inputActions) {
          window.__dsh_inputActions = props.inputActions;
        }
        if (!isOpen && btnRef.current) {
          var rect = btnRef.current.getBoundingClientRect();
          var bottom = Math.round(window.innerHeight - rect.top + 8);
          var right = Math.min(
            window.innerWidth - 400,
            Math.max(16, Math.round(window.innerWidth - rect.right))
          );
          setPos({ right: right, bottom: bottom });
        }
        setIsOpen((prev) => !prev);
      };

      return h(
        React.Fragment,
        null,
        h(
          "button",
          {
            ref: btnRef,
            type: "button",
            className: "ch-composer-picker-btn" + (isOpen ? " active" : ""),
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              margin: "0 2px",
              padding: "0",
              border: "none",
              outline: "none",
              borderRadius: "8px",
              background: "transparent",
              cursor: "pointer",
              color: isOpen ? "#007aff" : "var(--ch-text-secondary)"
            },
            onClick: handleToggle,
            title: "快捷选择技能 (插入 /指令 到输入框)"
          },
          h(SidebarToteIcon, { size: 16 })
        ),
        isOpen &&
          h(ComposerSkillPopover, {
            position: pos,
            anchorEl: btnRef.current,
            input: props.input,
            inputActions: props.inputActions,
            onClose: () => setIsOpen(false)
          })
      );
    }

    // ── 侧栏单色线框 Tote 图标 (16x16 原生细线，对齐 DSH 侧边栏规范) ─────────────
    function MarketSidebarIcon(props) {
      return h(
        "svg",
        {
          "data-dsh-panel-entry": PANEL_ID,
          viewBox: "0 0 24 24",
          width: 16,
          height: 16,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.7",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          style: { display: "block" }
        },
        h("path", { d: "M8.5 7.5V5a3.5 3.5 0 0 1 7 0v2.5" }),
        h("path", { d: "M4.5 7.5h15l1 11a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3l1-11z" }),
        h("path", { d: "M9 14.5c1.2 1.3 4.8 1.3 6 0" }),
        h("path", {
          d: "M19.5 2c0 1.2.8 2 2 2-1.2 0-2 .8-2 2 0-1.2-.8-2-2-2 1.2 0 2-.8 2-2z",
          fill: "currentColor",
          stroke: "none"
        })
      );
    }

    // ── 插件装配与生命周期挂载 ───────────────────────────────────────────────────
    var mounted = false;
    function mountSlots(slots, layout) {
      if (mounted || !slots || typeof slots.inject !== "function") return;
      mounted = true;

      // 1. 左侧栏入口：名称为「技能集市」，图标为 16x16 单色线框 Tote
      try {
        slots.inject("sidebar.panellist", () =>
          slots.register(
            {
              name: "sidebar.panellist",
              id: PANEL_ID,
              order: PANEL_ORDER,
              label: () => "技能集市"
            },
            MarketSidebarIcon
          )
        );

        slots.inject("main", () =>
          slots.register(
            {
              name: "main",
              key: PANEL_ID,
              inject: () => ({ layout })
            },
            DualSourceMarketView
          )
        );
      } catch (err) {
        console.warn("[dsh-clawhub-multiskill] sidebar registration error:", err);
      }

      // 2. 聊天输入框右下角：快捷技能选择器
      try {
        slots.inject("conversation.input.right", () =>
          slots.register(
            {
              name: "conversation.input.right",
              id: "clawhub-multiskill-picker",
              order: 10,
              label: "技能"
            },
            MultiSkillPickerTrigger
          )
        );
      } catch (err) {
        console.warn("[dsh-clawhub-multiskill] input button registration error:", err);
      }
    }

    function apply(ctx) {
      try {
        var slots = ctx.slots || (ctx.get && ctx.get("slots"));
        var layout = ctx.layout || (ctx.get && ctx.get("layout"));
        if (slots && typeof slots.inject === "function") {
          mountSlots(slots, layout);
        }
        if (typeof ctx.inject === "function") {
          ctx.inject(["slots", "layout"], (scope) => {
            try {
              mountSlots(scope.slots || ctx.slots, scope.layout || ctx.layout);
            } catch (e) {
              console.warn("[dsh-clawhub-multiskill] mountSlots in inject error:", e);
            }
          });
        }
      } catch (e) {
        console.warn("[dsh-clawhub-multiskill] apply error:", e);
      }
    }

    exports.name = "dsh-skills-market";
    exports.apply = apply;
    exports.inject = ["slots", "layout"];
    exports.default = {
      name: "dsh-skills-market",
      apply: apply,
      inject: ["slots", "layout"]
    };

    return module.exports;
  }
});
'''

    final_client_js = template.replace("__SKILLS_DATA__", skills_json)

    root_dir = os.path.dirname(os.path.abspath(__file__))
    destinations = [
        os.path.join(root_dir, "client.js"),
        os.path.join(root_dir, "src", "client.js"),
    ]

    # If running locally on Windows, sync to installed DSH plugin paths if present
    if os.name == "nt":
        user_home = os.path.expanduser("~")
        for plugin_name in ["dsh-skills-market", "dsh-clawhub-multiskill"]:
            plugin_dir = os.path.join(user_home, ".dsh", "plugins", plugin_name)
            if os.path.isdir(plugin_dir) and os.path.abspath(plugin_dir) != os.path.abspath(root_dir):
                destinations.extend([
                    os.path.join(plugin_dir, "client.js"),
                    os.path.join(plugin_dir, "src", "client.js"),
                ])

    for d in destinations:
        dir_name = os.path.dirname(d)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)
        with open(d, "w", encoding="utf-8") as f:
            f.write(final_client_js)
        print(f"Successfully wrote {len(final_client_js)} bytes to {d}")

if __name__ == "__main__":
    generate()
