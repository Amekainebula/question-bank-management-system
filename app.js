const STORAGE_KEY = 'zhiti-question-bank-v1';
const SESSION_KEY = 'zhiti-current-user-v1';
const EXAM_DRAFT_PREFIX = 'zhiti-exam-draft-v1';

const roleMeta = {
  admin: { label: '系统管理员', initials: '管' },
  teacher: { label: '任课教师', initials: '师' },
  student: { label: '学生', initials: '生' }
};

const typeMeta = {
  single: { label: '单选题', badge: 'badge-blue' },
  multiple: { label: '多选题', badge: 'badge-purple' },
  judge: { label: '判断题', badge: 'badge-amber' },
  fill: { label: '填空题', badge: 'badge-green' },
  essay: { label: '简答题', badge: 'badge-gray' }
};

const pageMeta = {
  dashboard: { title: '工作台', subtitle: '欢迎回来，今天也来高效管理题库吧。' },
  courses: { title: '课程管理', subtitle: '维护课程、任课教师与选课数据。' },
  types: { title: '题型管理', subtitle: '配置题型规则、默认分值和使用说明。' },
  questions: { title: '试题管理', subtitle: '沉淀高质量试题，支持筛选、编辑和发布。' },
  papers: { title: '试卷管理', subtitle: '灵活组卷并管理试卷发布状态。' },
  users: { title: '用户管理', subtitle: '维护系统账号和角色权限。' },
  practice: { title: '在线练习', subtitle: '按课程练习已发布试卷，巩固学习效果。' },
  results: { title: '成绩分析', subtitle: '查看考试结果和知识点掌握情况。' },
  mistakes: { title: '错题本', subtitle: '复盘错题，形成个性化学习闭环。' }
};

const seedData = {
  users: [
    { id: 'u1', username: 'admin', password: '123456', name: '林晓岚', role: 'admin', status: '正常', lastLogin: '2026-09-08 08:42' },
    { id: 'u2', username: 'teacher', password: '123456', name: '李老师', role: 'teacher', status: '正常', lastLogin: '2026-09-08 09:16' },
    { id: 'u3', username: 'student', password: '123456', name: '张同学', role: 'student', status: '正常', lastLogin: '2026-09-07 20:12' },
    { id: 'u4', username: 'wang', password: '123456', name: '王老师', role: 'teacher', status: '正常', lastLogin: '2026-09-06 16:28' }
  ],
  courses: [
    { id: 'c1', code: 'SE-101', name: '软件工程基础', teacherId: 'u2', term: '2026 秋季', status: '进行中', students: 86, description: '软件生命周期、需求分析、系统设计与测试基础。' },
    { id: 'c2', code: 'DB-202', name: '数据库原理', teacherId: 'u4', term: '2026 秋季', status: '进行中', students: 64, description: '关系模型、SQL、事务与数据库设计。' },
    { id: 'c3', code: 'CS-305', name: '算法与数据结构', teacherId: 'u2', term: '2026 秋季', status: '未开始', students: 72, description: '线性表、树、图和经典算法分析。' },
    { id: 'c4', code: 'PM-110', name: '项目管理实践', teacherId: 'u4', term: '2026 春季', status: '已结束', students: 58, description: '项目计划、风险管理、团队协作与交付。' }
  ],
  types: [
    { id: 't1', code: 'SINGLE', name: '单选题', type: 'single', score: 5, description: '只有一个选项符合题意。' },
    { id: 't2', code: 'MULTIPLE', name: '多选题', type: 'multiple', score: 8, description: '有两个或以上选项符合题意。' },
    { id: 't3', code: 'JUDGE', name: '判断题', type: 'judge', score: 3, description: '判断陈述是否正确。' },
    { id: 't4', code: 'FILL', name: '填空题', type: 'fill', score: 5, description: '根据题干填写关键概念或结果。' },
    { id: 't5', code: 'ESSAY', name: '简答题', type: 'essay', score: 15, description: '使用完整语言回答开放性问题。' }
  ],
  questions: [
    { id: 'q1', courseId: 'c1', type: 'single', stem: '软件工程的核心目标是？', options: ['提高软件质量并控制成本', '只追求开发速度', '减少文档编写', '只关注程序运行'], answer: 'A', score: 5, difficulty: '简单', tags: ['软件工程概述'], status: '已发布', creatorId: 'u2', createdAt: '2026-08-18', explanation: '软件工程强调在成本、进度约束下，以系统化、规范化方法保证软件质量。' },
    { id: 'q2', courseId: 'c1', type: 'multiple', stem: '以下哪些属于需求工程活动？', options: ['需求获取', '需求分析', '需求验证', '编写机器指令'], answer: 'ABC', score: 8, difficulty: '中等', tags: ['需求分析', '过程'], status: '已发布', creatorId: 'u2', createdAt: '2026-08-19', explanation: '需求工程通常包含获取、分析、规格说明、验证与管理。' },
    { id: 'q3', courseId: 'c1', type: 'judge', stem: '瀑布模型要求在进入下一阶段前完成上一阶段的主要工作。', options: ['正确', '错误'], answer: 'A', score: 3, difficulty: '简单', tags: ['开发模型'], status: '已发布', creatorId: 'u2', createdAt: '2026-08-20', explanation: '瀑布模型强调阶段顺序和文档交付。' },
    { id: 'q4', courseId: 'c1', type: 'single', stem: '在 UML 中，用于描述系统功能需求的是？', options: ['类图', '用例图', '部署图', '活动图'], answer: 'B', score: 5, difficulty: '中等', tags: ['UML', '需求分析'], status: '已发布', creatorId: 'u2', createdAt: '2026-08-21', explanation: '用例图从参与者视角描述系统提供的功能。' },
    { id: 'q5', courseId: 'c1', type: 'essay', stem: '简述黑盒测试与白盒测试的主要区别。', options: [], answer: '黑盒测试关注输入输出和外部行为；白盒测试关注内部逻辑、控制流和数据流。', score: 15, difficulty: '较难', tags: ['软件测试'], status: '已发布', creatorId: 'u2', createdAt: '2026-08-22', explanation: '可从测试依据、关注对象和典型方法三个角度回答。' },
    { id: 'q6', courseId: 'c2', type: 'single', stem: '关系数据库中用于唯一标识一条记录的字段称为？', options: ['外键', '主键', '索引', '视图'], answer: 'B', score: 5, difficulty: '简单', tags: ['关系模型'], status: '已发布', creatorId: 'u4', createdAt: '2026-08-23', explanation: '主键能够唯一标识关系中的每一条元组。' },
    { id: 'q7', courseId: 'c2', type: 'multiple', stem: '事务的 ACID 特性包括？', options: ['原子性', '一致性', '隔离性', '持久性'], answer: 'ABCD', score: 8, difficulty: '中等', tags: ['事务'], status: '已发布', creatorId: 'u4', createdAt: '2026-08-24', explanation: 'ACID 分别是 Atomicity、Consistency、Isolation、Durability。' },
    { id: 'q8', courseId: 'c3', type: 'judge', stem: '二分查找要求数据集合事先有序。', options: ['正确', '错误'], answer: 'A', score: 3, difficulty: '简单', tags: ['查找算法'], status: '已发布', creatorId: 'u2', createdAt: '2026-08-25', explanation: '二分查找通过有序性不断缩小查找区间。' },
    { id: 'q9', courseId: 'c3', type: 'single', stem: '深度优先搜索通常使用哪种数据结构辅助实现？', options: ['队列', '栈', '堆', '哈希表'], answer: 'B', score: 5, difficulty: '中等', tags: ['图算法'], status: '草稿', creatorId: 'u2', createdAt: '2026-08-26', explanation: '递归调用栈或显式栈都可以实现 DFS。' },
    { id: 'q10', courseId: 'c1', type: 'fill', stem: '软件测试中，验证程序是否满足用户需求的测试通常称为____测试。', options: [], answer: '验收', score: 5, difficulty: '中等', tags: ['软件测试'], status: '已发布', creatorId: 'u2', createdAt: '2026-08-27', explanation: '验收测试面向用户需求和交付条件。' }
  ],
  papers: [
    { id: 'p1', title: '软件工程基础 · 阶段测验一', courseId: 'c1', duration: 45, questionIds: ['q1', 'q2', 'q3', 'q4', 'q10'], status: '已发布', publishAt: '2026-09-01', creatorId: 'u2', description: '覆盖软件工程概述、需求分析和软件测试基础。' },
    { id: 'p2', title: '数据库原理 · 章节练习', courseId: 'c2', duration: 30, questionIds: ['q6', 'q7'], status: '已发布', publishAt: '2026-09-03', creatorId: 'u4', description: '关系模型与事务管理章节自测。' },
    { id: 'p3', title: '软件工程基础 · 期中考试（草稿）', courseId: 'c1', duration: 90, questionIds: ['q1', 'q2', 'q3', 'q4', 'q5'], status: '草稿', publishAt: '', creatorId: 'u2', description: '期中考试试卷，正在进行最后校对。' }
  ],
  attempts: [
    { id: 'a1', paperId: 'p1', studentId: 'u3', answers: { q1: 'A', q2: 'AB', q3: 'A', q4: 'C', q10: '验收' }, score: 78, totalScore: 26, submittedAt: '2026-09-05 19:28', duration: 32 },
    { id: 'a2', paperId: 'p2', studentId: 'u3', answers: { q6: 'B', q7: 'ABCD' }, score: 100, totalScore: 13, submittedAt: '2026-09-06 21:10', duration: 18 }
  ],
  notifications: [
    { id: 'n1', title: '期中考试试卷还有 2 道题未校对', time: '10 分钟前', kind: 'warning', roles: ['admin', 'teacher'] },
    { id: 'n2', title: '张同学完成了《数据库原理 · 章节练习》', time: '昨天 21:10', kind: 'success', roles: ['admin', 'teacher'] },
    { id: 'n3', title: '软件工程基础新增 3 道练习题', time: '昨天 16:40', kind: 'info', roles: ['admin', 'teacher', 'student'] }
  ]
};

