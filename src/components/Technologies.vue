<script setup lang="ts">
import { computed, ref, toRefs } from "vue";

interface tech {
  name: string;
  img: string;
}

const props = defineProps<{ tech: tech[] }>();
const { tech } = toRefs(props);
const len = tech.value.length;

const amount = ref(0);
const btnRefs = ref([]);

const hintText = computed(() => {
  if (amount.value == 0) {
    return "Click me!";
  } else if (amount.value < len) {
    return "Almost there!";
  } else {
    return "Good job!";
  }
});

function handle(event: Event) {
  if (!(event.target as Element)?.classList.contains("clicked")) {
    (event.target as Element)?.classList.add("clicked");
    amount.value++;
    if (amount.value % len == 0) {
      btnRefs.value.forEach((btn: Element) => {
        btn.classList.remove("clicked");
      });
    }
  }
}
</script>

<template>
  <div>
    <button v-for="item in tech" @click="handle" ref="btnRefs">
      {{ item.name }}
    </button>
    <div>{{ hintText }}</div>
  </div>
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
  box-shadow: inset 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.15);
}
</style>
