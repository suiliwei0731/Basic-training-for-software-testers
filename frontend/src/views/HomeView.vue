<template>
  <div class="home">
    <div class="hero">
      <h1>欢迎来到测试闯关 🎯</h1>
      <p>从零基础到自动化测试员：5 个阶段，边学边练。</p>
      <div class="stats" v-if="loaded">
        <div class="stat">
          <strong>{{ completedCount }}/{{ levels.length }}</strong>
          <span>已通关</span>
        </div>
        <div class="stat">
          <strong>{{ xp }}</strong>
          <span>经验值</span>
        </div>
        <div class="stat">
          <strong>{{ percent }}%</strong>
          <span>总进度</span>
        </div>
      </div>
    </div>

    <div class="stages">
      <div v-for="g in groups" :key="g.n" class="stage">
        <div class="stage-head">
          <span class="stage-badge">阶段 {{ g.n }}</span>
          <div class="stage-info">
            <h2>{{ g.name }}</h2>
            <p class="stage-meta">{{ g.weeks }} · {{ g.items.length }} 关</p>
          </div>
        </div>
        <div class="map">
          <div
            v-for="lv in g.items"
            :key="lv.id"
            class="node"
            :class="nodeClass(lv)"
            @click="enter(lv)"
          >
            <div class="node-head">
              <span class="icon">{{ lv.icon }}</span>
              <span class="num">{{ globalNum(lv.id) }}</span>
            </div>
            <div class="node-body">
              <h3>{{ lv.title }}</h3>
              <p class="cat">{{ lv.category }} · +{{ lv.xp }} XP</p>
              <p v-if="statusOf(lv.id) === 'completed'" class="done">✅ 已通关</p>
              <p v-else-if="isLocked(lv.id)" class="lock">🔒 先完成上一关</p>
              <p v-else class="todo">🎮 点击开始</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="reset-area">
      <button class="btn-ghost" @click="handleReset">重置全部进度</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { LEVELS } from '../data/levels';
import { getDashboard, resetAll } from '../api';

const router = useRouter();
const levels = LEVELS;
const loaded = ref(false);
const progressMap = ref({});
const xp = ref(0);

const STAGES = [
  { n: 1, name: '软件测试基础', weeks: '第 1-2 周' },
  { n: 2, name: 'SQL 与数据库', weeks: '第 3-4 周' },
  { n: 3, name: 'API 接口测试', weeks: '第 5-6 周' },
  { n: 4, name: 'Python 编程基础', weeks: '第 7-9 周' },
  { n: 5, name: '自动化测试', weeks: '第 10-12 周' },
];

// 全局学习顺序：先按阶段，阶段内按出现顺序
const ordered = [...levels]
  .map((lv, i) => ({ lv, i }))
  .sort((a, b) => (a.lv.stage || 9) - (b.lv.stage || 9) || a.i - b.i);
const orderIndex = {};
ordered.forEach((o, gi) => { orderIndex[o.lv.id] = gi; });

const groups = computed(() =>
  STAGES.map((g) => ({ ...g, items: levels.filter((l) => (l.stage || 9) === g.n) }))
);

const completedCount = computed(() =>
  Object.values(progressMap.value).filter((s) => s === 'completed').length
);
const percent = computed(() => Math.round((completedCount.value / levels.length) * 100));

function statusOf(id) { return progressMap.value[id] || 'unlocked'; }
function globalNum(id) { return (orderIndex[id] ?? 0) + 1; }
function isLocked(id) {
  const gi = orderIndex[id];
  if (gi === 0) return false;
  return statusOf(ordered[gi - 1].lv.id) !== 'completed';
}
function nodeClass(lv) {
  if (statusOf(lv.id) === 'completed') return 'done-node';
  if (isLocked(lv.id)) return 'locked-node';
  return 'open-node';
}
function enter(lv) {
  if (isLocked(lv.id)) return;
  router.push(`/level/${lv.id}`);
}

async function load() {
  try {
    const data = await getDashboard();
    xp.value = data.learner?.xp ?? 0;
    progressMap.value = {};
    (data.levels || []).forEach((r) => { progressMap.value[r.level_id] = r.status; });
  } catch { /* 后端没启动也能浏览 */ }
  loaded.value = true;
}
async function handleReset() {
  if (!confirm('确定要清空所有学习进度吗？此操作不可恢复。')) return;
  await resetAll();
  await load();
}
onMounted(load);
</script>

<style scoped>
.hero { text-align: center; padding: 30px 20px 10px; }
.hero h1 { font-size: 28px; margin-bottom: 8px; color: var(--primary-dark); }
.hero p { color: var(--text-light); }
.stats { display: flex; justify-content: center; gap: 36px; margin-top: 20px; }
.stat { display: flex; flex-direction: column; }
.stat strong { font-size: 26px; color: var(--primary-dark); }
.stat span { font-size: 12px; color: var(--text-light); }

.stages { margin-top: 24px; display: flex; flex-direction: column; gap: 26px; }
.stage { }
.stage-head {
  display: flex; align-items: center; gap: 14px; margin-bottom: 12px;
  padding-bottom: 10px; border-bottom: 2px dashed var(--border);
}
.stage-badge {
  background: var(--primary); color: white; font-weight: 700; font-size: 13px;
  padding: 5px 12px; border-radius: 12px; white-space: nowrap;
}
.stage-info h2 { font-size: 18px; color: var(--primary-dark); }
.stage-meta { font-size: 12px; color: var(--text-light); }

.map { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.node { background: var(--card); border-radius: 14px; padding: 18px; border: 2px solid var(--border); cursor: pointer; transition: all 0.2s; }
.node:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
.node-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.icon { font-size: 32px; }
.num { background: var(--primary); color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; }
.node-body h3 { font-size: 16px; margin-bottom: 4px; }
.cat { font-size: 12px; color: var(--text-light); }
.done { color: var(--success); font-size: 13px; margin-top: 6px; }
.lock { color: #94a3b8; font-size: 13px; margin-top: 6px; }
.todo { color: var(--primary); font-size: 13px; margin-top: 6px; }
.done-node { border-color: var(--success); background: #f0fdf4; }
.open-node { border-color: var(--primary); }
.locked-node { opacity: 0.5; cursor: not-allowed; }
.locked-node:hover { transform: none; box-shadow: none; }
.reset-area { text-align: center; margin-top: 30px; }
</style>
