<template>
  <div class="lesson card">
    <h2>{{ block.title }}</h2>
    <!-- 极简 markdown 渲染：支持代码块、表格、加粗 -->
    <div class="content" v-html="rendered"></div>
    <div class="actions">
      <button class="btn-ghost tts" @click="speakLesson">
        {{ speakingId === 'lesson' ? '⏹ 停止朗读' : '🔊 朗读本文' }}
      </button>
      <label v-if="!done" class="read-check">
        <input type="checkbox" @change="onDone" /> 我已读完本节
      </label>
      <span v-else class="done-tag">✅ 已读完</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSpeech, htmlToText } from '../composables/useSpeech';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);

const { speakingId, speak, stop } = useSpeech();

function speakLesson() {
  speak(htmlToText(rendered.value), 'lesson');
}

const done = ref(false);
function onDone() {
  stop();
  done.value = true;
  emit('complete');
}

const rendered = computed(() => formatMd(props.block.body || ''));

// 轻量 markdown：代码块 ```、表格 |、加粗 **、换行
function formatMd(text) {
  let html = text;
  // 代码块
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, __, code) => {
    return `<pre>${escapeHtml(code.trim())}</pre>`;
  });
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // 表格
  html = html.replace(/((?:\|.+\|?\n)+)/g, (table) => {
    const rows = table.trim().split('\n').filter((r) => r.includes('|'));
    if (rows.length < 2) return table;
    const isSep = (r) => /^\|[\s\-:|]+\|$/.test(r.trim());
    let out = '<table>';
    rows.forEach((r, i) => {
      if (isSep(r)) return;
      const cells = r.split('|').slice(1, -1).map((c) => c.trim());
      const tag = i === 0 ? 'th' : 'td';
      out += '<tr>' + cells.map((c) => `<${tag}>${c}</${tag}>`).join('') + '</tr>';
    });
    out += '</table>';
    return out;
  });
  // 加粗
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // 换行（保留段落）
  html = html.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    if (l.startsWith('<')) return l; // 已经是标签
    return `<p>${l}</p>`;
  }).join('');
  return html;
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  border: 1px solid var(--border);
}
.card h2 { font-size: 18px; margin-bottom: 14px; color: var(--primary-dark); }
.content :deep(p) { margin-bottom: 10px; }
.content :deep(code) { background: #eef2ff; color: var(--primary-dark); }
.content :deep(pre) { margin: 12px 0; }
.content :deep(table) {
  border-collapse: collapse;
  margin: 12px 0;
  width: 100%;
  font-size: 14px;
}
.content :deep(th), .content :deep(td) {
  border: 1px solid var(--border);
  padding: 8px 10px;
  text-align: left;
}
.content :deep(th) { background: #f1f5f9; }
.content :deep(strong) { color: var(--text); }
.btn-primary { margin-top: 8px; }
.actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-top: 8px; }
.actions .btn-primary, .actions .btn-done { margin-top: 0; }
.tts { white-space: nowrap; }
.read-check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-light);
  cursor: pointer;
  user-select: none;
}
.read-check input { cursor: pointer; }
.done-tag { font-size: 14px; color: var(--success); font-weight: 600; }
</style>
