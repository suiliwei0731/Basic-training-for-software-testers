# 测试闯关 · 零基础软件测试学习平台

一个**闯关式**的软件测试自学项目，专为零基础想做初级软件测试员的人设计。
通关后可覆盖初级测试岗的核心技能：测试用例设计、缺陷管理、SQL 数据核对、Postman 接口测试、Python 脚本阅读、pytest / Playwright 自动化测试基础。

## 特性

- 🎮 **游戏化闯关**：23 个关卡、5 个学习阶段，循序渐进，通关获得经验值，进度自动存档
- 🗄️ **SQL 沙箱 + 真实库实操**：浏览器内即可练 SQL；也可连本地 MySQL / DataGrip 实战
- 📮 **接口测试实战**：内置 demo 接口，配合 Postman 边学边练
- 🐍 **Python 阅读练习**：先猜输出再揭晓，训练读代码能力
- ⚡ **自动化测试入门**：pytest + Playwright，从看懂脚本到本地跑通
- 🔊 **真人语音朗读**：可选接入讯飞超拟人 TTS，题目讲解可语音播放（有本地缓存，不重复消耗额度）
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

### 停止服务（三选一）
- 双击 **`stop.bat`**（推荐，自动关闭服务并释放端口）
- 在命令行窗口按 `Ctrl + C`
- 任务管理器里结束 `node` 进程

## 语音朗读功能（可选，不配置也能正常学习）

题目讲解默认用浏览器自带语音朗读。如果想体验更自然的真人声音，可接入讯飞语音合成：

1. 注册讯飞开放平台，开通「超拟人语音合成」服务，拿到 APPID / APIKey / APISecret
2. 在 `backend/` 目录下新建文件 `.env`，填入：
   ```
   XFYUN_APPID=你的APPID
   XFYUN_APIKEY=你的APIKey
   XFYUN_APISECRET=你的APISecret
   ```
3. 重启服务即可。朗读过的内容会缓存到 `backend/data/tts/`，第二次播放直接读本地文件，不重复消耗额度。

> `.env` 含密钥，已被 `.gitignore` 排除，不会上传到仓库。

## 学习路线（23 关 · 5 阶段）

| 阶段 | 关卡 | 内容 |
|------|------|------|
| ① 测试基础 | 新手村 / 第1-2关 / 第9关 / 第14关 / 第16关 | 测试员职责、用例设计、缺陷全流程、测试文档、禅道实战 |
| ② SQL 与数据库 | 第3-7关 | SELECT、筛选、排序分组、多表 JOIN、增删改 |
| ③ 接口测试 | 第8关 / 第15关 | HTTP 基础、Postman 实操、F12 抓包 |
| ④ Python 基础 | 第11-13关 | 变量判断、循环函数、列表字典异常 |
| ⑤ 自动化测试 | 第10关 / pytest / Playwright / 第17-18关 / Boss关 | JMeter 概念、pytest 入门、网页自动化、面试与简历、综合实战 |

## 配套本地工具（推荐安装，用于实战关卡）

通关过程中部分关卡会引导你用真实软件练手，建议提前装好：
- **DataGrip**（或 DBeaver 社区版）：连数据库看数据、写 SQL
- **MySQL**：本地建库练 SQL
- **Postman**：接口测试
- **禅道（ZenTao）**：缺陷管理，体验提 Bug 全流程
- **Python 3 + VS Code / PyCharm**：跑通 pytest、Playwright 自动化脚本
- **JMeter**：压力测试（第10关）

不装也不影响学习流程，关卡会先讲清楚概念和标准操作步骤。

## 项目结构

```
test-quest/
├── start.bat / start.ps1      # 一键启动（双击 start.bat）
├── stop.bat / stop.ps1        # 一键停止
├── backend/                   # 后端服务
│   ├── server.js              # Express 服务器，提供 API 并托管前端
│   ├── db.js                  # SQLite 数据库（存学习进度）
│   ├── tts.js                 # 讯飞语音合成（可选）
│   ├── warmup.mjs             # 预生成语音缓存的脚本（可选）
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
A：双击 `stop.bat` 先关掉旧服务，再双击 `start.bat`。

**Q：npm install 很慢或失败？**
A：可换国内镜像：在命令行执行 `npm config set registry https://registry.npmmirror.com`，再重新双击 start.bat。

**Q：关了黑窗口，服务还在跑怎么办？**
A：黑窗口只是控制台，进程可能仍在后台。双击 `stop.bat` 即可彻底关闭。

**Q：SQL 沙箱运行没反应？**
A：首次使用需要联网下载 sql.js 的 wasm 文件（约 1MB），稍等片刻即可。

**Q：想重置学习进度？**
A：首页底部有「重置全部进度」按钮。

**Q：想自己加关卡？**
A：编辑 `frontend/src/data/levels.js`，照着已有格式加一个关卡对象，保存后重新双击 start.bat 即可。

## 技术栈
Vue 3 + Vite · Express · SQLite（node:sqlite）· sql.js · 讯飞超拟人 TTS（可选）
