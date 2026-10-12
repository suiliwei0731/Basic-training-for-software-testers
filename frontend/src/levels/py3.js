// 关卡数据，由 levels.js 拆分
const level = {
    id: 'py3',
    stage: 4,
    title: 'Python 列表、字典与异常',
    icon: '🐍',
    category: 'Python',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '列表：一组有序的数据',
        body: `列表就是"一排东西"，用方括号包起来，从 0 开始编号。
\`\`\`python
fruits = ["苹果", "香蕉", "橘子"]
print(fruits[0])      # 苹果（第 1 个，编号 0）
print(len(fruits))    # 3（一共几个）
fruits.append("葡萄") # 末尾加一个
print(fruits)         # ["苹果","香蕉","橘子","葡萄"]
\`\`\`

**字典：用"键"找"值"**，像通讯录用名字找电话。
\`\`\`python
user = {"name": "小明", "age": 25}
print(user["name"])   # 小明
print(user.get("age"))# 25
\`\`\`

测试里常拿它们**存测试数据、循环批量验证**。`,
      },
      {
        type: 'lesson',
        title: '异常处理：程序出错了别崩',
        body: `程序遇到错误会中断。用 try/except 把错误"接住"，让程序继续跑。
\`\`\`python
try:
    result = 10 / 0          # 除以 0 会报错
    print(result)
except ZeroDivisionError:
    print("除数不能为 0")     # 出错就走这里，程序不崩
\`\`\`

在自动化测试里，有时预期就是"应该报错"，就用 try/except 来验证。`,
      },
      {
        type: 'python',
        title: '练一练：列表与字典',
        code: `prices = [10, 20, 30]
total = 0
for p in prices:
    total = total + p
print("总价：", total)

user = {"name": "小红", "city": "北京"}
print("城市：", user["city"])`,
        expected: '总价： 60 城市： 北京',
        question: '运行后打印什么？（两行结果，空格隔开也行）',
        hint: '循环把 10、20、30 相加得 60；字典用 "city" 这个键取出 "北京"。',
      },
      {
        type: 'python',
        title: '练一练：异常捕获',
        code: `data = {}
try:
    print(data["不存在的键"])
except KeyError:
    print("没有这个键")
print("程序结束")`,
        expected: '没有这个键 程序结束',
        question: '运行后打印什么？',
        hint: '字典里没有这个键，取值会触发 KeyError，被 except 接住打印"没有这个键"，然后继续执行最后一行。',
      },
    ],
  };

export default level;
