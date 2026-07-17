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
      <TransitionGroup name="grid-item">
        <div
          v-for="post in tagFilteredPosts"
          :key="post.id"
          class="grid-item-wrapper"
        >
          <PostCard :post="post" />
        </div>
      </TransitionGroup>
    </div>

    <div v-if="tagFilteredPosts.length === 0" class="no-posts">
      该分类下未找到文章
    </div>
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
}

@media (min-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.grid-item-wrapper {
  transition: all 0.3s ease;
}

.no-posts {
  text-align: center;
  padding: 5rem 0; 
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 1rem;
}


.grid-item-enter-active,
.grid-item-leave-active {
  transition: all 0.3s ease;
}
.grid-item-enter-from,
.grid-item-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
