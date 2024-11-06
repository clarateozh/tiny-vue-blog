<template>
  <div v-if="entry">
    <router-link to="/entries"
      ><header>{{ entry.title }}</header></router-link
    >
    <div id="imageSection"><img :src="entry.image" :alt="entry.id" /></div>
    <div id="hashtag">
      <span v-for="item in entry.keywords">#{{ item }}</span>
    </div>
    <div id="date">Created on: {{ Date(entry.created) }}</div>
    <article>
      <p
        v-for="para in entry.content"
        :class="para[0] === '#' ? 'text-lg font-bold' : ''">
        {{ para[0] === "#" ? para.slice(1) : para }}
      </p>
    </article>
  </div>
  <div v-else>
    <not-found />
  </div>
</template>
Return to main blog page

<script setup>
import { useDocument } from "vuefire";
import { doc } from "firebase/firestore";
import { db } from "../util/accessDB";
import NotFound from "../UI/NotFound.vue";
import { computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const entrySource = computed(() => doc(db, "blogentries", props.id));
const entry = useDocument(entrySource);
</script>

<style lang="postcss" scoped>
article p {
  @apply m-10;
}

#imageSection {
  @apply w-screen max-h-dvh overflow-clip;
}

img {
  @apply w-full object-contain;
}

header {
  @apply top-40 md:top-60 left-0 sm:absolute w-screen bg-slate-800 bg-opacity-60 text-white shadow-2xl shadow-black text-xl md:text-3xl text-center p-1 md:p-8;
}

#date {
  @apply text-sm w-screen pr-10 text-right italic;
}

#hashtag {
  @apply px-2 md:px-20 pt-1 md:pt-4 md:pb-2 bottom-80 md:bottom-52 lg:bottom-10 right-0 sm:absolute bg-gradient-to-l from-green-900 to-transparent;
}

#hashtag span {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-xl font-semibold text-gray-700 mr-2 mb-2 shadow-xl shadow-black;
}
</style>
