<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Countdown from './components/Countdown.vue'
import CountdownTimer from '@brincat/core'

const state = reactive({
  countdownTimer: new CountdownTimer(36000000),
})

onMounted(() => state.countdownTimer.start())
onUnmounted(() => state.countdownTimer.stop())
</script>

<template>
  <header class="container mx-auto flex justify-between my-8">
    <div class="flex place-items-center gap-8">
      <img class="logo block w-[110px] h-[110px]" src="../svg/logo_vue.svg" alt="Vue logo" />

      <div class="flex flex-col">
        <h1 class="title font-hero text-emerald-600 font-semibold text-6xl tracking-wide">
          FlipFlapFlop
          <!-- split-flap-clock. split-flap. split-flap-flip. flip-flap-clock. flip-flap-flop splittery-flappery-flip. flip clock. flap clock. flip-countdown. flip-count.flip-flop-goes-the-clock. flip-flop. flip-flap. flip you off. flipping the bird. flip-mode-squad. solari -->
          
          <!-- Vue Boilerplate -->
        </h1>
        <p class="text-2xl">
          Demonstration hosted in
          <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
          <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
        </p>
      </div>
    </div>

    <nav class="self-start">
      <ul class="flex gap-4">
        <li>
          <a class="inline-flex items-center" href="" target="_blank">
            <!-- <img class="block w-[25px] h-[25px]" src="../svg/logo_github.svg" alt="GitHub logo" /> -->
            <svg class="block w-[25px] h-[25px] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
              <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
            </svg>
            GitHub
          </a>
        </li>
        <li>
          <a class="inline-flex items-center" href="" target="_blank">
            <!-- <img  src="../svg/logo_npm-neutral.svg" alt="NPM logo" /> -->
            <svg class="block w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 250">
              <path fill="currentColor" d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </header>

  <main class="container mx-auto flex flex-col">
    <section>
      <p class="text-xl my-4">An elegant and fully-responsive countdown clock with simulated split-flap numeric display; also more commonly known as a flip-clock or sometimes a solari. A commonly utilised skeuomorphism for a countdown or counter in UI.</p>

      <p class="text-xl my-4">It's not the most super <sup>&#042;</sup>advanced, all-singing, all-dancing, unneccesarily over-elaborate carbuncle. But it is honest and well-engineered. Developer friendly and requires little investment to consume.</p>

      <p class="text-xl my-4">Can be used as a countdown, stopwatch or just a regular clock and each constituent runtime has been kept encapsulated from the UI to produce a headless engine for each feature. So a treatment can be consumed independent of any specific implementation. This option is omnipresent in the @core package. Nonetheless, there are prebaked packages available for the usual suspects, Vue and React.</p>

      <div class="flex justify-center my-16" style="font-size: 142px;">
        <!-- JB: this will eventually come from @brincat/vue -->
        <Countdown :duration="state.countdownTimer.tick" />
      </div>
    </section>

    <section class="flex justify-center">
<pre class="bg-black px-6 py-4 rounded-md"><code class="text-zinc-400"># NPM </code>
<code class="text-lime-400">npm install @flipflapflop/vue</code>
        
<code class="text-zinc-400"># Yarn </code>
<code class="text-lime-400">yarn add @flipflapflop/vue</code></pre>
    </section>
    
    <section>
      <h3 class="my-4">Usage</h3>
    </section>
  </main>

  <footer class="flex justify-end items-center">Authored and maintained by &copy; pix8 {{ new Date().getUTCFullYear() }}</footer>
</template>

<style scoped>
.title {
  text-shadow: -2px -2px 0 rgb(1, 99, 61), 1px -1px 0 #FFF, -1px 2px 0 #FFF, 1px 2px 0 #FFF;
}
.logo {
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

@keyframes logo-spin {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}
</style>
