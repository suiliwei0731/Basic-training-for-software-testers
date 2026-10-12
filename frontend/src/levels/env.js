// 关卡数据，由 levels.js 拆分
const level = {
    id: 'env',
    stage: 3,
    title: '测试环境与测试数据',
    icon: '🧪',
    category: '测试基础',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '招聘硬要求：搭建测试环境、准备测试数据',
        body: `这是 JD 里明确写的，也是新手最发怵的。其实没那么难。

**什么是测试环境？**
就是一套独立运行的系统（前端页面 + 后端服务 + 数据库），专门给测试用，和真实用户用的"生产环境"隔离开。

常见环境区分：
| 环境 | 用途 | 谁在用 |
|------|------|--------|
| 开发环境 | 开发自己调代码 | 开发 |
| 测试环境 | 测试执行 | 你 |
| 预发布/生产 | 真实用户 | 用户 |

**新手怎么"搭建"测试环境？**
通常不用你从零装。公司里：
1. 开发或运维会部署好，给你一个测试地址
2. 你要做的是：确认环境能访问、服务是最新版本、数据库有数据
3. 会看部署文档、会用 Tomcat/Docker 启动服务（了解即可）`,
      },
      {
        type: 'lesson',
        title: '测试数据怎么准备？',
        body: `执行测试前，数据库里得有合适的数据，这就是"准备测试数据"。

**三种方式：**
1. **造数据**：用 SQL 的 INSERT 往里插（你已经会了！）
2. **页面操作造**：在页面上注册几个账号、下几笔订单
3. **数据脚本**：公司可能有现成的初始化 SQL 脚本，导入即可

**测试数据的原则：**
- 覆盖各种场景：正常的、边界的、异常的
- 要有"已支付订单"和"未支付订单"，这样才能测不同状态
- 不用真实用户数据，用虚构的测试账号（test01、test02...）

**例子**：测"订单列表"功能，你需要准备：
- 有订单的用户、没订单的用户
- 不同状态的订单（待付款/已发货/已完成）
- 不同金额、不同时间的订单`,
      },
      {
        type: 'sql',
        title: '动手练：准备测试数据',
        hint: '你要为"订单查询功能"准备测试数据。已有空表 orders(id, user_id, amount, status)，请插入覆盖不同状态的数据。',
        seed: 'CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT);',
        checks: [
          { label: '插入一条 user_id=1, 金额100, 已支付(paid)的订单', sql: "INSERT INTO orders VALUES (1, 1, 100, 'paid');", hint: "INSERT INTO orders VALUES (1, 1, 100, 'paid')" },
          { label: '插入一条 user_id=1, 金额50, 待支付(pending)的订单', sql: "INSERT INTO orders VALUES (2, 1, 50, 'pending');", hint: 'status 换成 pending' },
          { label: '插入一条 user_id=2, 金额200, 已取消(cancelled)的订单', sql: "INSERT INTO orders VALUES (3, 2, 200, 'cancelled');", hint: '注意 id 不能重复' },
          { label: '查询验证：user_id=1 的用户有几笔订单？', sql: 'SELECT COUNT(*) FROM orders WHERE user_id = 1;', hint: 'COUNT(*) 加 WHERE 过滤' },
        ],
      },
    ],
  };

export default level;
