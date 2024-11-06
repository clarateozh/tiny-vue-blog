<template>
  <div id="container" key="createForm">
    <form @submit.prevent="onLogin">
      <div id="section">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="email@email.com"
          autocomplete="username"
          size="100"
          v-model="email"
          required />
      </div>
      <div id="section">
        <label for="password">Password</label>

        <input
          type="password"
          id="password"
          size="100"
          v-model="password"
          autocomplete="current-password"
          required />
      </div>
      <div id="actions">
        <button type="submit">Log In</button>
      </div>
      <div v-if="error" id="error">
        Log In Error: {{ error }} Please try again.
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../util/auth";

const router = useRouter();
const email = ref("admin@admin.com");
const password = ref("admin1234");
const error = ref();

function onLogin() {
  login(email.value, password.value).then((result) => {
    if (result.success) {
      error.value = "";
      router.push({ name: "create-entry" });
    } else {
      error.value = result.errorMsg;
    }
  });
}
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

#error {
  @apply font-mono text-red-700 text-sm text-center mt-5 border-2 border-red-700 p-1 bg-red-200 rounded-md;
}
</style>
