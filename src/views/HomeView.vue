<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="system-badge">
        <Zap :size="12" fill="currentColor" /> System_Online: v1.0.0
      </div>
      
      <h1 class="hero-title">
        CODE. <span class="text-accent">DESIGN.</span><br />
        INNOVATE.
      </h1>
      
      <p class="hero-subtitle">
        一个致力于探索极简设计与高性能技术交汇点的数字空间。
      </p>
      
      <div class="tech-grid-list">
        <div 
          v-for="item in techItems"
          :key="item.label"
          class="tech-item glass-card"
        >
          <component :is="item.icon" :size="18" />
          <span class="tech-label">{{ item.label }}</span>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <div class="posts-section">
      <div class="posts-header">
        <h2 class="section-title">最新日志</h2>
        <div class="header-line" />
        <router-link 
          to="/archive"
          class="view-all-link"
        >
          查看全部
        </router-link>
      </div>
      
      <div class="posts-grid" v-if="displayPosts.length > 0">
        <PostCard 
          v-for="post in displayPosts" 
          :key="post.id" 
          :post="post" 
        />
      </div>
      <div v-else class="no-posts">
        <p class="no-posts-text">未找到匹配的日志</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import PostCard from '@/src/components/PostCard.vue';
import { Zap, Terminal, Cpu, Code } from 'lucide-vue-next';

const filteredPosts = inject('filteredPosts');

const displayPosts = computed(() => {
  return filteredPosts.value ? filteredPosts.value.slice(0, 4) : [];
});

const techItems = [
  { icon: Terminal, label: "终端" },
  { icon: Cpu, label: "硬件" },
  { icon: Code, label: "软件" },
  { icon: Zap, label: "性能" },
];
</script>

<style scoped>
.home-container {
  max-width: 56rem; 
  margin: 0 auto;
  padding: 3rem 1.5rem; 
}

.hero-section {
  margin-bottom: 5rem; 
  text-align: center;
}

@media (min-width: 768px) {
  .hero-section {
    text-align: left;
  }
}

.system-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem; 
  padding: 0.25rem 0.75rem; 
  border-radius: 9999px; 
  background-color: rgba(0, 255, 156, 0.1); 
  border: 1px solid rgba(0, 255, 156, 0.2); 
  color: var(--accent);
  font-size: 0.75rem; 
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em; 
  margin-bottom: 1.5rem; 
}

.hero-title {
  font-size: 2.5rem; 
  font-weight: bold;
  margin-bottom: 1.5rem; 
  letter-spacing: -0.05em; 
  line-height: 1; 
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 3rem; 
  }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 4.5rem; 
  }
}

.hero-subtitle {
  color: var(--fg-secondary);
  font-size: 1.125rem; 
  max-width: 36rem; 
  line-height: 1.625; 
  margin-bottom: 2.5rem; 
}

@media (max-width: 767px) {
  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
}

.tech-grid-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .tech-grid-list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.tech-item {
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tech-item:hover {
  color: var(--accent);
  border-color: rgba(0, 255, 156, 0.3);
}

.tech-label {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.posts-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; 
}

.posts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem; 
}

.section-title {
  font-size: 1.5rem; 
  font-weight: bold;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: -0.05em; 
  white-space: nowrap;
}

.header-line {
  height: 1px;
  flex-grow: 1;
  margin: 0 1.5rem; 
  background-color: var(--border);
}

.view-all-link {
  font-size: 0.875rem; 
  font-family: var(--font-mono);
  color: var(--muted);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em; 
  transition: color 0.2s ease;
  white-space: nowrap;
}

.view-all-link:hover {
  color: var(--accent);
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; 
}

@media (min-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.no-posts {
  padding: 5rem 0; 
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: 1rem; 
}

.no-posts-text {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 1rem;
}
</style>
