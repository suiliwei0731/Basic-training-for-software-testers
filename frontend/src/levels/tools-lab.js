// 关卡数据，由 levels.js 拆分
const level = {
    id: 'tools-lab',
    stage: 3,
    title: '工具实操（Postman + F12 抓包）',
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
      {
        type: 'lesson',
        title: "Postman 进阶：查单个用户 + 保存常用地址",
        body: "继续用本项目的真实接口练手（启动 start.bat 后可用）。\n\n**练习4：查单个用户（带路径参数）**\n方法选 GET，地址填 http://localhost:3000/api/demo/users/2 ，点 Send。这次返回的是 id=2 这一个用户。把末尾的 2 改成 1、3 试试，返回内容会变。\n\n**练习5：传错看 404**\n地址填 http://localhost:3000/api/demo/users/9999 ，点 Send，应返回 404（用户不存在）。这就是正常的接口行为，不是 Bug。\n\n**练习6：保存请求，方便重复用**\n左上角点「Save」，把这条 GET 请求存起来命名\"查单个用户\"。以后再测直接点开就能发，不用重新填地址——工作里一个接口要测很多遍，这一步能省大量时间。",
      },
      {
        type: 'short',
        title: "动手：记录一次接口请求与响应",
        prompt: "你用 Postman 调用了登录接口（POST http://localhost:3000/api/demo/login），账号 admin、密码 123456，返回状态码 200、提示登录成功。请照着写一份接口测试记录。",
        hint: "接口测试记录要写清：请求方法地址、请求参数、响应状态码、响应内容、测试结论。",
        keywords: ["请求","响应","状态码","断言","结果"],
        placeholder: "接口：…\n请求：…\n响应：…\n结论：…",
        answer: "接口：POST /api/demo/login\n请求参数：{ username: admin, password: 123456 }\n响应状态码：200\n响应内容：登录成功，返回用户信息\n断言：状态码为 200 且提示成功\n测试结论：通过，登录接口正常",
      },
    ],
  };

export default level;
