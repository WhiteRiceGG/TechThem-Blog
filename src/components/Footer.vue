<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-info">
        <router-link to="/" class="footer-title">{{ websiteConfig.title }}</router-link>
        <p class="footer-copyright">© {{ websiteConfig.copyrightYear }} {{ websiteConfig.author }}. All rights reserved.</p>
        <a 
          :href="websiteConfig.icpLink" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="footer-beian"
        >
          {{ websiteConfig.icp }}
        </a>
      </div>
      
      <div class="footer-links">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path" 
          class="footer-link"
        >
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { websiteConfig } from '@/src/config';
import pageRoutes from '@/src/router/page';

const navLinks = pageRoutes
  .filter(route => route.meta && route.meta.isMenu)
  .map(route => ({
    path: route.path,
    label: route.meta.title
  }));
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 3rem 0; 
  margin-top: 5rem; 
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.footer-container {
  max-width: 56rem; 
  margin: 0 auto;
  padding: 0 1.5rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; 
}

@media (min-width: 768px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-info {
  text-align: center;
}

@media (min-width: 768px) {
  .footer-info {
    text-align: left;
  }
}

.footer-title {
  font-family: var(--font-mono);
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  margin-bottom: 0.25rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  transition: color 0.2s ease;
}

.footer-title:hover {
  color: var(--accent);
}


.footer-copyright {
  color: var(--muted);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.footer-beian {
  color: rgba(113, 113, 122, 0.6);
  font-size: 0.75rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-beian:hover {
  color: var(--accent);
}

.footer-links {
  display: flex;
  gap: 2rem; 
  font-size: 0.875rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-link {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--accent);
}
</style>
