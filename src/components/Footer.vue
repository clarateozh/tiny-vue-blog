<template>
  <footer>
    <router-link
      v-if="prevEntry"
      :to="{ name: 'detail', params: { id: prevEntry } }"
      id="otherentry"
      ><< {{ prevEntry }}</router-link
    >
    <router-link v-if="isMainPage" to="/create"
      >Create New Blog Entry</router-link
    >
    <router-link v-else to="/" id="main">Back to Main Page</router-link>

    <router-link
      v-if="nextEntry"
      :to="{ name: 'detail', params: { id: nextEntry } }"
      id="otherentry"
      >{{ nextEntry }} >></router-link
    >
  </footer>
</template>

<script setup>
import { computed, inject } from "vue";
import { useRoute } from "vue-router";

const { idArray, updateIdArray } = inject("idArray");
const route = useRoute();
const isMainPage = computed(() => {
  return route.path === "/entries";
});

const isDetailPage = computed(() => {
  return route.path.includes("/entry");
});

function currentIndex() {
  const theArray = idArray.value;
  const index = theArray.findIndex((item) => item == route.params.id);
  return index;
}

const prevEntry = computed(() => {
  if (!isDetailPage.value) return "";
  else {
    const index = currentIndex();

    if (index > 0) return idArray.value[index - 1];
    else return "";
  }
});

const nextEntry = computed(() => {
  if (!isDetailPage.value) return "";
  else {
    const index = currentIndex();

    if (index < idArray.value.length - 1) return idArray.value[index + 1];
    else return "";
  }
});
</script>

<style lang="postcss" scoped>
footer {
  @apply flex justify-around text-center text-base p-5 font-extrabold bg-gradient-to-t from-slate-400 to-white border-t-2 mt-20 gap-x-6;
}

#otherentry {
  @apply text-cyan-800 break-words text-wrap text-sm md:text-base min-w-7;
}

#main {
  @apply min-w-20
}
</style>
