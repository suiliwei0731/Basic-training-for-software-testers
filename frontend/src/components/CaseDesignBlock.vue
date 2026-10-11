<template>
  <div class="card cd">
    <h2>{{ block.title || '动手设计测试用例' }}</h2>
    <div class="scenario"><strong>🎯 测试任务：</strong>{{ block.scenario }}</div>

    <p class="ref-label">📖 参考答案（照着这些测试点，在下面用自己的话写一遍）：</p>
    <div class="answer-box">
      <ol>
        <li v-for="(c, i) in checklist" :key="i">{{ c }}</li>
      </ol>
    </div>

    <textarea v-model="mine" rows="6" placeholder="把上面的测试点照着写一遍，写完点「提交对比」…"></textarea>
    <button v-if="!done" class="btn-primary" :disabled="!mine.trim()" @click="check">提交对比</button>

    <div v-if="checked" class="result">
      <p class="score">你覆盖了 <strong>{{ covered }}/{{ checklist.length }}</strong> 个测试点：</p>
      <ul>
        <li v-for="(c, i) in checklist" :key="i" :class="hit(i) ? 'ok' : 'no'">
          {{ hit(i) ? '✅' : '❌' }} {{ c }}
        </li>
      </ul>
      <p v-if="passed" class="pass">✅ 不错，测试点都考虑到了！</p>
      <p v-else class="fail">还有几个没写到，照着答案补一补再提交。</p>
    </div>
    <span v-if="done" class="done-tag">✅ 已完成</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);

const mine = ref('');
const checked = ref(false);
const done = ref(false);

const checklist = computed(() => props.block.checklist || []);
const norm = (s) => (s || '').replace(/\s+/g, '');
function hit(i) {
  return norm(mine.value).includes(norm(checklist.value[i]));
}
const covered = computed(() => checklist.value.filter((_, i) => hit(i)).length);
const passed = computed(() =>
  checklist.value.length > 0 && covered.value >= Math.ceil(checklist.value.length * 0.6)
);

function check() {
  if (!mine.value.trim()) return;
  checked.value = true;
  if (passed.value && !done.value) { done.value = true; emit('complete'); }
}
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 10px; color: var(--primary-dark); }
.scenario { background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px 14px; border-radius: 8px; font-size: 14px; line-height: 1.6; }
.ref-label { font-size: 13px; font-weight: 600; color: var(--primary-dark); margin: 16px 0 6px; }
.answer-box {
  padding: 12px 14px 12px 30px; background: #f0f9ff; border: 1px solid #bae6fd;
  border-radius: 8px; font-size: 14px; line-height: 1.8; color: #0c4a6e;
}
textarea {
  width: 100%; margin-top: 14px; padding: 10px; border: 1px solid var(--border); border-radius: 8px;
  font-size: 14px; font-family: inherit; resize: vertical; line-height: 1.7;
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
