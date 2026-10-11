// 数据库初始化与查询封装（使用 Node 内置 node:sqlite，零第三方依赖）
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, 'progress.db'));

// 建表
db.exec(`
  CREATE TABLE IF NOT EXISTS learner (
    user_name   TEXT PRIMARY KEY,
    xp          INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS progress (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name     TEXT NOT NULL,
    level_id      TEXT NOT NULL,
    status        TEXT NOT NULL DEFAULT 'unlocked',
    best_score    INTEGER NOT NULL DEFAULT 0,
    quiz_correct  INTEGER NOT NULL DEFAULT 0,
    quiz_total    INTEGER NOT NULL DEFAULT 0,
    completed_at  TEXT,
    updated_at    TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    UNIQUE(user_name, level_id)
  );
`);

// ---------- 预编译语句 ----------
const getLearner = db.prepare('SELECT * FROM learner WHERE user_name = ?');
const insertLearner = db.prepare('INSERT OR IGNORE INTO learner (user_name) VALUES (?)');
const getAllProgress = db.prepare('SELECT * FROM progress WHERE user_name = ? ORDER BY level_id');
const getProgressByLevel = db.prepare('SELECT * FROM progress WHERE user_name = ? AND level_id = ?');

const upsertProgress = db.prepare(`
  INSERT INTO progress (user_name, level_id, status, best_score, quiz_correct, quiz_total, completed_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now','localtime'))
  ON CONFLICT(user_name, level_id) DO UPDATE SET
    status        = excluded.status,
    best_score    = MAX(best_score, excluded.best_score),
    quiz_correct  = excluded.quiz_correct,
    quiz_total    = excluded.quiz_total,
    completed_at  = COALESCE(excluded.completed_at, completed_at),
    updated_at    = datetime('now','localtime')
`);

const addXp = db.prepare('UPDATE learner SET xp = xp + ? WHERE user_name = ?');
const delProgress = db.prepare('DELETE FROM progress WHERE user_name = ?');
const resetXp = db.prepare('UPDATE learner SET xp = 0 WHERE user_name = ?');

// ---------- 对外 API ----------
function ensureLearner(userName) {
  insertLearner.run(userName);
  return getLearner.get(userName);
}

function getDashboard(userName) {
  const learner = ensureLearner(userName);
  const levels = getAllProgress.all(userName);
  return { learner, levels };
}

function saveResult(userName, payload) {
  ensureLearner(userName);
  // 已通关的关卡重复提交不再重复加 XP（防止刷经验）
  const alreadyCompleted = getProgressByLevel.get(userName, payload.levelId)?.status === 'completed';
  const completedAt = payload.status === 'completed'
    ? new Date().toLocaleString('zh-CN', { hour12: false })
    : null;
  upsertProgress.run(
    userName,
    payload.levelId,
    payload.status || 'completed',
    payload.score || 0,
    payload.correct || 0,
    payload.total || 0,
    completedAt
  );
  if (payload.xp && !alreadyCompleted) addXp.run(payload.xp, userName);
  return getDashboard(userName);
}

function resetProgress(userName) {
  delProgress.run(userName);
  resetXp.run(userName);
  return getDashboard(userName);
}

module.exports = { getDashboard, saveResult, resetProgress };
