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
  } else if (amount.value < len) {
    return "blur-one";
  } else {
    return "blur-two";
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

    <!-- <Transition mode="out-in" name="swap">
      <div class="hint" v-if="hintText === 'Click me!'">Click me!</div>
      <div class="hint" v-else-if="hintText === 'Almost there!'">
        Almost there!
      </div>
      <div class="hint last" v-else-if="hintText === 'Good job!'">
        Good job!
      </div>
    </Transition> -->
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

.hint {
  font-weight: 700;
  font-size: 1.8em;
  margin: 0 auto;
}

.last {
  color: gold;
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
}

button > div {
  font-size: 1.4em;
}

.clicked {
  background-color: var(--main-backg);
  box-shadow: inset 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.35);
}

.bun > * {
  filter: blur(8px);
  transition: all 0.5s;
}

.bun > .blur-one {
  filter: blur(4px);
}

.bun > .blur-two {
  filter: blur(0);
}

img {
  height: 2.8em;
  max-height: 100%;
}

@media screen and (min-width: 992px) {
  .main-wrap {
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>
