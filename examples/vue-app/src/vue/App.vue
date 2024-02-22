<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Countdown from './components/Countdown.vue'
import CountdownTimer, { foobar } from '@brincat/core'

const count = ref(0)
const state = reactive({
  countdownTimer: new CountdownTimer(60000),
})

onMounted(() => state.countdownTimer.start())
onUnmounted(() => state.countdownTimer.stop())
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="../svg/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Vue Boilerplate" />
    </div>
  </header>

  <main>
    <h1 class="my-4">{{ state.countdownTimer.tick }}</h1>
    
    <Countdown class="my-4" :tick="state.countdownTimer.tick" />
    
    <h2 class="my-4">{{ foobar }}</h2>

    <p class="my-4">
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
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #54fda6a0);
}

@media (prefers-reduced-motion: no-preference) {
  .logo {
    animation: logo-spin infinite 20s linear;
  }
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
}

button {
  border: 2px solid white;
  border-radius: 6px;
  padding: 0.5em 1em;
}

@keyframes logo-spin {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}
</style>
