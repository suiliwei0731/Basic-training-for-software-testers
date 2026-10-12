// 关卡数据，由 levels.js 拆分
const level = {
    id: 'sql0',
    stage: 2,
    title: 'SQL 命令初识（从零认识）',
    icon: '💡',
    category: 'SQL',
    xp: 30,
    blocks: [
      {
        type: 'lesson',
        title: 'SQL 是什么？有哪些命令？',
        body: "在正式写查询之前，先用 5 分钟认识 SQL 是什么、有哪些命令、语法规矩是什么。\n\n**SQL 是什么？**\nSQL（读作 \"S-Q-L\" 或 \"sequel\"）是操作数据库的通用语言。你对数据库说一句 SQL，它就帮你查数据、改数据。测试员学它，是为了**核对页面操作背后的数据对不对**。\n\n**数据库长什么样？** 想象成一个超大的 Excel：\n- **表（table）** = 一个工作表（比如 users 用户表）\n- **行** = 一条记录（一个用户）\n- **列/字段** = 一个属性（姓名、年龄）\n\n**SQL 四大类命令（增删改查），先混个脸熟：**\n\n| 命令 | 作用 | 例子（先眼熟，后面细学） |\n|------|------|--------------------------|\n| **SELECT** | 查数据（最高频） | SELECT * FROM users; |\n| **INSERT** | 新增数据 | INSERT INTO users VALUES (1, 小明); |\n| **UPDATE** | 修改数据 | UPDATE users SET age=26 WHERE name=小明; |\n| **DELETE** | 删除数据 | DELETE FROM users WHERE id=1; |\n\n测试员用得最多的是 **SELECT 查数据**，INSERT/UPDATE/DELETE 主要用来造测试数据。",
      },
      {
        type: 'lesson',
        title: 'SQL 语法铁规矩 + 子句顺序',
        body: "写 SQL 有几条铁规矩，记住就不会犯低级错：\n\n1. **每条语句末尾加分号 ;** —— 表示一句话结束\n2. **关键字不区分大小写** —— select 和 SELECT 都行，但**建议大写**，更专业、更好读\n3. **文本值要加单引号** —— 比如 name = 小明 ，数字不用：age = 18\n4. **一条语句可以写成多行**，空格换行不影响，直到分号才算结束\n5. **子句顺序固定**：SELECT → FROM → WHERE → ORDER BY，不能乱序\n\n**最常用的子句顺序（背诵级）：**\n```sql\nSELECT  要查的列\nFROM    哪张表\nWHERE   筛选条件\nORDER BY 排序方式;\n```\n\n下面有个 SQL 沙箱，先随便敲两句感受一下——不用怕，随便试，不会弄坏任何东西。",
      },
      {
        type: 'sql',
        title: '热身：在沙箱里敲两句试试',
        hint: '这是内置练习数据库，随便试。表 products(id, name, price) 里已有数据。先把下面三条逐条粘进去运行，感受一下。',
        seed: 'CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price INTEGER);\nINSERT INTO products VALUES (1, \'笔记本\', 5000),(2, \'鼠标\', 80),(3, \'键盘\', 200);',
        checks: [
          { label: '运行 SELECT * FROM products; 查看所有商品', sql: 'SELECT * FROM products;', hint: 'SELECT * 表示查所有列' },
          { label: '只查 name 和 price 两列', sql: 'SELECT name, price FROM products;', hint: '列名用逗号隔开' },
          { label: '查出价格大于 100 的商品', sql: 'SELECT * FROM products WHERE price > 100;', hint: '用 WHERE 加条件' },
        ],
      },
    ],
  };

export default level;