let data = loadData();
let currentUser = loadSession();
let currentPage = 'dashboard';
let modalState = null;
let questionFilters = { search: '', courseId: 'all', type: 'all', difficulty: 'all', status: 'all' };
let courseSearch = '';
let paperSearch = '';

const app = document.querySelector('#app');
const toastRegion = document.querySelector('#toast-region');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...clone(seedData), ...JSON.parse(saved) } : clone(seedData);
  } catch {
    return clone(seedData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadSession() {
  try {
    const id = sessionStorage.getItem(SESSION_KEY);
    return data.users.find(user => user.id === id) || null;
  } catch {
    return null;
  }
}

function saveSession(user) {
  currentUser = user;
  sessionStorage.setItem(SESSION_KEY, user.id);
}

function clearSession() {
  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function uid(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function formatDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const get = type => parts.find(part => part.type === type)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function getCourse(id) { return data.courses.find(item => item.id === id); }
function getUser(id) { return data.users.find(item => item.id === id); }
function getPaper(id) { return data.papers.find(item => item.id === id); }
function getQuestion(id) { return data.questions.find(item => item.id === id); }
function roleLabel(role) { return roleMeta[role]?.label || role; }
function courseName(id) { return getCourse(id)?.name || '未分配课程'; }
function teacherName(id) { return getUser(id)?.name || '未分配'; }
function typeLabel(type) { return typeMeta[type]?.label || type; }
function typeBadge(type) { return typeMeta[type]?.badge || 'badge-gray'; }
function paperScore(paper) { return paper.questionIds.map(getQuestion).filter(Boolean).reduce((sum, q) => sum + Number(q.score || 0), 0); }
function initials(name) { return String(name || '知').slice(0, 1); }

function canManage() { return currentUser && ['admin', 'teacher'].includes(currentUser.role); }
function isAdmin() { return currentUser?.role === 'admin'; }

function render() {
  if (!currentUser) {
    renderLogin();
    return;
  }
  renderShell();
  renderCurrentPage();
  renderModal();
}

function renderLogin() {
  app.innerHTML = `
    <div class="login-shell">
      <section class="login-visual">
        <div class="brand-lockup"><span class="brand-mark">✦</span><span>知题 · 题库管理</span></div>
        <h1>让每一道题，<br />都成为成长的坐标。</h1>
        <p>从课程、题型、试题到试卷与成绩分析，建立清晰、可追踪的教学评价闭环。</p>
        <div class="login-feature-row">
          <span class="login-feature">题库沉淀</span>
          <span class="login-feature">智能组卷</span>
          <span class="login-feature">学情分析</span>
        </div>
      </section>
      <section class="login-panel">
        <div class="login-card">
          <h2>欢迎回来</h2>
          <p class="muted">登录后继续管理你的教学内容</p>
          <form id="login-form" class="login-form">
            <div class="input-group">
              <label for="login-username">账号</label>
              <input id="login-username" name="username" autocomplete="username" value="teacher" placeholder="请输入账号" required />
            </div>
            <div class="input-group">
              <label for="login-password">密码</label>
              <input id="login-password" name="password" type="password" autocomplete="current-password" value="123456" placeholder="请输入密码" required />
            </div>
            <div class="login-actions">
              <label class="remember"><input type="checkbox" checked /> 记住本次登录</label>
              <button class="btn btn-primary" type="submit">进入系统 <span>→</span></button>
            </div>
          </form>
          <p class="demo-title">演示账号</p>
          <div class="demo-accounts">
            <button class="demo-account" data-demo-login="admin"><strong>管理员</strong><span>admin</span></button>
            <button class="demo-account" data-demo-login="teacher"><strong>教师</strong><span>teacher</span></button>
            <button class="demo-account" data-demo-login="student"><strong>学生</strong><span>student</span></button>
          </div>
          <p class="muted small" style="margin:15px 0 0; text-align:center;">演示账号密码统一为 123456</p>
        </div>
      </section>
    </div>`;
  bindLoginEvents();
}

function navItems() {
  const management = canManage() ? [
    ['courses', '▦', '课程管理'],
    ['types', '◈', '题型管理'],
    ['questions', '◇', '试题管理'],
    ['papers', '▤', '试卷管理']
  ] : [['practice', '☷', '在线练习'], ['mistakes', '⌁', '错题本']];
  const items = [['dashboard', '⌂', '工作台'], ...management, ['results', '◒', '成绩分析']];
  if (isAdmin()) items.splice(items.length - 1, 0, ['users', '♙', '用户管理']);
  return items;
}

function renderShell() {
  const meta = pageMeta[currentPage] || pageMeta.dashboard;
  const nav = navItems().map(([page, icon, label]) => `
    <button class="nav-item ${currentPage === page ? 'active' : ''}" data-page="${page}">
      <span class="nav-icon">${icon}</span><span>${label}</span>
    </button>`).join('');
  const today = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date());
  app.innerHTML = `
    <div class="dashboard-shell">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-brand"><span class="brand-mark">✦</span><span>知题</span></div>
        <div class="nav-section-title">Workspace</div>
        <nav class="nav-list">${nav}</nav>
        <div class="sidebar-spacer"></div>
        <div class="sidebar-user">
          <span class="avatar">${escapeHtml(initials(currentUser.name))}</span>
          <div class="sidebar-user-copy"><strong>${escapeHtml(currentUser.name)}</strong><span>${roleLabel(currentUser.role)}</span></div>
          <button class="btn btn-ghost btn-sm sidebar-logout" data-action="logout" title="退出登录">↪</button>
        </div>
      </aside>
      <main class="main-shell">
        <header class="topbar">
          <div class="breadcrumb"><button class="mobile-menu" data-action="toggle-sidebar">☰</button><span>知题系统</span><span>/</span><strong>${meta.title}</strong></div>
          <div class="topbar-actions"><span class="topbar-date">${today}</span><button class="notification" data-action="show-notifications" title="通知">♧<span class="notification-dot"></span></button><button class="btn btn-secondary btn-sm" data-action="profile">${escapeHtml(currentUser.name)} <span>⌄</span></button></div>
        </header>
        <section id="page-content" class="page-content"></section>
      </main>
    </div>`;
  bindShellEvents();
}

function bindLoginEvents() {
  document.querySelector('#login-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const user = data.users.find(item => item.username === form.get('username') && item.password === form.get('password'));
    if (!user) {
      toast('账号或密码不正确，请使用演示账号登录。', 'error');
      return;
    }
    if (user.status !== '正常') {
      toast('该账号已停用，请联系系统管理员。', 'error');
      return;
    }
    saveSession(user);
    toast(`登录成功，${user.name}，欢迎回来。`);
    render();
  });
  document.querySelectorAll('[data-demo-login]').forEach(button => button.addEventListener('click', () => {
    const user = data.users.find(item => item.username === button.dataset.demoLogin);
    if (!user) return;
    document.querySelector('#login-username').value = user.username;
    document.querySelector('#login-password').value = user.password;
    document.querySelector('#login-form').requestSubmit();
  }));
}

function bindShellEvents() {
  document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => {
    currentPage = button.dataset.page;
    document.querySelector('#sidebar')?.classList.remove('open');
    renderShell();
    renderCurrentPage();
  }));
  document.querySelectorAll('[data-action="logout"]').forEach(button => button.addEventListener('click', () => {
    clearSession();
    currentPage = 'dashboard';
    render();
  }));
  document.querySelectorAll('[data-action="toggle-sidebar"]').forEach(button => button.addEventListener('click', () => document.querySelector('#sidebar')?.classList.toggle('open')));
  document.querySelectorAll('[data-action="show-notifications"]').forEach(button => button.addEventListener('click', () => openModal('notifications')));
  document.querySelectorAll('[data-action="profile"]').forEach(button => button.addEventListener('click', () => openModal('profile')));
}

function renderCurrentPage() {
  const pageContent = document.querySelector('#page-content');
  if (!pageContent) return;
  const renderers = { dashboard: renderDashboard, courses: renderCourses, types: renderTypes, questions: renderQuestions, papers: renderPapers, users: renderUsers, practice: renderPractice, results: renderResults, mistakes: renderMistakes };
  const renderer = renderers[currentPage] || renderDashboard;
  pageContent.innerHTML = renderer();
  bindPageEvents();
}

function pageHead(title, subtitle, action = '') {
  return `<div class="page-head"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="head-actions">${action}</div></div>`;
}

function statCard(icon, label, value, trend = '', trendClass = '') {
  return `<div class="stat-card"><div class="stat-icon">${icon}</div><div class="stat-label">${label}</div><div class="stat-value">${value}</div>${trend ? `<div class="stat-trend ${trendClass}">${trend}</div>` : ''}</div>`;
}

