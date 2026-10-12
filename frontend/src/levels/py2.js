// 关卡数据，由 levels.js 拆分
const level = {
    id: 'py2',
    stage: 4,
    title: 'Python 阅读（循环与函数）',
    icon: '🔁',
    category: 'Python',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '循环：重复做一件事',
        body: `\`\`\`python
names = ["小明", "小红", "小刚"]
for name in names:
    print(name)
\`\`\`

**字典：键值对**
\`\`\`python
user = {"name": "小明", "age": 25}
print(user["name"])   # "小明"
\`\`\``,
      },
      {
        type: 'lesson',
        title: '函数和断言：测试脚本的核心',
        body: `**函数**：把逻辑打包复用。
\`\`\`python
def add(a, b):
    return a + b

print(add(2, 3))   # 5
\`\`\`

**断言 assert**：测试脚本里最常见！"我断言这里一定成立，不成立就报错（测试失败）"。
\`\`\`python
assert add(2, 3) == 5, "加法算错了"
\`\`\`

**看测试脚本，重点找 assert，它才是真正在"验证"的地方。**`,
      },
      {
        type: 'python',
        title: '读懂一个测试脚本',
        code: `def login(username, password):
    if username == "admin" and password == "123456":
        return "success"
    return "fail"

result = login("admin", "123456")
assert result == "success", "正确密码却登录失败"
print("测试通过")`,
        expected: '测试通过',
        question: '运行后会打印什么？',
        hint: '传入的账号 admin 和密码 123456 正好匹配，函数返回 "success"，断言成立，所以最后打印"测试通过"。',
      },
      {
        type: 'python',
        title: '循环 + 列表',
        code: `prices = [10, 20, 30]
total = 0
for p in prices:
    total = total + p
print("总价：", total)`,
        expected: '总价： 60',
        question: '打印的总价是多少？',
        hint: 'for 循环依次取出 10、20、30 加到 total 上，10+20+30=60。print 逗号同样会在"总价："后多一个空格。',
      },
    ],
  };

export default level;
