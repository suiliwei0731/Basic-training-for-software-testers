// 关卡数据，由 levels.js 拆分
const level = {
    id: 'playwright',
    stage: 5,
    title: 'Playwright 网页自动化',
    icon: '🎭',
    category: '自动化测试',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: 'Playwright 是什么',
        body: `Playwright 能**用代码自动操作浏览器**：打开网页、输入文字、点击按钮、读取页面内容——就像一个不知疲倦的测试员在替你点。

它能测真实的网页，是现在最流行的网页自动化工具之一。`,
      },
      {
        type: 'lesson',
        title: '一段 Playwright 测试在做什么',
        body: `\`\`python
from playwright.sync_api import sync_playwright

def test_login():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://example.com/login")
        page.fill("#username", "admin")
        page.fill("#password", "123456")
        page.click("#login-btn")
        assert "欢迎" in page.content()
        browser.close()
\`\`\`

逐行看懂：
- \`launch\`：打开浏览器
- \`goto\`：打开某个网址
- \`fill\`：往输入框填内容
- \`click\`：点击按钮
- \`assert\`：最后断言页面出现了"欢迎"，验证登录成功

**这套流程就是"自动执行一条测试用例"。**`,
      },
      {
        type: 'lesson',
        title: '在你电脑上跑通（照着做）',
        body: `1. 安装：\`pip install pytest-playwright\`，再运行 \`playwright install\`（它会自动下载浏览器）
2. 把上面的代码存为 \`test_web.py\`
3. 运行 \`pytest test_web.py -v\`
4. 你会看到浏览器自动打开、自动操作、自动判断 ✅

先拿一个真实存在的简单网页练手，能跑通一次，你就掌握了网页自动化的核心。`,
      },
      {
        type: 'quiz',
        title: '小测验：Playwright',
        questions: [
          {
            q: 'Playwright 主要用来做什么？',
            options: ['管理数据库', '用代码自动操作浏览器做测试', '写测试用例文档', '管理 Bug'],
            answer: 1,
            explain: 'Playwright 通过代码驱动浏览器，自动执行网页测试。',
          },
          {
            q: '在 Playwright 脚本里，验证结果最终靠什么？',
            options: ['page.click', 'assert 断言', 'print 打印', '人工看着'],
            answer: 1,
            explain: '和 pytest 一样，用 assert 判断页面结果是否符合预期。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：照着写 Playwright 关键步骤',
        prompt: '请照着答案，写出 Playwright 测登录的几个关键动作（打开页面、填账号、点登录、断言）。',
        answer: `page.goto("登录页网址")
page.fill("#username", "admin")
page.fill("#password", "123456")
page.click("#login-btn")
assert "欢迎" in page.content()`,
        keyPoints: ['goto', 'fill', 'click', 'assert'],
      },
    ],
  };

export default level;
