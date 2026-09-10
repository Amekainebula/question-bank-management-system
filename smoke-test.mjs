const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';
const targets = ['/', '/index.html', '/styles.css', '/app.js', '/docs/README.md'];

for (const target of targets) {
  const response = await fetch(`${baseUrl}${target}`);
  if (!response.ok) throw new Error(`${target} returned HTTP ${response.status}`);
  console.log(`PASS ${target} ${response.status}`);
}

const index = await (await fetch(`${baseUrl}/`)).text();
if (!index.includes('知题') || !index.includes('app.js')) {
  throw new Error('首页缺少应用入口标记');
}

const app = await (await fetch(`${baseUrl}/app.js`)).text();
for (const marker of ['题库试题总数', '创建试卷', '在线练习', '成绩分析']) {
  if (!app.includes(marker)) throw new Error(`app.js 缺少功能标记：${marker}`);
}

console.log('PASS application markers');
