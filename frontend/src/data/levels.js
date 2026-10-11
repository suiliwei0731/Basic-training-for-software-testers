// 关卡数据 —— 整个学习路径的内容都在这里
// 每个关卡由若干「内容块」组成，块类型：lesson / quiz / sql / python
// 内容设计对标真实初级测试岗位 JD

export const LEVELS = [
  {
    id: 'intro',
    stage: 1,
    title: '新手村：测试员到底做什么',
    icon: '🏠',
    category: '测试基础',
    xp: 20,
    blocks: [
      {
        type: 'lesson',
        title: '先搞懂：软件测试员是干嘛的？',
        body: `想象你开了一家奶茶店。

- **程序员**：负责把奶茶做出来（写代码实现功能）。
- **测试员**：在开门营业前，把每杯奶茶都尝一遍，确保：
  - 味道对不对（功能是否正常）
  - 有没有虫子（有没有 Bug）
  - 客人说"少糖"，是不是真的少糖了（需求是否被正确实现）

**一句话总结：测试员的工作，就是在产品交给用户之前，尽可能地找出问题，并且把问题说清楚，让开发能修好。**

测试员不需要会写复杂的程序，但需要：细心、会表达、懂业务。

这份工作的日常（对照招聘要求）：
1. 看需求文档，琢磨"这里可能出什么问题"
2. 把琢磨出来的写成测试用例
3. 搭环境、准备数据、执行测试
4. 发现 Bug 写清楚，盯着开发修好
5. 写测试报告总结`,
      },
      {
        type: 'lesson',
        title: '举个真实的例子：登录功能',
        body: `几乎每个 App 都有登录。我们看看测试员会怎么测它。

**需求是这样的：** 用户输入正确的用户名和密码，点击登录，就能进入首页。

测试员不会只测"输对了能不能进"，还会想：

| 场景 | 输入 | 预期结果 |
|------|------|----------|
| 正常登录 | 正确账号 + 正确密码 | 进入首页 |
| 密码错误 | 正确账号 + 错误密码 | 提示"用户名或密码错误" |
| 账号不存在 | 随便输个账号 | 提示"用户名或密码错误" |
| 空账号 | 账号留空 | 提示"请输入用户名" |
| 空密码 | 密码留空 | 提示"请输入密码" |

这张表里的每一行，就叫一条**测试用例**。

测试员的核心思维就是：**不停地问"如果……会怎样？"**`,
      },
      {
        type: 'quiz',
        title: '小测验：你理解测试员的工作了吗？',
        questions: [
          {
            q: '软件测试员最主要的目标是什么？',
            options: ['写出漂亮的代码', '在产品上线前找出问题并描述清楚', '把所有功能都实现出来', '管理公司的服务器'],
            answer: 1,
            explain: '测试员的核心是发现问题、说清楚问题，而不是写代码实现功能。',
          },
          {
            q: '下面哪个最像一条「测试用例」？',
            options: ['登录功能真好用', '输入正确账号密码，预期：进入首页', '我觉得登录页面颜色应该改一下', '程序员今天修了3个bug'],
            answer: 1,
            explain: '测试用例 = 明确的输入/操作 + 明确的预期结果。',
          },
          {
            q: '测试员测登录时，下面哪种想法最重要？',
            options: ['只测正常情况能过就行', '不停地想"如果输错了会怎样"', '只看界面好不好看', '等用户反馈再说'],
            answer: 1,
            explain: '测试思维的核心就是考虑各种异常和边界情况。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：说说测试员都做些什么',
        prompt: '用你自己的话写一写：软件测试员平时主要做哪些工作？（写出你记得的即可，想到什么写什么）',
        hint: '回想"奶茶店"的例子：开门营业前，要做哪些检查？',
        keywords: ['需求', '用例', '执行', '缺陷', '报告'],
        placeholder: '比如：看需求文档、写测试用例、执行测试、发现并记录 Bug、写测试报告…',
        answer: `软件测试员的主要工作包括：
1）阅读和分析需求，理解产品要做什么；
2）编写测试用例，明确测什么、怎么测；
3）执行测试用例，验证功能是否正常；
4）发现并记录缺陷（Bug），跟踪修复与回归；
5）编写测试报告，总结测试结果。`,
      },
    ],
  },

  {
    id: 'testcase',
    stage: 1,
    title: '第一关：需求分析与测试用例',
    icon: '📝',
    category: '测试基础',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '第一步：从需求里找测试点',
        body: `工作的第一步不是写用例，而是**读需求、找测试点**。招聘要求第一条就是"参与需求分析"。

拿到一段需求，你要问自己三个问题：
1. **这个功能要做什么？**（理解目标）
2. **正常流程怎么走？**（正向用例）
3. **哪些地方可能出错？**（反向、边界用例）

**例子**——需求："用户可以修改昵称，昵称长度 2-20 个字符。"

拆解出的测试点：
- 正常：输入 5 个字，能改成功，页面显示新昵称
- 边界：输入 2 个字、20 个字，是否成功
- 反向：输入 1 个字、21 个字，是否拦截并提示
- 异常：输入空格、特殊符号、emoji，怎么处理
- 数据：改完后数据库里存的是不是新值

**需求不明确时怎么办？** 主动问产品/开发，别自己猜。把疑问记下来就是测试员"提建设性意见"的体现。`,
      },
      {
        type: 'lesson',
        title: '测试用例的四大件',
        body: `一条合格的测试用例，就像一份菜谱，别人照着就能做。它需要四样东西：

1. **前置条件**：做这个测试之前，需要什么准备？
   例：已登录账号 test。

2. **操作步骤**：具体做什么？
   例：进入设置页 → 昵称输入框输入"小明" → 点击保存。

3. **测试数据**：用什么数据测？
   例：昵称 = 小明。

4. **预期结果**：正确情况下应该发生什么？
   例：提示"保存成功"，页面昵称变为"小明"，数据库同步更新。

**预期结果是"应该怎样"，提前写好当标准答案；实际结果执行时再填。**`,
      },
      {
        type: 'lesson',
        title: '两种必学的设计方法',
        body: `**1. 等价类：把相似的情况归为一类，测一个代表就行**

密码要求 6-20 位：
- 有效等价类：8 位（在范围内）→ 测一个就行
- 无效等价类：3 位（太短）、25 位（太长）→ 各测一个

**2. 边界值：重点测"临界点"**

密码 6-20 位，边界值就是：**5 位、6 位、20 位、21 位**。
因为程序员写 \`>= 6 && <= 20\` 时，最容易在等于号上出错。

**口诀：等价类省时间，边界值抓 Bug。**`,
      },
      {
        type: 'lesson',
        title: '什么是用例评审？为什么要评审？',
        body: `招聘要求里写了"组织测试用例评审"。什么意思？

**用例评审**：用例写完后，拉上开发、产品一起看一遍。
- 产品看：有没有漏测的业务场景
- 开发看：有没有技术上测不了或写错的地方
- 你自己：通过讲解把逻辑理顺

**评审的价值**：在执行前就发现"漏了"或"错了"，比测到一半返工强 10 倍。

新手怎么参与评审？
1. 先自己过一遍，标出没把握的点
2. 会上逐条讲，重点讲"我为什么这么测"
3. 记录修改意见，会后更新用例`,
      },
      {
        type: 'quiz',
        title: '小测验：需求分析与用例设计',
        questions: [
          {
            q: '某输入框要求"年龄 18-60 岁"，下面哪个是边界值测试？',
            options: ['输入 25 岁', '输入 30 岁', '输入 17、18、60、61 岁', '输入 100 岁'],
            answer: 2,
            explain: '边界值要测临界点的两侧：刚好不满足、刚好满足、上限、刚好超出上限。',
          },
          {
            q: '拿到需求文档，测试员第一步应该做什么？',
            options: ['立刻开始写用例', '理解需求，拆解出测试点', '直接去执行测试', '等开发做完再说'],
            answer: 1,
            explain: '先理解需求、找全测试点，写用例才不会漏。',
          },
          {
            q: '关于测试用例评审，说法正确的是？',
            options: ['评审是浪费时间，直接测就行', '评审能在执行前发现遗漏，值得做', '只有老员工才需要评审', '评审就是走个过场'],
            answer: 1,
            explain: '用例评审是测试流程的重要环节，提前发现问题比返工高效得多。',
          },
        ],
      },
      {
        type: 'case',
        title: '动手：为「用户登录」设计测试用例',
        scenario: '某 App 的登录功能：输入用户名和密码，点「登录」按钮。请你列出能想到的测试点。',
        checklist: [
          '正确账号 + 正确密码 → 登录成功，进入首页',
          '正确账号 + 错误密码 → 提示错误，不登录',
          '账号不存在 → 提示错误',
          '用户名为空 → 拦截并提示',
          '密码为空 → 拦截并提示',
          '边界：密码最短、最长长度',
          '异常：特殊字符、SQL 注入尝试',
        ],
      },
      {
        type: 'short',
        title: '动手：照着写一份测试用例',
        prompt: '请参考下方参考答案，照着写一条完整的测试用例（要包含：标题、前置条件、操作步骤、预期结果）。',
        keywords: ['标题', '前置条件', '步骤', '预期结果'],
        placeholder: '用例标题：…\n前置条件：…\n操作步骤：…\n预期结果：…',
        answer: `用例标题：正确账号密码登录成功
前置条件：已注册账号 test，密码 123456
操作步骤：
1. 打开登录页面
2. 输入用户名 test
3. 输入密码 123456
4. 点击登录按钮
预期结果：登录成功，页面跳转到系统首页`,
      },
    ],
  },

  {
    id: 'bug',
    stage: 1,
    title: '第二关：缺陷管理全流程',
    icon: '🐛',
    category: '测试基础',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '发现 Bug 后，怎么让开发服气？',
        body: `发现问题只是第一步，**说清楚问题**才是真本事。招聘要求"记录缺陷、主动追踪缺陷处理周期"。

一个好的缺陷报告包含：

| 字段 | 说明 | 例子 |
|------|------|------|
| 标题 | 一句话说清什么不对 | 登录时密码错误却提示"登录成功" |
| 前置条件 | 测试前的状态 | 已注册账号 test/123456 |
| 复现步骤 | 1、2、3 步操作 | 1.打开登录页 2.账号输 test 3.密码输错 4.点登录 |
| 预期结果 | 应该怎样 | 提示"用户名或密码错误" |
| 实际结果 | 实际怎样 | 跳转到了首页 |
| 严重程度 | 影响多大 | 致命/严重/一般/轻微 |
| 优先级 | 多急修 | 高/中/低 |

**复现步骤是灵魂**，开发复现不出来就修不了。`,
      },
      {
        type: 'lesson',
        title: '缺陷的生命周期：从发现到关闭',
        body: `一个 Bug 从生到死要走完整流程，这就是"追踪缺陷处理周期"：

\`\`\`
新建(New) → 指派(Assigned) → 开发修复(Resolved) → 你回归验证(Verified) → 关闭(Closed)
                                                                      ↓ 没修好
                                                              重新打开(Reopen)
\`\`\`

每个阶段测试员要做的事：
1. **新建**：写清楚报告，指派给对应开发
2. **跟进**：过两天看开发修没修，没动静就催（主动追踪！）
3. **回归验证**：开发说修好了，你要重新测一遍，确认真修好了且没引入新问题
4. **关闭 or 重新打开**：修好了就关闭；没修好或修坏了别的，重新打开并说明原因

**回归测试**：验证 Bug 修复，同时确认修复没影响其他功能。这是测试员的日常高频工作。`,
      },
      {
        type: 'lesson',
        title: '严重程度 vs 优先级',
        body: `新手最容易搞混，这两个是两码事：

- **严重程度**：这个 Bug 本身有多坏。（客观）
- **优先级**：要不要马上修。（看业务和时间）

例子：
- 登录不了 → 严重：致命，优先级：高
- 首页标题错了一个字 → 严重：轻微，但今天要上线 → 优先级可能很高

**判断严重程度问"用户能不能正常用"；判断优先级问"现在修还是以后修"。**`,
      },
      {
        type: 'quiz',
        title: '小测验：缺陷管理',
        questions: [
          {
            q: '开发说"Bug 修好了"，测试员下一步应该做什么？',
            options: ['直接关闭', '回归验证：重新测一遍确认修好且没影响其他功能', '不管了', '让产品去看'],
            answer: 1,
            explain: '回归验证是测试员的职责，确认修复有效且没有引入新问题。',
          },
          {
            q: '回归测试时发现原来的 Bug 没修好，应该？',
            options: ['算了，将就用', '把缺陷状态改为重新打开(Reopen)，说明原因', '直接关闭', '重新提一个新 Bug'],
            answer: 1,
            explain: '没修好就重新打开，让开发继续修，并写清验证情况。',
          },
          {
            q: 'App 完全无法登录，所有用户受影响。严重程度和优先级？',
            options: ['轻微 / 低', '一般 / 中', '致命 / 高', '轻微 / 高'],
            answer: 2,
            explain: '核心功能不可用 = 致命；影响所有用户 = 高优先级。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：写出缺陷报告的要素',
        prompt: '请写一写：一份能让开发顺利修复的缺陷报告（Bug 单），应该包含哪些内容？',
        hint: '回想一下：开发拿到 Bug 单，需要知道"在哪、怎么重现、应该怎样、实际怎样、有多急"。',
        keywords: ['标题', '步骤', '预期', '实际', '严重程度'],
        placeholder: '我觉得应该有：标题、复现步骤…',
        answer: `一份缺陷报告应包含：
标题：一句话说明是什么问题
复现步骤：开发能照着操作重现
预期结果：应该是怎样的
实际结果：实际是怎样的
严重程度 / 优先级：问题有多急
必要时附上截图`,
      },
    ],
  },

  {
    id: 'sql1',
    stage: 2,
    title: '第三关：SQL 入门 —— 查数据',
    icon: '🗄️',
    category: 'SQL',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '为什么测试员必须学 SQL？',
        body: `你在页面上点了"注册"，提示"注册成功"。但你怎么知道数据库里真的存了？

——**去数据库里查一下！** 这就是学 SQL 的原因：**核对页面操作背后的数据对不对。**

招聘要求"熟悉 Mysql、SqlServer、Oracle，具备增删查改能力"。不同数据库 SQL 语法大同小异，学会一种其他的上手很快。

数据库想象成超大 Excel：
- **表（table）** = 一个工作表
- **行** = 一条记录
- **列/字段** = 一个属性
- **主键（id）** = 每行唯一编号`,
      },
      {
        type: 'lesson',
        title: '最基础的查询：SELECT',
        body: `语法：\`SELECT 列名 FROM 表名;\`

- \`SELECT * FROM users;\` → 查所有列、所有行
- \`SELECT name, age FROM users;\` → 只查这两列
- \`SELECT * FROM users WHERE age > 18;\` → 加条件筛选

**FROM 后跟表，SELECT 后跟要看的列，WHERE 后跟筛选条件。**

下面是 SQL 沙箱，里面已有 users 表，随便查，不影响真实数据。`,
      },
      {
        type: 'sql',
        title: '动手练：SQL 沙箱',
        hint: '试试输入 SELECT * FROM users; 然后点运行。表：users(id, name, age, city)',
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
INSERT INTO users VALUES (1,'小明',25,'北京'),(2,'小红',30,'上海'),(3,'小刚',17,'广州'),(4,'小美',28,'北京'),(5,'小强',22,'深圳');`,
        checks: [
          { label: '查出所有用户的全部信息', sql: 'SELECT * FROM users;', hint: '用 * 代表所有列' },
          { label: '只查出 name 和 city 两列', sql: 'SELECT name, city FROM users;', hint: '列名之间用逗号隔开' },
          { label: '查出年龄大于 20 的用户', sql: 'SELECT * FROM users WHERE age > 20;', hint: 'WHERE age > 20' },
        ],
      },
    ],
  },

  {
    id: 'sql2',
    stage: 2,
    title: '第四关：SQL 条件筛选',
    icon: '🔍',
    category: 'SQL',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: 'WHERE 的常用操作符',
        body: `| 操作符 | 含义 | 例子 |
|--------|------|------|
| = | 等于 | WHERE city = '北京' |
| != | 不等于 | WHERE age != 18 |
| > < >= <= | 比较 | WHERE age >= 18 |
| AND | 且 | WHERE age > 20 AND city = '北京' |
| OR | 或 | WHERE city = '北京' OR city = '上海' |
| IN | 在集合里 | WHERE city IN ('北京','上海') |
| BETWEEN | 范围内 | WHERE age BETWEEN 18 AND 30 |
| LIKE | 模糊匹配 | WHERE name LIKE '小%' |

**文本值加单引号，数字不用。空值判断用 IS NULL，不能用 = NULL。**`,
      },
      {
        type: 'sql',
        title: '动手练：条件查询',
        hint: 'users 表字段：id, name, age, city',
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
INSERT INTO users VALUES (1,'小明',25,'北京'),(2,'小红',30,'上海'),(3,'小刚',17,'广州'),(4,'小美',28,'北京'),(5,'小强',22,'深圳'),(6,'小丽',19,'上海');`,
        checks: [
          { label: '查出所有北京的用户', sql: "SELECT * FROM users WHERE city = '北京';", hint: "WHERE city = '北京'" },
          { label: '查出年龄在 20 到 30 之间（含两端）', sql: 'SELECT * FROM users WHERE age BETWEEN 20 AND 30;', hint: 'BETWEEN 小 AND 大' },
          { label: '查出名字以「小」开头的用户', sql: "SELECT * FROM users WHERE name LIKE '小%';", hint: "LIKE '小%'，% 是通配符" },
          { label: '查出北京或上海的用户', sql: "SELECT * FROM users WHERE city IN ('北京','上海');", hint: '用 IN (...) 更简洁' },
        ],
      },
    ],
  },

  {
    id: 'sql3',
    stage: 2,
    title: '第五关：排序、统计与分组',
    icon: '📊',
    category: 'SQL',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '排序与统计函数',
        body: `**排序 ORDER BY：**
\`SELECT * FROM users ORDER BY age DESC;\` → 从大到小（ASC 从小到大，默认）

**统计函数（很常用）：**
- \`COUNT(*)\` 数行数
- \`SUM(列)\` 求和
- \`AVG(列)\` 平均值
- \`MAX/MIN(列)\` 最大/最小`,
      },
      {
        type: 'lesson',
        title: '分组 GROUP BY：测试核对的利器',
        body: `想知道"每个城市有多少用户"？

\`\`\`sql
SELECT city, COUNT(*) AS 人数
FROM users
GROUP BY city;
\`\`\`

**测试场景**：页面显示"北京用户 100 人"，你就用这条 SQL 核对数据库对不对。

\`HAVING\` 对分组结果再筛：\`... GROUP BY city HAVING COUNT(*) > 1;\``,
      },
      {
        type: 'sql',
        title: '动手练：排序与统计',
        hint: 'orders 表：id, user_id, amount, status（paid/pending/cancelled）',
        seed: `CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT);
INSERT INTO orders VALUES (1,1,99.5,'paid'),(2,1,50,'pending'),(3,2,200,'paid'),(4,3,30,'cancelled'),(5,2,15.5,'paid'),(6,1,88,'paid');`,
        checks: [
          { label: '统计总共有多少条订单', sql: 'SELECT COUNT(*) FROM orders;', hint: 'COUNT(*)' },
          { label: '统计已支付订单的总金额', sql: "SELECT SUM(amount) FROM orders WHERE status = 'paid';", hint: 'SUM(amount) 加 WHERE' },
          { label: '按金额从高到低排序', sql: 'SELECT * FROM orders ORDER BY amount DESC;', hint: 'ORDER BY amount DESC' },
          { label: '按状态分组统计每种状态的订单数', sql: 'SELECT status, COUNT(*) FROM orders GROUP BY status;', hint: 'GROUP BY status' },
        ],
      },
    ],
  },

  {
    id: 'sql4',
    stage: 2,
    title: '第六关：多表关联 JOIN',
    icon: '🔗',
    category: 'SQL',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: '为什么要 JOIN？',
        body: `真实业务数据分散在多张表。比如 users 存用户、orders 存订单，订单里只有 user_id。

想知道"每个订单是谁下的"，就得把两张表**拼起来**——这就是 JOIN。`,
      },
      {
        type: 'lesson',
        title: 'INNER JOIN 与 LEFT JOIN',
        body: `**INNER JOIN：只取两张表都匹配的行**
\`\`\`sql
SELECT o.id, u.name, o.amount
FROM orders o
INNER JOIN users u ON o.user_id = u.id;
\`\`\`

**LEFT JOIN：左边全保留，右边没匹配的显示 NULL**
\`\`\`sql
SELECT u.name, o.amount FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
\`\`\`

**测试员用法**：用 LEFT JOIN 找"孤儿数据"——订单的 user_id 在 users 表里根本不存在：
\`\`\`sql
SELECT o.* FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;
\`\`\``,
      },
      {
        type: 'sql',
        title: '动手练：多表查询',
        hint: 'users(id,name) 和 orders(id,user_id,amount,status)',
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO users VALUES (1,'小明'),(2,'小红'),(3,'小刚');
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT);
INSERT INTO orders VALUES (1,1,99.5,'paid'),(2,2,200,'paid'),(3,1,50,'pending'),(4,99,30,'paid');`,
        checks: [
          { label: '查出每个订单的 id、下单人姓名、金额', sql: 'SELECT o.id, u.name, o.amount FROM orders o INNER JOIN users u ON o.user_id = u.id;', hint: 'orders JOIN users ON user_id = id' },
          { label: '找出下单人在 users 表中不存在的异常订单', sql: 'SELECT o.* FROM orders o LEFT JOIN users u ON o.user_id = u.id WHERE u.id IS NULL;', hint: 'LEFT JOIN 后 WHERE u.id IS NULL' },
        ],
      },
    ],
  },

  {
    id: 'sql5',
    stage: 2,
    title: '第七关：SQL 增删改（写入操作）',
    icon: '✏️',
    category: 'SQL',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: '招聘要求"增删查改"，写入操作也要会',
        body: `前面都是查（SELECT），现在学写入三兄弟。

