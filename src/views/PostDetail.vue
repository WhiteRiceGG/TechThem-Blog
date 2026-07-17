<template>
  <div class="detail-container" v-if="post">
    <div class="main-column">
      <button 
        @click="goBack"
        class="back-btn"
      >
        <ArrowLeft :size="16" /> 返回列表
      </button>
      
      <header class="post-header">
        <div class="post-meta">
          <span class="meta-item">
            <Calendar :size="16" /> {{ post.date }}
          </span>
          <span class="meta-item">
            <Clock :size="16" /> {{ post.readingTime }}
          </span>
        </div>
        <h1 class="post-title">
          {{ post.title }}
        </h1>
        <div class="post-subheader">
          <div class="post-tags">
            <span 
              v-for="tag in post.tags" 
              :key="tag" 
              class="post-tag"
            >
              {{ tag }}
            </span>
          </div>
          <button class="share-btn" @click="sharePost">
            <Share2 :size="20" />
          </button>
        </div>
      </header>
      
      <!-- Markdown Content -->
      <div 
        class="markdown-body" 
        v-html="renderedMarkdown"
        @click="handleMarkdownClick"
      />
    </div>

    <!-- TOC Sidebar -->
    <aside class="toc-sidebar">
      <div class="toc-wrapper">
        <div class="toc-header">
          <List :size="14" />
          目录
        </div>
        <div class="toc-nav-container scrollbar-hide">
          <nav class="toc-nav">
            <button
              v-for="item in toc"
              :key="item.id"
              @click="scrollToHeading(item.id)"
              class="toc-link"
              :class="{ active: activeId === item.id }"
              :style="{ marginLeft: `${(item.level - 1) * 12}px` }"
            >
              {{ item.text }}
            </button>
          </nav>
        </div>

        <button 
          @click="scrollToTop"
          class="scroll-top-btn"
        >
          <ArrowLeft :size="12" class="scroll-top-icon" />
          回到顶部
        </button>
      </div>
    </aside>
  </div>

  <!-- Error view if post not found -->
  <div class="detail-container" v-else>
    <h1 class="error-title">文章未找到</h1>
    <button 
      @click="goHome"
      class="error-back-btn"
    >
      <ArrowLeft :size="16" /> 返回首页
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { posts } from '@/src/data/posts';
import { Calendar, Clock, ArrowLeft, Share2, List } from 'lucide-vue-next';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { websiteConfig } from '@/src/config';

const route = useRoute();
const router = useRouter();
const post = ref(undefined);
const renderedMarkdown = ref('');
const toc = ref([]);
const activeId = ref('');
const headingElements = ref([]);

watch(activeId, (newId) => {
  if (!newId) return;
  nextTick(() => {
    const activeLink = document.querySelector('.toc-link.active');
    const tocNavContainer = document.querySelector('.toc-nav-container');
    if (activeLink && tocNavContainer) {
      const wrapperRect = tocNavContainer.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      if (linkRect.top < wrapperRect.top || linkRect.bottom > wrapperRect.bottom) {
        activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });
});

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const code = token.content;
  const lang = token.info.trim();
  
  let highlighted = '';
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlighted = hljs.highlight(code, { language: lang }).value;
    } catch (__) {
      highlighted = md.utils.escapeHtml(code);
    }
  } else {
    highlighted = md.utils.escapeHtml(code);
  }

  return `
    <div class="code-block-wrapper">
      <div class="code-block-header">
        <div class="code-block-header-left">
          <div class="code-block-dots">
            <div class="code-block-dot dot-red"></div>
            <div class="code-block-dot dot-amber"></div>
            <div class="code-block-dot dot-emerald"></div>
          </div>
          <span class="code-block-lang">${lang || 'code'}</span>
        </div>
        <button
          class="copy-code-btn"
          data-code="${encodeURIComponent(code)}"
        >
          <span class="copy-btn-content">
            <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span class="btn-text">copy</span>
          </span>
          <span class="copied-btn-content">
            <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span class="btn-text-copied">copied</span>
          </span>
        </button>
      </div>
      <pre class="hljs"><code class="language-${lang}">${highlighted}</code></pre>
    </div>
  `;
};

const originalHeadingOpen = md.renderer.rules.heading_open || function (tokens, idx, options, _env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const inlineToken = tokens[idx + 1];
  const text = inlineToken ? inlineToken.content : '';
  const id = text.toLowerCase().trim().replace(/[^\w\u4e00-\u9fa5\-]+/g, '-');
  
  token.attrSet('id', id);
  env.currentHeadingId = id;
  
  return originalHeadingOpen(tokens, idx, options, env, self);
};

md.renderer.rules.heading_close = function (tokens, idx, _options, env) {
  const id = env.currentHeadingId || '';
  return `<a href="#${id}" class="icon-link"></a></${tokens[idx].tag}>`;
};

const goBack = () => {
  router.push('/');
};

const goHome = () => {
  router.push('/');
};

const copyToClipboard = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    return new Promise((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          resolve();
        } else {
          reject(new Error('Failed to copy using fallback method'));
        }
      } catch (err) {
        reject(err);
      }
    });
  }
};

const sharePost = () => {
  copyToClipboard(window.location.href).then(() => {
    alert('链接已复制到剪贴板！');
  }).catch(err => {
    console.error('Failed to share: ', err);
    alert('复制链接失败，请手动复制浏览器地址栏的链接。');
  });
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToHeading = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.removeEventListener('scroll', handleWindowScroll);
    activeId.value = id;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    setTimeout(() => {
      window.addEventListener('scroll', handleWindowScroll);
    }, 800);
  }
};