function renderDashboard() {
  if (currentUser.role === 'student') return renderStudentDashboard();
  const publishedQuestions = data.questions.filter(q => q.status === '已发布').length;
  const publishedPapers = data.papers.filter(p => p.status === '已发布').length;
  const avgScore = data.attempts.length ? Math.round(data.attempts.reduce((sum, item) => sum + Number(item.score || 0), 0) / data.attempts.length) : 0;
  const recentQuestions = [...data.questions].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const recentPapers = [...data.papers].sort((a, b) => (b.publishAt || '').localeCompare(a.publishAt || '')).slice(0, 4);
  return `${pageHead('工作台', '欢迎回来，今天也来高效管理题库吧。', `<button class="btn btn-primary" data-action="create-question">＋ 新建试题</button>`)}
    <div class="stat-grid">
      ${statCard('◇', '题库试题总数', data.questions.length, '↑ 12.5%')}
      ${statCard('▤', '已发布试卷', publishedPapers, '↑ 3 套')}
      ${statCard('◒', '参与考试人次', data.attempts.length + 128, '↑ 8.4%')}
      ${statCard('◎', '平均得分', `${avgScore || 86}`, '↑ 2.1 分')}
    </div>
    <div class="content-grid">
      <div>
        <div class="panel"><div class="panel-head"><h2>题库概览</h2><span class="muted">共 ${data.questions.length} 道题</span></div><div class="panel-body">
          <div class="progress-row"><div class="progress-label"><span>已发布试题</span><strong>${publishedQuestions} / ${data.questions.length}</strong></div><div class="progress"><span style="width:${data.questions.length ? publishedQuestions / data.questions.length * 100 : 0}%"></span></div></div>
          <div class="progress-row"><div class="progress-label"><span>课程覆盖率</span><strong>${data.courses.filter(c => data.questions.some(q => q.courseId === c.id)).length} / ${data.courses.length} 门</strong></div><div class="progress"><span style="width:${data.courses.length ? data.courses.filter(c => data.questions.some(q => q.courseId === c.id)).length / data.courses.length * 100 : 0}%"></span></div></div>
          <div class="progress-row"><div class="progress-label"><span>试卷完成度</span><strong>${data.papers.filter(p => p.status === '已发布').length} / ${data.papers.length} 份</strong></div><div class="progress"><span style="width:${data.papers.length ? data.papers.filter(p => p.status === '已发布').length / data.papers.length * 100 : 0}%"></span></div></div>
        </div></div>
        <div class="panel"><div class="panel-head"><h2>最近更新试题</h2><button class="btn btn-ghost btn-sm" data-page="questions">查看全部 →</button></div>
          ${renderQuestionTable(recentQuestions, true)}
        </div>
      </div>
      <div>
        <div class="panel"><div class="panel-head"><h2>最近试卷</h2><button class="btn btn-ghost btn-sm" data-page="papers">管理试卷 →</button></div><div class="panel-body">
          <div class="activity-list">${recentPapers.map(paper => `<div class="activity-item"><span class="activity-dot"></span><div class="activity-copy"><p><strong>${escapeHtml(paper.title)}</strong></p><span>${courseName(paper.courseId)} · ${paper.status} · ${paperScore(paper)} 分</span></div></div>`).join('')}</div>
        </div></div>
        <div class="panel"><div class="panel-head"><h2>待处理事项</h2><span class="badge badge-amber">${data.notifications.filter(n => n.kind === 'warning').length} 项</span></div><div class="panel-body"><div class="notice-list">${data.notifications.filter(n => n.roles.includes(currentUser.role)).slice(0, 3).map(n => `<div class="notice"><span class="notice-icon">${n.kind === 'warning' ? '!' : '✓'}</span><div><strong>${escapeHtml(n.title)}</strong><span>${n.time}</span></div></div>`).join('')}</div></div></div>
      </div>
    </div>`;
}

function renderStudentDashboard() {
  const published = data.papers.filter(p => p.status === '已发布');
  const myAttempts = data.attempts.filter(a => a.studentId === currentUser.id);
  const avg = myAttempts.length ? Math.round(myAttempts.reduce((sum, item) => sum + item.score, 0) / myAttempts.length) : 0;
  return `${pageHead('学习工作台', '掌握练习节奏，把每次答题都变成进步。', `<button class="btn btn-primary" data-page="practice">开始练习 →</button>`)}
    <div class="stat-grid">
      ${statCard('▤', '可练习试卷', published.length, '持续更新')}
      ${statCard('✓', '已完成练习', myAttempts.length, '本学期')}
      ${statCard('◒', '平均得分', avg || '—', avg ? '保持得不错' : '完成一次练习后显示')}
      ${statCard('⌁', '待复习错题', getStudentMistakes().length, '建议及时复盘')}
    </div>
    <div class="content-grid">
      <div class="panel"><div class="panel-head"><h2>推荐练习</h2><button class="btn btn-ghost btn-sm" data-page="practice">查看全部 →</button></div><div class="panel-body"><div class="paper-grid">${published.slice(0, 2).map(paperCard).join('')}</div></div></div>
      <div class="panel"><div class="panel-head"><h2>学习提醒</h2></div><div class="panel-body"><div class="notice-list"><div class="notice"><span class="notice-icon">✦</span><div><strong>坚持每天完成 1 套练习</strong><span>连续学习更容易形成长期记忆。</span></div></div><div class="notice"><span class="notice-icon">⌁</span><div><strong>还有 ${getStudentMistakes().length} 道错题待复习</strong><span>在错题本中查看解析并重新作答。</span></div></div></div></div></div>
    </div>`;
}

function renderCourses() {
  const filtered = data.courses.filter(course => `${course.name}${course.code}${teacherName(course.teacherId)}`.toLowerCase().includes(courseSearch.toLowerCase()));
  return `${pageHead('课程管理', '维护课程、任课教师与选课数据。', `<button class="btn btn-primary" data-action="create-course">＋ 新建课程</button>`)}
    <div class="panel"><div class="panel-body"><div class="toolbar"><div class="toolbar-left"><div class="search-box"><span>⌕</span><input id="course-search" value="${escapeHtml(courseSearch)}" placeholder="搜索课程名称、编号或教师" /></div></div><div class="toolbar-right"><span class="muted small">共 ${filtered.length} 门课程</span></div></div></div>${filtered.length ? `<div class="table-wrap"><table><thead><tr><th>课程信息</th><th>任课教师</th><th>学期</th><th>学生数</th><th>状态</th><th>操作</th></tr></thead><tbody>${filtered.map(course => `<tr><td><span class="table-primary">${escapeHtml(course.name)}</span><span class="table-sub">${escapeHtml(course.code)}</span></td><td>${escapeHtml(teacherName(course.teacherId))}</td><td>${escapeHtml(course.term)}</td><td>${course.students} 人</td><td>${statusBadge(course.status)}</td><td><div class="table-actions"><button class="btn btn-secondary btn-sm" data-action="edit-course" data-id="${course.id}">编辑</button><button class="btn btn-danger btn-sm" data-action="delete-course" data-id="${course.id}">删除</button></div></td></tr>`).join('')}</tbody></table></div>` : emptyState('▦', '没有找到匹配的课程')}</div>`;
}

function renderTypes() {
  return `${pageHead('题型管理', '配置题型规则、默认分值和使用说明。', `<button class="btn btn-primary" data-action="create-type">＋ 新建题型</button>`)}
    <div class="content-grid equal"><div class="panel"><div class="panel-head"><h2>题型规则</h2><span class="muted">${data.types.length} 种题型</span></div>${data.types.length ? `<div class="table-wrap"><table><thead><tr><th>题型</th><th>编码</th><th>默认分值</th><th>试题数</th><th>操作</th></tr></thead><tbody>${data.types.map(type => { const count = data.questions.filter(q => q.type === type.type).length; return `<tr><td><span class="badge ${typeBadge(type.type)}">${escapeHtml(type.name)}</span></td><td>${escapeHtml(type.code)}</td><td>${type.score} 分</td><td>${count} 道</td><td><div class="table-actions"><button class="btn btn-secondary btn-sm" data-action="edit-type" data-id="${type.id}">编辑</button><button class="btn btn-danger btn-sm" data-action="delete-type" data-id="${type.id}">删除</button></div></td></tr>`; }).join('')}</tbody></table></div>` : emptyState('◈', '还没有配置题型')}</div><div class="panel"><div class="panel-head"><h2>题型使用说明</h2></div><div class="panel-body"><div class="notice-list">${data.types.slice(0, 5).map(type => `<div class="notice"><span class="notice-icon">${type.name.slice(0,1)}</span><div><strong>${escapeHtml(type.name)} · ${type.score} 分</strong><span>${escapeHtml(type.description)}</span></div></div>`).join('')}</div></div></div></div>`;
}

function renderQuestions() {
  const filtered = filteredQuestions();
  const filterOptions = (items, selected, labelFn = item => item) => items.map(item => `<option value="${escapeHtml(item.id || item)}" ${String(selected) === String(item.id || item) ? 'selected' : ''}>${escapeHtml(labelFn(item))}</option>`).join('');
  return `${pageHead('试题管理', '沉淀高质量试题，支持筛选、编辑和发布。', `<button class="btn btn-secondary" data-action="reset-question-filters">重置筛选</button><button class="btn btn-primary" data-action="create-question">＋ 新建试题</button>`)}
    <div class="panel"><div class="panel-body"><div class="toolbar"><div class="toolbar-left"><div class="search-box"><span>⌕</span><input id="question-search" value="${escapeHtml(questionFilters.search)}" placeholder="搜索题干或知识点" /></div><select class="filter-select" id="question-course-filter"><option value="all">全部课程</option>${filterOptions(data.courses, questionFilters.courseId, item => item.name)}</select><select class="filter-select" id="question-type-filter"><option value="all">全部题型</option>${Object.entries(typeMeta).map(([key, meta]) => `<option value="${key}" ${questionFilters.type === key ? 'selected' : ''}>${meta.label}</option>`).join('')}</select><select class="filter-select" id="question-difficulty-filter"><option value="all">全部难度</option>${['简单', '中等', '较难'].map(item => `<option value="${item}" ${questionFilters.difficulty === item ? 'selected' : ''}>${item}</option>`).join('')}</select><select class="filter-select" id="question-status-filter"><option value="all">全部状态</option>${['已发布', '草稿'].map(item => `<option value="${item}" ${questionFilters.status === item ? 'selected' : ''}>${item}</option>`).join('')}</select></div><div class="toolbar-right"><span class="muted small">筛选出 ${filtered.length} 道</span></div></div></div>${renderQuestionTable(filtered)}</div>`;
}

