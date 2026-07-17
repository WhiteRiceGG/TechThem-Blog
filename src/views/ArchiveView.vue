<template>
  <div class="archive-container">
    <div class="archive-header">
      <h1 class="archive-title">归档日志</h1>
      
      <!-- Page specific search bar -->
      <div class="search-wrapper">
        <Search :size="16" class="search-icon" />
        <input 
          type="text"
          :value="searchQuery"
          @input="onSearchInput"
          placeholder="搜索归档内容..."
          class="search-input"
        />
        <button 
          v-if="searchQuery"
          @click="clearSearch"
          class="clear-button"
        >
          <X :size="14" />
        </button>
      </div>
    </div>
    
    <div v-if="filteredPosts.length > 0" class="timeline-list">
      <div 
        v-for="post in filteredPosts"
        :key="post.id"
        class="timeline-item"
      >
        <!-- Timeline Dot -->
        <div class="timeline-dot" />
        
        <div class="item-content">
          <span class="item-date">
            {{ post.date }}
          </span>
          <router-link :to="`/posts/${post.id}`" class="item-link">
            <h2 class="item-title">
              {{ post.title }}
            </h2>
            <p class="item-excerpt">
              {{ post.excerpt }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="no-results">
      <p class="no-results-text">未找到与 "{{ searchQuery }}" 相关的日志</p>
      <button 
        @click="clearSearch"
        class="clear-search-btn"
      >
        清除搜索
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { Search, X } from 'lucide-vue-next';

const searchQuery = inject('searchQuery');
const filteredPosts = inject('filteredPosts');

const onSearchInput = (e) => {
  searchQuery.value = e.target.value;
};

const clearSearch = () => {
  searchQuery.value = '';
};
</script>

<style scoped>
.archive-container {
  max-width: 56rem; 
  margin: 0 auto;
  padding: 3rem 1.5rem; 
}

.archive-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem; 
  gap: 1.5rem; 
}

@media (min-width: 768px) {
  .archive-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.archive-title {
  font-size: 2.25rem; 
  font-weight: bold;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: -0.05em; 
}

.search-wrapper {
  position: relative;
  width: 100%;
}

@media (min-width: 768px) {
  .search-wrapper {
    width: 16rem; 
  }
}

.search-icon {
  position: absolute;
  left: 0.75rem; 
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 2.5rem; 
  background-color: rgba(228, 228, 231, 0.05); 
  border: 1px solid var(--border);
  border-radius: 0.5rem; 
  padding: 0.5rem 2.5rem; 
  font-size: 0.875rem; 
  font-family: var(--font-mono);
  color: inherit;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
}

.clear-button {
  position: absolute;
  right: 0.75rem; 
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s ease;
}

.clear-button:hover {
  color: var(--accent);
}

.timeline-list {
  position: relative;
  border-left: 1px solid var(--border);
  margin-left: 1rem; 
  padding-left: 2rem; 
  display: flex;
  flex-direction: column;
  gap: 3rem; 
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -2.55rem; 
  top: 0.375rem; 
  width: 1rem; 
  height: 1rem; 
  border-radius: 50%;
  background-color: var(--bg);
  border: 2px solid var(--accent);
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; 
}

@media (min-width: 768px) {
  .item-content {
    flex-direction: row;
    align-items: baseline;
    gap: 2rem; 
  }
}

.item-date {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 1rem; 
  white-space: nowrap;
}

.item-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  flex-grow: 1;
}

.item-title {
  font-size: 1.25rem; 
  font-weight: bold;
  transition: color 0.2s ease;
}

.item-link:hover .item-title {
  color: var(--accent);
}

.item-excerpt {
  color: var(--fg-secondary);
  font-size: 1rem; 
  margin-top: 0.25rem; 
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-results {
  text-align: center;
  padding: 5rem 0; 
  border: 1px dashed var(--border);
  border-radius: 1rem; 
}

.no-results-text {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 1rem;
}

.clear-search-btn {
  margin-top: 1rem; 
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.875rem; 
  text-decoration: none;
}

.clear-search-btn:hover {
  text-decoration: underline;
}
</style>
