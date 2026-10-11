<template>
  <div class="card f12">
    <h2>{{ block.title || 'F12 抓包实操' }}</h2>

    <div class="step">
      <p><strong>第 1 步：</strong>在本页面按键盘 <kbd>F12</kbd>（或右键 → 检查），打开开发者工具。</p>
      <p><strong>第 2 步：</strong>点顶部的 <strong>Network（网络）</strong> 标签，勾选"Preserve log/保留日志"。</p>
      <p><strong>第 3 步：</strong>点下面按钮，会真实发出一个网络请求，然后在 Network 里观察它。</p>
      <button class="btn-primary" @click="sendRequest" :disabled="loading">
        {{ loading ? '请求中...' : (sent ? '重新发送请求' : '▶ 点我发送请求') }}
      </button>
    </div>

    <div v-if="sent" class="result pop">
      <p class="tip">✅ 请求已发出！去 Network 面板里找名字叫 <code>users</code> 的那条记录，点开看详情，然后回答：</p>

      <div class="q">
        <label>1. 这个请求的方法（Method）是？</label>
        <input v-model="a1" placeholder="填 GET 或 POST" />
        <span class="r" v-if="c1 !== null">{{ c1 ? '✅ 对' : '❌ 再看 Network 里的 Method 列' }}</span>
      </div>
      <div class="q">
        <label>2. 响应状态码（Status）是多少？</label>
        <input v-model.number="a2" placeholder="填数字，如 200" />
        <span class="r" v-if="c2 !== null">{{ c2 ? '✅ 对' : '❌ 看 Status 列' }}</span>
      </div>
      <div class="q">
        <label>3. 点开 Response/响应，data 数组里有几个用户？</label>
        <input v-model.number="a3" placeholder="填数字" />
        <span class="r" v-if="c3 !== null">{{ c3 ? '✅ 对' : '❌ 数一下 data 里的对象个数' }}</span>
      </div>


      <p class="tip small">💡 这就是测试员每天做的事：页面有问题时，F12 看请求发出去没、参数对不对、后端返回了啥。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

defineProps(['block']);
const emit = defineEmits(['complete']);
const finished = ref(false);

const loading = ref(false);
const sent = ref(false);
const userCount = ref(0);

const a1 = ref('');
const a2 = ref(null);
const a3 = ref(null);

const c1 = computed(() => a1.value ? (a1.value.trim().toUpperCase() === 'GET') : null);
const c2 = computed(() => a2.value !== null && a2.value !== '' ? Number(a2.value) === 200 : null);
const c3 = computed(() => a3.value !== null && a3.value !== '' ? Number(a3.value) === userCount.value : null);

const allCorrect = computed(() => c1.value === true && c2.value === true && c3.value === true);
watch(allCorrect, (v) => { if (v && !finished.value) { finished.value = true; emit('complete'); } });

async function sendRequest() {
  loading.value = true;
  try {
    const res = await fetch('/api/demo/users');
    const json = await res.json();
    userCount.value = (json.data || []).length;
    sent.value = true;
  } catch (e) {
    alert('请求失败：' + e.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 14px; color: var(--primary-dark); }
.step p { margin-bottom: 8px; }
kbd { background: #f1f5f9; border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; font-family: monospace; font-size: 13px; }
.result { margin-top: 18px; padding: 16px; background: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd; }
.tip { color: var(--text-light); font-size: 13px; margin-bottom: 12px; }
.tip.small { font-size: 12px; margin-top: 12px; }
.q { margin-bottom: 12px; }
.q label { display: block; font-size: 14px; margin-bottom: 4px; }
.q input { width: 100%; max-width: 260px; padding: 8px 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; }
.r { display: block; font-size: 13px; margin-top: 4px; }
.btn-primary { margin-top: 6px; }
</style>
