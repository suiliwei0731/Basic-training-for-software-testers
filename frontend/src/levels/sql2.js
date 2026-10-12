// 关卡数据，由 levels.js 拆分
const level = {
    id: 'sql2',
    stage: 2,
    title: 'SQL 条件筛选',
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
INSERT INTO users VALUES (1,'张三',28,'北京'),(2,'李四',35,'上海'),(3,'王五',22,'广州'),(4,'赵六',31,'北京'),(5,'钱七',27,'深圳'),(6,'孙八',24,'上海');`,
        checks: [
          { label: '查出所有北京的用户', sql: "SELECT * FROM users WHERE city = '北京';", hint: "WHERE city = '北京'" },
          { label: '查出年龄在 20 到 30 之间（含两端）', sql: 'SELECT * FROM users WHERE age BETWEEN 20 AND 30;', hint: 'BETWEEN 小 AND 大' },
          { label: '查出名字以「小」开头的用户', sql: "SELECT * FROM users WHERE name LIKE '小%';", hint: "LIKE '小%'，% 是通配符" },
          { label: '查出北京或上海的用户', sql: "SELECT * FROM users WHERE city IN ('北京','上海');", hint: '用 IN (...) 更简洁' },
        ],
      },
    ],
  };

export default level;
