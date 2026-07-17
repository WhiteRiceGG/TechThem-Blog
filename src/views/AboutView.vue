<template>
  <div class="about-container">
    <div class="profile-header">
      <div class="avatar-ring">
        <div class="avatar-content">
           <User :size="64" class="avatar-icon" />
        </div>
      </div>
      <h1 class="profile-name">{{ websiteConfig.author }}</h1>
      <p class="profile-title">全栈开发人员 & 设计师</p>
    </div>

    <div class="about-content">
      <section class="content-section">
        <h2 class="section-title">
          <Code :size="24" class="title-icon" /> 我是谁
        </h2>
        <p class="about-text">
          我是一名充满热情的开发者，深爱着极简主义和高性能技术。
          我相信最好的软件不仅功能强大，而且美观直观。
          我的工作专注于创造简洁、快速且有意义的数字体验。
        </p>
      </section>

      <section class="grid-layout">
        <div class="card glass-card">
          <h3 class="card-title">
            <Globe :size="18" class="title-icon" /> 使命
          </h3>
          <p class="card-text">
            一次一个像素地简化网络。在我接触的每一个项目中减少噪音并放大信号。
          </p>
        </div>
        <div class="card glass-card">
          <h3 class="card-title">
            <Coffee :size="18" class="title-icon" /> 热情
          </h3>
          <p class="card-text">
            当我不写代码时，你会发现我在探索极简主义建筑，冲泡精品咖啡，或者在山间徒步。
          </p>
        </div>
      </section>

      <section class="content-section">
        <h2 class="section-title">
          <Heart :size="24" class="title-icon" /> 技术栈
        </h2>
        <div class="tech-tags">
          <span 
            v-for="tech in techStack"
            :key="tech"
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>
      </section>

      <div class="cta-section">
        <p class="quote">“简洁是终极的复杂。” —— 列奥纳多·达·芬奇</p>
        <button class="cta-button">
          让我们开始合作
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Code, Globe, Coffee, Heart } from 'lucide-vue-next';
import { websiteConfig } from '@/src/config';

const techStack = [
  "Vue 3",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Next.js",
  "PostgreSQL",
  "Docker"
];
</script>

<style scoped>
.about-container {
  max-width: 48rem; /* max-w-3xl */
  margin: 0 auto;
  padding: 3rem 1.5rem; /* py-12 px-6 */
}

.profile-header {
  text-align: center;
  margin-bottom: 4rem; /* mb-16 */
}

.avatar-ring {
  width: 8rem; /* w-32 */
  height: 8rem; /* h-32 */
  margin: 0 auto 1.5rem auto; /* mx-auto mb-6 */
  border-radius: 50%;
  background: linear-gradient(to bottom right, var(--accent), var(--border));
  padding: 0.25rem; /* p-1 */
}

.avatar-content {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-icon {
  color: var(--accent);
  opacity: 0.5;
}

.profile-name {
  font-size: 2.25rem; /* text-4xl */
  font-weight: bold;
  margin-bottom: 0.5rem; /* mb-2 */
}

.profile-title {
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 1rem; /* text-base */
  text-transform: uppercase;
  letter-spacing: 0.2em; /* tracking-[0.2em] */
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem; /* space-y-12 */
}

.content-section {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: bold;
  margin-bottom: 1rem; /* mb-4 (or mb-6) */
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
}

.title-icon {
  color: var(--accent);
}

.about-text {
  color: var(--fg-secondary);
  line-height: 1.625; /* leading-relaxed */
  font-size: 1rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; /* gap-6 */
}

@media (min-width: 768px) {
  .grid-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.card {
  padding: 1.5rem; /* p-6 */
  border-radius: 1rem; /* rounded-2xl */
}

.card-title {
  font-weight: bold;
  margin-bottom: 0.75rem; /* mb-3 */
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
}

.card-text {
  font-size: 1rem; /* text-base */
  color: var(--fg-secondary);
  line-height: 1.5;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem; /* gap-3 */
}

.tech-tag {
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.5rem; /* rounded-lg */
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 1rem; /* text-base */
  font-family: var(--font-mono);
}

.cta-section {
  padding-top: 3rem; /* pt-12 */
  border-top: 1px solid var(--border);
  text-align: center;
}

.quote {
  color: var(--fg-secondary);
  font-size: 1rem; /* text-base */
  margin-bottom: 1.5rem; /* mb-6 */
  font-style: italic;
}

.cta-button {
  background-color: var(--accent);
  color: #000000;
  padding: 0.75rem 2rem; /* px-8 py-3 */
  border-radius: 9999px; /* rounded-full */
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.cta-button:hover {
  transform: scale(1.05); /* hover:scale-105 */
}
</style>
