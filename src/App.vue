<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <!-- <Mobi :url="`http://127.0.0.1:8080/V09F3.epub`" /> -->
  <Novel :url="`http://127.0.0.1:8080/novel`" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Novel from './components/Novel.vue'
import Mobi from './components/Mobi.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Novel,
    Mobi
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