const handleMarkdownClick = (e) => {
  const button = e.target.closest('.copy-code-btn');
  if (!button) return;

  const encodedCode = button.getAttribute('data-code');
  if (!encodedCode) return;

  const code = decodeURIComponent(encodedCode);
  
  copyToClipboard(code).then(() => {
    button.classList.add('copied');

    setTimeout(() => {
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};


const handleScrollSpy = () => {
  const elements = headingElements.value;
  if (elements.length === 0) return;

  const scrollPosition = window.scrollY;
  const offset = 100;

  const isBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20;
  if (isBottom) {
    activeId.value = elements[elements.length - 1].id;
    return;
  }

  let currentActiveId = elements[0].id;
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    if (scrollPosition >= top) {
      currentActiveId = el.id;
    } else {
      break;
    }
  }
  activeId.value = currentActiveId;
};

let scrollTimer = null;
const handleWindowScroll = () => {
  if (scrollTimer) return;
  scrollTimer = requestAnimationFrame(() => {
    handleScrollSpy();
    scrollTimer = null;
  });
};

const buildToc = () => {
  const elements = Array.from(document.querySelectorAll(".markdown-body h1, .markdown-body h2, .markdown-body h3"));
  headingElements.value = elements;
  toc.value = elements.map((el) => ({
    id: el.id,
    text: el.textContent?.trim() || "",
    level: parseInt(el.tagName.substring(1)),
  }));

  nextTick(() => {
    handleScrollSpy();
  });
};

onMounted(() => {
  const foundPost = posts.find(p => p.id === route.params.id);
  if (foundPost) {
    post.value = foundPost;
    renderedMarkdown.value = md.render(foundPost.content);
    document.title = `${foundPost.title} | ${websiteConfig.title}`;
    
    nextTick(() => {
      buildToc();
      window.addEventListener('scroll', handleWindowScroll);
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll);
});
</script>

<style scoped>
.detail-container {
  max-width: 56rem; 
  margin: 0 auto;
  padding: 3rem 1.5rem; 
  position: relative;
}

.main-column {
  min-width: 0;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem; 
  color: var(--muted);
  background: none;
  border: none;
  margin-bottom: 2rem; 
  transition: color 0.2s ease;
  font-family: var(--font-mono);
  font-size: 1rem; 
  cursor: pointer;
  animation: fadeIn 0.5s ease-out;
}

.back-btn:hover {
  color: var(--accent);
}

.post-header {
  margin-bottom: 3rem; 
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem; 
  font-size: 1rem; 
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
  font-size: 2.25rem; 
  font-weight: bold;
  margin-bottom: 1.5rem; 
  line-height: 1.25; 
}

@media (min-width: 768px) {
  .post-title {
    font-size: 3rem; 
  }
}

.post-subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0; 
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  font-size: 0.75rem; 
  font-family: var(--font-mono);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background-color: rgba(0, 255, 156, 0.04);
  color: var(--accent);
  border: 1px solid rgba(0, 255, 156, 0.15);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  user-select: none;
}

.post-tag:hover {
  background-color: rgba(0, 255, 156, 0.12);
  border-color: rgba(0, 255, 156, 0.4);
  box-shadow: 0 2px 8px rgba(0, 255, 156, 0.15);
  transform: translateY(-1px);
}

.post-tag::before {
  content: "#";
  margin-right: 0.2rem;
  opacity: 0.7;
}

.share-btn {
  color: var(--muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-btn:hover {
  color: var(--fg);
}

.toc-sidebar {
  display: none;
}

@media (min-width: 1280px) {
  .toc-sidebar {
    display: block;
  }
}

.toc-wrapper {
  position: fixed;
  top: 8rem; 
  left: calc(50% + 480px);
  width: 220px;
  padding-right: 1rem; 
}

.toc-header {
  display: flex;
  align-items: center;
  gap: 0.5rem; 
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.75rem; 
  text-transform: uppercase;
  letter-spacing: 0.1em; 
  margin-bottom: 1.5rem; 
}

.toc-nav-container {
  max-height: 50vh;
  overflow-y: auto;
}

.toc-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem; 
}

.toc-nav::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--border);
}

.toc-link {
  display: block;
  text-align: left;
  font-size: 0.875rem; 
  color: var(--muted);
  background: none;
  border: none;
  padding-left: 1rem; 
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.toc-link:hover {
  color: var(--accent);
}

.toc-link.active {
  color: var(--accent);
}

.toc-link.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--accent);
}

.scroll-top-btn {
  margin-top: 3rem; 
  display: flex;
  align-items: center;
  gap: 0.5rem; 
  color: var(--muted);
  background: none;
  border: none;
  font-family: var(--font-mono);
  font-size: 0.75rem; 
  text-transform: uppercase;
  letter-spacing: 0.1em; 
  cursor: pointer;
  transition: color 0.2s ease;
}

.scroll-top-btn:hover {
  color: var(--accent);
}

.scroll-top-icon {
  transform: rotate(90deg); 
}

.error-title {
  font-size: 2.25rem; 
  font-weight: bold;
  margin-bottom: 1.5rem; 
}

.error-back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem; 
  color: var(--accent);
  background: none;
  border: none;
  font-family: var(--font-mono);
  font-size: 1rem; 
  cursor: pointer;
  transition: color 0.2s ease;
}

.error-back-btn:hover {
  color: var(--fg);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
