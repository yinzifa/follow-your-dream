<template>
  <router-view></router-view>
</template>

<script>
import { useRouter,useRoute } from "vue-router"
import axios from './utils/axios';
import { provide } from "vue";

export default {
  name: 'App',
  setup() {
    provide('$axios',axios);
    provide('$router',useRouter());
    provide('$route',useRoute());
  }
}
</script>

<style>
html,body {
  height: 100%;
  width: 100%;
}
#app {
  width: inherit;
  height: inherit;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
