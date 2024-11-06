<template>
  <div id="container">
    <form @submit.prevent="onSubmit">
      <div id="section">
        <div id="section">
          <label for="author">Author</label>
          <span>{{ currentUser.email }}</span>
          <span><button type="button" id="logout" @click="onLogOut">Log Out</button></span>
        </div>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter Title"
          size="100"
          v-model="title"
          required />
      </div>
      <div id="section">
        <label for="content">Content</label>
        <textarea
          id="content"
          placeholder="Double newlines for new paragraph. Begin with # for sub-heading."
          cols="102"
          rows="10"
          v-model="content"
          required></textarea>
      </div>
      <div id="section">
        <label for="keywords">Keywords</label>

        <input
          type="text"
          id="keywords"
          placeholder="keyword1,keyword2 (separated by commas)"
          size="100"
          v-model="keywords"
          required />
      </div>
      <div id="section">
        <label for="image">Image URL</label>

        <input
          type="url"
          id="image"
          placeholder="URL"
          size="100"
          v-model="image"
          required />
      </div>
      <div id="section">
        <label for="content">Entry ID</label>
        <input
          type="text"
          id="entryid"
          placeholder="Max 20 characters, no spaces"
          size="100"
          maxlength="20"
          v-model="entryid"
          required />
      </div>
      <div id="actions">
        <button @click="resetForm">Reset</button>
        <button type="submit">Create Entry</button>
      </div>
      <div v-if="submitClicked" id="info">
        New blog entry created. Redirecting to main page...
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Timestamp } from "firebase/firestore";
import { createBlogEntry } from "../util/accessDB";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import { logout } from "../util/auth";

const title = ref("");
const content = ref("");
const keywords = ref("");
const image = ref("");
const entryid = ref("");

const submitClicked = ref(false);

const router = useRouter();
const auth = getAuth();
const currentUser = ref(auth.currentUser);

function onSubmit() {
  submitClicked.value = true;

  const keyArray = keywords.value.split(",");
  const contentArray = content.value.split("\n\n");
  const entryObj = {
    title: title.value,
    content: contentArray,
    keywords: keyArray,
    image: image.value,
    created: Timestamp.now(),
  };
  createBlogEntry(entryid.value, entryObj);
  router.push({ name: "blog-entries" });
}

// HTML native reset button did not work as expected,
// so here is a reset function
function resetForm() {
  title.value = "";
  content.value = "";
  keywords.value = "";
  image.value = "";
  entryid.value = "";
}

function onLogOut(){
  logout().then((result) => {
    if (result.success) {
      router.push({name: 'login'})
    } else {
      console.error(result.errorMsg)
    }
  });
}

onBeforeRouteLeave((to, from, next) => {
  if (
    !submitClicked.value &&
    (title.value ||
      content.value ||
      keywords.value ||
      image.value ||
      entryid.value)
  ) {
    const userWantsToLeave = confirm("Are you sure? You have unsaved changes!");
    next(userWantsToLeave);
  } else if (submitClicked.value) {
    setTimeout(() => {
      submitClicked.value = false;
      next();
    }, 2000);
  } else {
    next();
  }
});

// ---------------------------------------------------
// FOR TESTING: Hook to load default data from file
// import { DEFAULT_ENTRY } from "../util/defaultData";
// import { onMounted} from "vue";

// onMounted(() => {
//   title.value = DEFAULT_ENTRY.title;
//   content.value = DEFAULT_ENTRY.content;
//   keywords.value = DEFAULT_ENTRY.keywords;
//   image.value = DEFAULT_ENTRY.image;
//   entryid.value = DEFAULT_ENTRY.entryid;
// });
// ---------------------------------------------------
</script>

<style lang="postcss" scoped>
#container {
  @apply w-full max-w-fit mx-auto;
}

form {
  @apply bg-slate-200 shadow-lg shadow-black rounded px-8 pt-6 pb-8 mb-4;
}

input,
textarea {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-600;
}

button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none;
}

label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

#actions {
  @apply flex items-center justify-around;
}

#section {
  @apply mb-4;
}

#info {
  @apply text-lg text-center mt-3 p-3 rounded-lg bg-slate-600 text-white animate-pulse;
}

span {
  @apply mr-3;
}

#logout {
  @apply bg-red-500;
}
</style>
