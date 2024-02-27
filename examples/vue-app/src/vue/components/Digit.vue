<script setup lang="ts">
import { reactive, watch } from 'vue'

const prop = defineProps<{
  value: number
}>()

const state = reactive({
  toggle: true,
  previousValue: 0,
})

async function onDigitAfterLeave() {
  state.toggle = true
}

watch(() => prop.value, (newValue, oldValue) => {
  state.previousValue = oldValue
  if(newValue !== oldValue) state.toggle = false
})
</script>

<template>
  <div class="ui__digit">
    <div>
      <!-- DEVNOTE: Modulus operand is enforced as a guard to safeguard single-digit usage -->
      <div class="digit" :data-before="Math.abs(prop.value % 10)" :data-after="Math.abs(state.previousValue % 10)">
        <Transition name="card-top">
          <!-- DEVNOTE: alternative to using v-if with v-show; no pitfalls for doing it this way either -->
          <div class="card card-top" v-show="state.toggle">
            {{ state.toggle ? Math.abs(prop.value % 10) : Math.abs(state.previousValue % 10) }}
          </div>

          <!-- DEVNOTE: here I exploit v-if and the mechanic of injecting into the dom before the reactivity can effect a repaint to cache the previous value and update with a fresh paint after the transition. This avoids having to otherwise manage and orchestrate with logic and removes other potential overheads such as rolling over zero between base-10 and base-6(which would otherwise need to be handled), and by limiting the control logic and the component functionally pure(you feed a prop in and the same prop output pops out) it can handle incrementing and decrementing values without intervention;
          although a v-if is more expensive than a v-show. I feel the advantages + development experience outweigh the cost + there is a reduced logic footprint so less to execute so you're getting some return -->
          <!-- <div class="card card-top" v-if="state.toggle">{{ Math.abs(prop.value % 10) }}</div> -->
        </Transition>

        <Transition name="card-bottom" @after-leave="onDigitAfterLeave">
          <div class="card card-bottom" v-show="state.toggle">
            {{ Math.abs(prop.value % 10) }}
          </div> 
        </Transition>
      </div>

      <!-- <div>
        <p className="text-xs mt-12">toggle: {{ JSON.stringify(state.toggle) }}</p>
        <p className="text-xs">previousValue: {{ JSON.stringify(state.previousValue) }}</p>
      </div> -->
    </div>
  </div>
</template>

<style scoped>  
  .digit {
    background-color: #f2f1ed;
    box-shadow: 0 2px 8px 0 rgb(0, 0, 0, 0.4);
    border-radius: 0.07em;
    font-family: 'Roboto Mono', monospace;
    color: #de4848;
    font-size: inherit;
    line-height: 1;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 50% 50%;
    justify-content: center;
    position: relative;
    perspective: 400px;
  }

  .digit:before {
    content: attr(data-before);
    border-radius: 0.075em 0.075em 0 0;
    border-top: 1px solid #cebbbb;
    border-bottom: 1px solid #ccc7c7;
    background-color: #ddd3d3;
    grid-column: 1 / span 1;
    grid-row: 1 / 2;
    height: 0.5em;
    display: flex;
    align-items: flex-start;
    padding: 0 0.2em 0 0.2em;
    overflow: hidden;

    position: relative;
    /* bottom: 40px; */
    /* background: yellow; */
  }

  .digit:after {
    content: attr(data-after);
    border-radius: 0 0 0.075em 0.075em;
    border-bottom: 1px solid #c6b6b6;
    background-color: #fff;
    grid-column: 1 / span 1;
    grid-row: 2 / 3;
    height: 0.5em;
    display: flex;
    align-items: flex-end;
    padding: 0 0.2em 0 0.2em;
    overflow: hidden;

    position: relative;
    /* top: 40px; */
    /* background: yellow; */
  }

  .card {
    display: flex;
    height: 0.5em;
    padding: 0 0.2em 0 0.2em;
    overflow: hidden;
  }

  .card-top {
    border-radius: 0.075em 0.075em 0 0;
    border-top: 1px solid #ccb8b8;
    border-bottom: 1px solid #ccc7c7;
    background-color: #ddd3d3;
    grid-column: 1 / span 1;
    grid-row: 1 / 2;
    align-items: flex-start;
    transform-origin: bottom;
    transform-style: preserve-3d;
    z-index: 1;
  }

  .card-bottom {
    border-radius: 0 0 0.075em 0.075em;
    border-bottom: 1px solid #c0b0b0;
    background-color: #fff;
    grid-column: 1 / span 1;
    grid-row: 2 / 3;
    align-items: flex-end;
    transform-origin: top;
    z-index: 1;
  }

  .card-top-leave-active {
    transition: transform 300ms ease-in;
  }

  .card-top-leave-from {
    transform: rotateX(0deg);
  }

  .card-top-leave-to {
    transform: rotateX(-90deg);
  }

  .card-bottom-leave-active {
    transition: transform 300ms ease-out 300ms;
  }

  .card-bottom-leave-from {
    transform: rotateX(90deg);
  }

  .card-bottom-leave-to {
    transform: rotateX(0deg);
  }
</style>
