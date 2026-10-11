<template>
  <div id="app">
    <header class="topbar">
      <div class="brand" @click="$router.push('/')">
        <span class="logo">🎯</span>
        <span>测试闯关</span>
        <small>零基础软件测试学习</small>
      </div>
      <div class="xp-bar" v-if="xpReady">
        <span>⭐ 经验 {{ learner.xp }}</span>
        <span class="lv">Lv.{{ level }}</span>
      </div>
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getDashboard } from './api';
import { learner } from './store';

const xpReady = ref(false);
const level = computed(() => Math.floor(learner.xp / 100) + 1);

onMounted(async () => {
  try {
    const data = await getDashboard();
    learner.xp = data.learner?.xp ?? 0;
  } catch {
    learner.xp = 0;
  }
  xpReady.value = true;
});
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 28px;
  background: white;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-dark);
}
.brand .logo { font-size: 24px; }
.brand small { font-size: 12px; color: var(--text-light); font-weight: 400; }
.xp-bar {
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 14px;
  color: var(--text-light);
}
.xp-bar .lv {
  background: var(--primary);
  color: white;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 700;
}
main { max-width: 960px; margin: 0 auto; padding: 28px 20px 60px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
