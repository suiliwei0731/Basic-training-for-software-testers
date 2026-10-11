// 软件测试学习闯关 - 后端服务
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { getDashboard, saveResult, resetProgress } = require('./db');
const tts = require('./tts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 确保数据目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// 默认用户名（单用户学习模式，后续可扩展多用户）
const DEFAULT_USER = 'learner';

// ---------- API ----------
// 获取学习仪表盘（经验值 + 各关卡进度）
app.get('/api/dashboard', (req, res) => {
  const user = req.query.user || DEFAULT_USER;
  res.json(getDashboard(user));
});

// 提交关卡成绩
app.post('/api/progress', (req, res) => {
  const user = req.query.user || DEFAULT_USER;
  const { levelId, status, score, correct, total, xp } = req.body || {};
  if (!levelId) return res.status(400).json({ error: '缺少 levelId' });
  res.json(saveResult(user, { levelId, status, score, correct, total, xp }));
});

// 重置进度
app.post('/api/reset', (req, res) => {
  const user = req.query.user || DEFAULT_USER;
  res.json(resetProgress(user));
});

// 讯飞语音合成：带本地文件缓存。同一段文本只合成一次，存成 mp3，以后直接读本地文件
const ttsDir = path.join(__dirname, 'data', 'tts');
if (!fs.existsSync(ttsDir)) fs.mkdirSync(ttsDir, { recursive: true });

app.post('/api/tts', async (req, res) => {
  try {
    const text = ((req.body && req.body.text) || '').slice(0, 8000);
    if (!text.trim()) return res.status(400).json({ error: '文本为空' });
    const hash = crypto.createHash('md5').update(text).digest('hex');
    const file = path.join(ttsDir, hash + '.mp3');
    // 已合成过 → 直接读本地文件，不调用讯飞 API
    if (fs.existsSync(file)) {
      res.set('Content-Type', 'audio/mpeg');
      return res.sendFile(file);
    }
    // 没合成过 → 调用讯飞，并存盘
    const buf = await tts.generate(text);
    fs.writeFileSync(file, buf);
    res.set('Content-Type', 'audio/mpeg');
    res.send(buf);
  } catch (e) {
    res.status(500).json({ error: e.message || '语音合成失败' });
  }
});

// 健康检查
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ---------- 练习用 Demo 接口（供 Postman 练习、F12 抓包）----------
const demoUsers = [
  { id: 1, name: '张三', age: 28, city: '北京', vip: true },
  { id: 2, name: '李四', age: 35, city: '上海', vip: false },
  { id: 3, name: '王五', age: 22, city: '广州', vip: true },
];

// GET：获取用户列表
app.get('/api/demo/users', (req, res) => {
  res.json({ code: 0, message: 'success', data: demoUsers });
});

// GET：获取单个用户（id 不存在返回 404）
app.get('/api/demo/users/:id', (req, res) => {
  const u = demoUsers.find((x) => x.id === Number(req.params.id));
  if (!u) return res.status(404).json({ code: 404, message: '用户不存在' });
  res.json({ code: 0, message: 'success', data: u });
});

// POST：登录（正确账号 admin/123456）
app.post('/api/demo/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'admin' && password === '123456') {
    return res.json({ code: 0, message: '登录成功', token: 'fake-token-abc123' });
  }
  res.status(401).json({ code: 401, message: '用户名或密码错误' });
});

// （故意埋的 Bug）GET：查询订单——当 id=999 时后端报错 500
app.get('/api/demo/orders/:id', (req, res) => {
  if (req.params.id === '999') {
    return res.status(500).json({ code: 500, message: '服务器内部错误: null pointer' });
  }
  res.json({ code: 0, data: { id: Number(req.params.id), amount: 99, status: 'paid' } });
});

// ---------- 托管前端静态文件（生产模式）----------
const distDir = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
  console.log('[静态文件] 已托管前端 dist 目录');
} else {
  console.log('[静态文件] 未找到 frontend/dist，开发模式请单独启动前端');
}

const server = app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  测试闯关服务已启动`);
  console.log(`  访问地址: http://localhost:${PORT}`);
  console.log(`========================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`\n[错误] 端口 ${PORT} 已被占用！`);
    console.log(`可能是之前的服务没关。请：`);
    console.log(`  1. 找到之前的黑色命令行窗口，按 Ctrl+C 关闭`);
    console.log(`  2. 或者重启电脑后再运行 start.bat`);
    console.log(`\n按任意键退出...`);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', () => process.exit(1));
  } else {
    console.error(err);
    process.exit(1);
  }
});
