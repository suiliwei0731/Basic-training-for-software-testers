import axios from 'axios';

const http = axios.create({ baseURL: '/api' });

// 获取仪表盘（经验值 + 各关卡进度）
export async function getDashboard() {
  const { data } = await http.get('/dashboard');
  return data;
}

// 提交关卡成绩，返回最新仪表盘
export async function submitProgress(payload) {
  const { data } = await http.post('/progress', payload);
  return data;
}

// 重置全部进度
export async function resetAll() {
  const { data } = await http.post('/reset');
  return data;
}
