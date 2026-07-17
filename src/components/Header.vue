<template>
  <header 
    class="app-header"
    :class="{ 'scrolled-header': isScrolled || isMobileMenuOpen }"
  >
    <div 
      class="header-container"
      :class="{ 'scrolled-container': isScrolled }"
    >
      <router-link 
        to="/"
        class="logo-link"
      >
        <div class="logo-icon-wrapper">
          <div class="logo-bg-accent" />
          <div class="logo-bg-fg" />
          <Terminal :size="20" class="logo-terminal-icon" />
        </div>
        <div class="logo-text">
          <span class="logo-primary">{{ websiteConfig.logo.primary }}</span>
          <span class="logo-secondary">{{ websiteConfig.logo.secondary }}</span>
        </div>
      </router-link>
      
      <nav class="nav-menu">
        <div class="nav-links">
          <router-link 
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ active: route.path === link.path }"
          >
            {{ link.label }}
          </router-link>
        </div>
        
        <div class="nav-divider" />
        
        <div class="nav-actions">
          <button 
            @click="emit('toggle-theme')"
            class="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            <Sun :size="18" v-if="theme === 'dark'" />
            <Moon :size="18" v-else />
          </button>

          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="menu-toggle-btn"
            aria-label="Toggle menu"
          >
            <X :size="22" v-if="isMobileMenuOpen" />
            <Menu :size="22" v-else />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="expand">
      <div
        v-if="isMobileMenuOpen"
        class="mobile-menu"
      >
        <div class="mobile-menu-container">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="mobile-nav-link"
            :class="{ active: route.path === link.path }"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { websiteConfig } from '@/src/config';
import { useRoute } from 'vue-router';
import { Terminal, Sun, Moon, Menu, X } from 'lucide-vue-next';
import pageRoutes from '@/src/router/page';

const navLinks = pageRoutes
  .filter(route => route.meta && route.meta.isMenu)
  .map(route => ({
    path: route.path,
    label: route.meta.title
  }));

const props = defineProps({
  theme: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['toggle-theme']);

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const route = useRoute();

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};


watch(() => route.path, () => {
  isMobileMenuOpen.value = false;
});



onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.5s ease;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.app-header.scrolled-header {
  border-bottom: 1px solid var(--border);
  background-color: var(--header-bg);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  padding-top: 0;
  padding-bottom: 0;
}

.header-container {
  max-width: 56rem; 
  margin: 0 auto;
  padding: 0 1.5rem; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease;
  height: 4rem; 
}

@media (min-width: 768px) {
  .header-container {
    height: 5rem; 
  }
}

.header-container.scrolled-container {
  height: 3.5rem; 
}

@media (min-width: 768px) {
  .header-container.scrolled-container {
    height: 4rem; 
  }
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem; 
  text-decoration: none;
  position: relative;
  z-index: 50;
  transition: opacity 0.2s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-icon-wrapper {
  position: relative;
  width: 2.25rem; 
  height: 2.25rem; 
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-bg-accent {
  position: absolute;
  inset: 0;
  background-color: var(--accent);
  border-radius: 0.5rem; 
  transform: rotate(3deg);
  transition: transform 0.3s ease;
}

.logo-link:hover .logo-bg-accent {
  transform: rotate(16deg);
}

.logo-bg-fg {
  position: absolute;
  inset: 0;
  background-color: var(--fg);
  border-radius: 0.5rem; 
  transform: rotate(-3deg);
  transition: transform 0.3s ease;
}

.logo-link:hover .logo-bg-fg {
  transform: rotate(3deg);
}

.logo-terminal-icon {
  position: relative;
  z-index: 10;
  color: var(--bg);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  color: var(--fg);
}

.logo-primary {
  font-family: var(--font-mono);
  font-weight: 900;
  letter-spacing: -0.05em; 
  font-size: 1.25rem; 
  text-transform: uppercase;
  font-style: italic;
}

.logo-secondary {
  font-size: 0.75rem; 
  font-family: var(--font-mono);
  color: var(--accent);
  font-weight: bold;
  letter-spacing: 0.2em; 
  text-transform: uppercase;
  margin-left: 0.125rem; 
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem; 
}

@media (min-width: 768px) {
  .nav-menu {
    gap: 2rem; 
  }
}

.nav-links {
  display: none;
}

@media (min-width: 1024px) {
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem; 
    font-size: 0.875rem; 
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em; 
    color: var(--muted);
  }
}

.nav-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent);
}

.nav-divider {
  display: none;
}

@media (min-width: 1024px) {
  .nav-divider {
    display: block;
    height: 1rem; 
    width: 1px;
    background-color: var(--border);
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem; 
  color: var(--muted);
  position: relative;
  z-index: 50;
}

@media (min-width: 768px) {
  .nav-actions {
    gap: 1rem; 
  }
}



.theme-toggle-btn,
.menu-toggle-btn {
  height: 2.5rem; 
  width: 2.5rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem; 
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  transition: all 0.2s ease;
}

.theme-toggle-btn:hover,
.menu-toggle-btn:hover {
  background-color: rgba(0, 255, 156, 0.1);
  color: var(--accent);
}

@media (min-width: 1024px) {
  .menu-toggle-btn {
    display: none;
  }
}

.mobile-menu {
  border-top: 1px solid var(--border);
  background-color: var(--mobile-menu-bg);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

@media (min-width: 1024px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-menu-container {
  padding: 2rem 1.5rem; 
  display: flex;
  flex-direction: column;
  gap: 1.5rem; 
}



.mobile-nav-link {
  font-size: 1.5rem; 
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: -0.05em; 
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease;
  color: var(--muted);
}

.mobile-nav-link:hover {
  padding-left: 1rem;
  color: var(--accent);
}

.mobile-nav-link.active {
  color: var(--accent);
}




.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.25s ease;
  max-height: 400px;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
