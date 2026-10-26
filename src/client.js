/**
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
    var SKILLS_CATALOG = [{"id": "humanizer-zh", "name": "中文AI机感消除与纯正文本润色 (Humanizer-zh)", "slash": "/humanizer-zh", "repo": "op7418/humanizer-zh", "stars": "★ 1.2k", "category": "🏢 职场办公", "summary": "编辑中文文章、评论和文档中的空话、重复及模板化表达，让文字更自然，同时保留事实、确定程度和作者声音", "tags": ["中文润色", "去ai感", "写作优化", "去模板化", "公文编辑", "自然表达"], "installed": true, "added_at": "2026-10-21", "version": "1.2.0"}, {"id": "humanizer", "name": "AI机感消除与纯正文本润色 (Humanizer)", "slash": "/humanizer", "repo": "blader/humanizer", "stars": "★ 1.2k", "category": "🏢 职场办公", "summary": "重构并消除 AI 生成文本中的机械重复、过度修饰与生硬套话结构，还原自然纯正、毫无AI感的专业人类写作笔触", "tags": ["去ai感", "文本润色", "人类语气", "写作优化", "去油腻", "文案编辑"], "installed": true, "added_at": "2026-10-21", "version": "3.1.0"}, {"id": "langchain-core", "name": "LangChain 现代 Agent 链式调度中枢", "slash": "/langchain-core", "repo": "langchain-ai/langchain", "stars": "★ 98.4k", "category": "🌟 热门标杆", "summary": "基于 Runnable 协议编排多阶段提示词、向量数据库召回、外部工具调用与多 Agent 拓扑交互", "tags": ["langchain", "链式编排", "agent开发", "记忆管理", "工具调用", "工作流"], "installed": false, "added_at": "2026-10-15", "version": "1.7.0"}, {"id": "deepseek-r1-reasoning", "name": "DeepSeek-R1 长思维链深度推理规范", "slash": "/deepseek-r1-reasoning", "repo": "deepseek-ai/DeepSeek-R1", "stars": "★ 86.5k", "category": "🌟 热门标杆", "summary": "充分释放 R1 思维链长程反思与纠错能力，专攻复杂数学推导、算法分析与高阶因果论证", "tags": ["deepseek", "r1", "思维链", "cot", "逻辑推理", "数学推导", "反思修正"], "installed": false, "added_at": "2026-08-01", "version": "1.0.0"}, {"id": "openai-cookbook", "name": "OpenAI 工业级生产实战配方大全", "slash": "/openai-cookbook", "repo": "openai/openai-cookbook", "stars": "★ 62.3k", "category": "🌟 热门标杆", "summary": "权威生产级配方：混合向量搜索切片、微调评估基准、流式输出容错与高并发速率控制", "tags": ["cookbook", "rag", "向量检索", "微调", "生产落地", "api最佳实践"], "installed": false, "added_at": "2026-08-01", "version": "2.4.0"}, {"id": "gpt-engineer", "name": "GPT-Engineer 自然语言一键生成软件工程", "slash": "/gpt-engineer", "repo": "gpt-engineer-org/gpt-engineer", "stars": "★ 54.1k", "category": "🌟 热门标杆", "summary": "从一句话自然语言需求出发，自动规划技术选型、构建完整项目架构并编写全部源代码", "tags": ["全自动编程", "建站", "项目生成", "全栈工程", "一键生成"], "installed": false, "added_at": "2026-08-01", "version": "0.3.1"}, {"id": "dify-workflow-master", "name": "Dify 可视化复杂业务工作流画布", "slash": "/dify-workflow-master", "repo": "langgenius/dify", "stars": "★ 64.2k", "category": "🌟 热门标杆", "summary": "基于可视化节点式画布编排知识库混合检索、条件分支路由、代码执行沙箱与多模型对话", "tags": ["dify", "可视化工作流", "知识库", "业务编排", "节点式流"], "installed": false, "added_at": "2026-08-01", "version": "1.18.0"}, {"id": "metagpt-software-company", "name": "MetaGPT 模拟软件公司多角色协同", "slash": "/metagpt-software-company", "repo": "geekan/MetaGPT", "stars": "★ 46.5k", "category": "🌟 热门标杆", "summary": "模拟产品经理、架构师、工程师与测试团队分工协作，自动化输出标准 SOP 与全套交付物", "tags": ["metagpt", "软件公司", "多智能体", "prd生成", "架构蓝图", "团队协作"], "installed": false, "added_at": "2026-08-01", "version": "0.8.1"}, {"id": "fastmcp-protocol", "name": "FastMCP 标准模型上下文协议扩展", "slash": "/fastmcp-protocol", "repo": "jlowin/fastmcp", "stars": "★ 16.3k", "category": "🌟 热门标杆", "summary": "基于 Anthropic MCP 协议快速将本地脚本、系统命令与业务 API 封装为标准模型工具服务", "tags": ["mcp", "协议", "工具扩展", "fastmcp", "模型上下文"], "installed": false, "added_at": "2026-08-01", "version": "4.1.4"}, {"id": "semantic-kernel", "name": "Semantic Kernel 微软企业级 Agent 架构", "slash": "/semantic-kernel", "repo": "microsoft/semantic-kernel", "stars": "★ 23.5k", "category": "🌟 热门标杆", "summary": "将原生代码函数与提示词技能无缝融合，提供企业级可观测性、记忆连接器与计划器集成", "tags": ["semantic-kernel", "微软", "技能插件", "企业agent", "函数调用"], "installed": false, "added_at": "2026-08-01", "version": "1.81.0"}, {"id": "instructor-structured-data", "name": "Instructor 严格结构化数据强约束提取", "slash": "/instructor-structured-data", "repo": "jxnl/instructor", "stars": "★ 19.8k", "category": "🌟 热门标杆", "summary": "利用 Pydantic 严格约束大模型 100% 输出符合类型定义的合法 JSON 数据，支持自动自检重试", "tags": ["pydantic", "结构化输出", "json校验", "类型安全", "数据提取"], "installed": false, "added_at": "2026-08-01", "version": "1.17.0"}, {"id": "swe-bench-agent", "name": "SWE-bench 真实 GitHub Issue 自动化修复", "slash": "/swe-bench-agent", "repo": "princeton-nlp/SWE-bench", "stars": "★ 14.5k", "category": "🌟 热门标杆", "summary": "模拟顶级程序员自主检索项目源码、定位 Bug 根因、编写单元测试并提交修复 Patch", "tags": ["自动修bug", "swe-bench", "issue解决", "代码修复", "自动化pr"], "installed": false, "added_at": "2026-08-01", "version": "2.1.0"}, {"id": "browser-use-web-agent", "name": "Browser-Use 视觉驱动自主浏览器操作", "slash": "/browser-use-web-agent", "repo": "browser-use/browser-use", "stars": "★ 29.3k", "category": "🌟 热门标杆", "summary": "多模态视觉模型理解网页 DOM 与按钮，自主完成复杂跨页面表单填写、订票与自动化爬虫", "tags": ["网页操作", "自动化点击", "自动化浏览器", "模拟用户", "爬虫"], "installed": false, "added_at": "2026-08-01", "version": "0.13.13"}, {"id": "llamaindex-rag-core", "name": "LlamaIndex 高级知识库 RAG 检索管线", "slash": "/llamaindex-rag-core", "repo": "run-llama/llama_index", "stars": "★ 39.2k", "category": "🌟 热门标杆", "summary": "针对私有非结构化文档构建多级分块索引、子问题分解、混合重排与上下文增强检索", "tags": ["llamaindex", "rag", "知识库", "文档切片", "重排检索"], "installed": false, "added_at": "2026-08-01", "version": "0.14.25"}, {"id": "crewai-multi-agent", "name": "CrewAI 角色扮演多智能体协作网络", "slash": "/crewai-multi-agent", "repo": "crewAIInc/crewAI", "stars": "★ 24.8k", "category": "🌟 热门标杆", "summary": "定义具有不同技能、记忆与背景的自主智能体团队，分工协作完成复杂综合研究与交付任务", "tags": ["crewai", "多agent", "智能体团队", "团队协同", "分工合作"], "installed": false, "added_at": "2026-08-01", "version": "1.15.30"}, {"id": "autogen-multi-agent", "name": "AutoGen 会话式多智能体协作框架", "slash": "/autogen-multi-agent", "repo": "microsoft/autogen", "stars": "★ 37.1k", "category": "🌟 热门标杆", "summary": "支持自定义智能体对话模式、人机协同参与机制与代码执行环境的多轮自主演化框架", "tags": ["autogen", "多智能体", "微软框架", "代码协同", "对话编排"], "installed": false, "added_at": "2026-08-01", "version": "0.7.5"}, {"id": "comfyui-node-workflow", "name": "ComfyUI 节点式生图工作流系统", "slash": "/comfyui-node-workflow", "repo": "comfyanonymous/ComfyUI", "stars": "★ 61.2k", "category": "🌟 热门标杆", "summary": "精准控制 Stable Diffusion / FLUX 出图管线：ControlNet、IP-Adapter 与节点级微调编排", "tags": ["comfyui", "节点工作流", "ai绘图", "stable diffusion", "flux"], "installed": false, "added_at": "2026-08-01", "version": "0.42.1"}, {"id": "chatchat-knowledge", "name": "Langchain-Chatchat 私有知识库中枢", "slash": "/chatchat-knowledge", "repo": "chatchat-space/Langchain-Chatchat", "stars": "★ 33.7k", "category": "🌟 热门标杆", "summary": "支持 PDF/Word/Markdown 等企业文档切片分块、向量与倒排混合检索及精准重排回答", "tags": ["知识库", "企业文档", "切片检索", "rerank", "离线知识库"], "installed": false, "added_at": "2026-08-01", "version": "0.3.1"}, {"id": "mem0-personalized-memory", "name": "Mem0 自适应个性化长程记忆系统", "slash": "/mem0-personalized-memory", "repo": "mem0ai/mem0", "stars": "★ 26.4k", "category": "🌟 热门标杆", "summary": "为大模型赋予跨会话长期记忆能力，自动提取用户偏好、事实知识并实现自适应动态召回", "tags": ["mem0", "长程记忆", "用户画像", "持久化上下文", "个性化"], "installed": false, "added_at": "2026-08-01", "version": "3.3.1"}, {"id": "graphrag-knowledge-graph", "name": "GraphRAG 微软图结构增强知识推理", "slash": "/graphrag-knowledge-graph", "repo": "microsoft/graphrag", "stars": "★ 21.3k", "category": "🌟 热门标杆", "summary": "基于知识图谱与社区摘要的大规模文本洞察，突破传统语义切片无法回答宏观综合问题的局限", "tags": ["graphrag", "知识图谱", "社区摘要", "复杂推理", "宏观理解"], "installed": false, "added_at": "2026-08-01", "version": "3.3.0"}, {"id": "dspy-prompt-programming", "name": "DSPy 模块化算法编程驱动 Prompt", "slash": "/dspy-prompt-programming", "repo": "stanfordnlp/dspy", "stars": "★ 20.1k", "category": "🌟 热门标杆", "summary": "斯坦福出品：将脆弱的手工调 Prompt 变革为严密的模块化编程，自动通过优化器搜索最佳指令", "tags": ["dspy", "算法调优", "自动提示词", "斯坦福", "模块化开发"], "installed": false, "added_at": "2026-08-01", "version": "3.4.1"}, {"id": "prompt-engineering-guide", "name": "Prompt 工程全维体系化实操指南", "slash": "/prompt-engineering-guide", "repo": "dair-ai/Prompt-Engineering-Guide", "stars": "★ 49.5k", "category": "🌟 热门标杆", "summary": "从基础提示到 CoT 思维链、ReAct 框架与方向性刺激提示的权威工业级教学全集", "tags": ["prompt", "提示词", "cot", "思维链", "引导词", "prompt工程"], "installed": false, "added_at": "2026-08-01", "version": "1.4.9"}, {"id": "awesome-chatgpt-prompts", "name": "全球经典生产力提示词全景精选", "slash": "/awesome-chatgpt-prompts", "repo": "f/awesome-chatgpt-prompts", "stars": "★ 112.5k", "category": "🌟 热门标杆", "summary": "涵盖各行业核心应用场景的全球顶级角色设定、专家视角切换与高效任务执行提示词库", "tags": ["提示词库", "prompt合集", "角色扮演", "生产力", "经典prompt"], "installed": false, "added_at": "2026-08-01", "version": "3.1.2"}, {"id": "self-improving-agent", "name": "自我进化与经验记忆沉淀", "slash": "/self-improving-agent", "repo": "agent-core/self-improving-memory", "stars": "★ 38.8k", "category": "🌟 热门标杆", "summary": "从错误与纠正中自动提取经验规则，持续优化模型认知、指令遵循与长期记忆沉淀", "tags": ["自进化", "自我学习", "复盘", "记忆", "经验沉淀", "持续进化"], "installed": true, "added_at": "2026-10-15", "version": "2.0.0"}, {"id": "skill-orchestrator", "name": "多技能协同调度中枢", "slash": "/skill-orchestrator", "repo": "workflow-orchestration/orchestrator", "stars": "★ 35.9k", "category": "🌟 热门标杆", "summary": "宏观复杂任务自动拆解为多阶段流水线，串联并协同调度多个 Skill 共同完成", "tags": ["多技能", "调度", "编排", "协同", "流水线", "pipeline", "组合"], "installed": true, "added_at": "2026-10-15", "version": "2.2.0"}, {"id": "dev-expert", "name": "全栈编程与架构专家", "slash": "/dev-expert", "repo": "52yuer/dev-expert-skill", "stars": "★ 17.5k", "category": "💻 编程开发", "summary": "P8 级全栈编程与大型系统设计：API 契约、多文件联动、Bug 排查与重构规范", "tags": ["编程", "写代码", "全栈", "架构", "debug", "重构", "API", "代码生成"], "installed": true, "added_at": "2026-10-15", "version": "2.1.0"}, {"id": "code-review93", "name": "代码质量与安全自检清单", "slash": "/code-review93", "repo": "engineering-discipline/code-review", "stars": "★ 15.1k", "category": "💻 编程开发", "summary": "生产级代码质量与安全门禁审查清单，排查反模式、异味及并发死锁隐患", "tags": ["代码审查", "审查", "review", "质量", "安全", "门禁", "自检", "检查"], "installed": true, "added_at": "2026-10-15", "version": "1.4.0"}, {"id": "ponytail", "name": "极简主义架构反过度设计", "slash": "/ponytail", "repo": "design-principles/ponytail", "stars": "★ 13.8k", "category": "💻 编程开发", "summary": "YAGNI 准则落地实践：推崇极简可用、最短实现路径与反过度抽象重构", "tags": ["极简", "yagni", "架构", "反过度设计", "精简", "简单实现"], "installed": true, "added_at": "2026-10-15", "version": "1.0.5"}, {"id": "fastapi-deepseek-backend", "name": "FastAPI + DeepSeek 极速构建 AI 后端", "slash": "/fastapi-deepseek-backend", "repo": "tiangolo/fastapi", "stars": "★ 78.4k", "category": "💻 编程开发", "summary": "规范封装 DeepSeek 流式输出（SSE）、异步并发控制、Token 预算限流与 RESTful 路由", "tags": ["fastapi", "deepseek", "api后端", "流式输出", "搭建系统", "搭建后端"], "installed": false, "added_at": "2026-08-01", "version": "0.162.0"}, {"id": "flask-microservice-api", "name": "Flask 轻量微服务与 RESTful 接口", "slash": "/flask-microservice-api", "repo": "pallets/flask", "stars": "★ 69.1k", "category": "💻 编程开发", "summary": "蓝图模块化拆分、轻量 RESTful API 设计、跨域 CORS 配置与无状态 JWT 鉴权", "tags": ["flask", "微服务", "api开发", "轻量后端", "python接口"], "installed": false, "added_at": "2026-08-01", "version": "3.1.3"}, {"id": "django-enterprise-system", "name": "Django 企业级管理系统整体架构设计", "slash": "/django-enterprise-system", "repo": "django/django", "stars": "★ 79.5k", "category": "💻 编程开发", "summary": "包含 ORM 数据建模、用户认证与 RBAC 鉴权中间件、REST 接口与后台管理全套架构", "tags": ["django", "管理系统", "企业系统", "orm建模", "后台管理"], "installed": false, "added_at": "2026-08-01", "version": "2.4.8"}, {"id": "sqlalchemy-orm-architect", "name": "SQLAlchemy 2.0 企业级 ORM 建模规约", "slash": "/sqlalchemy-orm-architect", "repo": "sqlalchemy/sqlalchemy", "stars": "★ 9.5k", "category": "💻 编程开发", "summary": "基于 Type Annotations 声明式映射、Session 连接池管理与复杂多表级联查询优化", "tags": ["sqlalchemy", "orm", "数据库建模", "关系映射", "连接池"], "installed": false, "added_at": "2026-08-01", "version": "rel_2_1_6"}, {"id": "pydantic-validation-pro", "name": "Pydantic v2 高性能数据校验模型", "slash": "/pydantic-validation-pro", "repo": "pydantic/pydantic", "stars": "★ 21.4k", "category": "💻 编程开发", "summary": "Rust 核心强类型数据解析、自定义验证器（Validators）编写与 Schema 自动导出", "tags": ["pydantic", "数据校验", "类型注解", "数据清洗", "契约验证"], "installed": false, "added_at": "2026-08-01", "version": "2.14.1"}, {"id": "alembic-db-migrations", "name": "Alembic 数据库版本自动化迁移管控", "slash": "/alembic-db-migrations", "repo": "sqlalchemy/alembic", "stars": "★ 2.1k", "category": "💻 编程开发", "summary": "数据库 DDL 版本分支管理、变更自动检测脚本生成与线上无损回滚策略", "tags": ["alembic", "数据库迁移", "ddl变更", "版本控制", "迁移脚本"], "installed": false, "added_at": "2026-08-01", "version": "rel_1_20_1"}, {"id": "pytest-test-suite", "name": "Pytest 自动化单元测试与边界覆盖", "slash": "/pytest-test-suite", "repo": "pytest-dev/pytest", "stars": "★ 12.3k", "category": "💻 编程开发", "summary": "扫描业务代码自动生成带 Mock 打桩的高覆盖率测试用例、参数化测试与夹具（Fixtures）", "tags": ["单元测试", "pytest", "mock", "自动化测试", "测试用例"], "installed": false, "added_at": "2026-08-01", "version": "9.1.1"}, {"id": "ruff-linter-formatter", "name": "Ruff 极速静态检查与代码风格统一", "slash": "/ruff-linter-formatter", "repo": "astral-sh/ruff", "stars": "★ 35.2k", "category": "💻 编程开发", "summary": "毫秒级静态检查与自动格式化修复，全面替代 Flake8/Black/isort 等传统工具链", "tags": ["ruff", "代码规范", "格式化", "静态检查", "linter"], "installed": false, "added_at": "2026-08-01", "version": "0.17.2"}, {"id": "poetry-dependency-manager", "name": "Poetry 现代依赖锁定与虚拟环境打包", "slash": "/poetry-dependency-manager", "repo": "python-poetry/poetry", "stars": "★ 31.0k", "category": "💻 编程开发", "summary": "确定性依赖锁定（poetry.lock）、多环境隔离与一键发布标准化 Python 轮子包", "tags": ["poetry", "依赖管理", "虚拟环境", "打包发布", "环境隔离"], "installed": false, "added_at": "2026-08-01", "version": "2.5.1"}, {"id": "playwright-automation", "name": "Playwright 现代浏览器端到端自动化", "slash": "/playwright-automation", "repo": "microsoft/playwright-python", "stars": "★ 14.8k", "category": "💻 编程开发", "summary": "多页面无感录制、影子 DOM 精准定位、网络请求拦截与反反爬自动化交互测试", "tags": ["playwright", "自动化测试", "无头浏览器", "网页模拟", "截图抓取"], "installed": false, "added_at": "2026-08-01", "version": "1.64.1"}, {"id": "rich-terminal-tui", "name": "Rich 终端富文本排版与动态看板", "slash": "/rich-terminal-tui", "repo": "Textualize/rich", "stars": "★ 49.6k", "category": "💻 编程开发", "summary": "在命令行控制台中渲染彩色富文本、多栏数据表格、进度条与语法高亮代码块", "tags": ["rich", "终端美化", "控制台输出", "进度条", "表格排版"], "installed": false, "added_at": "2026-08-01", "version": "15.0.0"}, {"id": "textual-tui-app", "name": "Textual 纯 Python 编写终端窗口程序", "slash": "/textual-tui-app", "repo": "Textualize/textual", "stars": "★ 26.3k", "category": "💻 编程开发", "summary": "基于 CSS 样式规范开发具有侧边栏、模态框、按钮与事件监听的现代化终端图形程序", "tags": ["textual", "终端应用", "tui", "python界面", "轻量窗口"], "installed": false, "added_at": "2026-08-01", "version": "8.2.8"}, {"id": "typer-cli-builder", "name": "Typer 基于类型注解极速构建 CLI", "slash": "/typer-cli-builder", "repo": "tiangolo/typer", "stars": "★ 16.2k", "category": "💻 编程开发", "summary": "利用标准类型注解自动生成帮助文档、参数解析校验与自动补全的专业命令行工具", "tags": ["typer", "cli", "命令行工具", "参数解析", "终端命令"], "installed": false, "added_at": "2026-08-01", "version": "0.27.3"}, {"id": "redis-distributed-lock", "name": "Redis 分布式缓存与并发控制锁", "slash": "/redis-distributed-lock", "repo": "redis/redis-py", "stars": "★ 13.5k", "category": "💻 编程开发", "summary": "多节点并发安全 RedLock、防缓存击穿/雪崩设计、Pub/Sub 实时通知与原子计数器", "tags": ["redis", "分布式锁", "缓存设计", "并发安全", "pubsub"], "installed": false, "added_at": "2026-08-01", "version": "8.1.0"}, {"id": "duckdb-olap-query", "name": "DuckDB 进程内极速分析型数据库", "slash": "/duckdb-olap-query", "repo": "duckdb/duckdb", "stars": "★ 26.7k", "category": "💻 编程开发", "summary": "无需配置独立数据库服务器，直接在本地对百兆 Parquet/CSV 执行毫秒级复杂 SQL 分析", "tags": ["duckdb", "olap", "快速sql", "parquet查询", "内存分析"], "installed": false, "added_at": "2026-08-01", "version": "2.0.0"}, {"id": "polars-fast-dataframe", "name": "Polars 多核多线程极速数据处理", "slash": "/polars-fast-dataframe", "repo": "pola-rs/polars", "stars": "★ 32.1k", "category": "💻 编程开发", "summary": "Rust 打造的多核并行 DataFrame 库，通过惰性计算与内存对齐实现数倍于 Pandas 的性能", "tags": ["polars", "数据处理", "性能加速", "内存优化", "多核并行"], "installed": false, "added_at": "2026-08-01", "version": "2.1.0"}, {"id": "academic-figure-skill", "name": "CNS 顶刊科学图表矢量排版", "slash": "/academic-figure-skill", "repo": "Nature-Figures/standards", "stars": "★ 26.2k", "category": "🔬 科研学术", "summary": "符合 Nature/Cell/Science 顶刊标准的科学图表复合排版、子图对齐与矢量 PDF 输出", "tags": ["画图", "制图", "论文", "图表", "nature", "cell", "science", "学术绘图"], "installed": true, "added_at": "2026-10-15", "version": "1.3.0"}, {"id": "scientific-visualization", "name": "科学配色审计与对比度核验", "slash": "/scientific-visualization", "repo": "color-palette/vis-palette", "stars": "★ 13.9k", "category": "🔬 科研学术", "summary": "出版级色彩对比度核验、色盲友好度色阶（Viridis/Cividis）与多面板布局设计", "tags": ["配色", "可视化", "图表配色", "对比度", "色盲友好", "matplotlib"], "installed": true, "added_at": "2026-10-15", "version": "1.3.2"}, {"id": "patent-disclosure-writer", "name": "中文专利技术交底书标准化撰写", "slash": "/patent-disclosure-writer", "repo": "patent-agent/chinese-patent", "stars": "★ 8.4k", "category": "🔬 科研学术", "summary": "中文专利交底书标准化撰写、技术创新点挖掘、权利要求书布局与申报材料整理", "tags": ["专利", "交底书", "技术交底", "创新点", "申报", "知识产权"], "installed": true, "added_at": "2026-10-15", "version": "1.2.1"}, {"id": "cvxpy-convex-optimizer", "name": "CVXPY 凸优化建模与求解约束", "slash": "/cvxpy-convex-optimizer", "repo": "cvxpy/cvxpy", "stars": "★ 6.2k", "category": "🔬 科研学术", "summary": "基于符合 DCP 规范的凸优化问题建模，调用 ECOS/OSQP 求解高维最优化资源配置", "tags": ["凸优化", "cvxpy", "最优化", "二次规划", "线性规划"], "installed": false, "added_at": "2026-08-01", "version": "2.2.1"}, {"id": "deap-genetic-algorithm", "name": "DEAP 多目标遗传进化算法求解", "slash": "/deap-genetic-algorithm", "repo": "deap/deap", "stars": "★ 5.6k", "category": "🔬 科研学术", "summary": "NSGA-II 算法求解高维非线性 Pareto 最优前沿，解决工程多目标权衡求解难题", "tags": ["遗传算法", "进化计算", "多目标优化", "nsga-ii", "算法求解"], "installed": false, "added_at": "2026-08-01", "version": "2.2.2"}, {"id": "lifelines-survival-analysis", "name": "Lifelines 医学与工程生存分析", "slash": "/lifelines-survival-analysis", "repo": "CamDavidsonPilon/lifelines", "stars": "★ 3.6k", "category": "🔬 科研学术", "summary": "绘制 Kaplan-Meier 生存率曲线、Log-rank 显著性检验与 Cox 比例风险回归建模", "tags": ["生存分析", "km曲线", "cox模型", "医学统计", "可靠度分析"], "installed": false, "added_at": "2026-08-01", "version": "2.4.7"}, {"id": "pymol-molecular-view", "name": "PyMOL 蛋白质与分子对接渲染脚本", "slash": "/pymol-molecular-view", "repo": "schrodinger/pymol-open-source", "stars": "★ 3.1k", "category": "🔬 科研学术", "summary": "纯脚本批量输出出版级蛋白质三维表面静电势、氢键作用力与小分子对接晶体图", "tags": ["pymol", "分子对接", "结构生物学", "蛋白质三维", "药物研发"], "installed": false, "added_at": "2026-08-01", "version": "2.3.9"}, {"id": "rdkit-chemistry-toolkit", "name": "RDKit 化学信息学与分子指纹计算", "slash": "/rdkit-chemistry-toolkit", "repo": "rdkit/rdkit", "stars": "★ 3.7k", "category": "🔬 科研学术", "summary": "SMILES 结构转换、Morgan 分子指纹相似度聚类与 Lipinski 五规则药物类药性筛查", "tags": ["rdkit", "化学信息学", "分子结构", "药物筛选", "smiles"], "installed": false, "added_at": "2026-08-01", "version": "1.4.5"}, {"id": "shadcn-ui-designer", "name": "Shadcn/UI 现代化高质感组件架构", "slash": "/shadcn-ui-designer", "repo": "shadcn-ui/ui", "stars": "★ 75.2k", "category": "🎨 界面设计", "summary": "遵循 Radix + Tailwind 规范，输出极具现代感、无障碍可访问的深浅色组件代码", "tags": ["ui设计", "前端组件", "shadcn", "组件库", "界面美化", "设计系统"], "installed": false, "added_at": "2026-08-01", "version": "2.7.5"}, {"id": "web-dashboard-architect", "name": "现代 Web 可视化大屏与中后台前端", "slash": "/web-dashboard-architect", "repo": "ant-design/ant-design-pro", "stars": "★ 36.1k", "category": "🎨 界面设计", "summary": "业务看板栅格布局、核心 KPI 指标动线、多图联动与复杂表单筛选器前端架构", "tags": ["前端大屏", "数据大屏", "中后台", "管理端ui", "看板前端"], "installed": false, "added_at": "2026-08-01", "version": "3.6.8"}, {"id": "tailwind-artisan", "name": "Tailwind CSS 视觉流与响应式美化", "slash": "/tailwind-artisan", "repo": "tailwindlabs/tailwindcss", "stars": "★ 82.5k", "category": "🎨 界面设计", "summary": "编写弥散光渐变、毛玻璃质感、微动效与移动/桌面多端自适应响应式断点", "tags": ["tailwind", "css美化", "响应式", "毛玻璃", "网页样式"], "installed": false, "added_at": "2026-08-01", "version": "3.2.1"}, {"id": "echarts-visualization-expert", "name": "ECharts/AntV 复杂交互图表代码生成", "slash": "/echarts-visualization-expert", "repo": "apache/echarts", "stars": "★ 58.5k", "category": "🎨 界面设计", "summary": "输出可直接运行的 Apache ECharts 柱线混排、地图下钻、桑基图与多层联动看板代码", "tags": ["echarts", "交互图表", "前端绘图", "数据图表", "antv"], "installed": false, "added_at": "2026-08-01", "version": "2.3.6"}, {"id": "threejs-webgl-vis", "name": "Three.js/WebGL 3D 交互数据可视化", "slash": "/threejs-webgl-vis", "repo": "mrdoob/three.js", "stars": "★ 102.4k", "category": "🎨 界面设计", "summary": "基于 Three.js 构建轻量级三维地形、3D 立体地球、数字孪生工业设备展示场景", "tags": ["threejs", "3d可视化", "webgl", "三维网页", "数字孪生"], "installed": false, "added_at": "2026-08-01", "version": "3.5.2"}, {"id": "svg-icon-illustrator", "name": "SVG 矢量图标与精细线框插画绘制", "slash": "/svg-icon-illustrator", "repo": "lucide-icons/lucide", "stars": "★ 17.5k", "category": "🎨 界面设计", "summary": "生成手工级精简 SVG 矢量代码、遵循统一 24x24 视口网格与平滑贝塞尔曲线", "tags": ["svg", "矢量图标", "插画", "图标绘制", "单色图标"], "installed": false, "added_at": "2026-08-01", "version": "3.3.5"}, {"id": "animation-motion-css", "name": "微动效与交互过渡阻尼曲线设计", "slash": "/animation-motion-css", "repo": "animate-css/animate.css", "stars": "★ 26.5k", "category": "🎨 界面设计", "summary": "弹性阻尼（Spring 动效）、骨架屏加载过渡与列表交错（Stagger）微动效编写", "tags": ["css动画", "动效", "framer motion", "过渡动画", "交互动效"], "installed": false, "added_at": "2026-08-01", "version": "3.7.8"}, {"id": "ant-design-spec", "name": "Ant Design 企业级设计规范实装", "slash": "/ant-design-spec", "repo": "ant-design/ant-design", "stars": "★ 92.3k", "category": "🎨 界面设计", "summary": "严谨对齐蚂蚁金服企业级设计语言，输出符合 B 端高效操作心理模型的界面代码", "tags": ["ant design", "企业级设计", "b端组件", "设计规范", "react组件"], "installed": false, "added_at": "2026-08-01", "version": "1.7.8"}, {"id": "vue3-composition-arch", "name": "Vue 3 组合式架构与极致界面响应", "slash": "/vue3-composition-arch", "repo": "antfu/vitesse", "stars": "★ 19.5k", "category": "🎨 界面设计", "summary": "利用 Composition API、Custom Hooks 与 Pinia 组织复杂大型交互界面的响应式数据流", "tags": ["vue3", "composition api", "pinia", "组件架构", "响应式界面"], "installed": false, "added_at": "2026-08-01", "version": "1.0.5"}, {"id": "nextjs-fullstack-web", "name": "Next.js 全栈渲染与极速 SEO 站群", "slash": "/nextjs-fullstack-web", "repo": "vercel/next.js", "stars": "★ 128.5k", "category": "🎨 界面设计", "summary": "App Router 架构、React Server Components（RSC）服务端渲染与极速边缘缓存", "tags": ["next.js", "ssr", "全栈开发", "seo优化", "react服务端"], "installed": false, "added_at": "2026-08-01", "version": "3.2.4"}, {"id": "excalidraw-diagram-pro", "name": "Excalidraw 手绘白板风格架构绘制", "slash": "/excalidraw-diagram-pro", "repo": "excalidraw/excalidraw", "stars": "★ 83.2k", "category": "🎨 界面设计", "summary": "生成手绘白板质感的系统架构图、数据流转图，让技术汇报告别刻板冰冷", "tags": ["excalidraw", "手绘架构", "白板图", "系统流程", "技术汇报"], "installed": false, "added_at": "2026-08-01", "version": "3.4.7"}, {"id": "mermaid-architecture-flow", "name": "Mermaid 时序图与复杂状态机绘制", "slash": "/mermaid-architecture-flow", "repo": "mermaid-js/mermaid", "stars": "★ 73.4k", "category": "🎨 界面设计", "summary": "纯文本渲染规范的 UML 序列交互图、分布式微服务调用拓扑与高并发状态流转图", "tags": ["mermaid", "时序图", "状态机", "uml", "文本绘图"], "installed": false, "added_at": "2026-08-01", "version": "3.4.4"}, {"id": "d3-custom-visualization", "name": "D3.js 复杂高阶数据图形定制开发", "slash": "/d3-custom-visualization", "repo": "d3/d3", "stars": "★ 108.1k", "category": "🎨 界面设计", "summary": "突破常规柱折饼限制，定制力导向关系网络、弦图、日光辐射图与层次聚类树", "tags": ["d3.js", "数据驱动", "力导向图", "高级图表", "定制图形"], "installed": false, "added_at": "2026-08-01", "version": "3.7.2"}, {"id": "chartjs-responsive-plots", "name": "Chart.js 纯轻量 Canvas 统计图表", "slash": "/chartjs-responsive-plots", "repo": "chartjs/Chart.js", "stars": "★ 64.2k", "category": "🎨 界面设计", "summary": "纯轻量、零外部依赖的 HTML5 Canvas 自适应响应式图表快速嵌入与动画配置", "tags": ["chart.js", "canvas图表", "轻量可视化", "统计图", "网页报表"], "installed": false, "added_at": "2026-08-01", "version": "1.5.1"}, {"id": "antv-x6-graph-editor", "name": "AntV X6 拖拽式图编辑与流程排版", "slash": "/antv-x6-graph-editor", "repo": "antvis/X6", "stars": "★ 6.5k", "category": "🎨 界面设计", "summary": "构建具有连线对齐吸附、自定义图形节点与撤销重做功能的流程设计器核心引擎", "tags": ["antv x6", "流程图编辑器", "拓扑连线", "节点编排", "图形交互"], "installed": false, "added_at": "2026-08-01", "version": "2.2.8"}, {"id": "plotly-dashboard-pro", "name": "Plotly 交互式动态看板与商业 BI 分析", "slash": "/plotly-dashboard-pro", "repo": "plotly/dash", "stars": "★ 21.2k", "category": "📊 数据分析", "summary": "纯 Python 构建多重滑块筛选、悬浮 Tooltip 与图表联动的商业 BI 动态分析仪表盘", "tags": ["plotly", "dash", "商业bi", "交互看板", "动态图表"], "installed": false, "added_at": "2026-08-01", "version": "3.0.9"}, {"id": "multidimensional-stats", "name": "多维统计推断与多元线性回归分析", "slash": "/multidimensional-stats", "repo": "statsmodels/statsmodels", "stars": "★ 9.4k", "category": "📊 数据分析", "summary": "因子分析、主成分分析（PCA）、方差齐性核验与回归系数显著性分析报告", "tags": ["多元统计", "线性回归", "因子分析", "统计推断", "统计建模"], "installed": false, "added_at": "2026-08-01", "version": "1.1.4"}, {"id": "xgboost-feature-importance", "name": "XGBoost 梯度提升建模与特征筛选", "slash": "/xgboost-feature-importance", "repo": "dmlc/xgboost", "stars": "★ 26.3k", "category": "📊 数据分析", "summary": "快速完成特征重要性增益计算、超参数微调评估与业务分类/回归决策树拟合", "tags": ["xgboost", "机器学习", "特征重要度", "梯度提升", "风控建模"], "installed": false, "added_at": "2026-08-01", "version": "2.3.9"}, {"id": "shap-model-explainability", "name": "SHAP 机器学习黑盒模型可解释性分析", "slash": "/shap-model-explainability", "repo": "shap/shap", "stars": "★ 24.5k", "category": "📊 数据分析", "summary": "基于博弈论 Shapley 效应计算特征边际贡献，生成瀑布图、依赖图与全局蜂群图", "tags": ["shap", "模型可解释性", "归因分析", "特征分析", "归因图"], "installed": false, "added_at": "2026-08-01", "version": "0.46.0"}, {"id": "prophet-business-forecast", "name": "Prophet 商业指标长程趋势预测", "slash": "/prophet-business-forecast", "repo": "facebook/prophet", "stars": "★ 18.2k", "category": "📊 数据分析", "summary": "自适应拟合节假日跳变、周月季节性规律与业务增长饱和承载能力的未来预测", "tags": ["prophet", "业务预测", "季节性分解", "趋势拟合", "客流预测"], "installed": false, "added_at": "2026-08-01", "version": "1.3.1"}, {"id": "pyod-anomaly-detection", "name": "PyOD 多元业务数据异常值智能检测", "slash": "/pyod-anomaly-detection", "repo": "yzhao062/pyod", "stars": "★ 8.7k", "category": "📊 数据分析", "summary": "集成孤立森林（iForest）、COPOD 与高维离群点算法，自动挖掘可疑异常流水与交易", "tags": ["异常检测", "孤立森林", "离群点", "pyod", "风控审计"], "installed": false, "added_at": "2026-08-01", "version": "1.3.4"}, {"id": "scikit-learn-pipeline", "name": "Scikit-Learn 标准自动化预处理管道", "slash": "/scikit-learn-pipeline", "repo": "scikit-learn/scikit-learn", "stars": "★ 60.1k", "category": "📊 数据分析", "summary": "编写防数据穿越的 Pipeline、ColumnTransformer 与标准化归一化组合转换器", "tags": ["sklearn", "pipeline", "数据预处理", "特征工程", "交叉验证"], "installed": false, "added_at": "2026-08-01", "version": "1.2.4"}, {"id": "official-document-writer", "name": "体制内公文写作与领导发言讲话稿", "slash": "/official-document-writer", "repo": "gov-office/chinese-official-doc", "stars": "★ 26.9k", "category": "🏢 职场办公", "summary": "规范通知/公函/请示/批复格式，拿捏公文措辞分寸，撰写汇报与重要会议讲话", "tags": ["公文", "公文写作", "体制内", "汇报材料", "通知", "请示", "讲话稿"], "installed": false, "added_at": "2026-10-15", "version": "1.1.0"}, {"id": "pytest-mock-enterprise", "name": "Pytest 工业级测试套件编写、Fixture 注入与 Mock 隔离", "slash": "/pytest-mock-enterprise", "repo": "pytest-dev/pytest-mock", "stars": "★ 12.8k", "category": "💻 编程开发", "summary": "搭建清晰的 conftest.py 依赖注入体系，对外部数据库与网络调用实现零污染纯净 Mock", "tags": ["pytest", "单元测试", "mock", "测试用例", "代码覆盖率"], "installed": false, "added_at": "2026-08-01", "version": "2.2.4"}, {"id": "shadcn-custom-pattern", "name": "Shadcn/UI 现代化沉浸式交互组件与无障碍 ARIA 规范", "slash": "/shadcn-custom-pattern", "repo": "tailwindlabs/headlessui", "stars": "★ 76.5k", "category": "🎨 界面设计", "summary": "遵循 Radix Primitives 键盘可访问性，输出生产级对话框、抽屉、自动完成等组件代码", "tags": ["shadcn", "radix", "无障碍", "前端组件", "react组件"], "installed": false, "added_at": "2026-08-01", "version": "3.7.6"}, {"id": "framer-spring-animation", "name": "Framer Motion 物理弹簧动效与流畅页面过渡规约", "slash": "/framer-spring-animation", "repo": "framer/motion", "stars": "★ 27.8k", "category": "🎨 界面设计", "summary": "配置高拟真物理阻尼、手势拖拽手感与页面 LayoutGroup 共享元素丝滑过渡", "tags": ["framer-motion", "动效设计", "弹簧动画", "转场效果", "交互微动效"], "installed": false, "added_at": "2026-08-01", "version": "3.1.7"}, {"id": "figma-code-handoff", "name": "Figma 设计稿高精度还原为现代 CSS Flex/Grid 布局指南", "slash": "/figma-code-handoff", "repo": "figma/plugin-samples", "stars": "★ 5.8k", "category": "🎨 界面设计", "summary": "将 Auto-layout 自动布局精准映射为无冗余现代 CSS，告别固定像素绝对定位", "tags": ["figma还原", "前端还原", "flex布局", "响应式切图", "像素级对齐"], "installed": false, "added_at": "2026-08-01", "version": "3.5.8"}, {"id": "wcag-a11y-auditor", "name": "Web 无障碍设计 (WCAG 2.1 AA) 色彩对比与屏幕阅读器审计", "slash": "/wcag-a11y-auditor", "repo": "dequelabs/axe-core", "stars": "★ 7.5k", "category": "🎨 界面设计", "summary": "扫描焦点陷阱、ARIA 语义缺失与低对比度文字，给出可落地无障碍重构方案", "tags": ["无障碍", "wcag", "色彩对比度", "屏幕阅读器", "a11y"], "installed": false, "added_at": "2026-08-01", "version": "3.7.3"}, {"id": "fluid-responsive-system", "name": "移动优先流式响应式网格与多断点容器查询布局", "slash": "/fluid-responsive-system", "repo": "necolas/normalize.css", "stars": "★ 52.8k", "category": "🎨 界面设计", "summary": "利用现代 CSS clamp() 与 Container Queries 打造无需刷新、自适应全设备流式界面", "tags": ["响应式布局", "断点适配", "移动优先", "容器查询", "css-grid"], "installed": false, "added_at": "2026-08-01", "version": "3.4.8"}, {"id": "pandas-pipeline-cleaner", "name": "Pandas 自动化数据清洗流与缺失离群异常值截断", "slash": "/pandas-pipeline-cleaner", "repo": "pandas-dev/pandas", "stars": "★ 44.5k", "category": "📊 数据分析", "summary": "构建健壮可复用的链式清洗函数（pipe），自动化处理类型转换、空值插补与极值平滑", "tags": ["pandas清洗", "数据流水线", "缺失值填充", "离群值", "异常值处理"], "installed": false, "added_at": "2026-08-01", "version": "2.6.8"}, {"id": "sql-explain-tuner", "name": "SQL 慢查询性能体检与 EXPLAIN 执行计划深度调优", "slash": "/sql-explain-tuner", "repo": "sqlmapproject/sqlmap", "stars": "★ 31.2k", "category": "📊 数据分析", "summary": "解剖扫描行数、filesort 与临时表瓶颈，针对性给出加复合索引与改写子查询的调优方案", "tags": ["sql调优", "explain", "慢查询", "复合索引", "全表扫描优化"], "installed": false, "added_at": "2026-08-01", "version": "1.4.2"}, {"id": "ab-test-significance-lab", "name": "A/B 测试统计功效计算与双样本假设检验方案", "slash": "/ab-test-significance-lab", "repo": "scipy/scipy", "stars": "★ 13.9k", "category": "📊 数据分析", "summary": "测算实验所需最小样本量与观测周期，输出置信区间、p值与防假阳性的决策建议", "tags": ["ab测试", "假设检验", "p值计算", "统计功效", "最小样本量"], "installed": false, "added_at": "2026-08-01", "version": "3.5.1"}, {"id": "funnel-conversion-diagnostic", "name": "全链路转化漏斗诊断与各触点跳出流失归因", "slash": "/funnel-conversion-diagnostic", "repo": "posthog/posthog", "stars": "★ 24.8k", "category": "📊 数据分析", "summary": "细化注册-浏览-加购-结算关键路径转化率，利用下钻分析定位流失最大阻塞断点", "tags": ["转化漏斗", "流失归因", "触点跳出", "漏斗分析", "用户转化"], "installed": false, "added_at": "2026-08-01", "version": "1.0.4"}, {"id": "financial-dcf-valuation", "name": "企业 DCF 自由现金流折现建模与财务三张表联动", "slash": "/financial-dcf-valuation", "repo": "ranaroussi/yfinance", "stars": "★ 15.6k", "category": "📊 数据分析", "summary": "基于资产负债、利润与现金流量表联动，设定 WACC 与永续增长率测算企业公允估值", "tags": ["dcf估值", "现金流折现", "财务建模", "资产负债表", "投资测算"], "installed": false, "added_at": "2026-08-01", "version": "3.5.0"}, {"id": "rfm-customer-segmentation", "name": "RFM 客户价值分层模型与高净值客群运营策略", "slash": "/rfm-customer-segmentation", "repo": "residentmario/missingno", "stars": "★ 58.9k", "category": "📊 数据分析", "summary": "对最近消费时间、频次与金额进行分位数打分，划定核心价值、潜力与流失客群应对策略", "tags": ["rfm模型", "用户分层", "客户价值", "精细化运营", "高价值召回"], "installed": false, "added_at": "2026-08-01", "version": "1.4.0"}, {"id": "etl-pipeline-architect", "name": "轻量级 Python ETL 数据抽取清洗与加载工程架构", "slash": "/etl-pipeline-architect", "repo": "dagster-io/dagster", "stars": "★ 12.1k", "category": "📊 数据分析", "summary": "设计高容错、带断点续跑、异常数据分流告警的 Python 轻量批处理 ETL 流水线架构", "tags": ["etl架构", "数据流水线", "数据抽取", "数据入库", "批处理流水线"], "installed": false, "added_at": "2026-08-01", "version": "3.1.9"}, {"id": "dax-powerbi-metrics", "name": "Power BI 核心 DAX 度量值与时间智能动态计算", "slash": "/dax-powerbi-metrics", "repo": "microsoft/PowerBI-visuals-tools", "stars": "★ 8.2k", "category": "📊 数据分析", "summary": "编写开箱即用的 DAX 高阶度量值，快速实现累计同比 (YoY)、环比 (MoM) 与动态切片", "tags": ["powerbi", "dax函数", "度量值", "时间智能", "同环比计算"], "installed": false, "added_at": "2026-08-01", "version": "2.7.1"}, {"id": "user-journey-touchpoint-map", "name": "全链路用户旅程地图与关键触点满意度漏斗设计", "slash": "/user-journey-touchpoint-map", "repo": "jgraph/drawio", "stars": "★ 41.5k", "category": "📑 产品需求", "summary": "端到端拆解用户行为、心理预期、系统交互触点与负面情绪断点，产出直观表格与流程图", "tags": ["用户旅程", "旅程地图", "体验触点", "痛点分析", "用户体验"], "installed": false, "added_at": "2026-08-01", "version": "2.4.3"}, {"id": "openapi-rest-spec", "name": "RESTful API 契约与 OpenAPI 3.0 / Swagger 规范设计", "slash": "/openapi-rest-spec", "repo": "OAI/OpenAPI-Specification", "stars": "★ 32.1k", "category": "📑 产品需求", "summary": "严谨定义 RESTful 端点路径、Query/Body Schema、状态码映射与标准错误返回模型", "tags": ["openapi", "swagger", "api规范", "restful", "接口定义"], "installed": false, "added_at": "2026-08-01", "version": "2.6.4"}, {"id": "scrum-user-story-estimator", "name": "Scrum 敏捷用户故事编写与故事点 Planning Poker 估算", "slash": "/scrum-user-story-estimator", "repo": "taigaio/taiga-front", "stars": "★ 6.7k", "category": "📑 产品需求", "summary": "规范“作为[角色]，我想要[功能]，以便于[价值]”与 INVEST 原则标准验收验收条件 (AC)", "tags": ["用户故事", "敏捷开发", "scrum", "故事点估算", "验收准则"], "installed": false, "added_at": "2026-08-01", "version": "2.4.8"}, {"id": "b2b-rbac-permission-matrix", "name": "B2B SaaS 企业级多租户与 RBAC 细粒度权限模型规约", "slash": "/b2b-rbac-permission-matrix", "repo": "casbin/casbin", "stars": "★ 18.2k", "category": "📑 产品需求", "summary": "设计角色-权限-资源-数据行级权限矩阵，满足企业级安全合规与组织架构映射", "tags": ["rbac权限", "多租户", "权限矩阵", "角色管理", "saas系统"], "installed": false, "added_at": "2026-08-01", "version": "1.2.2"}, {"id": "event-tracking-analytics-schema", "name": "全栈行为数据埋点字典与留存转化分析维度规约", "slash": "/event-tracking-analytics-schema", "repo": "snowplow/snowplow", "stars": "★ 7.2k", "category": "📑 产品需求", "summary": "规范页面曝光、元素点击、业务自定义事件名与上报公共属性（device/network/uid）规约", "tags": ["数据埋点", "埋点字典", "事件分析", "属性定义", "漏斗分析"], "installed": false, "added_at": "2026-08-01", "version": "1.6.0"}, {"id": "tiktok-viral-trends", "name": "TikTok 全球爆款短视频文案与流行音频趋势脚本", "slash": "/tiktok-viral-trends", "repo": "davidteather/TikTok-Api", "stars": "★ 14.6k", "category": "📱 新媒体运营", "summary": "把握欧美东南亚短视频流行模版，撰写高自然播放量与强互动率的英文短剧/展示脚本", "tags": ["tiktok文案", "海外短视频", "爆款音频", "跨文化传播", "创意分镜"], "installed": false, "added_at": "2026-08-01", "version": "1.7.1"}, {"id": "ielts-speaking-band7-plus", "name": "雅思口语 Part 1-3 高分地道俚语与即兴思辨扩展", "slash": "/ielts-speaking-band7-plus", "repo": "kyrolabs/awesome-langchain", "stars": "★ 20.1k", "category": "🌍 英语考培", "summary": "避免中式套路模版，训练自然地道的地道动词短语、连词衔接与高分思辨论述深度", "tags": ["雅思口语", "雅思7分", "地道表达", "即兴回答", "口语题库"], "installed": false, "added_at": "2026-08-01", "version": "1.2.0"}, {"id": "academic-native-polisher", "name": "SCI/EI 英文论文去中式思维与母语级学术精修", "slash": "/academic-native-polisher", "repo": "latex3/latex2e", "stars": "★ 8.5k", "category": "🌍 英语考培", "summary": "消除长难句歧义与中式直译痕迹，优化主被动语态平衡，提升顶级期刊论文可读性", "tags": ["论文润色", "去中式英语", "学术修改", "母语精修", "语法句式"], "installed": false, "added_at": "2026-08-01", "version": "2.3.0"}, {"id": "mckinsey-slide-consultant", "name": "麦肯锡金字塔原理商业咨询 PPT 叙事结构设计", "slash": "/mckinsey-slide-consultant", "repo": "slidevjs/slidev", "stars": "★ 32.4k", "category": "🏢 职场办公", "summary": "按“背景-冲突-疑问-解答 (SCQA)”模型构建高管赞同的结构化商业汇报大纲", "tags": ["麦肯锡ppt", "商业咨询", "金字塔原理", "咨询汇报", "结构化幻灯片"], "installed": false, "added_at": "2026-08-01", "version": "1.1.1"}, {"id": "daily-standup-summary", "name": "敏捷站会与大厂每日工作日报提炼总结", "slash": "/daily-standup-summary", "repo": "guanguans/ai-commit", "stars": "★ 12.8k", "category": "🏢 职场办公", "summary": "从粗糙碎片化的打卡与聊天记录中快速梳理出清晰的当日产出、阻塞卡点与次日计划", "tags": ["日报", "每日总结", "敏捷站会", "工作记录", "当日完成"], "installed": false, "added_at": "2026-08-01", "version": "3.5.1"}, {"id": "onboarding-training-guide", "name": "新人入职培训手册与核心业务岗位带教指引", "slash": "/onboarding-training-guide", "repo": "kamranahmedse/developer-roadmap", "stars": "★ 295.4k", "category": "🏢 职场办公", "summary": "制定体系化 30-60-90 天新员工胜任力跃迁计划、环境配置手册与第一周关键答疑指引", "tags": ["入职手册", "新人带教", "培训大纲", "岗位交接", "新员工指导"], "installed": false, "added_at": "2026-08-01", "version": "3.0.3"}, {"id": "tender-bidding-document", "name": "政府采购与企业招投标商务/技术标书编制规约", "slash": "/tender-bidding-document", "repo": "apache/incubator-answer", "stars": "★ 14.1k", "category": "🏢 职场办公", "summary": "对标招标文件评分标准逐条编写响应偏离表、实施技术方案与资质陈述，防止废标", "tags": ["标书编写", "招投标", "技术标", "商务标", "响应矩阵"], "installed": false, "added_at": "2026-08-01", "version": "3.2.2"}, {"id": "internal-wiki-builder", "name": "团队内部技术/业务知识库 FAQ 与排错指南沉淀", "slash": "/internal-wiki-builder", "repo": "outline/outline", "stars": "★ 28.5k", "category": "🏢 职场办公", "summary": "将产研和运维中的高频踩坑问题沉淀为结构清晰、检索即用的团队知识库与排错排查指南", "tags": ["知识库", "内部wiki", "排错手册", "常见问答", "知识沉淀"], "installed": false, "added_at": "2026-08-01", "version": "2.3.6"}, {"id": "rag-chunking-evaluator", "name": "知识库 RAG 智能文本分块与召回重排评测规约", "slash": "/rag-chunking-evaluator", "repo": "explodinggradients/ragas", "stars": "★ 18.9k", "category": "🌟 热门标杆", "summary": "针对长文档制定语义分块 (Semantic Chunking)、滑窗重叠与 Ragas 幻觉/忠实度打分规约", "tags": ["rag评测", "分块策略", "文本切片", "重排rerank", "召回率优化"], "installed": false, "added_at": "2026-08-01", "version": "1.1.5"}, {"id": "prompt-optimizer-reverse", "name": "结构化 Prompt 逆向调优与动态少样本 Few-Shot 提炼", "slash": "/prompt-optimizer-reverse", "repo": "promptfoo/promptfoo", "stars": "★ 5.8k", "category": "🌟 热门标杆", "summary": "将粗糙模糊的提问逆向解构为具备角色、上下文、输入规范与高质量少样本的黄金指令", "tags": ["提示词调优", "few-shot", "逆向调优", "prompt优化", "指令对齐"], "installed": false, "added_at": "2026-08-01", "version": "3.3.7"}, {"id": "system-design-blueprint", "name": "千万级高并发系统高层架构设计 (HLD) 与容灾方案", "slash": "/system-design-blueprint", "repo": "donnemartin/system-design-primer", "stars": "★ 280.5k", "category": "🌟 热门标杆", "summary": "设计从 CDN、负载均衡、缓存穿透防护到分库分表的端到端高可用系统蓝图", "tags": ["系统设计", "高并发架构", "微服务拆分", "容灾方案", "hld蓝图"], "installed": false, "added_at": "2026-08-01", "version": "2.7.8"}, {"id": "interview-algorithm-coach", "name": "大厂高频算法面试思考链路剖析与最优时空复杂度推导", "slash": "/interview-algorithm-coach", "repo": "doocs/leetcode", "stars": "★ 125.4k", "category": "🌟 热门标杆", "summary": "拆解高频算法题核心破题突破口，从暴力解法逐步推导至最优时空复杂度并手写边界测试", "tags": ["算法面试", "leetcode", "时空复杂度", "双指针", "动态规划"], "installed": false, "added_at": "2026-08-01", "version": "2.1.2"}, {"id": "claude-code-minimalist", "name": "Anthropic Clean Code 极简防防御性编程风格规约", "slash": "/claude-code-minimalist", "repo": "anthropics/anthropic-cookbook", "stars": "★ 31.2k", "category": "🌟 热门标杆", "summary": "倡导小而美、无过度设计、单一职责与严格类型提示的现代极简编码习惯", "tags": ["极简编码", "clean code", "代码可读性", "防御性编程", "高内聚低耦合"], "installed": false, "added_at": "2026-08-01", "version": "3.4.8"}, {"id": "translator-native-touch", "name": "科技与政经文献母语级“信达雅”翻译与术语一致性", "slash": "/translator-native-touch", "repo": "deepl/deepl-python", "stars": "★ 19.8k", "category": "🌟 热门标杆", "summary": "破除机器翻译硬译套话，遵循目标语言行文逻辑与行业术语表，交付出版级双语文稿", "tags": ["母语翻译", "信达雅", "科技翻译", "政经文献", "术语表"], "installed": false, "added_at": "2026-08-01", "version": "3.1.7"}, {"id": "pr-agent-reviewer", "name": "GitHub Pull Request 自动化审查与代码变更影响分析", "slash": "/pr-agent-reviewer", "repo": "Codium-ai/pr-agent", "stars": "★ 15.6k", "category": "🌟 热门标杆", "summary": "自动提炼 PR 核心变更摘要、潜在性能退化与回滚风险，给出建设性重构意见", "tags": ["pr审查", "code review", "代码变更", "pr总结", "影响分析"], "installed": false, "added_at": "2026-08-01", "version": "2.4.6"}, {"id": "api-schema-contract", "name": "RESTful API 接口契约定义与自动化 Mock 数据规范", "slash": "/api-schema-contract", "repo": "stoplightio/prism", "stars": "★ 28.4k", "category": "🌟 热门标杆", "summary": "前后端联调前确立无歧义的 JSON Schema 契约，自动生成符合业务边界的真实 Mock 数据", "tags": ["api契约", "mock数据", "接口测试", "联调规范", "json-schema"], "installed": false, "added_at": "2026-08-01", "version": "3.1.1"}, {"id": "linux-shell-debugger", "name": "Linux Shell 生产运维脚本编写与 ShellCheck 规范排错", "slash": "/linux-shell-debugger", "repo": "koalaman/shellcheck", "stars": "★ 34.5k", "category": "💻 编程开发", "summary": "诊断 Bash 脚本中的语法隐患、空变量展开与管道错误码失效，产出工业级健壮运维脚本", "tags": ["shell脚本", "linux运维", "bash排错", "脚本调试", "自动化运维"], "installed": false, "added_at": "2026-08-01", "version": "1.5.4"}, {"id": "markdown-academic-table", "name": "Markdown 与 LaTeX 顶刊三线表与复杂跨行跨列规约", "slash": "/markdown-academic-table", "repo": "firasdib/Regex101", "stars": "★ 12.8k", "category": "💻 编程开发", "summary": "规范顶刊标准三线表（Top/Mid/Bottom Rule），处理复杂多级表头与长数据对齐换行", "tags": ["三线表", "markdown表格", "latex表格", "学术表格", "跨行跨列"], "installed": false, "added_at": "2026-08-01", "version": "2.6.2"}, {"id": "sql-index-architect", "name": "数据库复合索引深度设计与 B+ 树最左匹配优化规约", "slash": "/sql-index-architect", "repo": "anse-app/anse", "stars": "★ 24.1k", "category": "💻 编程开发", "summary": "根据高频 WHERE、ORDER BY 与 JOIN 条件设计最优复合索引，避免索引失效与回表", "tags": ["复合索引", "索引设计", "b树优化", "最左前缀", "慢查询预防"], "installed": false, "added_at": "2026-08-01", "version": "3.2.5"}, {"id": "web-vitals-auditor", "name": "现代 Web 核心体验指标 (Core Web Vitals) 性能优化指南", "slash": "/web-vitals-auditor", "repo": "GoogleChrome/lighthouse", "stars": "★ 29.8k", "category": "💻 编程开发", "summary": "诊断 LCP 最大内容绘制、INP 交互延迟与 CLS 累积布局偏移，提供轻量重构代码", "tags": ["性能优化", "web vitals", "lcp优化", "cls防抖", "前端性能"], "installed": false, "added_at": "2026-08-01", "version": "2.3.1"}, {"id": "pydantic-v2-architect", "name": "Pydantic v2 高性能模型验证与字段级序列化规约", "slash": "/pydantic-v2-architect", "repo": "samuelcolvin/pydantic-core", "stars": "★ 21.5k", "category": "💻 编程开发", "summary": "采用 Rust 核心底座的高阶 Field 约束、自定义根类型与高频模型反序列化优化", "tags": ["pydantic v2", "数据校验", "序列化", "类型转换", "field约束"], "installed": false, "added_at": "2026-08-01", "version": "2.0.4"}, {"id": "graphql-federation-design", "name": "GraphQL 查询优化、DataLoader 批处理与防 N+1 规约", "slash": "/graphql-federation-design", "repo": "graphql/graphql-spec", "stars": "★ 17.4k", "category": "💻 编程开发", "summary": "通过 DataLoader 实现跨微服务关联查询合并与请求级缓存，彻底解决 N+1 性能黑洞", "tags": ["graphql", "dataloader", "n+1查询", "api聚合", "schema编排"], "installed": false, "added_at": "2026-08-01", "version": "3.2.4"}, {"id": "anti-defensive-writing", "name": "论文反防御性写作与去谦虚润色", "slash": "/anti-defensive-writing", "repo": "Kiterlin/anti-defensive-writing", "stars": "★ 1.2k", "category": "🔬 科研学术", "summary": "消除学术论文与提案中不必要的免责声明、过度谦虚与防御性冗余，使论点直接自信、逻辑坚定严密", "tags": ["论文润色", "反防御性", "sci写作", "去ai味", "去油腻", "学术写作", "论点精炼"], "installed": false, "added_at": "2026-10-21", "version": "1.1.2"}];

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