⚠️ **重要提醒**：INSERT/UPDATE/DELETE 会真正改变数据！工作中：
1. 只在**测试库**操作，绝不动生产库
2. 改之前先 SELECT 确认要改的是哪些行
3. 最好先 BEGIN，确认没问题再 COMMIT；不对就 ROLLBACK`,
      },
      {
        type: 'lesson',
        title: '三种写入语句',
        body: `**INSERT 新增一行：**
\`\`\`sql
INSERT INTO users (name, age, city) VALUES ('小赵', 26, '杭州');
\`\`\`

**UPDATE 修改已有行：**
\`\`\`sql
UPDATE users SET age = 27 WHERE name = '小明';
\`\`\`
⚠️ 忘写 WHERE 会把全表都改了！这是测试员最容易闯祸的地方。

**DELETE 删除行：**
\`\`\`sql
DELETE FROM users WHERE name = '小刚';
\`\`\`
同样，忘写 WHERE 会清空整张表。

**测试场景**：
- 注册功能后，用 INSERT 模拟一条用户数据做测试
- 验证"修改昵称"接口，UPDATE 后再 SELECT 看是否真改了
- 清理测试垃圾数据用 DELETE`,
      },
      {
        type: 'sql',
        title: '动手练：增删改',
        hint: '先 SELECT 看看初始数据，再做写入练习。每做完一个可以 SELECT 验证。',
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
INSERT INTO users VALUES (1,'小明',25,'北京'),(2,'小红',30,'上海');`,
        checks: [
          { label: '新增一个用户：id=3, name=小刚, age=20, city=深圳', sql: "INSERT INTO users VALUES (3,'小刚',20,'深圳');", hint: 'INSERT INTO users VALUES (...)' },
          { label: '把小明的年龄改为 26', sql: "UPDATE users SET age = 26 WHERE name = '小明';", hint: 'UPDATE ... SET ... WHERE ...' },
          { label: '删除小红这条记录', sql: "DELETE FROM users WHERE name = '小红';", hint: 'DELETE FROM ... WHERE ...' },
          { label: '查询所有用户，确认改动生效', sql: 'SELECT * FROM users;', hint: '看看最终结果' },
        ],
      },
      {
        type: 'quiz',
        title: '小测验：SQL 安全',
        questions: [
          {
            q: '执行 UPDATE 或 DELETE 时，最重要的注意事项是？',
            options: ['速度要快', '一定要带 WHERE 条件，否则会影响全表', '用大写字母', '多执行几遍'],
            answer: 1,
            explain: '不带 WHERE 的 UPDATE/DELETE 会作用于全表，造成灾难性后果。',
          },
          {
            q: '工作中要修改数据库数据，应该怎么做？',
            options: ['直接在生产库改', '只在测试库操作，改前先 SELECT 确认', '让别人帮我改', '随便改，错了再说'],
            answer: 1,
            explain: '测试员只能操作测试库，且改前确认目标行，这是基本职业素养。',
          },
        ],
      },
    ],
  },

  {
    id: 'api',
    stage: 3,
    title: '第八关：接口测试基础',
    icon: '🌐',
    category: '接口测试',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '什么是接口？为什么要测它？',
        body: `App 点"登录"，会发请求给后端服务器，服务器查完返回结果。这个"请求-响应"通道就是**接口（API）**。

测接口的原因：
- 页面可能有缓存或 Bug，接口返回的数据才是"真相"
- 前端没做完时可以先测接口，提前发现问题
- 很多 Bug 是接口数据不对导致的`,
      },
      {
        type: 'lesson',
        title: 'HTTP 必知必会',
        body: `**请求方法：** GET 查、POST 新增、PUT/PATCH 修改、DELETE 删除

**常见状态码：**
| 码 | 含义 | 测试意义 |
|----|------|------|
| 200 | 成功 | 正常 |
| 400 | 参数错了 | 校验问题 |
| 401 | 未登录/没权限 | 鉴权问题 |
| 404 | 接口不存在 | 路径错 |
| 500 | 服务器内部错误 | **后端 Bug，要提单！** |

**JSON** 格式：
\`\`\`json
{ "name": "小明", "age": 25, "hobbies": ["读书", "跑步"] }
\`\`\`
\`{}\` 键值对，\`[]\` 数组，字符串用双引号。`,
      },
      {
        type: 'quiz',
        title: '小测验：接口基础',
        questions: [
          {
            q: '用户注册新账号，最可能用哪个 HTTP 方法？',
            options: ['GET', 'POST', 'DELETE', 'PATCH'],
            answer: 1,
            explain: '新增数据用 POST。',
          },
          {
            q: '接口返回 500，通常意味着？',
            options: ['参数传错了', '没登录', '服务器内部出错，可能是后端 Bug', '接口地址错了'],
            answer: 2,
            explain: '500 是服务端代码异常，是测试员需要重点提单的信号。',
          },
          {
            q: '下面哪个是合法的 JSON？',
            options: ['{name: 小明}', "{'name': '小明'}", '{ "name": "小明" }', '[name=小明]'],
            answer: 2,
            explain: 'JSON 的键和字符串值必须用双引号。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：判读一个接口的返回结果',
        prompt: '假如你调用登录接口，返回 HTTP 状态码 200，响应体是 {"code":0,"message":"success","data":{"userId":101,"token":"abc"}}。请写一写：这个接口算测试通过吗？你会检查响应里的哪些内容来下结论？',
        hint: '除了 HTTP 状态码，响应体里的字段（如 code、token）才反映真实业务结果，都要核对。',
        keywords: ['200', 'code', 'token', '断言', 'message'],
        placeholder: '我会先看状态码是不是 200，再看响应体里的…',
        answer: `判断这个接口是否通过：
1. HTTP 状态码是否为 200
2. 响应体 code 是否为 0（表示成功）
3. message 是否为 success
4. data 里是否返回 userId 和 token
对以上字段做断言，都符合预期才算接口测试通过`,
      },
    ],
  },

  {
    id: 'env',
    stage: 1,
    title: '第九关：测试环境与测试数据',
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
  },

  {
    id: 'pressure',
    stage: 5,
    title: '第十关：压力测试入门',
    icon: '⚡',
    category: '测试进阶',
    xp: 30,
    blocks: [
      {
        type: 'lesson',
        title: '什么是压力测试？',
        body: `JD 提到"压力测试经验优先"。初级岗不要求精通，但要懂概念。

**压力测试**：模拟很多人同时使用系统，看系统扛不扛得住、响应快不快。

比如：双十一时几万人同时下单，系统会不会崩？这就要压力测试提前摸底。

**几个关键指标：**
- **并发数**：同时有多少人在用（如 1000 人同时登录）
- **响应时间**：点一下到出结果要多久（如 2 秒内算合格）
- **吞吐量（TPS/QPS）**：每秒能处理多少请求
- **错误率**：1000 次请求失败了多少次`,
      },
      {
        type: 'lesson',
        title: '认识 Jmeter（最常用的压力测试工具）',
        body: `招聘里写的 Jemter 就是 **JMeter**，免费开源、最常用。

**新手怎么用 JMeter（了解流程即可）：**
1. 新建"线程组"，设置并发数（比如 100 个线程 = 模拟 100 人）
2. 加一个"HTTP 请求"，填好接口地址
3. 加"监听器"看结果（聚合报告：响应时间、吞吐量、错误率）
4. 点运行，看报告

**测试员要做的：**
- 看懂聚合报告：平均响应时间、P95 响应时间、错误率
- 判断结果达标不达标（需求里通常会定指标，如"响应时间<2秒，错误率<0.1%"）
- 不达标就提单给开发优化

**初级阶段**：会安装、会跑一个简单接口、能看懂报告结论，就够面试说了。`,
      },
      {
        type: 'quiz',
        title: '小测验：压力测试',
        questions: [
          {
            q: '压力测试主要关注什么？',
            options: ['界面好不好看', '系统在高并发下的性能表现（响应时间、吞吐量）', '功能对不对', '代码写得好不好'],
            answer: 1,
            explain: '压力测试验证系统在大量用户同时使用时的承载能力和性能。',
          },
          {
            q: '关于 JMeter，初级测试员需要做到什么程度？',
            options: ['精通开发 JMeter 插件', '会跑简单接口、看懂响应时间和错误率报告', '必须能从零搭建平台', '完全不用了解'],
            answer: 1,
            explain: '初级岗位了解概念、会基本操作、能解读报告即可，深入是进阶方向。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：说说压力测试看什么',
        prompt: '如果让你对一个登录接口做压力测试，你会重点关注哪些指标来判断系统好不好？',
        hint: '可以从"快不快、扛不扛得住、出不出错"这几个角度去想。',
        keywords: ['响应时间', '并发', '吞吐量', '错误率'],
        placeholder: '我会看响应时间、同时多少人在用…',
        answer: `压力测试重点关注：
响应时间：请求处理得快不快
并发用户数：能同时支持多少人使用
吞吐量：每秒能处理多少请求
错误率：出错的比例高不高
资源占用：服务器的 CPU、内存是否正常`,
      },
    ],
  },

  {
    id: 'py1',
    stage: 4,
    title: '第十一关：Python 阅读（变量与判断）',
    icon: '🐍',
    category: 'Python',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '测试员学 Python 到什么程度？',
        body: `目标：**能看懂 AI 生成的测试脚本，能改一点点，能判断它测没测对。** 不是当程序员。

Python 读起来像蹩脚英语，认识几个关键词就行。`,
      },
      {
        type: 'lesson',
        title: '变量与条件判断',
        body: `\`\`\`python
name = "小明"     # 字符串用引号
age = 25          # 数字不用
is_vip = True     # 布尔值 True/False（首字母大写）

if age >= 18:
    print("成年")
else:
    print("未成年")
\`\`\`

Python 靠**缩进**区分代码块，缩进错了会报错。`,
      },
      {
        type: 'python',
        title: '练一练：先猜结果，再点运行',
        code: `age = 17
if age >= 18:
    result = "成年"
else:
    result = "未成年"
print("结果：", result)`,
        expected: '结果： 未成年',
        question: '运行后打印什么？',
        hint: 'age 等于 17，不满足 >= 18，会走 else 分支，得到"未成年"。另外 print 里用逗号分隔，会在"结果："后面多输出一个空格。',
      },
      {
        type: 'python',
        title: '多条件判断',
        code: `score = 85
if score >= 90:
    level = "A"
elif score >= 60:
    level = "B"
else:
    level = "C"
print("等级：", level)`,
        expected: '等级： B',
        question: 'score = 85，打印结果是？',
        hint: '85 不满足 >= 90（第一条跳过），但满足 elif 的 >= 60，所以 level 被赋值为 B。',
      },
    ],
  },

  {
    id: 'py2',
    stage: 4,
    title: '第十二关：Python 阅读（循环与函数）',
    icon: '🔁',
    category: 'Python',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '循环：重复做一件事',
        body: `\`\`\`python
names = ["小明", "小红", "小刚"]
for name in names:
    print(name)
\`\`\`

**字典：键值对**
\`\`\`python
user = {"name": "小明", "age": 25}
print(user["name"])   # "小明"
\`\`\``,
      },
      {
        type: 'lesson',
        title: '函数和断言：测试脚本的核心',
        body: `**函数**：把逻辑打包复用。
\`\`\`python
def add(a, b):
    return a + b

print(add(2, 3))   # 5
\`\`\`

**断言 assert**：测试脚本里最常见！"我断言这里一定成立，不成立就报错（测试失败）"。
\`\`\`python
assert add(2, 3) == 5, "加法算错了"
\`\`\`

**看测试脚本，重点找 assert，它才是真正在"验证"的地方。**`,
      },
      {
        type: 'python',
        title: '读懂一个测试脚本',
        code: `def login(username, password):
    if username == "admin" and password == "123456":
        return "success"
    return "fail"

result = login("admin", "123456")
assert result == "success", "正确密码却登录失败"
print("测试通过")`,
        expected: '测试通过',
        question: '运行后会打印什么？',
        hint: '传入的账号 admin 和密码 123456 正好匹配，函数返回 "success"，断言成立，所以最后打印"测试通过"。',
      },
      {
        type: 'python',
        title: '循环 + 列表',
        code: `prices = [10, 20, 30]
total = 0
for p in prices:
    total = total + p
print("总价：", total)`,
        expected: '总价： 60',
        question: '打印的总价是多少？',
        hint: 'for 循环依次取出 10、20、30 加到 total 上，10+20+30=60。print 逗号同样会在"总价："后多一个空格。',
      },
    ],
  },

  {
    id: 'py3',
    stage: 4,
    title: 'Python 列表、字典与异常',
    icon: '🐍',
    category: 'Python',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '列表：一组有序的数据',
        body: `列表就是"一排东西"，用方括号包起来，从 0 开始编号。
\`\`\`python
fruits = ["苹果", "香蕉", "橘子"]
print(fruits[0])      # 苹果（第 1 个，编号 0）
print(len(fruits))    # 3（一共几个）
fruits.append("葡萄") # 末尾加一个
print(fruits)         # ["苹果","香蕉","橘子","葡萄"]
\`\`\`

**字典：用"键"找"值"**，像通讯录用名字找电话。
\`\`\`python
user = {"name": "小明", "age": 25}
print(user["name"])   # 小明
print(user.get("age"))# 25
\`\`\`

测试里常拿它们**存测试数据、循环批量验证**。`,
      },
      {
        type: 'lesson',
        title: '异常处理：程序出错了别崩',
        body: `程序遇到错误会中断。用 try/except 把错误"接住"，让程序继续跑。
\`\`\`python
try:
    result = 10 / 0          # 除以 0 会报错
    print(result)
except ZeroDivisionError:
    print("除数不能为 0")     # 出错就走这里，程序不崩
\`\`\`

在自动化测试里，有时预期就是"应该报错"，就用 try/except 来验证。`,
      },
      {
        type: 'python',
        title: '练一练：列表与字典',
        code: `prices = [10, 20, 30]
total = 0
for p in prices:
    total = total + p
print("总价：", total)

user = {"name": "小红", "city": "北京"}
print("城市：", user["city"])`,
        expected: '总价： 60 城市： 北京',
        question: '运行后打印什么？（两行结果，空格隔开也行）',
        hint: '循环把 10、20、30 相加得 60；字典用 "city" 这个键取出 "北京"。',
      },
      {
        type: 'python',
        title: '练一练：异常捕获',
        code: `data = {}
try:
    print(data["不存在的键"])
except KeyError:
    print("没有这个键")
print("程序结束")`,
        expected: '没有这个键 程序结束',
        question: '运行后打印什么？',
        hint: '字典里没有这个键，取值会触发 KeyError，被 except 接住打印"没有这个键"，然后继续执行最后一行。',
      },
    ],
  },

  {
    id: 'pytest',
    stage: 5,
    title: 'pytest 自动化测试入门',
    icon: '🧪',
    category: '自动化测试',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: '什么是自动化测试？为什么学它',
        body: `手动测试：每次都要人去点、去看。**自动化测试：把测试步骤写成代码，让程序自动跑、自动判断对错。**

什么时候用自动化：
- 同一个功能要**反复测**（比如每次改完代码都要回归一遍）
- 测试**数量多**，人手点不过来
- 需要**快速**知道这次改动有没有搞坏旧功能

pytest 是 Python 里**最流行**的自动化测试框架，简单好用。`,
      },
      {
        type: 'lesson',
        title: '第一个 pytest 测试',
        body: `测试用例就是一个 **test_ 开头** 的函数，里面用 **assert（断言）** 检查结果。
\`\`\`python
# 文件：test_login.py
def login(username, password):
    if username == "admin" and password == "123456":
        return "success"
    return "fail"

def test_login_success():
    assert login("admin", "123456") == "success"

def test_login_wrong_password():
    assert login("admin", "000000") == "fail"
\`\`\`

在命令行运行：\`pytest\`，它会自动找到所有 test_ 开头的函数并执行，告诉你通过几条、失败几条。`,
      },
      {
        type: 'lesson',
        title: '在你电脑上跑通（照着做）',
        body: `1. 安装：命令行输入 \`pip install pytest\`
2. 新建文件 \`test_demo.py\`，把上面的代码粘进去
3. 命令行进入该文件夹，输入 \`pytest -v\`
4. 你会看到两个测试都显示 \`PASSED\` ✅

把正确密码改成错的再跑，就会看到 \`FAILED\`，并指出哪一行断言不通过——这就是自动化测试在帮你"自动找问题"。`,
      },
      {
        type: 'quiz',
        title: '小测验：pytest 基础',
        questions: [
          {
            q: 'pytest 会自动执行什么样的函数？',
            options: ['任意函数', 'test_ 开头的函数', 'main 函数', '带 @test 标记的函数'],
            answer: 1,
            explain: 'pytest 默认收集并执行以 test_ 开头的函数。',
          },
          {
            q: '自动化测试里，用来"判断结果对不对"的关键字是？',
            options: ['print', 'if', 'assert', 'return'],
            answer: 2,
            explain: 'assert（断言）不成立时测试就失败，它是自动化验证的核心。',
          },
          {
            q: '下面哪种情况最适合用自动化测试？',
            options: ['只测一次的新功能', '每次发版前都要重复测的回归用例', '看界面美不美', '随便点点试试'],
            answer: 1,
            explain: '重复、大量、需要快速执行的测试，最适合自动化。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：照着写一个 pytest 测试',
        prompt: '请照着答案，写一个 test_ 开头的 pytest 测试函数，断言 1+1 等于 2。',
        answer: `def test_add():
    assert 1 + 1 == 2`,
        keyPoints: ['def test', 'assert', '1 + 1 == 2'],
      },
    ],
  },

  {
    id: 'playwright',
    stage: 5,
    title: 'Playwright 网页自动化',
    icon: '🎭',
    category: '自动化测试',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: 'Playwright 是什么',
        body: `Playwright 能**用代码自动操作浏览器**：打开网页、输入文字、点击按钮、读取页面内容——就像一个不知疲倦的测试员在替你点。

它能测真实的网页，是现在最流行的网页自动化工具之一。`,
      },
      {
        type: 'lesson',
        title: '一段 Playwright 测试在做什么',
        body: `\`\`python
from playwright.sync_api import sync_playwright

def test_login():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://example.com/login")
        page.fill("#username", "admin")
        page.fill("#password", "123456")
        page.click("#login-btn")
        assert "欢迎" in page.content()
        browser.close()
\`\`\`

逐行看懂：
- \`launch\`：打开浏览器
- \`goto\`：打开某个网址
- \`fill\`：往输入框填内容
- \`click\`：点击按钮
- \`assert\`：最后断言页面出现了"欢迎"，验证登录成功

**这套流程就是"自动执行一条测试用例"。**`,
      },
      {
        type: 'lesson',
        title: '在你电脑上跑通（照着做）',
        body: `1. 安装：\`pip install pytest-playwright\`，再运行 \`playwright install\`（它会自动下载浏览器）
2. 把上面的代码存为 \`test_web.py\`
3. 运行 \`pytest test_web.py -v\`
4. 你会看到浏览器自动打开、自动操作、自动判断 ✅

先拿一个真实存在的简单网页练手，能跑通一次，你就掌握了网页自动化的核心。`,
      },
      {
        type: 'quiz',
        title: '小测验：Playwright',
        questions: [
          {
            q: 'Playwright 主要用来做什么？',
            options: ['管理数据库', '用代码自动操作浏览器做测试', '写测试用例文档', '管理 Bug'],
            answer: 1,
            explain: 'Playwright 通过代码驱动浏览器，自动执行网页测试。',
          },
          {
            q: '在 Playwright 脚本里，验证结果最终靠什么？',
            options: ['page.click', 'assert 断言', 'print 打印', '人工看着'],
            answer: 1,
            explain: '和 pytest 一样，用 assert 判断页面结果是否符合预期。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：照着写 Playwright 关键步骤',
        prompt: '请照着答案，写出 Playwright 测登录的几个关键动作（打开页面、填账号、点登录、断言）。',
        answer: `page.goto("登录页网址")
page.fill("#username", "admin")
page.fill("#password", "123456")
page.click("#login-btn")
assert "欢迎" in page.content()`,
        keyPoints: ['goto', 'fill', 'click', 'assert'],
      },
    ],
  },

  {
    id: 'tools',
    stage: 5,
    title: '测试工具速览',
    icon: '🛠️',
    category: '工具认知',
    xp: 30,
    blocks: [
      {
        type: 'lesson',
        title: 'JD 里的工具都是干嘛的？',
        body: `招聘写了一堆工具：Maven、SVN、Jenkins、Git、Tomcat、Jmeter、Docker。初级岗"熟练使用优先"，意思是**了解加分，不会也能投，但面试要能说上两句**。

逐个认识：

| 工具 | 干嘛的 | 测试员要会什么 |
|------|--------|----------------|
| **Git** | 代码版本管理 | 会 clone 拉代码、commit、pull，看懂分支 |
| **SVN** | 也是版本管理（老项目用） | 知道和 Git 类似即可 |
| **Jenkins** | 自动化部署/测试 | 知道它能自动跑测试、自动部署，会看构建结果 |
| **Tomcat** | 运行 Java Web 的服务器 | 知道服务跑在它上面，会看启动日志 |
| **Maven** | Java 项目构建工具 | 知道用它打包项目，了解 \`mvn\` 命令 |
| **Docker** | 容器化部署 | 知道"一个镜像到处跑"，会 docker ps 看容器 |
| **Jmeter** | 压力测试 | 上一关学了，会跑接口看报告 |`,
      },
      {
        type: 'lesson',
        title: '重点掌握：Git 基础（团队协作必备）',
        body: `Git 是日常最高频的，面试常问。核心概念：

- **仓库（repository）**：代码存放的地方
- **分支（branch）**：每人一条开发线，互不干扰
- **commit**：一次代码改动的存档
- **merge**：把分支的改动合并到一起

测试员常用的几个命令（了解即可）：
\`\`\`bash
git clone 地址      # 把代码下载到本地
git pull           # 拉取最新代码
git status         # 看本地改了什么
git log            # 看提交历史
\`\`\`

面试怎么说？"我了解 Git 的基本工作流，会用 clone/pull 获取代码、查看提交记录，配合开发定位问题代码的版本。"`,
      },
      {
        type: 'quiz',
        title: '小测验：工具认知',
        questions: [
          {
            q: '下面哪个是用来做版本管理（管代码改动）的工具？',
            options: ['Jmeter', 'Git', 'Tomcat', 'Docker'],
            answer: 1,
            explain: 'Git/SVN 是版本管理工具，管代码的变更历史。',
          },
          {
            q: '关于 JD 里列的各种工具，初级测试员应该？',
            options: ['必须全部精通才能投简历', '了解各自用途、重点会 Git 和基础操作，面试能说清', '完全不用管', '只需要会 Jmeter'],
            answer: 1,
            explain: '工具列出来是"优先"项，了解概念+重点掌握 Git，面试能说上话就有竞争力。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：说说测试员怎么用 Git',
        prompt: '结合本关所学，写一写：测试员在日常工作中会用 Git 做哪些事？',
        hint: '想想：代码从哪里来、怎么看别人改了什么、出问题时怎么定位是哪个版本。',
        keywords: ['拉取', '代码', '版本', '提交', '分支'],
        placeholder: '我会用 Git 拉取代码、查看提交记录…',
        answer: `测试员日常用 Git：
拉取最新的代码
查看提交记录和版本历史
切换不同的分支
出问题时根据版本定位是哪次改动引入的`,
      },
    ],
  },

  {
    id: 'doc',
    stage: 1,
    title: '第十四关：测试文档编写',
    icon: '📄',
    category: '测试基础',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: 'JD 明确要求：会写测试文档',
        body: `"独立编制测试报告、操作手册、部署手册等文档"——文档能力是测试员的硬基本功。

测试员常写的文档：
1. **测试计划/方案**：测什么、怎么测、时间安排
2. **测试用例**：你已经会写了
3. **缺陷报告**：你已经会写了
4. **测试报告**：测完了的总结
5. **操作手册**：教别人怎么用这个系统
6. **部署手册**：系统怎么安装部署（偏运维，了解即可）`,
      },
      {
        type: 'lesson',
        title: '测试报告怎么写？',
        body: `测试报告是测试工作的交付物，给领导和项目组看。核心内容：

1. **测试概述**：测了哪个版本、什么时间、测了哪些功能
2. **测试结果统计**：
   - 用例总数：50 条
   - 通过：45，失败：3，阻塞：2
   - 通过率：90%
3. **缺陷情况**：发现多少 Bug，已修复多少，遗留多少
4. **风险与建议**：
   - 遗留问题：登录偶发失败还没复现，建议上线后重点观察
   - 改进建议：这次需求文档不清晰导致返工，建议下次提前评审
5. **结论**：是否同意上线

**核心原则**：用数据说话，结论明确，不写废话。`,
      },
      {
        type: 'lesson',
        title: '操作手册怎么写？',
        body: `操作手册是给最终用户或客服看的，教他们怎么用系统。

写好操作手册的要点：
- **步骤清晰**：1、2、3 分步写，每步配截图
- **图文并茂**：光说不如截图，圈出要点哪里
- **覆盖常见操作**：登录、查询、新增、修改、导出这些高频操作
- **含异常处理**：操作失败怎么办、提示什么意思

**小练习思路**：给你家的"登录功能"写一份操作手册：
1. 打开浏览器，输入网址 xxx
2. 输入用户名密码，点击登录
3. 成功则进入首页；失败则按提示检查账号密码`,
      },
      {
        type: 'quiz',
        title: '小测验：文档编写',
        questions: [
          {
            q: '测试报告最核心的价值是？',
            options: ['写得越厚越好', '用数据说清测试结果、遗留风险和上线建议', '复制用例内容就行', '只写通过的部分'],
            answer: 1,
            explain: '测试报告是给决策用的，要让人快速知道：测了啥、结果如何、能不能上线、有啥风险。',
          },
          {
            q: '写操作手册最重要的原则是？',
            options: ['用专业术语显得高级', '步骤清晰、配截图，让不会的人也能照着操作', '尽量简短，少写字', '只写给技术人员看'],
            answer: 1,
            explain: '操作手册面向使用者，要傻瓜式、可照着操作，图文结合最有效。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：列出测试报告该写什么',
        prompt: '如果你刚测完一个版本，要交一份测试报告，你会在里面写哪些内容？',
        hint: '想想看报告的人（领导、项目经理）最关心什么：测了啥、结果咋样、有啥遗留、能不能上线。',
        keywords: ['范围', '用例', '缺陷', '结论', '风险'],
        placeholder: '我会写：测试了哪些功能、用例通过情况…',
        answer: `测试报告应包含：
测试范围：测了哪些功能
用例执行：共多少条、通过多少条
缺陷情况：发现几个、修复几个、遗留几个
测试结论：是否通过、能否上线
风险与建议：还有什么问题、怎么改进`,
      },
      {
        type: 'short',
        title: '动手：照着写一份测试报告',
        prompt: '假设你刚测完一个版本，请参考下方参考答案，照着写一份完整的测试报告。',
        keywords: ['范围', '用例', '缺陷', '结论', '风险'],
        placeholder: '测试范围：…\n用例执行：…\n缺陷情况：…\n测试结论：…\n风险与建议：…',
        answer: `测试范围：本次覆盖登录、商品浏览、购物车、下单功能
用例执行：共执行 50 条，通过 45 条，未通过 5 条
缺陷情况：发现 8 个，已修复回归 6 个，遗留 2 个（均为次要）
测试结论：主要功能正常，遗留不影响核心流程，测试通过，建议上线
风险与建议：支付金额边界问题建议下个版本修复`,
      },
    ],
  },

  {
    id: 'tools-lab',
    stage: 3,
    title: '第十五关：工具实操（Postman + F12 抓包）',
    icon: '🧰',
    category: '工具实操',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: 'Postman：接口测试必备工具',
        body: `Postman 是测试员最常用的接口工具（你已经装好了，直接用）。

打开 Postman → 点 \`+\` 新建请求，跟着下面练手：

**用我们本项目的真实接口练习**（启动 start.bat 后可用）：

- 练习1：查用户列表
  方法选 **GET**，地址填 \`http://localhost:3000/api/demo/users\`，点 Send，看是否返回 3 个用户。

- 练习2：登录（POST）
  方法选 **POST**，地址 \`http://localhost:3000/api/demo/login\`；切到 Body → raw → JSON，填：
  \`\`\`json
  { "username": "admin", "password": "123456" }
  \`\`\`
  点 Send，正确返回"登录成功"；把密码改错应返回 401。

- 练习3：故意触发 Bug
  GET \`http://localhost:3000/api/demo/orders/999\`，会返回 **500**——这就是个真实缺陷，可以提单。`,
      },
      {
        type: 'f12',
        title: 'F12 抓包实操：亲眼看看网络请求',
      },
      {
        type: 'lesson',
        title: 'DataGrip：连数据库看数据（手把手）',
        body: `连数据库看数据，你已经装好了 **DataGrip**（JetBrains 出品，公司里很常用），直接用它练手。

**第 1 步：连我们项目的真实数据库（SQLite，免配置）**
我们项目的数据库文件就在项目文件夹下的 backend\\data\\progress.db，你直接连它就能看真实数据：
1. 打开 DataGrip → 左上角「+」→「Data Source」→ 选 **SQLite**
2. 「File」点文件夹图标，选到 项目文件夹\\backend\\data\\progress.db → 点「Test Connection」通过 → OK
3. 左边展开数据源 → 展开 main → 展开 tables → 双击 \`progress\` 表，就能看到你自己的学习进度记录
4. 点工具栏「New Query Console」（或按 **Ctrl+Shift+F10** 新建控制台），写 \`SELECT * FROM progress;\` 按 **Ctrl+Enter** 运行，看结果！

**第 2 步：连你本机的 MySQL 练手**
你已经装了 MySQL，自己建个库练 SQL 完全够用：
1. DataGrip 左上角「+」→「Data Source」→ **MySQL**
2. Host 填 \`localhost\`，Port \`3306\`，User 填你装 MySQL 时设的用户名（一般是 root），Password 填你设的密码
3. 点「Test Connection」→ 第一次会提示下载驱动，点 Download 等它下完 → 通过后 OK
4. 右键连接 →「New」→「Schema」建一个测试库，比如 \`practice\`，以后所有 SQL 练习都在这里做

⚠️ 新手铁律：只在**自己的测试库**里练 \`SELECT\`，绝不碰生产库，绝不乱执行 UPDATE/DELETE。会查数据、会导出结果，初级岗就够用。`,
      },
    ],
  },

  {
    id: 'bug-practice',
    stage: 1,
    title: '第十六关：缺陷报告实战（禅道）',
    icon: '🐞',
    category: '工具实操',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: '禅道：国内最常用的缺陷管理工具',
        body: `禅道（ZenTao）是国产免费的缺陷管理工具，很多公司用它管 Bug 和用例。你已经装好了本地版，直接用它练手。

**访问本地禅道**
浏览器打开 http://localhost/zentao （或你安装时设置的端口，如 http://localhost:8080），用安装时设的账号密码登录。第一次进会提示创建产品和项目，先随便建一个，比如产品叫「电商系统」。

**手把手：提一个 Bug**
1. 顶部选你刚建的产品 → 左侧菜单「测试」→「Bug」→ 点「提 Bug」
2. 对照你学的缺陷报告要素填写：
   - **标题**：一句话说清问题，如「修改收货地址保存后，刷新又变回原值」
   - **严重程度 / 优先级**：选「严重 / 高」
   - **重现步骤**：1. 进入地址编辑 2. 改为上海市 3. 保存 4. 刷新页面
   - **预期结果**：地址保持为上海市
   - **实际结果**：地址又变回北京市
   - **指派人**：随便选一个（自己演示就指派给自己）
3. 保存 → Bug 单生成，状态为「激活」

**完整生命周期**（要记牢）：
你提 Bug（激活）→ 开发修复（已解决）→ 你回归验证 → 确认好了点「**关闭**」，没修好就点「**激活**」Reopen 并说明情况

把上一节你写的那份缺陷报告，照着在本地禅道里提一次，这个工具你就会用了。`,
      },
      {
        type: 'bugreport',
        title: '动手：填写一份缺陷报告',
        scenario: '你在电商系统测试"收货地址修改"功能：用户把地址从"北京市"改成"上海市"并保存，页面提示"保存成功"，但刷新页面后地址又变回了"北京市"，实际没有真正保存。',
      },
      {
        type: 'quiz',
        title: '小测验',
        questions: [
          {
            q: '开发说 Bug 修好了，你在禅道里下一步该？',
            options: ['直接关闭', '回归验证后再关闭', '不管了', '重新提一个'],
            answer: 1,
            explain: '必须自己回归验证确实修好，才能关闭。',
          },
          {
            q: '回归验证发现没修好，应该？',
            options: ['关闭算了', '把 Bug 单重新打开(Reopen)并说明情况', '私聊开发', '删掉重提'],
            answer: 1,
            explain: '重新打开并写清验证结果，让开发继续处理。',
          },
        ],
      },
    ],
  },

  {
    id: 'interview',
    stage: 5,
    title: '第十七关：面试通关',
    icon: '🎤',
    category: '求职冲刺',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: '面试前的心态与准备',
        body: `初级测试面试，重点考察：基础概念清不清、有没有做过项目、表达是否清楚。

关于 AI 的诚实表达：被问"你怎么用 AI"时，可以说——"我用 AI 辅助理解和生成测试脚本，但我会逐条核对它的断言是否正确，不盲信。"这比隐瞒更显踏实。

准备要点：
1. 把本项目每个环节都能讲清楚（怎么做的、发现了什么）。
2. 常见测试理论能脱口而出。
3. 不会的诚实说"这块我了解概念但没深入实践，正在学"。`,
      },
      {
        type: 'interview',
        title: '高频面试题：先自己答，再对答案',
        questions: [
          { q: '软件测试的流程是怎样的？', answer: '需求分析→制定测试计划→编写测试用例→用例评审→搭建环境准备数据→执行测试→提交缺陷→回归验证→输出测试报告。' },
          { q: '什么是回归测试？什么时候做？', answer: '回归测试是验证 Bug 修复后，原问题已解决且没引入新问题。在开发修复后、版本上线前都要做。' },
          { q: 'Bug 的严重程度和优先级有什么区别？', answer: '严重程度是 Bug 本身影响多大（客观）；优先级是要不要马上修（看业务和时间）。两者不一定一致。' },
          { q: '你在项目里是怎么用 SQL 做测试的？', answer: '举例：注册后查 users 表确认记录生成；下单后查 orders 表核对金额和状态；用 JOIN 核对订单关联的用户是否正确。' },
          { q: '测试发现一个 Bug，你的处理流程是？', answer: '复现并确认→写清楚缺陷报告（标题/步骤/预期/实际/严重程度）→提交指派开发→跟进修复→回归验证→关闭或重新打开。' },
        ],
      },
    ],
  },

  {
    id: 'resume',
    stage: 5,
    title: '第十八关：打造你的简历项目',
    icon: '📁',
    category: '求职冲刺',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: '简历怎么写才不被刷',
        body: `初级测试简历，重点突出：

1. **项目经历**是核心——写清你测了什么、用了什么工具、产出了什么（用例数、Bug 数）。
2. 技能栏：功能测试、SQL、Postman、禅道、Python（阅读）等，会什么写什么，诚实。
3. 别空泛写"负责测试工作"，要写具体动作和结果。

下面这个工具帮你把本套学习成果直接生成一段简历项目描述。`,
      },
      {
        type: 'resume',
        title: '生成你的简历项目描述',
      },
      {
        type: 'lesson',
        title: '面试官深挖项目，这样答（背熟）',
        body: `面试官一定会追问你的项目，提前把这些准备好：

**Q：你这个项目具体测了什么？**
A：测的是电商系统的登录、商品浏览、购物车、下单支付等核心模块，以功能测试为主，也用 Postman 做了接口测试，用 SQL 核对了订单数据一致性。

**Q：你印象最深的一个 Bug 是什么？**
A：下单接口返回 200 提示成功，但查数据库发现没有订单记录。我通过 F12 看请求、再用 SQL 查库发现的，判断是后端数据没真正存进去，就提了缺陷单跟踪修复。

**Q：你是怎么设计测试用例的？**
A：先读需求拆出测试点，再按正向、反向、边界、异常几类来写，每条用例包含前置条件、操作步骤和预期结果。

**Q：你的 Python 什么水平？**
A：能读懂测试脚本，重点看 assert 断言对不对，能在现有脚本上做简单修改，独立写复杂脚本还在学习。

🎯 原则：不会的别装，诚实说"了解、会基础操作"，反而显得踏实可靠。`,
      },
      {
        type: 'short',
        title: '动手：写一个你项目里的 Bug',
        prompt: '面试高频题："讲一个你印象最深的 Bug"。请照着参考答案，写一个你项目里的 Bug 故事。',
        keywords: ['现象', 'F12', 'SQL', '定位', '缺陷'],
        answer: `现象：下单接口返回成功，但数据库没有生成订单记录。
排查：用 F12 看到请求确实发出去了，再用 SQL 查 orders 表，发现没有新数据。
定位：判断是后端接口返回成功，但数据没有真正持久化。
处理：提交缺陷单，写清现象和排查过程，指派开发修复后做回归验证。`,
      },
    ],
  },

  {
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
  },
];

export const LEVEL_ORDER = LEVELS.map((l) => l.id);
export const getLevel = (id) => LEVELS.find((l) => l.id === id);
