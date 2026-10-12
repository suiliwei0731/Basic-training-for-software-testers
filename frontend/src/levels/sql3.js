// 关卡数据，由 levels.js 拆分
const level = {
    id: 'sql3',
    stage: 2,
    title: '排序、统计与分组',
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
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
INSERT INTO users VALUES (1,'张三',28,'北京'),(2,'李四',35,'上海'),(3,'王五',22,'广州'),(4,'赵六',31,'北京'),(5,'钱七',27,'深圳'),(6,'孙八',24,'上海');
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT);
INSERT INTO orders VALUES (101,1,5000,'paid'),(102,1,80,'pending'),(103,2,200,'paid'),(104,3,1200,'paid'),(105,2,80,'cancelled'),(106,5,200,'pending');`,
        checks: [
          { label: '统计总共有多少条订单', sql: 'SELECT COUNT(*) FROM orders;', hint: 'COUNT(*)' },
          { label: '统计已支付订单的总金额', sql: "SELECT SUM(amount) FROM orders WHERE status = 'paid';", hint: 'SUM(amount) 加 WHERE' },
          { label: '按金额从高到低排序', sql: 'SELECT * FROM orders ORDER BY amount DESC;', hint: 'ORDER BY amount DESC' },
          { label: '按状态分组统计每种状态的订单数', sql: 'SELECT status, COUNT(*) FROM orders GROUP BY status;', hint: 'GROUP BY status' },
        ],
      },
    ],
  };

export default level;
