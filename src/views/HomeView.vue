<script setup>
import { ref } from 'vue';
let name = ref('test')

const handleClick = () => {
  console.log("🚀 ~ file: HomeView.vue:4 ~ name:", name._value)
}
</script>
<template>
  <input v-model="name" />
  <button @click="() => handleClick()">Click</button>
  {{ name }}
</template>