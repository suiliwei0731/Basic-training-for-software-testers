// 关卡数据 —— 整个学习路径的内容都在这里
// 每个关卡由若干「内容块」组成，块类型：lesson / quiz / sql / python
// 内容设计对标真实初级测试岗位 JD

import intro from '../levels/intro.js';
import testcase from '../levels/testcase.js';
import bug from '../levels/bug.js';
import sql0 from '../levels/sql0.js';
import tables from '../levels/tables.js';
import sql1 from '../levels/sql1.js';
import sql2 from '../levels/sql2.js';
import sql3 from '../levels/sql3.js';
import sql4 from '../levels/sql4.js';
import sql5 from '../levels/sql5.js';
import api from '../levels/api.js';
import env from '../levels/env.js';
import pressure from '../levels/pressure.js';
import py1 from '../levels/py1.js';
import py2 from '../levels/py2.js';
import py3 from '../levels/py3.js';
import pytest from '../levels/pytest.js';
import playwright from '../levels/playwright.js';
import tools from '../levels/tools.js';
import docker from '../levels/docker.js';
import doc from '../levels/doc.js';
import tools_lab from '../levels/tools-lab.js';
import bug_practice from '../levels/bug-practice.js';
import interview from '../levels/interview.js';
import resume from '../levels/resume.js';
import boss from '../levels/boss.js';

export const LEVELS = [
  intro,
  testcase,
  bug,
  sql0,
  tables,
  sql1,
  sql2,
  sql3,
  sql4,
  sql5,
  api,
  env,
  pressure,
  py1,
  py2,
  py3,
  pytest,
  playwright,
  tools,
  docker,
  doc,
  tools_lab,
  bug_practice,
  interview,
  resume,
  boss,
];

export const LEVEL_ORDER = LEVELS.map((l) => l.id);
export const getLevel = (id) => LEVELS.find((l) => l.id === id);
