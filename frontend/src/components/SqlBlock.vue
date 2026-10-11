<template>
  <div class="sql card">
    <h2>{{ block.title }}</h2>
    <div class="how-to">
      <span class="ht-title">👉 SQL 就在这里运行，不用装任何软件！</span>
      <p>下面的深色框是输入区：把 SQL 写进去 → 点 <b>▶ 运行 SQL</b> → 结果显示在下方。这是网站内置的练习数据库，随便试，不会弄坏任何东西。</p>
    </div>
    <p class="hint">{{ block.hint }}</p>

    <div class="editor">
      <textarea v-model="sql" rows="4" spellcheck="false" placeholder="在这里写 SQL，例如：SELECT * FROM users;"></textarea>
      <div class="editor-actions">
        <button class="btn-primary" @click="run" :disabled="loading">{{ loading ? '运行中...' : '▶ 运行 SQL' }}</button>
        <button class="btn-ghost" @click="resetDb">重置数据</button>
      </div>
    </div>

    <div class="output" v-if="output">
      <h4>查询结果：</h4>
      <div v-if="output.error" class="error">⚠️ {{ output.error }}</div>
      <div v-else-if="output.tables.length === 0" class="muted">执行成功，无返回结果（可能是 INSERT/UPDATE 等写操作）。</div>
      <div v-for="(t, ti) in output.tables" :key="ti" class="result-table-wrap">
        <table class="result-table">
          <thead>
            <tr><th v-for="c in t.columns" :key="c">{{ c }}</th></tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in t.values" :key="ri">
              <td v-for="(v, ci) in row" :key="ci">{{ v === null ? 'NULL' : v }}</td>
            </tr>
            <tr v-if="t.values.length === 0"><td :colspan="t.columns.length" class="muted">无数据</td></tr>
          </tbody>
        </table>
        <p class="muted small">共 {{ t.values.length }} 行</p>
      </div>
    </div>

    <div class="checks" v-if="block.checks && block.checks.length">
      <h4>🎯 通关练习（依次完成）</h4>
      <div v-for="(c, i) in block.checks" :key="i" class="check-item" :class="{ passed: passedChecks.has(i) }">
        <div class="check-label">
          <span class="badge">{{ passedChecks.has(i) ? '✅' : '○' }}</span>
          <span>{{ c.label }}</span>
        </div>
        <div class="check-actions">
          <button class="btn-ghost small" @click="toggle('hint', i)">{{ hintOpen[i] ? '收起提示' : '💡 提示' }}</button>
          <button class="btn-ghost small" @click="toggle('answer', i)">{{ answerOpen[i] ? '收起答案' : '📖 看答案' }}</button>
          <button class="btn-primary small" @click="verify(i)">验证我的查询</button>
        </div>
        <div v-if="hintOpen[i] && c.hint" class="reveal hint-text">💡 {{ c.hint }}</div>
        <div v-if="answerOpen[i]" class="reveal answer-text">
          参考答案：<code>{{ c.sql }}</code>
          <button class="btn-ghost small inline-btn" @click="sql = c.sql">填入编辑器</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);
const finished = ref(false);

const sql = ref('');
const loading = ref(false);
const output = ref(null);
const passedChecks = ref(new Set());
const hintOpen = reactive({});
const answerOpen = reactive({});
let db = null;
let SQL = null;

const allChecksPassed = computed(() =>
  (props.block.checks || []).length > 0 &&
  passedChecks.value.size >= props.block.checks.length
);

async function initDb() {
  loading.value = true;
  try {
    if (!SQL) {
      SQL = await initSqlJs({
        // 从本地打包的 wasm 加载，不依赖外网
        locateFile: () => wasmUrl,
      });
    }
    db = new SQL.Database();
    if (props.block.seed) db.run(props.block.seed);
    output.value = null;
  } catch (e) {
    output.value = { error: '数据库初始化失败：' + (e && e.message ? e.message : e), tables: [] };
  } finally {
    loading.value = false;
  }
}

