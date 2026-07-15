<template>
  <div class="mouse-glow-container">
    <div
      class="glow-circle glow-circle-large"
      :style="glowStyle1"
    />
    <div
      class="glow-circle glow-circle-small"
      :style="glowStyle2"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const mouseX = ref(0);
const mouseY = ref(0);
const targetX = ref(0);
const targetY = ref(0);

// Use simple spring physics animation loop for smooth trailing
let animationFrameId;

const updatePosition = () => {
  const dx = targetX.value - mouseX.value;
  const dy = targetY.value - mouseY.value;
  
  mouseX.value += dx * 0.1; // Spring factor
  mouseY.value += dy * 0.1;
  
  animationFrameId = requestAnimationFrame(updatePosition);
};

const handleMouseMove = (e) => {
  targetX.value = e.clientX;
  targetY.value = e.clientY;
};

const glowStyle1 = computed(() => ({
  left: `${mouseX.value}px`,
  top: `${mouseY.value}px`,
  transform: 'translate(-50%, -50%)',
  background: 'radial-gradient(circle, var(--glow) 0%, transparent 80%)',
}));

const glowStyle2 = computed(() => ({
  left: `${mouseX.value}px`,
  top: `${mouseY.value}px`,
  transform: 'translate(-50%, -50%)',
  background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)',
  filter: 'blur(60px)',
}));

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  animationFrameId = requestAnimationFrame(updatePosition);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.mouse-glow-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
  display: none;
}

@media (min-width: 1024px) {
  .mouse-glow-container {
    display: block;
  }
}

.glow-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.glow-circle-large {
  width: 400px;
  height: 400px;
}

.glow-circle-small {
  width: 200px;
  height: 200px;
}
</style>
