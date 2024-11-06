<script setup>
import Navbar from "./UI/Navbar.vue";
import Footer from "./components/Footer.vue";
import { ref, provide, watch} from "vue";

const idArray = ref([]);

function updateIdArray(newArray) {
  idArray.value = [...newArray];
}

provide('idArray', {idArray, updateIdArray});

// watch(idArray, async( newVal, oldVal)=> {
//   console.log('Updating idArray');
//   console.log(oldVal, newVal);
// })

</script>

<template>
  <Navbar />
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped></style>
