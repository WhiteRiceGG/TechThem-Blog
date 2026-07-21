<template>
  <div class="categories-container">
    <h1 class="categories-title">分类筛选</h1>
    
    <div class="tags-filter">
      <button
        @click="selectedTag = null"
        class="tag-btn"
        :class="{ active: selectedTag === null }"
      >
        全部文章
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        @click="selectedTag = tag"
        class="tag-btn"
        :class="{ active: selectedTag === tag }"
      >
        #{{ tag.toUpperCase() }}
      </button>
    </div>

    <div class="posts-grid">
      <TransitionGroup name="grid-item" @before-leave="onBeforeLeave">
        <div
          v-for="post in tagFilteredPosts"
          :key="post.id"
          class="grid-item-wrapper"
        >
          <PostCard :post="post" />
        </div>
      </TransitionGroup>
    </div>

    <Transition name="fade">
      <div v-if="tagFilteredPosts.length === 0" class="no-posts">
        该分类下未找到文章
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import PostCard from '@/src/components/PostCard.vue';

const filteredPosts = inject('filteredPosts');
const selectedTag = ref(null);

const allTags = computed(() => {
  if (!filteredPosts.value) return [];
  const tags = filteredPosts.value.flatMap(post => post.tags);
  return Array.from(new Set(tags));
});

const tagFilteredPosts = computed(() => {
  if (!filteredPosts.value) return [];
  if (selectedTag.value === null) return filteredPosts.value;
  return filteredPosts.value.filter(post => post.tags.includes(selectedTag.value));
});

const onBeforeLeave = (el) => {
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = el;
  el.style.left = `${offsetLeft}px`;
  el.style.top = `${offsetTop}px`;
  el.style.width = `${offsetWidth}px`;
  el.style.height = `${offsetHeight}px`;
  el.style.position = 'absolute';
};
</script>

<style scoped>
.categories-container {
  max-width: 56rem; 
  margin: 0 auto;
  padding: 3rem 1.5rem; 
}

.categories-title {
  font-size: 2.25rem; 
  font-weight: bold;
  margin-bottom: 2rem; 
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: -0.05em; 
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem; 
  margin-bottom: 3rem; 
}

.tag-btn {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid var(--border);
  background-color: rgba(228, 228, 231, 0.03);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tag-btn:hover {
  border-color: rgba(0, 255, 156, 0.4);
  color: var(--fg);
  background-color: rgba(0, 255, 156, 0.02);
  transform: translateY(-1px);
}

.tag-btn:active {
  transform: translateY(0) scale(0.97);
}

.tag-btn.active {
  background-color: var(--accent);
  color: #0A0A0B;
  border-color: var(--accent);
  font-weight: 600;
  box-shadow: 0 0 16px rgba(0, 255, 156, 0.25);
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; 
  position: relative;
}

@media (min-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.grid-item-wrapper {
  will-change: transform, opacity;
}

.no-posts {
  text-align: center;
  padding: 5rem 0; 
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 1rem;
}

/* TransitionGroup animations */
.grid-item-move {
  transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
}

.grid-item-enter-active {
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.grid-item-leave-active {
  transition: opacity 0.18s cubic-bezier(0.4, 0, 1, 1), transform 0.18s cubic-bezier(0.4, 0, 1, 1), filter 0.18s ease;
  pointer-events: none;
  z-index: 0;
}

.grid-item-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

.grid-item-leave-to {
  opacity: 0;
  transform: scale(0.88);
  filter: blur(4px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
