<template>
  <router-link :to="`/posts/${post.id}`" class="post-card-link">
    <div class="post-card glass-card">
      <div class="post-meta">
        <span class="meta-item">
          <Calendar :size="14" /> {{ post.date }}
        </span>
        <span class="meta-item">
          <Clock :size="14" /> {{ post.readingTime }}
        </span>
      </div>
      
      <h2 class="post-title">
        {{ post.title }}
      </h2>
      
      <p class="post-excerpt">
        {{ post.excerpt }}
      </p>
      
      <div class="post-footer">
        <div class="post-tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag" 
            class="post-tag"
          >
            {{ tag }}
          </span>
        </div>
        <span class="read-more-link">
          阅读更多 <ArrowRight :size="14" />
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { Calendar, Clock, ArrowRight } from 'lucide-vue-next';

defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.post-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.post-card {
  padding: 1.5rem; 
  border-radius: 1rem; 
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.post-card-link:hover .post-card {
  transform: translateY(-0.25rem); 
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem; 
  font-size: 0.875rem; 
  font-family: var(--font-mono);
  color: var(--muted);
  margin-bottom: 1rem; 
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem; 
}

.post-title {
  font-size: 1.25rem; 
  font-weight: bold;
  margin-bottom: 0.75rem; 
  transition: color 0.2s ease;
}

.post-card-link:hover .post-title {
  color: var(--accent); 
}

.post-excerpt {
  color: var(--fg-secondary);
  font-size: 1rem; 
  line-height: 1.625; 
  margin-bottom: 1.5rem; 
}

.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem; 
}

.post-tag {
  font-size: 0.725rem; 
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(228, 228, 231, 0.03);
  color: var(--muted);
  border: 1px solid var(--border);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card-link:hover .post-tag {
  color: var(--accent);
  border-color: rgba(0, 255, 156, 0.3);
  background-color: rgba(0, 255, 156, 0.06);
}

.post-tag::before {
  content: "#";
  margin-right: 0.15rem;
  opacity: 0.6;
}

.read-more-link {
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.25rem; 
  font-size: 1rem; 
  font-family: var(--font-mono);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.post-card-link:hover .read-more-link {
  opacity: 1; 
}
</style>
