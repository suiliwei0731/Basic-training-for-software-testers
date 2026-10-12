// 关卡数据，由 levels.js 拆分
const level = {
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
        type: 'lesson',
        title: 'Git 命令速查：拿到项目、看改动、提交',
        body: "上一节认识了 Git 概念，这节把测试员日常真正会敲的命令讲全。**建议就在你现在这个 test-quest 项目里练**（它本身就是个 Git 仓库），先 `git status` 看看，改了啥一目了然。\n\n**拿到项目 & 每天开工**\n| 命令 | 作用 | 测试员什么时候用 |\n|------|------|------------------|\n| `git clone 地址` | 把远程代码下载到本地 | 第一次接触项目 |\n| `git pull` | 拉取别人最新的提交 | 每天开工前，保证测的是最新代码 |\n| `git status` | 看本地改了哪些文件 | 随时，确认当前状态 |\n\n**看改动 & 看历史**\n| 命令 | 作用 |\n|------|------|\n| `git log` | 看提交历史（谁、什么时候、改了啥）|\n| `git log --oneline` | 历史精简成一行一条，更易读 |\n| `git diff` | 看具体改了哪几行（未提交的改动）|\n| `git show 提交号` | 看某一次提交具体改了什么 |\n\n**提交你的改动**（比如你改了文档/脚本）\n```bash\ngit add 文件名      # 把文件加入本次提交\ngit commit -m \"说明这次改了啥\"   # 生成一次提交存档\ngit push           # 推送到远程仓库\n```\n> 小知识：`.gitignore` 文件里列的是\"不要管\"的文件（如 node_modules、密钥），Git 会自动忽略它们。",
      },
      {
        type: 'lesson',
        title: '分支管理与出错回退（版本维护核心）',
        body: "**分支管理**——团队每人一条开发线，互不干扰。测试员常要切到指定分支去测。\n```bash\ngit branch              # 看本地有哪些分支\ngit branch -a           # 看所有分支（含远程）\ngit checkout 分支名     # 切换到某个分支，如 git checkout release\ngit checkout -b 新分支  # 新建并切换到新分支\n```\n测试场景：开发说\"这个修复在 feature/login 分支\"，你就 `git checkout feature/login` 切过去测；测完 `git checkout main` 切回主干。\n\n**出问题怎么回退**（版本维护的关键）\n| 情况 | 命令 | 效果 |\n|------|------|------|\n| 改乱了文件，想丢弃改动还原 | `git checkout 文件名` | 回到上次提交的样子 |\n| 想暂存当前改动去干别的 | `git stash` | 暂存，之后 `git stash pop` 恢复 |\n| 提交错了，想撤销最近一次提交 | `git reset --soft HEAD~1` | 撤销提交但保留改动 |\n\n**测试员的典型一天（串起来）**\n```\ngit pull                # 1. 拉最新代码\ngit status              # 2. 确认状态\ngit log --oneline -5    # 3. 看最近改了啥，知道今天测什么\n# 发现要测的版本在 dev 分支：\ngit checkout dev        # 4. 切到对应分支\n# 测完定位 Bug：用 git log 查是哪次提交引入的\n```\n一句话：**pull 开工、log 看改动、checkout 切分支、出问题 checkout/stash 回退**。",
      },
      {
        type: 'short',
        title: '动手：写出测试员一天的 Git 操作',
        prompt: '假设你今天要开始测一个新版本，请照着下面参考答案，写出测试员开工的 Git 操作流程（拉代码、看状态、看最近改动、切到要测的分支）。',
        hint: '回想：开工先拉最新，再看状态，看历史知道测什么，最后切分支。',
        keywords: ["pull","status","log","checkout","分支"],
        placeholder: '1. git pull\n2. …',
        answer: "测试员开工的 Git 操作流程：\n1. git pull：拉取远程最新代码，保证测的是最新版本\n2. git status：查看本地状态，确认有没有未提交的改动\n3. git log --oneline -5：看最近 5 次提交，了解今天改了哪些功能、该测什么\n4. git checkout 要测的分支名：切到指定分支（如 dev / release）开始测试\n出问题时：git checkout 文件名 还原改动，或 git stash 暂存当前改动",
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
        answer: "测试员日常用 Git：\n用 git clone 拉取项目代码到本地\n用 git pull 每天拉取最新代码，保证测的是最新版本\n用 git log 查看提交记录，看开发改了哪些功能\n用 git checkout 切换分支，比如切到 release 分支测上线版本\n出问题时根据 git log 定位是哪次提交引入的，配合开发快速排查",
      },
    ],
  };

export default level;
