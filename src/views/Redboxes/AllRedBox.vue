<template>
  <div>
      <map-loader
        :RedBoxes="allRedBoxes"
      >
      <!-- <map-loader> -->
      </map-loader>
  </div>
</template>

<script>
import MapLoader from '../../components/Maps/MapLoader.vue'
import RedBoxesService from '../../services/RedBox'
export default {
 components: {
        MapLoader
  },
  data(){
      return {
          allRedBoxes:""
      }
  },
  methods:{
      async fetchAllRedBox(){
          let res = await RedBoxesService.getAllRedBoxes();
          // console.log(res);
          this.allRedBoxes = res.redBoxes
          // console.log(this.allRedBoxes);
      }
  },
   created(){
     this.fetchAllRedBox();
     console.log(process.env.VUE_APP_VARIABLE);
     console.log(process.env.VUE_APP_SHOP_ENDPOINT);
  }
}
</script>

<style>


</style>