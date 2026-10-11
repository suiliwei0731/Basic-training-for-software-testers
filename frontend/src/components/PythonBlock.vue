<template>
  <div class="py card">
    <h2>{{ block.title }}</h2>
    <pre>{{ block.code }}</pre>

    <div v-if="!revealed">
      <p class="ask">{{ block.question }}</p>
      <textarea v-model="prediction" rows="2" placeholder="把你预测的输出写在这里…"></textarea>
      <div v-if="hintShown && block.hint" class="reveal hint-text">💡 {{ block.hint }}</div>
      <div class="actions">
        <button class="btn-ghost" @click="hintShown = !hintShown">{{ hintShown ? '收起提示' : '💡 提示' }}</button>
        <button class="btn-primary" @click="check">提交答案</button>
        <button class="btn-ghost" @click="reveal">直接看答案</button>
      </div>
      <div v-if="checked" class="result" :class="ok ? 'ok' : 'no'">
        {{ ok ? '🎉 完全正确！你读懂了这段代码。' : '差一点点，看看正确答案吧。' }}
      </div>
    </div>

    <div v-else class="answer-area pop">
      <div class="answer-box">
        <strong>正确输出：</strong>
        <pre>{{ block.expected }}</pre>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);
const finished = ref(false);

const prediction = ref('');
const checked = ref(false);
const revealed = ref(false);
const ok = ref(false);
const hintShown = ref(false);

function normalize(s) {
  return (s || '').trim().replace(/\s+/g, ' ');
}

function check() {
  checked.value = true;
  ok.value = normalize(prediction.value) === normalize(props.block.expected);
  if (ok.value) { revealed.value = true; if (!finished.value) { finished.value = true; emit('complete'); } }
}
function reveal() {
  revealed.value = true;
  checked.value = true;
  if (!finished.value) { finished.value = true; emit('complete'); }
}
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 12px; color: var(--primary-dark); }
.ask { font-weight: 600; margin: 12px 0 8px; }
.reveal { margin: 10px 0; padding: 10px 12px; border-radius: 8px; font-size: 13px; line-height: 1.6; }
.hint-text { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }
textarea {
  width: 100%;
  font-family: monospace;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
}
.actions { display: flex; gap: 10px; margin-top: 10px; }
.result { margin-top: 10px; font-weight: 600; }
.result.ok { color: var(--success); }
.result.no { color: var(--warning); }
.answer-box {
  background: #f0fdf4;
  border: 1px solid var(--success);
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 14px;
}
.answer-box pre { background: transparent; color: #166534; padding: 6px 0 0; }
</style>
