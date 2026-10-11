<template>
  <div v-if="level" class="level-page">
    <button class="back" @click="$router.push('/')">← 返回地图</button>

    <div class="level-header">
      <span class="icon">{{ level.icon }}</span>
      <div>
        <h1>{{ level.title }}</h1>
        <p class="cat">{{ level.category }} · 通关奖励 +{{ level.xp }} XP</p>
      </div>
    </div>

    <!-- 本关进度条 -->
    <div class="progress-bar">
      <div class="progress-info">
        <span>本关进度</span>
        <strong>{{ completedBlocks.size }} / {{ level.blocks.length }}</strong>
        <span class="tip">完成全部内容后，可在底部领取奖励通关</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </div>

    <div class="blocks">
      <div
        v-for="(block, idx) in level.blocks"
        :key="idx"
        class="block-wrap"
        :class="{ done: completedBlocks.has(idx) }"
      >
        <span v-if="completedBlocks.has(idx)" class="done-badge">✅ 已完成</span>
        <component
          v-if="blockComponent(block.type)"
          :is="blockComponent(block.type)"
          :block="block"
          @complete="onBlockComplete(idx, $event)"
        />
      </div>
    </div>

    <div class="finish-area" v-if="allDone">
      <div class="congrats pop">🎉 恭喜！本关所有内容已完成</div>
      <button class="btn-primary" @click="finishLevel" :disabled="submitting">
        {{ submitting ? '提交中...' : `通关并领取 +${level.xp} XP` }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getLevel, LEVELS } from '../data/levels';
import { submitProgress, getDashboard } from '../api';
import { learner } from '../store';
import LessonBlock from '../components/LessonBlock.vue';
import QuizBlock from '../components/QuizBlock.vue';
import SqlBlock from '../components/SqlBlock.vue';
import PythonBlock from '../components/PythonBlock.vue';
import F12Block from '../components/F12Block.vue';
import BugReportBlock from '../components/BugReportBlock.vue';
import InterviewBlock from '../components/InterviewBlock.vue';
import ResumeBlock from '../components/ResumeBlock.vue';
import ShortAnswerBlock from '../components/ShortAnswerBlock.vue';
import CaseDesignBlock from '../components/CaseDesignBlock.vue';

const props = defineProps(['id']);
const router = useRouter();

const level = computed(() => getLevel(props.id));
const completedBlocks = ref(new Set()); // 已完成的块索引
const submitting = ref(false);

function blockComponent(type) {
  return ({
    lesson: LessonBlock,
    quiz: QuizBlock,
    sql: SqlBlock,
    python: PythonBlock,
    f12: F12Block,
    bugreport: BugReportBlock,
    interview: InterviewBlock,
    resume: ResumeBlock,
    short: ShortAnswerBlock,
    case: CaseDesignBlock,
  })[type] || null;
}

const allDone = computed(() => {
  if (!level.value) return false;
  return completedBlocks.value.size >= level.value.blocks.length;
});

const progressPercent = computed(() => {
  if (!level.value || level.value.blocks.length === 0) return 0;
  return Math.round((completedBlocks.value.size / level.value.blocks.length) * 100);
});

function onBlockComplete(idx) {
  completedBlocks.value.add(idx);
  completedBlocks.value = new Set(completedBlocks.value); // 触发响应
}

async function finishLevel() {
  submitting.value = true;
  try {
    const data = await submitProgress({
      levelId: level.value.id,
      status: 'completed',
      score: 100,
      xp: level.value.xp,
    });
    learner.xp = data.learner?.xp ?? learner.xp; // 实时同步到顶栏
    alert(`通关成功！获得 ${level.value.xp} 经验值。`);
    router.push('/');
  } catch (e) {
    alert('保存进度失败，请确认后端服务已启动（运行 start.bat）。\n\n' + e.message);
  } finally {
    submitting.value = false;
  }
}

// 已通关的关卡再次进入时，直接标记全部完成，避免"明明过了还要重做"的困惑
async function loadExisting() {
  try {
    const data = await getDashboard();
    const rec = (data.levels || []).find((r) => r.level_id === props.id);
    if (rec && rec.status === 'completed' && level.value) {
      completedBlocks.value = new Set(level.value.blocks.map((_, i) => i));
    }
  } catch {
    /* 后端未启动时忽略 */
  }
}

// 切换关卡时重置，再加载已有进度
watch(
  () => props.id,
  () => {
    completedBlocks.value = new Set();
    loadExisting();
  }
);

onMounted(loadExisting);
</script>

<style scoped>
.back {
  background: none;
  border: none;
  color: var(--text-light);
  padding: 6px 0;
  margin-bottom: 12px;
}
.back:hover { color: var(--primary); }
.level-header {
  display: flex;
  gap: 16px;
  align-items: center;
  background: white;
  padding: 20px 24px;
  border-radius: 14px;
  border: 1px solid var(--border);
  margin-bottom: 20px;
}
.level-header .icon { font-size: 40px; }
.level-header h1 { font-size: 20px; }
.cat { color: var(--text-light); font-size: 13px; }
.progress-bar {
  background: white;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 20px;
  margin-bottom: 20px;
}
.progress-info { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 13px; color: var(--text-light); }
.progress-info strong { color: var(--primary-dark); font-size: 16px; }
.progress-info .tip { margin-left: auto; font-size: 12px; }
.progress-track { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--primary); border-radius: 4px; transition: width 0.3s; }
.block-wrap { position: relative; }
.block-wrap.done { opacity: 0.85; }
.done-badge {
  position: absolute;
  top: 12px;
  right: 16px;
  z-index: 2;
  background: var(--success);
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
}
.blocks { display: flex; flex-direction: column; gap: 16px; }
.finish-area {
  text-align: center;
  margin-top: 30px;
  padding: 30px;
  background: white;
  border-radius: 14px;
  border: 2px solid var(--success);
}
.congrats { font-size: 20px; font-weight: 700; color: var(--success); margin-bottom: 16px; }
</style>
