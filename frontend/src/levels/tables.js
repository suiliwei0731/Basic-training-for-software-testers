// 关卡数据，由 levels.js 拆分
const level = {
    id: 'tables',
    stage: 2,
    title: '认识数据库与常见业务表',
    icon: '🗃️',
    category: 'SQL',
    xp: 35,
    blocks: [
      {
        type: 'lesson',
        title: '数据库和表是什么？（电商系统举例）',
        body: "前面学了 SQL 命令，现在认识一下命令操作的对象——**数据库和表**。\n\n一个**数据库**就像一个 Excel 文件，里面可以有很多张**表**。以一个\"电商系统\"为例，通常会有这些表：\n\n| 表名 | 存什么 |\n|------|--------|\n| users | 用户（谁在买）|\n| products | 商品（卖什么）|\n| cart | 购物车（用户往车里放了啥）|\n| orders | 订单（用户买了什么、多少钱）|\n\n为什么要分成好几张表，而不是全塞一张大表？——**分类存放、不重复、好维护**。用户信息只在 users 里存一份，订单里只记\"哪个用户\"（用 user_id 引用），不用把用户名、电话重复存一遍。",
      },
      {
        type: 'lesson',
        title: '逐张认识：users / products / cart / orders',
        body: "认识表，关键是看懂它的**字段**（也就是列）。每张表都有一个 **id** 作为主键——每行记录的唯一编号。\n\n**users 用户表**\n| 字段 | 含义 | 例子 |\n|------|------|------|\n| id | 用户编号（主键）| 101 |\n| name | 用户名 | 张三 |\n| phone | 手机号 | 13800000000 |\n| city | 所在城市 | 北京 |\n\n**products 商品表**\n| 字段 | 含义 | 例子 |\n|------|------|------|\n| id | 商品编号（主键）| 1 |\n| name | 商品名 | 笔记本电脑 |\n| price | 价格 | 5000 |\n| stock | 库存数量 | 30 |\n\n**cart 购物车表**\n| 字段 | 含义 |\n|------|------|\n| id | 记录编号（主键）|\n| user_id | 哪个用户（对应 users.id）|\n| product_id | 哪个商品（对应 products.id）|\n| quantity | 加购数量 |\n\n**orders 订单表**\n| 字段 | 含义 |\n|------|------|\n| id | 订单编号（主键）|\n| user_id | 下单用户（对应 users.id）|\n| amount | 订单金额 |\n| status | 状态（待支付 / 已支付 / 已发货）|",
      },
      {
        type: 'lesson',
        title: '表与表怎么关联（外键与关系）',
        body: "表不是孤立的，它们靠 **id 互相引用** 连起来，这叫\"关联\"。\n\n电商系统的表关系（箭头表示\"指向、引用\"）：\n\n    users ──< cart >── products\n      │\n      └──< orders\n\n- cart.user_id 指向 users.id → 知道\"这条购物车记录是谁的\"\n- cart.product_id 指向 products.id → 知道\"放的是哪个商品\"\n- orders.user_id 指向 users.id → 知道\"这单是谁下的\"\n\n这种\"一张表的某个字段，存的是另一张表的 id\"，叫**外键**，是表之间建立关系的方式。\n\n测试员为什么要懂这些？——你在页面下单成功，要去 **orders 表**查有没有生成这笔订单；用户改了昵称，要去 **users 表**核对存没存对。**知道数据存在哪张表、表之间怎么关联，查数据才有方向。**",
      },
      {
        type: 'short',
        title: '动手：说说 orders 订单表的字段',
        prompt: '结合本关所学，照着写一写：orders 订单表里 id、user_id、amount、status 这几个字段分别是什么意思？',
        hint: '回想每张表的讲解：id 是主键，带 _id 的字段通常是引用另一张表。',
        keywords: ["订单","user_id","amount","status","用户"],
        placeholder: 'id 是…\nuser_id 是…',
        answer: "orders 订单表字段含义：\nid：订单编号，是主键，唯一标识每一笔订单\nuser_id：下单用户的编号，对应用户表的 id，说明这单是谁下的\namount：订单的总金额\nstatus：订单状态，比如待支付、已支付、已发货",
      },
    ],
  };

export default level;
