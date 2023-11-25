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
    return "";
  } else if (amount.value < Math.floor(len / 3)) {
    return "blur-one";
  } else if (amount.value < Math.floor(len / 3) * 2) {
    return "blur-two";
  } else if (amount.value < len) {
    return "blur-three";
  } else {
    return "blur-four";
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
  <div class="main-wrap">
    <div class="button-wrap">
      <button v-for="item in tech" @click="handle" ref="btnRefs">
        <img :src="item.img" alt="Tech logo" />
        <div>{{ item.name }}</div>
      </button>
      <button class="bun">
        <img :class="hintText" src="/assets/bun.png" alt="Tech logo" />
        <div :class="hintText">Bun?</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.swap-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
.main-wrap {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
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
  background-color: var(--interactive-backg);
  color: var(--main-text);
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
  cursor: pointer;
}

button > div {
  font-size: 1.4em;
}

.clicked {
  background-color: var(--main-backg);
  box-shadow: inset 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.35);
}

.bun {
  cursor: default;
}

.bun > * {
  filter: blur(9px);
  transition: all 0.5s;
}

.bun > .blur-one {
  filter: blur(6px);
}

.bun > .blur-two {
  filter: blur(4px);
}

.bun > .blur-three {
  filter: blur(2px);
}

.bun > .blur-four {
  filter: blur(0px);
}

img {
  height: 2.8em;
  max-height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
}

@media screen and (min-width: 48rem) {
  .main-wrap {
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>
