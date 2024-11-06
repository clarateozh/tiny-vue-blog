<template>
  <div class="max-w-sm rounded-lg overflow-hidden shadow-xl border-2 hover:shadow-2xl hover:shadow-black">
    <img class="w-full h-52 object-cover" :src="image" :alt="title" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 line-clamp-1">{{title}}</div>
      <p class="text-gray-700 text-base line-clamp-4">
        {{content}}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
    <span v-for="item in hashtag" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{{ item }}</span>
  </div>
  </div>
</template>

<script >

export default {
    props: ['title', 'image', 'content', 'hashtag']
}

</script>


