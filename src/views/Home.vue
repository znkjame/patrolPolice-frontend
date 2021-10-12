<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <map-loader></map-loader>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import MapLoader from '../components/Maps/MapLoader.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MapLoader
  },
}
</script>
