<template>
  <div class="card resume">
    <h2>{{ block.title || '生成你的简历项目' }}</h2>
    <p class="tip">把你这套学习成果包装成一个能写进简历的项目。如实填写下面各项，最后生成一段可直接复制的简历描述。</p>

    <div class="form">
      <label>项目名称
        <input v-model="f.name" placeholder="例：XX 电商系统功能测试" />
      </label>
      <label>你的角色
        <input v-model="f.role" placeholder="例：功能测试工程师" />
      </label>
      <label>测试了哪些模块（用顿号分隔）
        <input v-model="f.modules" placeholder="例：用户登录、商品搜索、购物车、下单支付" />
      </label>
      <div class="row">
        <label>编写测试用例数
          <input v-model.number="f.cases" type="number" placeholder="例：50" />
        </label>
        <label>发现并跟踪缺陷数
          <input v-model.number="f.bugs" type="number" placeholder="例：15" />
        </label>
      </div>
      <label>用到的工具（用顿号分隔）
        <input v-model="f.tools" placeholder="例：Postman、MySQL、禅道、F12" />
      </label>
      <label>你的亮点工作（一两句话）
        <textarea v-model="f.highlight" rows="2" placeholder="例：通过 SQL 多表查询核对订单数据，发现并推动修复 2 个数据一致性问题"></textarea>
      </label>
    </div>

    <button class="btn-primary" @click="generate">生成简历文案</button>

    <div v-if="output" class="output pop">
      <h3>📄 生成结果（可直接复制到简历）</h3>
      <pre>{{ output }}</pre>
      <button class="btn-ghost" @click="copy">📋 复制到剪贴板</button>
      <span v-if="copied" class="copied">已复制！</span>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

defineProps(['block']);
const emit = defineEmits(['complete']);
const finished = ref(false);

const f = reactive({ name: '', role: '', modules: '', cases: '', bugs: '', tools: '', highlight: '' });
const output = ref('');
const copied = ref(false);

function generate() {
  if (!f.name || !f.modules) {
    alert('请至少填写项目名称和测试模块');
    return;
  }
  output.value =
`【项目名称】${f.name || '（电商系统功能测试项目）'}

【项目描述】
该项目为 Web 端电商系统，涵盖用户登录、商品浏览、购物车、订单等核心功能。
本人担任${f.role || '功能测试工程师'}，参与需求分析、用例设计与测试执行。

【主要工作】
1. 参与需求评审，针对${f.modules}等模块梳理测试点，设计并执行测试用例${f.cases || 'XX'}条，覆盖正向、反向、边界值等场景。
2. 使用禅道提交并跟踪缺陷${f.bugs || 'XX'}个，推动开发修复并完成回归验证。
3. 使用 SQL 对用户、订单数据进行核对，验证页面与数据库的数据一致性。
4. 使用 Postman 完成登录、下单等接口的基础测试，结合状态码与响应字段判断结果。
5. ${f.highlight || '编写测试用例与缺陷报告，输出测试总结。'}

【使用工具】${f.tools || 'Postman、MySQL、禅道、F12 开发者工具'}`;
  if (!finished.value) { finished.value = true; emit('complete'); }
}

async function copy() {
  try {
    await navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    alert('复制失败，请手动选中复制');
  }
}
</script>

<style scoped>
.card { background: white; border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
.card h2 { font-size: 18px; margin-bottom: 6px; color: var(--primary-dark); }
.tip { color: var(--text-light); font-size: 13px; margin-bottom: 16px; }
.form { display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px; }
.form label { font-size: 14px; display: flex; flex-direction: column; gap: 4px; }
.form input, .form textarea { padding: 8px 10px; border: 1px solid var(--border); border-radius: 6px; font-size: 14px; font-family: inherit; }
.form textarea { resize: vertical; }
.row { display: flex; gap: 12px; }
.row label { flex: 1; }
.output { margin-top: 18px; background: #f0fdf4; border: 1px solid var(--success); padding: 16px; border-radius: 10px; }
.output h3 { font-size: 15px; margin-bottom: 10px; color: #166534; }
.output pre { background: white; border: 1px solid #bbf7d0; white-space: pre-wrap; word-break: break-all; }
.copied { color: var(--success); font-size: 13px; margin-left: 10px; }
.output .btn-primary { margin-top: 12px; }
</style>
