import { reactive } from 'vue';

// 全局共享的学习者状态：让顶栏、首页、关卡页的 XP 实时同步（无需刷新页面）
export const learner = reactive({ xp: 0 });
