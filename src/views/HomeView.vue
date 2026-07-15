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
  max-width: 56rem; /* max-w-4xl */
  margin: 0 auto;
  padding: 3rem 1.5rem; /* py-12 px-6 */
}

.hero-section {
  margin-bottom: 5rem; /* mb-20 */
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
  gap: 0.5rem; /* gap-2 */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  border-radius: 9999px; /* rounded-full */
  background-color: rgba(0, 255, 156, 0.1); /* bg-accent/10 */
  border: 1px solid rgba(0, 255, 156, 0.2); /* border-accent/20 */
  color: var(--accent);
  font-size: 0.75rem; /* text-xs */
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em; /* tracking-widest */
  margin-bottom: 1.5rem; /* mb-6 */
}

.hero-title {
  font-size: 2.5rem; /* text-4xl */
  font-weight: bold;
  margin-bottom: 1.5rem; /* mb-6 */
  letter-spacing: -0.05em; /* tracking-tighter */
  line-height: 1; /* leading-none */
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 3rem; /* sm:text-5xl */
  }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 4.5rem; /* md:text-7xl */
  }
}

.hero-subtitle {
  color: var(--muted);
  font-size: 1.125rem; /* text-lg */
  max-width: 36rem; /* max-w-xl */
  line-height: 1.625; /* leading-relaxed */
  margin-bottom: 2.5rem; /* mb-10 */
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
  gap: 1.5rem; /* gap-6 (using default grid gap below) */
}

.posts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem; /* mb-4 */
}

.section-title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: bold;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: -0.05em; /* tracking-tighter */
  white-space: nowrap;
}

.header-line {
  height: 1px;
  flex-grow: 1;
  margin: 0 1.5rem; /* mx-6 */
  background-color: var(--border);
}

.view-all-link {
  font-size: 0.875rem; /* text-sm */
  font-family: var(--font-mono);
  color: var(--muted);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em; /* tracking-widest */
  transition: color 0.2s ease;
  white-space: nowrap;
}

.view-all-link:hover {
  color: var(--accent);
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; /* gap-6 */
}

@media (min-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.no-posts {
  padding: 5rem 0; /* py-20 */
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: 1rem; /* rounded-2xl */
}

.no-posts-text {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 1rem;
}
</style>
