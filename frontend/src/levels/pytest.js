// 关卡数据，由 levels.js 拆分
const level = {
    id: 'pytest',
    stage: 5,
    title: 'pytest 自动化测试入门',
    icon: '🧪',
    category: '自动化测试',
    xp: 50,
    blocks: [
      {
        type: 'lesson',
        title: '什么是自动化测试？为什么学它',
        body: `手动测试：每次都要人去点、去看。**自动化测试：把测试步骤写成代码，让程序自动跑、自动判断对错。**

什么时候用自动化：
- 同一个功能要**反复测**（比如每次改完代码都要回归一遍）
- 测试**数量多**，人手点不过来
- 需要**快速**知道这次改动有没有搞坏旧功能

pytest 是 Python 里**最流行**的自动化测试框架，简单好用。`,
      },
      {
        type: 'lesson',
        title: '第一个 pytest 测试',
        body: `测试用例就是一个 **test_ 开头** 的函数，里面用 **assert（断言）** 检查结果。
\`\`\`python
# 文件：test_login.py
def login(username, password):
    if username == "admin" and password == "123456":
        return "success"
    return "fail"

def test_login_success():
    assert login("admin", "123456") == "success"

def test_login_wrong_password():
    assert login("admin", "000000") == "fail"
\`\`\`

在命令行运行：\`pytest\`，它会自动找到所有 test_ 开头的函数并执行，告诉你通过几条、失败几条。`,
      },
      {
        type: 'lesson',
        title: '在你电脑上跑通（照着做）',
        body: `1. 安装：命令行输入 \`pip install pytest\`
2. 新建文件 \`test_demo.py\`，把上面的代码粘进去
3. 命令行进入该文件夹，输入 \`pytest -v\`
4. 你会看到两个测试都显示 \`PASSED\` ✅

把正确密码改成错的再跑，就会看到 \`FAILED\`，并指出哪一行断言不通过——这就是自动化测试在帮你"自动找问题"。`,
      },
      {
        type: 'quiz',
        title: '小测验：pytest 基础',
        questions: [
          {
            q: 'pytest 会自动执行什么样的函数？',
            options: ['任意函数', 'test_ 开头的函数', 'main 函数', '带 @test 标记的函数'],
            answer: 1,
            explain: 'pytest 默认收集并执行以 test_ 开头的函数。',
          },
          {
            q: '自动化测试里，用来"判断结果对不对"的关键字是？',
            options: ['print', 'if', 'assert', 'return'],
            answer: 2,
            explain: 'assert（断言）不成立时测试就失败，它是自动化验证的核心。',
          },
          {
            q: '下面哪种情况最适合用自动化测试？',
            options: ['只测一次的新功能', '每次发版前都要重复测的回归用例', '看界面美不美', '随便点点试试'],
            answer: 1,
            explain: '重复、大量、需要快速执行的测试，最适合自动化。',
          },
        ],
      },
      {
        type: 'short',
        title: '动手：照着写一个 pytest 测试',
        prompt: '请照着答案，写一个 test_ 开头的 pytest 测试函数，断言 1+1 等于 2。',
        answer: `def test_add():
    assert 1 + 1 == 2`,
        keyPoints: ['def test', 'assert', '1 + 1 == 2'],
      },
    ],
  };

export default level;
