<script setup lang="ts">
import { reactive, computed } from 'vue'
import Digit from './Digit.vue'
// import CountdownTimer from '../../../js/utils/countdownTimer'

// defineProps<{
//   tick: number
// }>()

const props = withDefaults(
  defineProps<{
    duration: number // milliseconds
  }>(), {
    duration: 5000,
  })

const state = reactive({
  // timer: new CountdownTimer(props.duration),
  // tick: props.duration,
})

// function toggleClickHandler() {
//   state.tick -= 1000
// }

// function startClickHandler() {
//   state.timer.start()
// }

// function stopClickHandler() {
//   state.timer.stop()
// }

// function pauseClickHandler() {
//   state.timer.pause()
// }

// function resumeClickHandler() {
//   state.timer.resume()
// }

// function resetClickHandler() {
//   state.timer.reset()
// }

const time = computed(() => {
  // const myTuple: [hours: number, minutes: number, seconds: number] = [1,2,3]

  return {
    milliseconds: Math.trunc(( props.duration % 1000) * 0.1),
    seconds: Math.trunc( props.duration / 1000) % 60,
    minutes: Math.trunc(( props.duration / 1000) / 60) % 60, // ((milliseconds / (1000*60)) % 60);
    hours: Math.trunc(( props.duration / 1000) / 3600) // ((milliseconds / (1000*60*60)) % 24);
  }
})

function tens(n: number) {
  return Math.trunc(n/10)
}

function units(n: number) {
  return n % 10
}
</script>

<template>
  <div class="ui__countdown">
    <div class="dials">
      <Digit :value="tens(time.hours)" />
      <Digit :value="units(time.hours)" />
      
      <Digit :value="tens(time.minutes)" />
      <Digit :value="units(time.minutes)" />
      
      <Digit :value="tens(time.seconds)" />
      <Digit :value="units(time.seconds)" />
    </div>

    <div>
      <ul class="text-[14px] flex justify-between gap-4 my-4">
        <li>{{ props.duration }}</li>
        <!-- <li>{{ state.tick }}</li> -->
        <li>{{ `${time.hours}`.padStart(2, '0') }} : {{ `${time.minutes}`.padStart(2, '0') }} : {{ `${time.seconds}`.padStart(2, '0') }} : {{ `${time.milliseconds}`.padStart(2, '0') }}</li>
      </ul>

      <!-- <p>
        <button class="bg-[rgb(186,17,133)] hover:bg-cyan-600 rounded-sm text-sm text-white flex items-center justify-between px-6 py-2 my-4" @click="toggleClickHandler">Toggle</button>
      </p> -->

      <!-- <p class="flex gap-4 my-4">
        <button class="bg-[rgb(186,17,133)] hover:bg-cyan-600 rounded-sm text-white text-sm flex items-center justify-between px-6 py-2" @click="startClickHandler">Start</button>
        <button class="bg-[rgb(186,17,133)] hover:bg-cyan-600 rounded-sm text-white text-sm flex items-center justify-between px-6 py-2" @click="stopClickHandler">Stop</button>
        <button class="bg-black hover:bg-cyan-600 rounded-sm text-white text-sm flex items-center justify-between px-6 py-2" @click="pauseClickHandler">Pause</button>
        <button class="bg-black hover:bg-cyan-600 rounded-sm text-white text-sm flex items-center justify-between px-6 py-2" @click="resumeClickHandler">Resume</button>
        <button class="bg-black hover:bg-cyan-600 rounded-sm text-white text-sm flex items-center justify-between px-6 py-2" @click="resetClickHandler">Reset</button>
      </p> -->
    </div>
  </div>
</template>

<style scoped>
.dials {
  font-size: inherit;
  line-height: 1;
  display: flex;
  /* gap: 20px; */
  gap: 10px;
}

.ui__digit:nth-last-child(even):not(:first-child) {
/* & > div:nth-last-child(even):not(:first-child) { */
  display: inline-flex;
  /* gap: 20px; */
  gap: 10px;
  align-items: center;
}

.ui__digit:nth-last-child(even):not(:first-child):before {
  content: ':';
  font-size: inherit;
  line-height: 1;
  display: inline-block;
}
</style>
