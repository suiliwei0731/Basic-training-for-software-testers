// 关卡数据，由 levels.js 拆分
const level = {
    id: 'sql5',
    stage: 2,
    title: 'SQL 增删改（写入操作）',
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
INSERT INTO users VALUES (1,'张三',28,'北京'),(2,'李四',35,'上海');`,
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
  };

export default level;
