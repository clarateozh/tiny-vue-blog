<template>
  <div id="error" v-show="isVisible">
    <slot>
      <router-link to="/entries">
        <p>404 - Page not Found.</p>
        <p>Return to main blog page.</p>
      </router-link>
    </slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isVisible: false
    }
  },

  mounted(){
  // Adding a slight delay so that the 404 component
  // does not pop up at the beginning of every blog detailed/list page load.
  // Retrieval of entry from Firestore takes some time.
  setTimeout(()=> {
    this.isVisible = true;
  }, 500)
}
}
</script>

<style lang="postcss" scoped>
#error {
  @apply text-lg text-center mx-auto w-fit p-10 rounded-lg bg-slate-800 text-white;
}
</style>
