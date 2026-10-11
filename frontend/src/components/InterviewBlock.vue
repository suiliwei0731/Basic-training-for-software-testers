<template>
  <div class="card interview">
    <h2>{{ block.title || '面试通关' }}</h2>
    <p class="tip">共 {{ questions.length }} 道高频面试题。<strong>先自己在框里写答案</strong>，再点"查看参考要点"对照，最后全部过完即可继续。</p>

    <div v-for="(item, i) in questions" :key="i" class="q-card">
      <p class="q">{{ i + 1 }}. {{ item.q }}</p>
      <textarea v-model="mine[i]" rows="3" placeholder="先把你自己的答案写在这里…（不写给自己看，重点是先动脑）"></textarea>
      <button class="btn-ghost" @click="revealed[i] = true">查看参考要点</button>
      <div v-if="revealed[i]" class="answer pop">
        <strong>💡 参考要点：</strong>
        <p>{{ item.answer }}</p>
        <p class="mark" v-if="done(i)">✅ 已学习</p>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);
const finished = ref(false);

const questions = computed(() => props.block.questions || []);
const revealed = ref({});
const mine = ref({});

function done(i) { return !!revealed.value[i]; }
const allRevealed = computed(() =>
  questions.value.length > 0 && questions.value.every((_, i) => revealed.value[i])
);
watch(allRevealed, (v) => { if (v && !finished.value) { finished.value = true; emit('complete'); } });
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 6px; color: var(--primary-dark); }
.tip { color: var(--text-light); font-size: 13px; margin-bottom: 16px; }
.q-card { margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px dashed var(--border); }
.q { font-weight: 600; margin-bottom: 8px; }
.q-card textarea {
  width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 6px;
  font-size: 14px; font-family: inherit; resize: vertical; margin-bottom: 8px;
}
.answer { margin-top: 10px; background: #f0f9ff; border: 1px solid #bae6fd; padding: 12px; border-radius: 8px; font-size: 14px; }
.answer p { margin-top: 6px; }
.mark { color: var(--success); font-weight: 600; margin-top: 6px; }
</style>
