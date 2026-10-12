// 关卡数据，由 levels.js 拆分
const level = {
    id: 'docker',
    stage: 5,
    title: 'Docker 部署与环境管理',
    icon: '🐳',
    category: '环境部署',
    xp: 45,
    blocks: [
      {
        type: 'lesson',
        title: 'Docker 是什么？测试员为什么要会它',
        body: "Docker 是现在最主流的\"容器化\"部署工具。一句话理解：**把一个软件连同它运行需要的一切，打包成一个标准盒子（容器），在任何电脑上都能一模一样地跑起来**。\n\n测试员为什么要会 Docker？\n\n- **部署被测服务**：开发给你一个 Docker 镜像，你一条命令就能把服务跑起来，不用自己装一堆环境、配一堆依赖\n- **管理数据库环境**：用 Docker 起一个 MySQL/Redis，几秒钟就有一个干净的测试库，测完随手删掉\n- **环境隔离**：本机不会被各种软件搞乱，每个项目一套独立容器，互不影响\n- **还原现场**：出了 Bug，用同一个镜像就能复现一模一样的环境\n\n两个核心概念先记住：\n\n| 概念 | 类比 | 说明 |\n|------|------|------|\n| **镜像（image）** | 软件安装包 | 打包好的程序模板，只读 |\n| **容器（container）** | 运行中的程序实例 | 镜像跑起来就是容器，一个镜像能跑多个容器 |",
      },
      {
        type: 'lesson',
        title: '动手① 安装 Docker 并跑起第一个容器',
        body: "**第 1 步：安装 Docker Desktop**\n\n1. 打开 https://www.docker.com/products/docker-desktop/ 下载 Windows 版安装包\n2. 双击安装，一路下一步，安装过程中勾选 \"Use WSL 2 instead of Hyper-V\"\n3. 安装完成后重启电脑，启动 Docker Desktop，等右下角鲸鱼图标变成稳定状态（不再转圈）\n4. 打开 PowerShell，验证安装：\n```bash\ndocker --version\n```\n能看到版本号（如 Docker version 27.x）就说明装好了。\n\n**第 2 步：跑起第一个容器——Nginx 网页服务**\n\n在 PowerShell 执行：\n```bash\ndocker run -d -p 8080:80 --name myweb nginx\n```\n\n这条命令拆解：\n- `docker run`：跑一个容器\n- `-d`：后台运行（不占着你的命令行）\n- `-p 8080:80`：**端口映射**——把容器的 80 端口，映射到你电脑的 8080 端口。左边是你电脑的端口，右边是容器的端口\n- `--name myweb`：给容器起个名字叫 myweb\n- `nginx`：用 nginx 这个镜像（没有的话会自动去下载）\n\n**第 3 步：验证服务真的跑起来了**\n\n浏览器打开 http://localhost:8080 ，看到 \"Welcome to nginx!\" 页面就成功了！这就是你用 Docker 部署的第一个被测服务。",
      },
      {
        type: 'lesson',
        title: '动手② 查看容器状态与日志（排查必备）',
        body: "服务跑起来后，测试员最常用的就是这几条命令。请在 PowerShell 里逐条执行，看输出。\n\n**1. 看正在运行的容器：**\n```bash\ndocker ps\n```\n能看到 myweb 容器、它的镜像、状态、端口映射。这是排查\"服务起没起来\"的第一招。\n\n想看所有容器（包括停掉的）：\n```bash\ndocker ps -a\n```\n\n**2. 看服务日志（Bug 排查最有用）：**\n```bash\ndocker logs myweb\n```\n这会打印 nginx 的访问日志。当被测服务报错时，第一时间 `docker logs` 看日志，常常能直接定位问题。\n\n实时跟着日志滚动（按 Ctrl+C 退出）：\n```bash\ndocker logs -f myweb\n```\n\n**3. 进入容器内部（看配置、看文件）：**\n```bash\ndocker exec -it myweb sh\n```\n进去后可以 `ls` 看文件、`cat` 看配置。输入 `exit` 退出。\n\n**4. 停掉和删除容器（管理环境）：**\n```bash\ndocker stop myweb      # 停止容器\ndocker start myweb     # 再启动回来\ndocker rm myweb        # 删除容器（要先 stop）\n```\n\n**记忆口诀**：`docker ps` 看状态、`docker logs` 看日志、`docker exec` 进容器、`stop/start/rm` 管生命周期。",
      },
      {
        type: 'lesson',
        title: '动手③ 用 Docker 搭一个 MySQL 测试数据库',
        body: "这是 Docker 对测试员最实用的场景——**几秒钟起一个干净的 MySQL 测试库**，不用装 MySQL、不用配环境。\n\n**第 1 步：用 Docker 启动 MySQL**\n\n```bash\ndocker run -d -p 3307:3306 --name mysqltest -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=testdb mysql:8\n```\n\n拆解：\n- `-p 3307:3306`：容器 MySQL 默认 3306，映射到你电脑的 **3307**（避开你本机可能已有的 MySQL）\n- `-e MYSQL_ROOT_PASSWORD=123456`：设置 root 密码为 123456\n- `-e MYSQL_DATABASE=testdb`：自动创建一个叫 testdb 的数据库\n- `mysql:8`：用 MySQL 8.0 镜像\n\n等十几秒让它初始化完成。\n\n**第 2 步：确认它起来了**\n\n```bash\ndocker logs mysqltest\n```\n日志里出现 \"ready for connections\" 就好了。\n\n**第 3 步：用 DataGrip 连接这个测试库**\n\n1. 打开 DataGrip → 左上角 + → Data Source → MySQL\n2. Host 填 `localhost`，Port 填 `3307`（注意是映射后的端口），User 填 `root`，Password 填 `123456`\n3. 点 Test Connection 通过 → OK。左边能看到 testdb 库\n4. 新建查询控制台，执行建表插数据：\n```sql\nCREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(20));\nINSERT INTO users VALUES (1, '张三'), (2, '李四');\nSELECT * FROM users;\n```\n能查到数据，就说明你用 Docker 搭的数据库完全可用，可以在它上面练 SQL、做接口测试的数据准备。\n\n**第 4 步：测完清理环境**\n\n```bash\ndocker stop mysqltest && docker rm mysqltest\n```\n想再用时重新 run 一条命令又是一个全新的干净库——这就是 Docker 管理测试环境的强大之处。",
      },
      {
        type: 'quiz',
        title: '小测验：Docker 实操',
        questions: [
          {
            q: '命令 docker run -d -p 8080:80 nginx 中，8080 指的是？',
            options: ['容器内部的端口', '你本机电脑的端口', 'nginx 的默认端口', 'Docker 服务的端口'],
            answer: 1,
            explain: '端口映射格式是 本机端口:容器端口。左边 8080 是你电脑的端口，访问 localhost:8080 会转到容器的 80。',
          },
          {
            q: '测试员想查看被测服务的运行日志，应该用哪条命令？',
            options: ['docker ps', 'docker logs 容器名', 'docker run', 'docker exec'],
            answer: 1,
            explain: 'docker logs 查看容器日志，是排查服务报错的第一招；docker ps 是看容器状态。',
          },
          {
            q: '关于用 Docker 起测试数据库，下面说法正确的是？',
            options: ['必须先在本机装好 MySQL 才能用', '一条命令就能起一个干净的数据库，测完可随时删除重建', 'Docker 里的数据库不能用 DataGrip 连', '每个项目只能有一个数据库容器'],
            answer: 1,
            explain: 'Docker 的价值就是免安装、秒级起环境、用完即删，数据隔离互不影响。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：说说用 Docker 部署被测服务的完整步骤',
        prompt: '结合本关实操，写一写：拿到一个 Docker 镜像后，测试员把被测服务跑起来、并能访问和排查问题，需要哪些步骤？',
        hint: '回想：怎么启动容器、怎么确认服务起来了、出问题看什么、怎么访问服务。',
        keywords: ['run', '端口', 'ps', 'logs', '浏览器'],
        placeholder: '我先用 docker run 启动服务…',
        answer: "用 Docker 部署被测服务的步骤：\n1. 用 docker run 启动容器，带上 -p 做端口映射和 -d 后台运行\n2. 用 docker ps 确认容器正在运行\n3. 在浏览器用映射后的端口（如 localhost:8080）访问服务\n4. 服务有问题时用 docker logs 查看日志排查\n5. 用 docker stop / start 管理容器的启停",
      },
      {
        type: 'short',
        title: '动手：说说用 Docker 管理数据库测试环境',
        prompt: '结合本关实操，写一写：测试员如何用 Docker 快速准备和清理数据库测试环境？',
        hint: '回想：怎么起 MySQL、怎么连、用完怎么处理、好处是什么。',
        keywords: ['docker run', '端口', 'DataGrip', 'stop', '干净'],
        placeholder: '我用 docker run 起一个 MySQL 容器…',
        answer: "用 Docker 管理数据库测试环境：\n1. 用 docker run 一条命令启动 MySQL 容器，设置好端口映射和 root 密码\n2. 用 DataGrip 通过映射后的端口连接这个数据库\n3. 在里面建表、插数据，进行 SQL 练习和接口测试的数据准备\n4. 测完用 docker stop 和 docker rm 清理掉容器\n5. 好处是免安装、秒级得到干净环境、各项目互不干扰、随时可重建",
      },
    ],
  };

export default level;
