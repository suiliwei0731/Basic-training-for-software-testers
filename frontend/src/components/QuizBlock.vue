<template>
  <div class="quiz card">
    <h2>{{ block.title }}</h2>
    <p class="sub">共 {{ questions.length }} 题，全部答对才能继续。</p>

    <div v-for="(q, i) in questions" :key="i" class="q-item">
      <div class="q-head">
        <p class="q-text">{{ i + 1 }}. {{ q.q }}</p>
        <button class="btn-ghost tts-q" @click="speakQuestion(q, i)">
          {{ speakingId === i ? '⏹ 停止' : '🔊 读题' }}
        </button>
      </div>
      <div class="options">
        <button
          v-for="(opt, j) in q.options"
          :key="j"
          class="opt"
          :class="optClass(i, j)"
          :disabled="answered[i] !== undefined"
          @click="pick(i, j)"
        >
          {{ String.fromCharCode(65 + j) }}. {{ opt }}
        </button>
      </div>
      <div v-if="answered[i] !== undefined" class="feedback" :class="answered[i] === q.answer ? 'ok' : 'no'">
        <span v-if="answered[i] === q.answer">✅ 回答正确！</span>
        <span v-else>❌ 答错了。正确答案是 {{ String.fromCharCode(65 + q.answer) }}。</span>
        <p class="explain">{{ q.explain }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useSpeech } from '../composables/useSpeech';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);

const { speakingId, speak } = useSpeech();
function speakQuestion(q, i) {
  const opts = q.options.map((o, j) => `选项${String.fromCharCode(65 + j)}，${o}`).join('。');
  speak(`第${i + 1}题。${q.q}。${opts}`, i);
}

const questions = computed(() => props.block.questions || []);
const answered = ref({}); // { 题目索引: 选的选项索引 }

function pick(qi, oi) {
  answered.value = { ...answered.value, [qi]: oi };
}
function optClass(qi, oi) {
  if (answered.value[qi] === undefined) return '';
  const q = questions.value[qi];
  if (oi === q.answer) return 'right';
  if (answered.value[qi] === oi) return 'wrong';
  return 'dim';
}
const allCorrect = computed(() =>
  questions.value.length > 0 &&
  questions.value.every((q, i) => answered.value[i] === q.answer)
);

const finished = ref(false);
watch(allCorrect, (v) => {
  if (v && !finished.value) { finished.value = true; emit('complete'); }
});
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 6px; color: var(--primary-dark); }
.sub { color: var(--text-light); font-size: 13px; margin-bottom: 16px; }
.q-item { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px dashed var(--border); }
.q-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
.q-text { font-weight: 600; }
.tts-q { white-space: nowrap; padding: 4px 12px; font-size: 12px; flex-shrink: 0; }
.options { display: flex; flex-direction: column; gap: 8px; }
.opt {
  text-align: left;
  background: #f8fafc;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 14px;
}
.opt:hover:not(:disabled) { border-color: var(--primary); background: #eef2ff; }
.opt:disabled { cursor: default; }
.opt.right { background: #dcfce7; border-color: var(--success); color: #166534; }
.opt.wrong { background: #fee2e2; border-color: var(--danger); color: #991b1b; }
.opt.dim { opacity: 0.5; }
.feedback { margin-top: 10px; font-size: 14px; font-weight: 600; }
.feedback.ok { color: var(--success); }
.feedback.no { color: var(--danger); }
.explain { font-weight: 400; color: var(--text-light); margin-top: 4px; }
.block-done { margin-top: 8px; border-color: var(--success); color: var(--success); font-weight: 600; }
.block-done:hover { background: #f0fdf4; }
</style>