function filteredQuestions() {
  const f = questionFilters;
  return data.questions.filter(q => {
    const haystack = `${q.stem}${q.tags.join(' ')}`.toLowerCase();
    return (!f.search || haystack.includes(f.search.toLowerCase())) && (f.courseId === 'all' || q.courseId === f.courseId) && (f.type === 'all' || q.type === f.type) && (f.difficulty === 'all' || q.difficulty === f.difficulty) && (f.status === 'all' || q.status === f.status);
  });
}

function renderQuestionTable(questions, compact = false) {
  if (!questions.length) return emptyState('◇', '没有找到匹配的试题');
  return `<div class="table-wrap"><table><thead><tr><th>试题</th><th>课程 / 题型</th><th>难度</th><th>分值</th><th>状态</th>${compact ? '' : '<th>操作</th>'}</tr></thead><tbody>${questions.map(q => `<tr><td><div class="question-stem" title="${escapeHtml(q.stem)}">${escapeHtml(q.stem)}</div><div class="question-meta">${q.tags.slice(0, 2).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div></td><td><span class="table-primary">${escapeHtml(courseName(q.courseId))}</span><span class="table-sub"><span class="badge ${typeBadge(q.type)}">${typeLabel(q.type)}</span></span></td><td>${difficultyBadge(q.difficulty)}</td><td>${q.score} 分</td><td>${statusBadge(q.status)}</td>${compact ? '' : `<td><div class="table-actions"><button class="btn btn-secondary btn-sm" data-action="view-question" data-id="${q.id}">查看</button><button class="btn btn-secondary btn-sm" data-action="edit-question" data-id="${q.id}">编辑</button><button class="btn btn-danger btn-sm" data-action="delete-question" data-id="${q.id}">删除</button></div></td>`}</tr>`).join('')}</tbody></table></div>`;
}

function renderPapers() {
  const filtered = data.papers.filter(paper => `${paper.title}${courseName(paper.courseId)}`.toLowerCase().includes(paperSearch.toLowerCase()));
  return `${pageHead('试卷管理', '灵活组卷并管理试卷发布状态。', `<button class="btn btn-primary" data-action="create-paper">＋ 创建试卷</button>`)}
    <div class="toolbar"><div class="toolbar-left"><div class="search-box"><span>⌕</span><input id="paper-search" value="${escapeHtml(paperSearch)}" placeholder="搜索试卷名称或课程" /></div></div><div class="toolbar-right"><span class="muted small">共 ${filtered.length} 份试卷</span></div></div>
    ${filtered.length ? `<div class="paper-grid">${filtered.map(paperCard).join('')}</div>` : emptyState('▤', '没有找到匹配的试卷')}`;
}

function paperCard(paper) {
  const attemptCount = data.attempts.filter(a => a.paperId === paper.id).length;
  return `<article class="paper-card"><div class="paper-card-top"><span class="badge ${paper.status === '已发布' ? 'badge-green' : 'badge-gray'}">${paper.status}</span><button class="btn btn-ghost btn-sm" data-action="paper-menu" data-id="${paper.id}">•••</button></div><h3>${escapeHtml(paper.title)}</h3><p>${escapeHtml(courseName(paper.courseId))} · ${paper.duration} 分钟</p><div class="paper-stats"><span>◇ ${paper.questionIds.length} 题</span><span>◎ ${paperScore(paper)} 分</span><span>◒ ${attemptCount} 次</span></div><div class="paper-card-footer"><span class="muted small">${paper.status === '已发布' ? `发布于 ${paper.publishAt}` : '尚未发布'}</span>${currentUser.role === 'student' ? `<button class="btn btn-primary btn-sm" data-action="start-exam" data-id="${paper.id}">${data.attempts.some(a => a.paperId === paper.id && a.studentId === currentUser.id) ? '再次练习' : '开始答题'} →</button>` : `<button class="btn btn-secondary btn-sm" data-action="view-paper" data-id="${paper.id}">查看详情</button>`}</div></article>`;
}

function renderUsers() {
  return `${pageHead('用户管理', '维护系统账号和角色权限。', `<button class="btn btn-primary" data-action="create-user">＋ 新增用户</button>`)}
    <div class="panel"><div class="panel-head"><h2>系统用户</h2><span class="muted">共 ${data.users.length} 个账号</span></div><div class="table-wrap"><table><thead><tr><th>用户</th><th>账号</th><th>角色</th><th>状态</th><th>最近登录</th><th>操作</th></tr></thead><tbody>${data.users.map(user => `<tr><td><div class="flex align-center gap-8"><span class="avatar" style="width:28px;height:28px;font-size:11px;">${escapeHtml(initials(user.name))}</span><span class="table-primary">${escapeHtml(user.name)}</span></div></td><td>${escapeHtml(user.username)}</td><td><span class="badge ${user.role === 'admin' ? 'badge-purple' : user.role === 'teacher' ? 'badge-blue' : 'badge-green'}">${roleLabel(user.role)}</span></td><td>${statusBadge(user.status)}</td><td>${escapeHtml(user.lastLogin || '—')}</td><td><div class="table-actions"><button class="btn btn-secondary btn-sm" data-action="edit-user" data-id="${user.id}">编辑</button>${user.id !== currentUser.id ? `<button class="btn btn-danger btn-sm" data-action="delete-user" data-id="${user.id}">删除</button>` : ''}</div></td></tr>`).join('')}</tbody></table></div></div>`;
}

function renderPractice() {
  const published = data.papers.filter(p => p.status === '已发布');
  return `${pageHead('在线练习', '按课程练习已发布试卷，巩固学习效果。', `<button class="btn btn-secondary" data-page="mistakes">查看错题本</button>`)}
    <div class="paper-grid">${published.length ? published.map(paperCard).join('') : emptyState('▤', '暂时没有已发布试卷')}</div>`;
}

function renderResults() {
  const attempts = currentUser.role === 'student' ? data.attempts.filter(a => a.studentId === currentUser.id) : data.attempts;
  return `${pageHead('成绩分析', currentUser.role === 'student' ? '查看你的练习成绩和答题表现。' : '查看考试结果和知识点掌握情况。', '')}
    ${currentUser.role === 'student' ? renderStudentResultSummary(attempts) : renderTeacherResultSummary(attempts)}`;
}

function renderStudentResultSummary(attempts) {
  const avg = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length) : 0;
  const best = attempts.length ? Math.max(...attempts.map(item => item.score)) : 0;
  return `<div class="stat-grid">${statCard('◒', '平均得分', avg || '—', '继续保持')}${statCard('★', '最高得分', best || '—', '目前最佳')}${statCard('▤', '完成试卷', attempts.length, '本学期')}${statCard('⌁', '需要复习', getStudentMistakes().length, '道错题')}</div><div class="panel"><div class="panel-head"><h2>我的答题记录</h2></div>${renderAttemptTable(attempts, true)}</div>`;
}

function renderTeacherResultSummary(attempts) {
  const avg = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + item.score, 0) / attempts.length) : 0;
  const high = attempts.filter(item => item.score >= 90).length;
  return `<div class="stat-grid">${statCard('◒', '平均得分', avg || '—', '较上期 ↑ 2.1')}${statCard('★', '优秀率', attempts.length ? `${Math.round(high / attempts.length * 100)}%` : '—', '目标 35%')}${statCard('▤', '提交次数', attempts.length, '全课程')}${statCard('⌁', '待关注题目', 4, '建议复核')}</div><div class="content-grid"><div class="panel"><div class="panel-head"><h2>最近答题记录</h2><span class="muted">按时间倒序</span></div>${renderAttemptTable(attempts)}</div><div class="panel"><div class="panel-head"><h2>课程掌握概况</h2></div><div class="panel-body">${data.courses.slice(0, 4).map((course, index) => `<div class="progress-row"><div class="progress-label"><span>${escapeHtml(course.name)}</span><strong>${[86, 74, 68, 91][index] || 76}%</strong></div><div class="progress"><span style="width:${[86, 74, 68, 91][index] || 76}%"></span></div></div>`).join('')}</div></div></div>`;
}

