// 关卡数据，由 levels.js 拆分
const level = {
    id: 'sql1',
    stage: 2,
    title: 'SQL 入门 —— 查数据',
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

下面是 SQL 沙箱，里面就是你刚认识的 users 用户表，随便查，不影响真实数据。`,
      },
      {
        type: 'sql',
        title: '动手练：SQL 沙箱',
        hint: '试试输入 SELECT * FROM users; 然后点运行。表 users：id, name, age, city（这就是你刚学的用户表）',
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
INSERT INTO users VALUES (1,'张三',28,'北京'),(2,'李四',35,'上海'),(3,'王五',22,'广州'),(4,'赵六',31,'北京'),(5,'钱七',27,'深圳'),(6,'孙八',24,'上海');`,
        checks: [
          { label: '查出所有用户的全部信息', sql: 'SELECT * FROM users;', hint: '用 * 代表所有列' },
          { label: '只查出 name 和 city 两列', sql: 'SELECT name, city FROM users;', hint: '列名之间用逗号隔开' },
          { label: '查出年龄大于 20 的用户', sql: 'SELECT * FROM users WHERE age > 20;', hint: 'WHERE age > 20' },
        ],
      },
    ],
  };

export default level;
