import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";
import { getAuth } from "firebase/auth";

import "./style.css";
import App from "./App.vue";
import { firebaseApp } from "./firebase";
import { createRouter, createWebHistory } from "vue-router";
import EntriesList from "./components/EntriesList.vue";
import EntryDetail from "./components/EntryDetail.vue";
import NotFound from "./UI/NotFound.vue";
import CreateEntry from "./components/CreateEntry.vue";
import Login from "./components/Login.vue";

const app = createApp(App);

// FIREBASE
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
});

// ROUTES
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'root', path: "/", redirect: {name: 'blog-entries'} },
    { name: 'blog-entries', path: "/entries", component: EntriesList },
    { name: 'detail', path: "/entry/:id", component: EntryDetail, props: true },
    { name: 'create-entry', path: "/create", component: CreateEntry, meta: { requiresAuth: true} },
    { name: 'login', path: "/login", component: Login},
    { name: 'not-found', path: "/:notFound(.*)", component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

const auth = getAuth();

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !auth.currentUser){
    return {name: 'login'}
  }
})

app.use(router);
app.mount("#app");