function renderAttemptTable(attempts, isStudent = false) {
  if (!attempts.length) return emptyState('◒', '还没有答题记录');
  return `<div class="table-wrap"><table><thead><tr><th>试卷</th>${isStudent ? '' : '<th>学生</th>'}<th>课程</th><th>得分</th><th>提交时间</th><th>用时</th><th>操作</th></tr></thead><tbody>${[...attempts].sort((a,b) => b.submittedAt.localeCompare(a.submittedAt)).map(attempt => { const paper = getPaper(attempt.paperId); return `<tr><td><span class="table-primary">${escapeHtml(paper?.title || '未知试卷')}</span></td>${isStudent ? '' : `<td>${escapeHtml(getUser(attempt.studentId)?.name || '未知学生')}</td>`}<td>${escapeHtml(courseName(paper?.courseId))}</td><td><strong style="color:${attempt.score >= 90 ? 'var(--primary)' : attempt.score >= 60 ? 'var(--amber)' : 'var(--red)'}">${attempt.score} 分</strong></td><td>${escapeHtml(attempt.submittedAt)}</td><td>${attempt.duration || '—'} 分钟</td><td><button class="btn btn-secondary btn-sm" data-action="view-attempt" data-id="${attempt.id}">查看解析</button></td></tr>`; }).join('')}</tbody></table></div>`;
}

function getStudentMistakes() {
  const mistakes = [];
  data.attempts.filter(a => a.studentId === currentUser?.id).forEach(attempt => {
    const paper = getPaper(attempt.paperId);
    paper?.questionIds.forEach(qid => {
      const q = getQuestion(qid);
      if (q && !isAnswerCorrect(q, attempt.answers?.[qid])) mistakes.push({ ...q, paperTitle: paper.title, attemptId: attempt.id });
    });
  });
  return mistakes.filter((item, index, array) => array.findIndex(other => other.id === item.id) === index);
}

function renderMistakes() {
  const mistakes = getStudentMistakes();
  return `${pageHead('错题本', '复盘错题，形成个性化学习闭环。', `<button class="btn btn-secondary" data-action="clear-mistakes">清空错题记录</button>`)}<div class="panel"><div class="panel-head"><h2>待复习题目</h2><span class="muted">共 ${mistakes.length} 道</span></div>${mistakes.length ? `<div class="table-wrap"><table><thead><tr><th>题目</th><th>课程</th><th>题型</th><th>我的答案</th><th>正确答案</th><th>操作</th></tr></thead><tbody>${mistakes.map(q => { const attempt = data.attempts.find(a => a.id === q.attemptId); return `<tr><td><div class="question-stem" title="${escapeHtml(q.stem)}">${escapeHtml(q.stem)}</div><span class="table-sub">${escapeHtml(q.explanation)}</span></td><td>${escapeHtml(courseName(q.courseId))}</td><td><span class="badge ${typeBadge(q.type)}">${typeLabel(q.type)}</span></td><td style="color:var(--red)">${escapeHtml(attempt.answers?.[q.id] || '未作答')}</td><td style="color:var(--primary);font-weight:700">${escapeHtml(q.answer)}</td><td><button class="btn btn-secondary btn-sm" data-action="view-question" data-id="${q.id}">查看解析</button></td></tr>`; }).join('')}</tbody></table></div>` : emptyState('⌁', '太棒了，当前没有错题')}</div>`;
}

function statusBadge(status) {
  const map = { '已发布': 'badge-green', '进行中': 'badge-green', '正常': 'badge-green', '草稿': 'badge-gray', '未开始': 'badge-blue', '已结束': 'badge-gray' };
  return `<span class="badge ${map[status] || 'badge-gray'}">${escapeHtml(status)}</span>`;
}

function difficultyBadge(difficulty) {
  const map = { '简单': 'badge-green', '中等': 'badge-amber', '较难': 'badge-red' };
  return `<span class="badge ${map[difficulty] || 'badge-gray'}">${escapeHtml(difficulty)}</span>`;
}

function emptyState(icon, text) { return `<div class="empty-state"><div><div class="empty-icon">${icon}</div><p>${text}</p></div></div>`; }

function bindPageEvents() {
  document.querySelectorAll('#page-content [data-page]').forEach(button => button.addEventListener('click', () => { currentPage = button.dataset.page; renderShell(); renderCurrentPage(); }));
  document.querySelectorAll('[data-action]').forEach(button => {
    const action = button.dataset.action;
    if (['logout', 'toggle-sidebar', 'show-notifications', 'profile'].includes(action)) return;
    button.addEventListener('click', () => handleAction(action, button.dataset.id));
  });
  document.querySelector('#course-search')?.addEventListener('input', event => { courseSearch = event.target.value; renderCurrentPage(); });
  document.querySelector('#paper-search')?.addEventListener('input', event => { paperSearch = event.target.value; renderCurrentPage(); });
  document.querySelector('#question-search')?.addEventListener('input', event => { questionFilters.search = event.target.value; renderCurrentPage(); });
  document.querySelector('#question-course-filter')?.addEventListener('change', event => { questionFilters.courseId = event.target.value; renderCurrentPage(); });
  document.querySelector('#question-type-filter')?.addEventListener('change', event => { questionFilters.type = event.target.value; renderCurrentPage(); });
  document.querySelector('#question-difficulty-filter')?.addEventListener('change', event => { questionFilters.difficulty = event.target.value; renderCurrentPage(); });
  document.querySelector('#question-status-filter')?.addEventListener('change', event => { questionFilters.status = event.target.value; renderCurrentPage(); });
}

function handleAction(action, id) {
  const handlers = {
    'create-course': () => openModal('course-form', { mode: 'create' }),
    'edit-course': () => openModal('course-form', { mode: 'edit', id }),
    'delete-course': () => confirmDelete('课程', id, () => { data.courses = data.courses.filter(item => item.id !== id); saveData(); render(); }),
    'create-type': () => openModal('type-form', { mode: 'create' }),
    'edit-type': () => openModal('type-form', { mode: 'edit', id }),
    'delete-type': () => confirmDelete('题型', id, () => { if (data.questions.some(q => q.type === data.types.find(t => t.id === id)?.type)) { toast('该题型仍被试题使用，暂时不能删除。', 'warning'); return; } data.types = data.types.filter(item => item.id !== id); saveData(); render(); }),
    'create-question': () => openModal('question-form', { mode: 'create' }),
    'edit-question': () => openModal('question-form', { mode: 'edit', id }),
    'view-question': () => openModal('question-detail', { id }),
    'delete-question': () => confirmDelete('试题', id, () => { data.questions = data.questions.filter(item => item.id !== id); data.papers.forEach(paper => { paper.questionIds = paper.questionIds.filter(qid => qid !== id); }); saveData(); render(); }),
    'reset-question-filters': () => { questionFilters = { search: '', courseId: 'all', type: 'all', difficulty: 'all', status: 'all' }; renderCurrentPage(); },
    'create-paper': () => openModal('paper-form', { mode: 'create' }),
    'view-paper': () => openModal('paper-detail', { id }),
    'paper-menu': () => openModal('paper-detail', { id }),
    'create-user': () => openModal('user-form', { mode: 'create' }),
    'edit-user': () => openModal('user-form', { mode: 'edit', id }),
    'delete-user': () => confirmDelete('用户', id, () => { data.users = data.users.filter(item => item.id !== id); saveData(); render(); }),
    'start-exam': () => openModal('exam', { id }),
    'view-attempt': () => openModal('attempt-detail', { id }),
    'clear-mistakes': () => { toast('错题记录会在下次练习提交后重新计算。', 'warning'); },
    'submit-exam': () => submitExam(id),
    'publish-paper': () => { const paper = getPaper(id); if (!paper) return; paper.status = '已发布'; paper.publishAt = formatDate(); saveData(); closeModal(); render(); toast('试卷已发布，学生现在可以开始练习。'); },
    'unpublish-paper': () => { const paper = getPaper(id); if (!paper) return; paper.status = '草稿'; saveData(); closeModal(); render(); toast('试卷已撤回为草稿。'); },
    'delete-paper': () => confirmDelete('试卷', id, () => { data.papers = data.papers.filter(item => item.id !== id); saveData(); closeModal(); render(); })
  };
  handlers[action]?.();
}

function confirmDelete(label, id, callback) { openModal('confirm', { label, id, callback }); }

function openModal(type, payload = {}) { modalState = { type, ...payload }; renderModal(); }

function closeModal() { modalState = null; renderModal(); }

function renderModal() {
  document.querySelector('#modal-root')?.remove();
  if (!modalState) return;
  const root = document.createElement('div');
  root.id = 'modal-root';
  root.className = 'modal-backdrop';
  root.innerHTML = modalTemplate(modalState);
  document.body.appendChild(root);
  root.addEventListener('click', event => { if (event.target === root) closeModal(); });
  root.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => {
    const examForm = root.querySelector('#exam-form');
    if (examForm) {
      saveExamDraft(examForm);
      toast('本次作答已暂存，下次打开试卷可以继续。');
    }
    closeModal();
  }));
  bindModalEvents(root);
}

