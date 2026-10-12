// 关卡数据，由 levels.js 拆分
const level = {
    id: 'boss',
    stage: 5,
    title: 'Boss 关：模拟岗位综合实战',
    icon: '🏆',
    category: '综合实战',
    xp: 100,
    blocks: [
      {
        type: 'lesson',
        title: '场景：你入职了，接手电商系统测试',
        body: `对照岗位职责，你这周要完成：
1. 参与需求评审，拆解测试点
2. 编写并评审测试用例
3. 准备测试数据，执行测试，记录并追踪缺陷
4. 编写测试报告

数据库有 users 和 orders 两张表。下面用 SQL 完成真实工作中的数据核对任务。`,
      },
      {
        type: 'case',
        title: '实战：为「电商下单」设计测试点',
        scenario: '电商核心流程：用户选商品 → 加入购物车 → 提交订单 → 支付。请为这个流程列出你能想到的测试点。',
        checklist: [
          '正常流程：选商品、加购、下单、支付成功',
          '购物车为空时不能提交订单',
          '库存不足时的提示与拦截',
          '支付失败/取消后，订单状态是否正确',
          '同一商品重复加购，数量是否累加正确',
          '下单后数据库订单记录与页面显示是否一致',
          '边界：购物车数量上限、金额计算精度',
        ],
      },
      {
        type: 'sql',
        title: '实战任务：测试中的数据核对',
        hint: '运营称"北京用户共下了3单，总金额500元"。请用 SQL 验证。表：users(id,name,city)、orders(id,user_id,amount,status)',
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, city TEXT);
INSERT INTO users VALUES (1,'小明','北京'),(2,'小红','上海'),(3,'小刚','北京');
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT);
INSERT INTO orders VALUES (1,1,200,'paid'),(2,3,300,'paid'),(3,2,50,'paid');`,
        checks: [
          { label: '北京用户的已支付订单有多少单？', sql: "SELECT COUNT(*) FROM orders o JOIN users u ON o.user_id=u.id WHERE u.city='北京' AND o.status='paid';", hint: 'JOIN 两表，WHERE 过滤城市和状态' },
          { label: '北京用户已支付订单的总金额是多少？', sql: "SELECT SUM(o.amount) FROM orders o JOIN users u ON o.user_id=u.id WHERE u.city='北京' AND o.status='paid';", hint: 'COUNT 换成 SUM(amount)' },
          { label: '检查是否有「下单用户不存在」的脏数据', sql: 'SELECT o.* FROM orders o LEFT JOIN users u ON o.user_id=u.id WHERE u.id IS NULL;', hint: 'LEFT JOIN 找 u.id IS NULL 的行' },
        ],
      },
      {
        type: 'quiz',
        title: '实战任务：测试思维综合',
        questions: [
          {
            q: '下单接口返回 200 且提示成功，但查数据库发现没有订单记录。你应该？',
            options: ['不管，页面显示成功就行', '记录为缺陷：接口成功但数据未持久化', '刷新页面再看', '这是前端问题'],
            answer: 1,
            explain: '接口返回成功≠数据真存了。核对背后数据是测试员核心价值。',
          },
          {
            q: 'AI 生成了一段 Python 测试脚本，你首先看什么？',
            options: ['代码漂不漂亮', '有没有 assert，断言的是不是测试目标', '行数多不多', '用了什么高级语法'],
            answer: 1,
            explain: 'assert 是真正做验证的地方，先确认它断言对不对、有没有漏测。',
          },
          {
            q: '测试结束写测试报告，下面哪项是必须包含的？',
            options: ['所有开发的名字', '用例通过率、缺陷情况、遗留风险和上线建议', '你加班了多少小时', '系统的完整代码'],
            answer: 1,
            explain: '测试报告用数据呈现结果，明确风险和结论，支撑上线决策。',
          },
        ],
      },
      {
        type: 'lesson',
        title: '通关寄语',
        body: `恭喜你走完整个学习路线！

回头看，你已经具备了初级测试员的核心能力：
- ✅ 能从需求拆解测试点、编写用例、组织评审
- ✅ 能管理缺陷全流程（发现→修复→回归→关闭）
- ✅ 能用 SQL 做增删查改和数据核对
- ✅ 懂接口测试、了解压力测试
- ✅ 能准备测试数据、了解测试环境
- ✅ 能编写测试报告等文档
- ✅ 能阅读 AI 生成的测试脚本

**求职建议**：
1. 把这套学习过程整理成"项目经验"写进简历（模拟电商测试项目）
2. 面试时能讲清楚：你怎么设计用例、怎么发现并验证一个 Bug、怎么用 SQL 核对数据
3. 诚实说明 Python 是"阅读和辅助修改"水平，反而显得踏实

工具（Git/Jmeter/Jenkins）面试前各花 1-2 小时了解操作，能说清用途和基本流程即可。

祝你早日拿到 offer！🎯`,
      },
    ],
  };

export default level;
