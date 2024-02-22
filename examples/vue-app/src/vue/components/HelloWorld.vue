<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="hello-world">
    <h1 class="heading text-emerald-600">{{ msg }}</h1>
    <h3 class="subheading">
      You've successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>

<style scoped>
.heading {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.subheading {
  font-size: 1.2rem;
}

.hello-world h1,
.hello-world h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .hello-world h1,
  .hello-world h3 {
    text-align: left;
  }
}
</style>