function modalTemplate(state) {
  const close = '<button class="modal-close" data-close-modal aria-label="关闭">×</button>';
  if (state.type === 'notifications') return `<div class="modal"><div class="modal-head"><div><h2>通知中心</h2><p>与你相关的最近动态</p></div>${close}</div><div class="modal-body"><div class="notice-list">${data.notifications.filter(n => n.roles.includes(currentUser.role)).map(n => `<div class="notice"><span class="notice-icon">${n.kind === 'warning' ? '!' : '✓'}</span><div><strong>${escapeHtml(n.title)}</strong><span>${n.time}</span></div></div>`).join('')}</div></div></div>`;
  if (state.type === 'profile') return `<div class="modal"><div class="modal-head"><div><h2>个人信息</h2><p>当前登录账号信息</p></div>${close}</div><div class="modal-body"><div class="result-score-card"><span class="score-circle">${escapeHtml(initials(currentUser.name))}</span><div><h2>${escapeHtml(currentUser.name)}</h2><p>${escapeHtml(currentUser.username)} · ${roleLabel(currentUser.role)}</p></div></div><div class="form-grid mt-18"><div class="input-group"><span class="field-label">账号</span><input value="${escapeHtml(currentUser.username)}" disabled /></div><div class="input-group"><span class="field-label">状态</span><input value="${escapeHtml(currentUser.status)}" disabled /></div></div></div><div class="modal-footer"><button class="btn btn-primary" data-close-modal>知道了</button></div></div>`;
  if (state.type === 'confirm') return `<div class="modal"><div class="modal-head"><div><h2>确认删除</h2><p>此操作会从当前系统中移除数据</p></div>${close}</div><div class="modal-body"><div class="confirm-copy">确定要删除这个${escapeHtml(state.label)}吗？如果它已被其他数据引用，系统会阻止删除。</div></div><div class="modal-footer"><button class="btn btn-secondary" data-close-modal>取消</button><button class="btn btn-danger" data-confirm-delete>确认删除</button></div></div>`;
  if (state.type === 'course-form') return courseFormTemplate(state, close);
  if (state.type === 'type-form') return typeFormTemplate(state, close);
  if (state.type === 'question-form') return questionFormTemplate(state, close);
  if (state.type === 'paper-form') return paperFormTemplate(state, close);
  if (state.type === 'user-form') return userFormTemplate(state, close);
  if (state.type === 'question-detail') return questionDetailTemplate(state, close);
  if (state.type === 'paper-detail') return paperDetailTemplate(state, close);
  if (state.type === 'attempt-detail') return attemptDetailTemplate(state, close);
  if (state.type === 'exam') return examTemplate(state, close);
  return '';
}

