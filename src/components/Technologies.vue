<script setup lang="ts">
import { ref } from "vue";

interface tech {
  name: string;
  img: string;
}

const props = defineProps<{ tech: tech[]; len: number }>();

const amount = ref(0);

function handle(event: Event) {
  if (!(event.target as Element)?.classList.contains("clicked")) {
    (event.target as Element)?.classList.add("clicked");
    amount.value++;
  }
}
</script>

<template>
  <div v-for="item in tech">
    <button @click="handle">{{ item.name }}</button>
  </div>
  <div>{{ amount }}</div>
</template>

<style>
button {
  width: 50px;
  height: 25px;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.15);
  background-color: #fafafa;
  border: none;
  transition: background-color box-shadow 450ms;
  border-radius: 10px;
}

.clicked {
  background-color: var(--backg-white);
  /* border: 1px solid var(--text-dark); */
  box-shadow: inset 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.15);
}
</style>