function runQuery(query) {
  const result = { error: null, tables: [] };
  if (!db) { result.error = '数据库还没准备好，请稍等片刻再运行（或刷新页面）。'; return result; }
  try {
    const res = db.exec(query);
    res.forEach((r) => result.tables.push({ columns: r.columns, values: r.values }));
    // 处理写操作：exec 不返回结果集时检查 changes
    if (res.length === 0) {
      // 尝试再查一次确认
    }
  } catch (e) {
    result.error = e.message;
  }
  return result;
}

function run() {
  if (!sql.value.trim()) return;
  output.value = runQuery(sql.value);
}

function resetDb() {
  initDb();
  sql.value = '';
  output.value = null;
}

function toggle(kind, i) {
  if (kind === 'hint') hintOpen[i] = !hintOpen[i];
  else answerOpen[i] = !answerOpen[i];
}

function verify(i) {
  const check = props.block.checks[i];
  // 归一化：转小写、去多余空格，简单比对关键字段
  const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim().replace(/;$/, '');
  const mine = norm(sql.value);
  const answer = norm(check.sql);
  // 宽松校验：尝试实际运行用户的 SQL 和答案 SQL，对比结果集
  let userResult = null, answerResult = null;
  try { userResult = db.exec(sql.value); } catch { /* 报错 */ }
  try { answerResult = db.exec(check.sql); } catch { /* 答案一定能跑 */ }

  const same = jsonEq(userResult, answerResult);
  if (same || mine === answer) {
    passedChecks.value.add(i);
    passedChecks.value = new Set(passedChecks.value);
    output.value = runQuery(sql.value);
    if (allChecksPassed.value && !finished.value) { finished.value = true; emit('complete'); }
  } else {
    alert('结果不对哦，再想想。可以点「提示」或「填入答案」参考。');
  }
}

function jsonEq(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

onMounted(initDb);
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 6px; color: var(--primary-dark); }
.how-to {
  background: #ecfdf5;
  border: 1px dashed #6ee7b7;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 12px;
}
.ht-title { display: block; font-weight: 700; color: #047857; margin-bottom: 4px; font-size: 15px; }
.how-to p { font-size: 13px; color: #065f46; line-height: 1.6; }
.hint { color: var(--text-light); font-size: 13px; margin-bottom: 14px; }
.editor textarea {
  width: 100%;
  font-family: "Cascadia Code", "Consolas", monospace;
  font-size: 13px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  resize: vertical;
  background: #0f172a;
  color: #e2e8f0;
}
.editor-actions { display: flex; gap: 10px; margin-top: 10px; }
.output { margin-top: 16px; }
.output h4 { font-size: 14px; margin-bottom: 8px; }
.error { color: var(--danger); background: #fef2f2; padding: 10px; border-radius: 8px; }
.muted { color: var(--text-light); }
.small { font-size: 12px; }
.result-table-wrap { overflow-x: auto; margin-bottom: 10px; }
.result-table { border-collapse: collapse; font-size: 13px; width: 100%; }
.result-table th, .result-table td { border: 1px solid var(--border); padding: 6px 10px; text-align: left; }
.result-table th { background: #f1f5f9; }
.checks { margin-top: 20px; border-top: 1px dashed var(--border); padding-top: 16px; }
.checks h4 { margin-bottom: 12px; }
.check-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid var(--border);
}
.check-item.passed { background: #f0fdf4; border-color: var(--success); }
.check-label { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.badge { width: 20px; }
.check-actions { display: flex; gap: 6px; }
.small { padding: 4px 10px; font-size: 12px; }
.reveal { flex-basis: 100%; margin-top: 8px; padding: 8px 10px; border-radius: 6px; font-size: 13px; }
.hint-text { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }
.answer-text { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e3a8a; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.answer-text code { background: rgba(255,255,255,0.7); padding: 2px 8px; border-radius: 4px; font-family: monospace; }
.inline-btn { margin-left: auto; }
</style>
