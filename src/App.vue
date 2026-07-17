<template>
  <div class="app-container" v-if="isMounted">
    <!-- Mouse Glow Effect -->
    <MouseGlow />
    
    <!-- Background Grid -->
    <div class="background-grid tech-grid" />
    
    <!-- Gradient Glows -->
    <div class="glow glow-top" />
    <div class="glow glow-bottom" />

    <Header 
      :theme="theme"
      @toggle-theme="toggleTheme"
    />

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in" @after-leave="triggerTransitionIn">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, watch, provide, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { posts } from './data/posts';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MouseGlow from './components/MouseGlow.vue';
import { triggerTransitionIn } from './utils/transition';

const isMounted = ref(false);
const theme = ref('dark');
const searchQuery = ref('');
const route = useRoute();


provide('searchQuery', searchQuery);

const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return posts;
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.tags.some(tag => tag.toLowerCase().includes(query))
  );
});
provide('filteredPosts', filteredPosts);

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

watch(theme, (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', newTheme);
}, { immediate: true });

onMounted(() => {
  isMounted.value = true;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.value = savedTheme;
  }
});
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.background-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 1;
  z-index: 0;
}

.glow {
  position: fixed;
  width: 40%;
  height: 40%;
  border-radius: 9999px;
  pointer-events: none;
  z-index: 0;
}

.glow-top {
  top: -10%;
  left: -10%;
  background: radial-gradient(circle, rgba(0, 255, 156, 0.1) 0%, transparent 80%);
  filter: blur(120px);
}

.glow-bottom {
  bottom: -10%;
  right: -10%;
  background: radial-gradient(circle, rgba(0, 255, 156, 0.05) 0%, transparent 80%);
  filter: blur(120px);
}

.main-content {
  flex-grow: 1;
  position: relative;
  z-index: 10;
  padding-top: 5rem;
}
</style>
