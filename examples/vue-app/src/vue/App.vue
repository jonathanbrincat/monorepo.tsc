<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const count = ref(0)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="../svg/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Vue Boilerplate" />
    </div>
  </header>

  <main>
    <p>
      <button @click="count++">
        Count is {{ count }}
      </button>
    </p>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

main {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}

button {
  border: 2px solid white;
  border-radius: 6px;
  padding: 0.5em 1em;
}
</style>
