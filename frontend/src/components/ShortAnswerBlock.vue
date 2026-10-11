<template>
  <div class="card sa">
    <h2>{{ block.title || '动手写一写' }}</h2>
    <p class="prompt">{{ block.prompt }}</p>

    <div class="ref" v-if="block.answer">
      <p class="ref-label">📖 参考答案（照着下面写一遍）：</p>
      <div class="answer-box">{{ block.answer }}</div>
    </div>

    <p class="tip">照着参考答案，用自己的话在下面写一遍，写完点「提交对比」。</p>
    <textarea v-model="mine" rows="5" :placeholder="block.placeholder || '在这里写…'"></textarea>

    <button v-if="!done" class="btn-primary" :disabled="!mine.trim()" @click="check">提交对比</button>

    <div v-if="checked" class="result">
      <p class="score">你覆盖了 <strong>{{ covered }}/{{ total }}</strong> 个要点：</p>
      <ul>
        <li v-for="(k, i) in keywords" :key="i" :class="hit(k) ? 'ok' : 'no'">
          {{ hit(k) ? '✅' : '❌' }} {{ k }}
        </li>
      </ul>
      <p v-if="passed" class="pass">✅ 写得不错，要点都覆盖到了！</p>
      <p v-else class="fail">还差几个要点，照着答案补一补再提交。</p>
    </div>
    <span v-if="done" class="done-tag">✅ 已完成</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);

const mine = ref('');
const showAns = ref(false);
const checked = ref(false);
const done = ref(false);

const keywords = computed(() => props.block.keywords || []);
const total = computed(() => keywords.value.length);
function hit(k) { return mine.value.includes(k); }
const covered = computed(() => keywords.value.filter(hit).length);
// 有要点时覆盖 60% 算通过；没有要点时写了就算过
const passed = computed(() =>
  total.value === 0 ? checked.value : covered.value >= Math.ceil(total.value * 0.6)
);

function check() {
  if (!mine.value.trim()) return;
  checked.value = true;
  if (passed.value && !done.value) { done.value = true; emit('complete'); }
}
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 8px; color: var(--primary-dark); }
.prompt { font-weight: 600; margin-bottom: 10px; line-height: 1.6; }
.ref { margin-bottom: 12px; }
.ref-label { font-size: 13px; font-weight: 600; color: var(--primary-dark); margin-bottom: 6px; }
.answer-box {
  margin-top: 8px; padding: 12px 14px; background: #f0f9ff; border: 1px solid #bae6fd;
  border-radius: 8px; font-size: 14px; line-height: 1.8; color: #0c4a6e; white-space: pre-wrap;
}
.tip { color: var(--text-light); font-size: 13px; margin: 4px 0 8px; }
textarea {
  width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px;
  font-size: 14px; font-family: inherit; resize: vertical; line-height: 1.6;
}
.btn-primary { margin-top: 10px; }
.result { margin-top: 16px; padding: 16px; border-radius: 10px; background: #f8fafc; border: 1px solid var(--border); }
.score { margin-bottom: 10px; }
.result ul { list-style: none; font-size: 14px; line-height: 2; }
.result .ok { color: #166534; }
.result .no { color: #9a3412; }
.pass { color: var(--success); font-weight: 600; margin-top: 8px; }
.fail { color: var(--warning); font-weight: 600; margin-top: 8px; }
.done-tag { display: inline-block; margin-top: 10px; color: var(--success); font-weight: 600; font-size: 14px; }
</style>
