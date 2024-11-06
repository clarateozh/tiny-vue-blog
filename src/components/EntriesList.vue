<template>
  <search-bar @search="onSearch" :phrase="searchPhrase"></search-bar>
  <div v-if="entryFound && searchPhrase" id="searchResults">
    Search Results for "<strong>{{ searchPhrase }}</strong
    >"
  </div>
  <ul>
    <li v-for="entry in entries">
      <router-link
        :to="{
          name: 'detail',
          params: {
            id: entry.id, 
          },
        }"
        v-if="isAMatch([entry.title, entry.id, ...entry.keywords])">
        <Card
          :title="entry.title"
          :image="entry.image"
          :content="entry.content && entry.content[0]"
          :hashtag="
            entry.keywords ? [entry.id, ...entry.keywords] : [entry.id]
          " />
      </router-link>
    </li>
  </ul>
  <div v-if="!entryFound" id="empty">
    <not-found>
      <div @click="clearSearch">
        <p>No blog entries found for the search phrase "{{ searchPhrase }}".</p>
        <p>Return to main blog page and revise your search.</p>
      </div>
    </not-found>
  </div>
</template>

<script setup>
import Card from "../UI/Card.vue";
import { useCollection } from "vuefire";
import { blogRef } from "../util/accessDB";
import SearchBar from "./SearchBar.vue";
import NotFound from "../UI/NotFound.vue";
import { ref, toRaw, watch, inject } from "vue";

const entries = useCollection(blogRef, { ssrKey: "key to eliminate warnings" });

const {idArray, updateIdArray} = inject('idArray')

watch(entries, async (newData, oldData) => {
  if (newData.length === oldData.length) return;
  const newArray = toRaw(newData).map((item) => item.id);
  updateIdArray(newArray);
});

const searchPhrase = ref("");
const entryFound = ref(false);

function onSearch(payload) {
  searchPhrase.value = payload;
  entryFound.value = false;
}

function isAMatch(arrayToCompare) {
  const isMatch = arrayToCompare
    .toString()
    .toLowerCase()
    .includes(searchPhrase.value.toLowerCase());
  if (isMatch && !entryFound.value) entryFound.value = true;
  return isMatch;
}

function clearSearch() {
  searchPhrase.value = "";
}
</script>

<style lang="postcss" scoped>
ul {
  @apply m-5 flex flex-wrap gap-5 justify-around;
}

#empty {
  @apply text-center text-xl;
}

#searchResults {
  @apply text-center text-lg bg-slate-500 text-white p-2;
}
</style>
