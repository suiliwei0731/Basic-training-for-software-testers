// 关卡数据，由 levels.js 拆分
const level = {
    id: 'sql4',
    stage: 2,
    title: '多表关联 JOIN',
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
        seed: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
INSERT INTO users VALUES (1,'张三',28,'北京'),(2,'李四',35,'上海'),(3,'王五',22,'广州'),(4,'赵六',31,'北京'),(5,'钱七',27,'深圳'),(6,'孙八',24,'上海');
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, status TEXT);
INSERT INTO orders VALUES (101,1,5000,'paid'),(102,1,80,'pending'),(103,2,200,'paid'),(104,3,1200,'paid'),(105,2,80,'cancelled'),(106,5,200,'pending');`,
        checks: [
          { label: '查出每个订单的 id、下单人姓名、金额', sql: 'SELECT o.id, u.name, o.amount FROM orders o INNER JOIN users u ON o.user_id = u.id;', hint: 'orders JOIN users ON user_id = id' },
          { label: '找出下单人在 users 表中不存在的异常订单', sql: 'SELECT o.* FROM orders o LEFT JOIN users u ON o.user_id = u.id WHERE u.id IS NULL;', hint: 'LEFT JOIN 后 WHERE u.id IS NULL' },
        ],
      },
    ],
  };

export default level;
