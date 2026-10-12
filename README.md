# 测试闯关 · 零基础软件测试学习平台

一个**闯关式**的软件测试自学项目，专为零基础想做初级软件测试员的人设计。
通关后可覆盖初级测试岗的核心技能：测试用例设计、缺陷管理、SQL 数据核对、Postman 接口测试、Python 脚本阅读、pytest / Playwright 自动化测试基础。

## 特性

- 🎮 **游戏化闯关**：23 个关卡、5 个学习阶段，循序渐进，通关获得经验值，进度自动存档
- 🗄️ **SQL 沙箱 + 真实库实操**：浏览器内即可练 SQL；也可连本地 MySQL / DataGrip 实战
- 📮 **接口测试实战**：内置 demo 接口，配合 Postman 边学边练
- 🐍 **Python 阅读练习**：先猜输出再揭晓，训练读代码能力
- ⚡ **自动化测试入门**：pytest + Playwright，从看懂脚本到本地跑通
- 🔊 **语音朗读**：题目讲解可语音播放（本地缓存真人语音 + 浏览器内置语音兜底），开箱即用
- 💾 **进度持久化**：SQLite 数据库保存学习进度，关掉再打开不丢失
- 🧠 **通俗易懂**：全程中文，用生活例子讲概念，不堆术语

## 快速开始（下载者照着做即可）

### 1. 安装 Node.js
去 https://nodejs.org/ 下载 **LTS 版本**（建议 20 或更高），安装时一路点"下一步"。

> 本项目后端使用 Node 内置的 SQLite（`node:sqlite`），需要 Node 22.5+ / 24+，装最新 LTS 即可。

### 2. 启动
双击本文件夹里的 **`start.bat`**。
- 第一次运行会自动安装依赖（`npm install`）并构建前端，需要 1-3 分钟，请耐心等待。
- 看到绿色的 `启动成功！` 字样就成功了。
- 脚本会自动释放被占用的 3000 端口，重复双击也不怕冲突。

### 3. 打开浏览器
访问 **http://localhost:3000**

### 停止服务
- 在命令行窗口按 `Ctrl + C`
- 或者直接再次双击 `start.bat`，它会自动结束占用 3000 端口的旧进程再重新启动
- 也可以在任务管理器里结束 `node` 进程

## 语音朗读

题目讲解支持语音播放：
- 已缓存的内容播放本地真人语音 mp3（存放在 `backend/data/tts/`）
- 没有缓存的内容，自动用**浏览器内置语音**朗读（Chrome / Edge 自带中文语音，无需任何配置）

无需配置密钥，开箱即用。

## 学习路线（共 26 关，分 5 个阶段）

按学习顺序排列，通关后解锁下一关：

**阶段① 软件测试基础**
1. 新手村：测试员到底做什么
2. 需求分析与测试用例
3. 缺陷管理全流程
4. 测试文档编写
5. 缺陷报告实战（禅道）

**阶段② SQL 与数据库**
6. SQL 命令初识（从零认识 SQL 语法）
7. 认识数据库与常见业务表（users / products / cart / orders）
8. SQL 入门 —— 查数据
9. SQL 条件筛选
10. 排序、统计与分组
11. 多表关联 JOIN
12. SQL 增删改（写入操作）

**阶段③ 接口测试**
13. 接口测试基础
14. 测试环境与测试数据
15. 工具实操（Postman + F12 抓包）

**阶段④ Python 编程基础**
16. Python 阅读（变量与判断）
17. Python 阅读（循环与函数）
18. Python 列表、字典与异常

**阶段⑤ 自动化测试与求职**
19. 压力测试入门（JMeter）
20. pytest 自动化测试入门
21. Playwright 网页自动化
22. 测试工具速览（Git / Jenkins / Docker 等）
23. Docker 部署与环境管理（部署被测服务、看日志、端口映射、搭 MySQL 测试库）
24. 面试通关
25. 打造你的简历项目
26. Boss 关：模拟岗位综合实战

## 配套本地工具（推荐安装，用于实战关卡）

通关过程中部分关卡会引导你用真实软件练手，建议提前装好：
- **DataGrip**（或 DBeaver 社区版）：连数据库看数据、写 SQL
- **MySQL**：本地建库练 SQL
- **Postman**：接口测试
- **禅道（ZenTao）**：缺陷管理，体验提 Bug 全流程
- **Python 3 + VS Code / PyCharm**：跑通 pytest、Playwright 自动化脚本
- **JMeter**：压力测试（第10关）
- **Docker Desktop**：部署被测服务、管理数据库测试环境（Docker 关卡）

不装也不影响学习流程，关卡会先讲清楚概念和标准操作步骤。

## 项目结构

```
test-quest/
├── start.bat / start.ps1      # 一键启动（双击 start.bat，启动时自动释放旧进程）
├── backend/                   # 后端服务
│   ├── server.js              # Express 服务器，提供 API 并托管前端
│   ├── db.js                  # SQLite 数据库（存学习进度）
│   ├── warmup.mjs             # 预生成语音缓存的脚本（可选，需自备 TTS）
│   ├── package.json
│   └── data/                  # 运行时自动生成：progress.db、tts/ 缓存
└── frontend/                  # 前端（Vue 3 + Vite）
    ├── package.json
    └── src/
        ├── data/levels.js     # 所有关卡内容（想加/改关卡改这里）
        ├── views/             # 页面
        └── components/        # 互动组件：SQL沙箱、测验、Python练习等
```

## 常见问题

**Q：双击 start.bat 没反应或闪退？**
A：start.bat 会调用 PowerShell。如被安全软件拦截，可右键 start.bat →「以管理员身份运行」。脚本出错时会停在窗口里显示中文报错，把报错截图发出来即可。

**Q：提示"端口 3000 被占用"？**
A：直接重新双击 `start.bat`，它会自动结束旧服务再启动。

**Q：npm install 很慢或失败？**
A：可换国内镜像：在命令行执行 `npm config set registry https://registry.npmmirror.com`，再重新双击 start.bat。

**Q：关了黑窗口，服务还在跑怎么办？**
A：黑窗口只是控制台，进程可能仍在后台。再次双击 `start.bat` 会自动结束残留进程并重启。

**Q：SQL 沙箱运行没反应？**
A：首次使用需要联网下载 sql.js 的 wasm 文件（约 1MB），稍等片刻即可。

**Q：想重置学习进度？**
A：首页底部有「重置全部进度」按钮。

**Q：想自己加关卡？**
A：编辑 `frontend/src/data/levels.js`，照着已有格式加一个关卡对象，保存后重新双击 start.bat 即可。

## 技术栈
Vue 3 + Vite · Express · SQLite（node:sqlite）· sql.js