function courseFormTemplate(state, close) {
  const course = state.id ? getCourse(state.id) : { name: '', code: '', teacherId: data.users.find(u => u.role === 'teacher')?.id || '', term: '2026 秋季', status: '未开始', students: 0, description: '' };
  return `<div class="modal"><div class="modal-head"><div><h2>${state.mode === 'edit' ? '编辑课程' : '新建课程'}</h2><p>填写课程基础信息，便于后续组织试题。</p></div>${close}</div><form id="course-form-modal"><div class="modal-body"><div class="form-grid"><div class="input-group"><label class="field-label">课程名称 *</label><input name="name" value="${escapeHtml(course.name)}" required placeholder="如：软件工程基础" /></div><div class="input-group"><label class="field-label">课程编号 *</label><input name="code" value="${escapeHtml(course.code)}" required placeholder="如：SE-101" /></div><div class="input-group"><label class="field-label">任课教师 *</label><select name="teacherId" required>${data.users.filter(u => u.role === 'teacher').map(u => `<option value="${u.id}" ${course.teacherId === u.id ? 'selected' : ''}>${escapeHtml(u.name)}</option>`).join('')}</select></div><div class="input-group"><label class="field-label">开设学期</label><input name="term" value="${escapeHtml(course.term)}" placeholder="如：2026 秋季" /></div><div class="input-group"><label class="field-label">课程状态</label><select name="status">${['未开始', '进行中', '已结束'].map(s => `<option ${course.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div><div class="input-group"><label class="field-label">学生人数</label><input type="number" min="0" name="students" value="${course.students || 0}" /></div><div class="input-group full"><label class="field-label">课程简介</label><textarea name="description" placeholder="描述课程内容和学习目标">${escapeHtml(course.description || '')}</textarea></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-close-modal>取消</button><button type="submit" class="btn btn-primary">保存课程</button></div></form></div>`;
}

function typeFormTemplate(state, close) {
  const type = state.id ? data.types.find(t => t.id === state.id) : { name: '', code: '', type: 'single', score: 5, description: '' };
  return `<div class="modal"><div class="modal-head"><div><h2>${state.mode === 'edit' ? '编辑题型' : '新建题型'}</h2><p>统一题型编码和默认分值规则。</p></div>${close}</div><form id="type-form-modal"><div class="modal-body"><div class="form-grid"><div class="input-group"><label class="field-label">题型名称 *</label><input name="name" value="${escapeHtml(type.name)}" required placeholder="如：单选题" /></div><div class="input-group"><label class="field-label">题型编码 *</label><input name="code" value="${escapeHtml(type.code)}" required placeholder="如：SINGLE" /></div><div class="input-group"><label class="field-label">题型分类 *</label><select name="type">${Object.entries(typeMeta).map(([key, meta]) => `<option value="${key}" ${type.type === key ? 'selected' : ''}>${meta.label}</option>`).join('')}</select></div><div class="input-group"><label class="field-label">默认分值 *</label><input type="number" name="score" min="1" value="${type.score}" required /></div><div class="input-group full"><label class="field-label">题型说明</label><textarea name="description">${escapeHtml(type.description || '')}</textarea></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-close-modal>取消</button><button type="submit" class="btn btn-primary">保存题型</button></div></form></div>`;
}

function questionFormTemplate(state, close) {
  const q = state.id ? getQuestion(state.id) : { courseId: data.courses[0]?.id || '', type: 'single', stem: '', options: ['', '', '', ''], answer: 'A', score: 5, difficulty: '中等', tags: [], status: '草稿', explanation: '' };
  const optionRows = q.type === 'judge' ? ['正确', '错误'] : q.type === 'fill' || q.type === 'essay' ? [] : (q.options?.length ? q.options : ['', '', '', '']);
  const optionInputs = optionRows.map((option, index) => `<div class="option-row"><span class="option-letter">${String.fromCharCode(65 + index)}</span><input type="text" name="option-${index}" value="${escapeHtml(option)}" placeholder="输入选项内容" /></div>`).join('');
  return `<div class="modal wide"><div class="modal-head"><div><h2>${state.mode === 'edit' ? '编辑试题' : '新建试题'}</h2><p>题干、答案和解析是题库质量的核心，请认真填写。</p></div>${close}</div><form id="question-form-modal"><div class="modal-body"><div class="question-editor"><div class="form-grid"><div class="input-group"><label class="field-label">所属课程 *</label><select name="courseId" required>${data.courses.map(c => `<option value="${c.id}" ${q.courseId === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}</select></div><div class="input-group"><label class="field-label">题型 *</label><select name="type" id="question-type-input">${Object.entries(typeMeta).map(([key, meta]) => `<option value="${key}" ${q.type === key ? 'selected' : ''}>${meta.label}</option>`).join('')}</select></div><div class="input-group"><label class="field-label">难度</label><select name="difficulty">${['简单', '中等', '较难'].map(d => `<option ${q.difficulty === d ? 'selected' : ''}>${d}</option>`).join('')}</select></div><div class="input-group"><label class="field-label">分值</label><input type="number" name="score" min="1" value="${q.score || 5}" /></div><div class="input-group full"><label class="field-label">题干 *</label><textarea name="stem" required placeholder="请输入完整题目">${escapeHtml(q.stem)}</textarea></div><div class="input-group full"><label class="field-label">选项</label><div id="question-options" class="option-list">${optionInputs || '<span class="muted small">该题型不需要设置选项。</span>'}</div></div><div class="input-group full"><label class="field-label">正确答案 *</label><div id="answer-area">${answerArea(q, optionRows)}</div></div><div class="input-group"><label class="field-label">知识点标签</label><input name="tags" value="${escapeHtml(q.tags?.join('、') || '')}" placeholder="多个标签用顿号分隔" /></div><div class="input-group"><label class="field-label">发布状态</label><select name="status"><option ${q.status === '草稿' ? 'selected' : ''}>草稿</option><option ${q.status === '已发布' ? 'selected' : ''}>已发布</option></select></div><div class="input-group full"><label class="field-label">答案解析</label><textarea name="explanation" placeholder="说明答案依据，帮助学生复盘">${escapeHtml(q.explanation || '')}</textarea></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-close-modal>取消</button><button type="submit" class="btn btn-primary">保存试题</button></div></form></div>`;
}

function answerArea(q, options) {
  if (q.type === 'multiple') return `<div class="answer-selector">${options.map((_, index) => `<label><input type="checkbox" name="answer-multi" value="${String.fromCharCode(65 + index)}" ${q.answer?.includes(String.fromCharCode(65 + index)) ? 'checked' : ''} /> ${String.fromCharCode(65 + index)}</label>`).join('')}</div>`;
  if (q.type === 'judge') return `<div class="answer-selector"><label><input type="radio" name="answer" value="A" ${q.answer === 'A' ? 'checked' : ''} /> A · 正确</label><label><input type="radio" name="answer" value="B" ${q.answer === 'B' ? 'checked' : ''} /> B · 错误</label></div>`;
  if (q.type === 'single') return `<div class="answer-selector">${options.map((_, index) => `<label><input type="radio" name="answer" value="${String.fromCharCode(65 + index)}" ${q.answer === String.fromCharCode(65 + index) ? 'checked' : ''} /> ${String.fromCharCode(65 + index)}</label>`).join('')}</div>`;
  return `<input name="answer-text" value="${escapeHtml(q.answer || '')}" placeholder="请输入标准答案（可用关键词）" />`;
}

function paperFormTemplate(state, close) {
  const available = data.questions.filter(q => q.status === '已发布');
  const selected = [];
  return `<div class="modal wide"><div class="modal-head"><div><h2>创建试卷</h2><p>手动选择试题，实时查看题数与总分。</p></div>${close}</div><form id="paper-form-modal"><div class="modal-body"><div class="paper-builder"><div class="selection-summary"><h3>试卷设置</h3><div class="input-group"><label class="field-label">试卷名称 *</label><input name="title" required placeholder="如：软件工程基础 · 期中考试" /></div><div class="input-group mt-12"><label class="field-label">所属课程 *</label><select name="courseId">${data.courses.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('')}</select></div><div class="input-group mt-12"><label class="field-label">考试时长（分钟）</label><input name="duration" type="number" min="5" value="60" /></div><div class="selection-score"><span>已选试题 / 总分</span><strong id="selected-score">0 / 0</strong></div><div id="selection-summary-list" class="selection-list"><span class="muted small">请从右侧选择试题</span></div></div><div><div class="toolbar"><div class="toolbar-left"><strong>选择试题</strong><span class="muted small">仅显示已发布试题</span></div><span class="muted small">${available.length} 道可用</span></div><div class="question-select-list" id="paper-question-list">${available.map(q => `<label class="question-select-item" data-question-select="${q.id}"><input type="checkbox" name="questionIds" value="${q.id}" /><span class="question-select-copy"><strong>${escapeHtml(q.stem)}</strong><span>${courseName(q.courseId)} · ${typeLabel(q.type)} · ${q.score} 分</span></span></label>`).join('')}</div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-close-modal>取消</button><button type="submit" class="btn btn-primary">保存为草稿</button></div></form></div>`;
}

function userFormTemplate(state, close) {
  const user = state.id ? getUser(state.id) : { name: '', username: '', password: '123456', role: 'student', status: '正常' };
  return `<div class="modal"><div class="modal-head"><div><h2>${state.mode === 'edit' ? '编辑用户' : '新增用户'}</h2><p>配置账号身份和使用状态。</p></div>${close}</div><form id="user-form-modal"><div class="modal-body"><div class="form-grid"><div class="input-group"><label class="field-label">姓名 *</label><input name="name" value="${escapeHtml(user.name)}" required /></div><div class="input-group"><label class="field-label">登录账号 *</label><input name="username" value="${escapeHtml(user.username)}" required /></div><div class="input-group"><label class="field-label">初始密码</label><input name="password" type="text" value="${escapeHtml(user.password || '123456')}" /></div><div class="input-group"><label class="field-label">角色 *</label><select name="role">${Object.entries(roleMeta).map(([key, meta]) => `<option value="${key}" ${user.role === key ? 'selected' : ''}>${meta.label}</option>`).join('')}</select></div><div class="input-group"><label class="field-label">账号状态</label><select name="status"><option ${user.status === '正常' ? 'selected' : ''}>正常</option><option ${user.status === '停用' ? 'selected' : ''}>停用</option></select></div></div></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-close-modal>取消</button><button type="submit" class="btn btn-primary">保存用户</button></div></form></div>`;
}

function questionDetailTemplate(state, close) {
  const q = getQuestion(state.id);
  if (!q) return '';
  return `<div class="modal wide"><div class="modal-head"><div><h2>试题详情</h2><p>${escapeHtml(courseName(q.courseId))} · ${typeLabel(q.type)} · ${q.score} 分</p></div>${close}</div><div class="modal-body"><div class="detail-hero"><div><h2>${escapeHtml(q.stem)}</h2><p>${q.tags.map(tag => `#${escapeHtml(tag)}`).join('　')} · 创建于 ${q.createdAt}</p></div><div class="big-number">${q.score}<span style="font-size:13px;"> 分</span></div></div>${q.options?.length ? `<div class="option-list mt-18">${q.options.map((option, index) => `<div class="option-row"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHtml(option)}</span>${q.answer.includes(String.fromCharCode(65 + index)) ? '<span class="badge badge-green" style="margin-left:auto">正确答案</span>' : ''}</div>`).join('')}</div>` : ''}<div class="panel mt-18"><div class="panel-head"><h2>答案解析</h2>${statusBadge(q.status)}</div><div class="panel-body"><p class="mb-0">${escapeHtml(q.explanation || '暂无解析。')}</p></div></div></div><div class="modal-footer"><button class="btn btn-secondary" data-close-modal>关闭</button>${canManage() ? `<button class="btn btn-primary" data-modal-action="edit-question" data-id="${q.id}">编辑试题</button>` : ''}</div></div>`;
}

function paperDetailTemplate(state, close) {
  const paper = getPaper(state.id);
  if (!paper) return '';
  return `<div class="modal wide"><div class="modal-head"><div><h2>${escapeHtml(paper.title)}</h2><p>${escapeHtml(courseName(paper.courseId))} · ${paper.duration} 分钟 · ${paper.questionIds.length} 道题</p></div>${close}</div><div class="modal-body"><div class="detail-hero"><div><h2>${paper.status === '已发布' ? '试卷正在开放练习' : '试卷草稿待发布'}</h2><p>${escapeHtml(paper.description || '暂无说明')}</p></div><div class="big-number">${paperScore(paper)}<span style="font-size:13px;"> 分</span></div></div><div class="panel mt-18"><div class="panel-head"><h2>试题清单</h2><span class="muted">按组卷顺序</span></div><div class="table-wrap"><table><thead><tr><th>#</th><th>题目</th><th>题型</th><th>分值</th></tr></thead><tbody>${paper.questionIds.map((qid, index) => { const q = getQuestion(qid); return q ? `<tr><td>${index + 1}</td><td><span class="question-stem">${escapeHtml(q.stem)}</span></td><td><span class="badge ${typeBadge(q.type)}">${typeLabel(q.type)}</span></td><td>${q.score} 分</td></tr>` : ''; }).join('')}</tbody></table></div></div></div><div class="modal-footer"><button class="btn btn-danger" data-modal-action="delete-paper" data-id="${paper.id}">删除试卷</button><span style="flex:1"></span><button class="btn btn-secondary" data-close-modal>关闭</button>${paper.status === '已发布' ? `<button class="btn btn-secondary" data-modal-action="unpublish-paper" data-id="${paper.id}">撤回发布</button>` : `<button class="btn btn-primary" data-modal-action="publish-paper" data-id="${paper.id}">发布试卷</button>`}</div></div>`;
}

function attemptDetailTemplate(state, close) {
  const attempt = data.attempts.find(item => item.id === state.id);
  const paper = attempt ? getPaper(attempt.paperId) : null;
  if (!attempt || !paper) return '';
  return `<div class="modal wide"><div class="modal-head"><div><h2>答题解析</h2><p>${escapeHtml(paper.title)} · ${escapeHtml(getUser(attempt.studentId)?.name || '')}</p></div>${close}</div><div class="modal-body"><div class="result-score-card"><span class="score-circle">${attempt.score}</span><div><h2>${attempt.score >= 60 ? '本次练习已达标' : '建议再复习后重试'}</h2><p>提交于 ${escapeHtml(attempt.submittedAt)}，用时 ${attempt.duration || '—'} 分钟</p></div></div><div class="mt-18">${paper.questionIds.map((qid, index) => { const q = getQuestion(qid); const answer = attempt.answers?.[qid] || '未作答'; const correct = isAnswerCorrect(q, answer); return q ? `<div class="activity-item"><span class="activity-dot" style="background:${correct ? 'var(--primary)' : 'var(--red)'}; box-shadow:0 0 0 4px ${correct ? 'var(--primary-soft)' : 'var(--red-soft)'}"></span><div class="activity-copy"><p><strong>${index + 1}. ${escapeHtml(q.stem)}</strong></p><span>你的答案：${escapeHtml(answer)}　|　正确答案：${escapeHtml(q.answer)}　|　${correct ? '回答正确' : '需要复习'}</span></div></div>` : ''; }).join('')}</div></div><div class="modal-footer"><button class="btn btn-primary" data-close-modal>完成</button></div></div>`;
}

function examTemplate(state, close) {
  const paper = getPaper(state.id);
  if (!paper) return '';
  const draft = loadExamDraft(paper.id);
  return `<div class="modal-backdrop" style="position:fixed;inset:0;background:var(--bg);backdrop-filter:none;overflow:auto;display:block;padding:0"><div class="exam-shell" style="padding:35px 20px 55px"><div class="exam-top"><div><h1>${escapeHtml(paper.title)}</h1><span class="muted">${escapeHtml(courseName(paper.courseId))} · 共 ${paper.questionIds.length} 题 · ${paperScore(paper)} 分</span></div><div class="exam-timer">◷ <span id="exam-timer">${paper.duration}:00</span></div></div><form id="exam-form" data-paper-id="${paper.id}">${paper.questionIds.map((qid, index) => examQuestion(getQuestion(qid), index, draft[qid] || '')).join('')}<div class="exam-submit-bar"><span class="muted">提交后将自动判分，简答题按标准答案关键词匹配。</span><div class="flex gap-8"><button type="button" class="btn btn-secondary" data-close-modal>暂存退出</button><button type="submit" class="btn btn-primary">提交试卷</button></div></div></form></div></div>`;
}

function examQuestion(q, index, draftAnswer = '') {
  if (!q) return '';
  if (q.type === 'essay' || q.type === 'fill') return `<div class="exam-question-card"><div class="exam-question-head"><span class="question-index">${index + 1}</span><h3>${escapeHtml(q.stem)} <span class="muted">（${q.score} 分）</span></h3></div><div class="exam-options"><textarea name="answer-${q.id}" placeholder="请输入你的答案">${escapeHtml(draftAnswer)}</textarea></div></div>`;
  return `<div class="exam-question-card"><div class="exam-question-head"><span class="question-index">${index + 1}</span><h3>${escapeHtml(q.stem)} <span class="muted">（${q.score} 分）</span></h3></div><div class="exam-options">${q.options.map((option, optionIndex) => { const letter = String.fromCharCode(65 + optionIndex); const checked = q.type === 'multiple' ? String(draftAnswer).includes(letter) : String(draftAnswer) === letter; return `<label class="exam-option"><input type="${q.type === 'multiple' ? 'checkbox' : 'radio'}" name="answer-${q.id}" value="${letter}" ${checked ? 'checked' : ''} /><span>${letter}. ${escapeHtml(option)}</span></label>`; }).join('')}</div></div>`;
}

function bindModalEvents(root) {
  root.querySelector('[data-confirm-delete]')?.addEventListener('click', () => { modalState.callback?.(); if (modalState) closeModal(); });
  root.querySelector('[data-modal-action]')?.addEventListener('click', event => handleAction(event.currentTarget.dataset.modalAction, event.currentTarget.dataset.id));
  root.querySelector('#course-form-modal')?.addEventListener('submit', event => saveCourse(event, modalState));
  root.querySelector('#type-form-modal')?.addEventListener('submit', event => saveType(event, modalState));
  root.querySelector('#question-form-modal')?.addEventListener('submit', event => saveQuestion(event, modalState));
  root.querySelector('#paper-form-modal')?.addEventListener('submit', event => savePaper(event));
  root.querySelector('#user-form-modal')?.addEventListener('submit', event => saveUser(event, modalState));
  root.querySelector('#question-type-input')?.addEventListener('change', event => {
    const existing = getQuestion(modalState.id) || { type: event.target.value, answer: '' };
    existing.type = event.target.value;
    const optionRows = event.target.value === 'judge' ? ['正确', '错误'] : event.target.value === 'fill' || event.target.value === 'essay' ? [] : ['', '', '', ''];
    root.querySelector('#question-options').innerHTML = optionRows.length ? optionRows.map((option, index) => `<div class="option-row"><span class="option-letter">${String.fromCharCode(65 + index)}</span><input type="text" name="option-${index}" value="${escapeHtml(option)}" placeholder="输入选项内容" /></div>`).join('') : '<span class="muted small">该题型不需要设置选项。</span>';
    root.querySelector('#answer-area').innerHTML = answerArea(existing, optionRows);
  });
  root.querySelectorAll('[data-question-select]').forEach(item => item.addEventListener('change', () => {
    item.classList.toggle('checked', item.querySelector('input').checked);
    updateSelectionSummary(root);
  }));
  root.querySelector('#exam-form')?.addEventListener('submit', event => { event.preventDefault(); submitExam(event.currentTarget.dataset.paperId, event.currentTarget); });
  const examTimer = root.querySelector('#exam-timer');
  if (examTimer) {
    const paper = getPaper(modalState.id);
    let seconds = (paper?.duration || 60) * 60;
    const timer = window.setInterval(() => {
      if (!document.body.contains(root)) { window.clearInterval(timer); return; }
      seconds = Math.max(0, seconds - 1);
      examTimer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
      if (seconds === 0) { window.clearInterval(timer); toast('考试时间到，正在提交试卷。', 'warning'); root.querySelector('#exam-form')?.requestSubmit(); }
    }, 1000);
  }
}

function updateSelectionSummary(root) {
  const ids = [...root.querySelectorAll('input[name="questionIds"]:checked')].map(input => input.value);
  const score = ids.reduce((sum, id) => sum + Number(getQuestion(id)?.score || 0), 0);
  root.querySelector('#selected-score').textContent = `${ids.length} / ${score}`;
  root.querySelector('#selection-summary-list').innerHTML = ids.length ? ids.map((id, index) => `<div class="selection-list-item"><span>${index + 1}. ${escapeHtml(getQuestion(id)?.stem || '')}</span><strong>${getQuestion(id)?.score || 0}分</strong></div>`).join('') : '<span class="muted small">请从右侧选择试题</span>';
}

function saveCourse(event, state) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  if (state.mode === 'edit') Object.assign(getCourse(state.id), { ...values, students: Number(values.students || 0) });
  else data.courses.unshift({ id: uid('c'), ...values, students: Number(values.students || 0) });
  saveData(); closeModal(); render(); toast(state.mode === 'edit' ? '课程已更新。' : '课程已创建。');
}

function saveType(event, state) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  if (state.mode === 'edit') Object.assign(data.types.find(item => item.id === state.id), { ...values, score: Number(values.score) });
  else data.types.unshift({ id: uid('t'), ...values, score: Number(values.score) });
  saveData(); closeModal(); render(); toast(state.mode === 'edit' ? '题型已更新。' : '题型已创建。');
}

function saveQuestion(event, state) {
  event.preventDefault();
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form));
  const type = values.type;
  const options = type === 'judge' ? ['正确', '错误'] : type === 'fill' || type === 'essay' ? [] : [0, 1, 2, 3].map(index => values[`option-${index}`]).filter(Boolean);
  const answer = type === 'multiple' ? [...form.querySelectorAll('input[name="answer-multi"]:checked')].map(input => input.value).sort().join('') : type === 'fill' || type === 'essay' ? values['answer-text'] : (values.answer || 'A');
  const question = { courseId: values.courseId, type, stem: values.stem, options, answer, score: Number(values.score || 5), difficulty: values.difficulty, tags: values.tags ? values.tags.split(/[、,，]/).map(item => item.trim()).filter(Boolean) : [], status: values.status, explanation: values.explanation || '', creatorId: currentUser.id, createdAt: state.mode === 'edit' ? getQuestion(state.id).createdAt : formatDate() };
  if (state.mode === 'edit') Object.assign(getQuestion(state.id), question);
  else data.questions.unshift({ id: uid('q'), ...question });
  saveData(); closeModal(); render(); toast(state.mode === 'edit' ? '试题已更新。' : '试题已创建。');
}

