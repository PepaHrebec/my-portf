<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";

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
  if (!(event.currentTarget as Element)?.classList.contains("clicked")) {
    (event.currentTarget as Element)?.classList.add("clicked");
    amount.value++;
  }
}

watch(amount, (curr) => {
  if (curr % len == 0) {
    btnRefs.value.forEach((btn: Element) => {
      btn.classList.remove("clicked");
    });
  }
});
</script>

<template>
  <div>
    <div class="button-wrap">
      <button v-for="item in tech" @click="handle" ref="btnRefs">
        <img :src="item.img" alt="Tech logo" />
        <div>{{ item.name }}</div>
      </button>
    </div>
    <div>{{ hintText }}</div>
  </div>
</template>

<style scoped>
.button-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

button {
  min-width: fit-content;
  height: 4em;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.15);
  background-color: var(--interact-white);
  border: none;
  transition: all 450ms;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0.5em 1em;
  flex: 1;
}

button > div {
  font-size: 1.4em;
}

.clicked {
  background-color: var(--backg-white);
  box-shadow: inset 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.35);
}

img {
  height: 2.8em;
}
</style>
