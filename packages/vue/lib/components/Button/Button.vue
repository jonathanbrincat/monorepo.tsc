<script setup>
// import type { ButtonProps } from './Button.types.js'

// import './button.css'

// export default function Button({ type, text, onClickHandler }: ButtonProps): React.JSX.Element {
//   return (
    
//   )
// }

</script>

<template>
  <button type="button" :class="`button button-${type}`" @click={onClickHandler}>
    {{ text }}
  </button>
</template>

<style src="./button.css" scoped></style>