function savePaper(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form));
  const questionIds = [...form.querySelectorAll('input[name="questionIds"]:checked')].map(input => input.value);
  if (!questionIds.length) { toast('请至少选择 1 道试题。', 'warning'); return; }
  data.papers.unshift({ id: uid('p'), title: values.title, courseId: values.courseId, duration: Number(values.duration || 60), questionIds, status: '草稿', publishAt: '', creatorId: currentUser.id, description: '由题库试题组建的练习试卷。' });
  saveData(); closeModal(); render(); toast('试卷已保存为草稿，可在试卷详情中发布。');
}

function saveUser(event, state) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  if (state.mode === 'edit') Object.assign(getUser(state.id), values);
  else data.users.unshift({ id: uid('u'), ...values, lastLogin: '—' });
  saveData(); closeModal(); render(); toast(state.mode === 'edit' ? '用户已更新。' : '用户已创建。');
}

function isAnswerCorrect(question, answer) {
  if (!question || !answer) return false;
  if (question.type === 'essay') return String(answer).trim().length >= 10;
  if (question.type === 'fill') return String(answer).trim().includes(String(question.answer).trim());
  return String(answer).replace(/,/g, '').split('').sort().join('') === String(question.answer).split('').sort().join('');
}

function submitExam(paperId, form) {
  const paper = getPaper(paperId);
  if (!paper || !form) return;
  const formData = new FormData(form);
  const answers = {};
  paper.questionIds.forEach(qid => {
    const q = getQuestion(qid);
    if (q?.type === 'multiple') answers[qid] = formData.getAll(`answer-${qid}`).join('');
    else answers[qid] = formData.get(`answer-${qid}`) || '';
  });
  const score = paper.questionIds.reduce((sum, qid) => { const q = getQuestion(qid); return sum + (isAnswerCorrect(q, answers[qid]) ? Number(q.score || 0) : 0); }, 0);
  data.attempts.unshift({ id: uid('a'), paperId, studentId: currentUser.id, answers, score, totalScore: paperScore(paper), submittedAt: `${formatDate()} ${new Date().toTimeString().slice(0, 5)}`, duration: paper.duration });
  clearExamDraft(paperId);
  saveData(); closeModal(); currentPage = 'results'; render(); toast(`试卷已提交，本次得分 ${score} 分。`);
}

function examDraftKey(paperId) {
  return `${EXAM_DRAFT_PREFIX}-${currentUser.id}-${paperId}`;
}

function loadExamDraft(paperId) {
  try {
    return JSON.parse(localStorage.getItem(examDraftKey(paperId)) || '{}');
  } catch {
    return {};
  }
}

function saveExamDraft(form) {
  const paper = getPaper(form.dataset.paperId);
  if (!paper) return;
  const formData = new FormData(form);
  const answers = {};
  paper.questionIds.forEach(qid => {
    const q = getQuestion(qid);
    answers[qid] = q?.type === 'multiple' ? formData.getAll(`answer-${qid}`).join('') : formData.get(`answer-${qid}`) || '';
  });
  localStorage.setItem(examDraftKey(paper.id), JSON.stringify(answers));
}

function clearExamDraft(paperId) {
  localStorage.removeItem(examDraftKey(paperId));
}

function toast(message, type = 'success') {
  const node = document.createElement('div');
  node.className = `toast ${type === 'error' ? 'error' : type === 'warning' ? 'warning' : ''}`;
  node.innerHTML = `<span>${type === 'error' ? '!' : type === 'warning' ? '!' : '✓'}</span><span>${escapeHtml(message)}</span>`;
  toastRegion.appendChild(node);
  window.setTimeout(() => node.remove(), 3300);
}

render();
