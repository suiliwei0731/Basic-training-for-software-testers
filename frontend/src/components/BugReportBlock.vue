<template>
  <div class="card bug">
    <h2>{{ block.title || '动手写一份缺陷报告' }}</h2>

    <div class="scenario">
      <strong>📋 场景：</strong>{{ block.scenario }}
    </div>
    <p class="tip">请根据上面的场景，亲手填写一份规范的缺陷报告。填完点"提交判分"。</p>

    <div class="form">
      <label>缺陷标题（一句话说清什么不对）
        <input v-model="f.title" placeholder="例：输入正确密码登录，却提示密码错误" />
      </label>
      <label>前置条件
        <input v-model="f.pre" placeholder="例：已注册账号 test/123456，打开登录页" />
      </label>
      <label>复现步骤（每行一步，至少 2 步）
        <textarea v-model="f.steps" rows="4" placeholder="1. ...&#10;2. ...&#10;3. ..."></textarea>
      </label>
      <div class="row">
        <label>预期结果
          <textarea v-model="f.expect" rows="2" placeholder="应该发生什么"></textarea>
        </label>
        <label>实际结果
          <textarea v-model="f.actual" rows="2" placeholder="实际发生了什么"></textarea>
        </label>
      </div>
      <div class="row">
        <label>严重程度
          <select v-model="f.severity">
            <option value="">请选择</option>
            <option>致命</option><option>严重</option><option>一般</option><option>轻微</option>
          </select>
        </label>
        <label>优先级
          <select v-model="f.priority">
            <option value="">请选择</option>
            <option>高</option><option>中</option><option>低</option>
          </select>
        </label>
      </div>
    </div>

    <button class="btn-primary" @click="submit">提交判分</button>

    <div v-if="result" class="verdict pop" :class="passed ? 'pass' : 'fail'">
      <h3>{{ passed ? '✅ 这份 Bug 单基本合格！' : '⚠️ 还差一点，再改改' }}　得分 {{ score }} / 6</h3>
      <ul>
        <li v-for="(fb, i) in feedback" :key="i" :class="fb.ok ? 'ok' : 'no'">
          {{ fb.ok ? '✅' : '❌' }} {{ fb.text }}
        </li>
      </ul>
      <p class="tip" v-if="passed">测试员的 Bug 单要让开发看完不用问就能修。你已经做到了！</p>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const props = defineProps(['block']);
const emit = defineEmits(['complete']);
const finished = ref(false);

const f = reactive({
  title: '', pre: '', steps: '', expect: '', actual: '', severity: '', priority: '',
});

const result = ref(false);
const score = ref(0);
const passed = ref(false);
const feedback = ref([]);

function submit() {
  const fb = [];
  let s = 0;
  const t = f.title.trim();
  if (t.length >= 4) { s++; fb.push({ ok: true, text: '标题清晰，一句话说明了问题' }); }
  else fb.push({ ok: false, text: '标题太短，要具体说明"什么操作+什么现象"' });

  const stepLines = f.steps.split('\n').map((x) => x.trim()).filter(Boolean);
  if (stepLines.length >= 2) { s++; fb.push({ ok: true, text: `复现步骤有 ${stepLines.length} 步，清楚可操作` }); }
  else fb.push({ ok: false, text: '复现步骤至少要 2 步，开发才能照着重现' });

  if (f.expect.trim()) { s++; fb.push({ ok: true, text: '写了预期结果' }); }
  else fb.push({ ok: false, text: '缺少预期结果（应该怎样）' });

  if (f.actual.trim()) { s++; fb.push({ ok: true, text: '写了实际结果' }); }
  else fb.push({ ok: false, text: '缺少实际结果（实际怎样）' });

  if (f.expect.trim() && f.actual.trim() && f.expect.trim() !== f.actual.trim()) {
    s++; fb.push({ ok: true, text: '预期和实际不一致，说明确实是个 Bug' });
  } else if (f.expect.trim() && f.actual.trim()) {
    fb.push({ ok: false, text: '预期和实际写得一样，体现不出差异' });
  }

  if (f.severity) { s++; fb.push({ ok: true, text: `标注了严重程度：${f.severity}` }); }
  else fb.push({ ok: false, text: '没选严重程度，开发不知道有多急' });

  score.value = s;
  feedback.value = fb;
  passed.value = s >= 4;
  result.value = true;
  if (passed.value && !finished.value) { finished.value = true; emit('complete'); }
}
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 12px; color: var(--primary-dark); }
.scenario { background: #fffbeb; border: 1px solid #fde68a; padding: 12px 14px; border-radius: 8px; font-size: 14px; }
.tip { color: var(--text-light); font-size: 13px; margin: 8px 0 14px; }
.form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; }
.form label { font-size: 14px; display: flex; flex-direction: column; gap: 4px; }
.form input, .form textarea, .form select {
  padding: 8px 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; font-family: inherit;
}
.form textarea { resize: vertical; }
.row { display: flex; gap: 12px; }
.row label { flex: 1; }
.verdict { margin-top: 16px; padding: 16px; border-radius: 10px; }
.verdict.pass { background: #f0fdf4; border: 1px solid var(--success); }
.verdict.fail { background: #fff7ed; border: 1px solid var(--warning); }
.verdict h3 { font-size: 16px; margin-bottom: 10px; }
.verdict ul { list-style: none; font-size: 13px; line-height: 1.9; }
.verdict .ok { color: #166534; }
.verdict .no { color: #9a3412; }
</style>
