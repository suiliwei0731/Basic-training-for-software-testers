// 关卡数据，由 levels.js 拆分
const level = {
    id: 'py1',
    stage: 4,
    title: 'Python 阅读（变量与判断）',
    icon: '🐍',
    category: 'Python',
    xp: 40,
    blocks: [
      {
        type: 'lesson',
        title: '测试员学 Python 到什么程度？',
        body: `目标：**能看懂 AI 生成的测试脚本，能改一点点，能判断它测没测对。** 不是当程序员。

Python 读起来像蹩脚英语，认识几个关键词就行。`,
      },
      {
        type: 'lesson',
        title: '变量与条件判断',
        body: `\`\`\`python
name = "小明"     # 字符串用引号
age = 25          # 数字不用
is_vip = True     # 布尔值 True/False（首字母大写）

if age >= 18:
    print("成年")
else:
    print("未成年")
\`\`\`

Python 靠**缩进**区分代码块，缩进错了会报错。`,
      },
      {
        type: 'python',
        title: '练一练：先猜结果，再点运行',
        code: `age = 17
if age >= 18:
    result = "成年"
else:
    result = "未成年"
print("结果：", result)`,
        expected: '结果： 未成年',
        question: '运行后打印什么？',
        hint: 'age 等于 17，不满足 >= 18，会走 else 分支，得到"未成年"。另外 print 里用逗号分隔，会在"结果："后面多输出一个空格。',
      },
      {
        type: 'python',
        title: '多条件判断',
        code: `score = 85
if score >= 90:
    level = "A"
elif score >= 60:
    level = "B"
else:
    level = "C"
print("等级：", level)`,
        expected: '等级： B',
        question: 'score = 85，打印结果是？',
        hint: '85 不满足 >= 90（第一条跳过），但满足 elif 的 >= 60，所以 level 被赋值为 B。',
      },
    ],
  };

export default level;
