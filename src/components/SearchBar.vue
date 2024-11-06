<template>
  <div>
    <input
      type="text"
      placeholder="Enter Search Phrase"
      v-model="phrase"
      size="30"
      @keyup.enter="updatePhrase" />
    <button @click="updatePhrase">Search</button>
  </div>
</template>

<script setup>
import { update } from "firebase/database";
import { ref, watch } from "vue";

const props = defineProps(["phrase"]);
const emit = defineEmits(["search"]);
const phrase = ref(props.phrase);

function updatePhrase() {
  emit("search", phrase.value);
}

watch(
  () => props.phrase,
  (newValue) => {
    phrase.value = newValue;
  }
);
</script>

<style lang="postcss" scoped>
div {
  @apply text-center mb-10;
}

input {
  @apply border-2 border-slate-500 mx-5 px-5 py-2 max-w-screen-sm;
}

button {
  @apply bg-slate-400 py-2 px-5 rounded-lg font-semibold mt-3;
}
</style>
