<template>
  <div class="mt-10 grid justify-items-center">
    <div>
      <table>
        <tr>
          <td>
            <GmapMap
              :center="centerMap.position"
              :zoom="15"
              style="width:640px; height:360px"
            >
              <GmapMarker
                :key="index"
                v-for="(item, index) in allMarker"
                :position="item.position"
                @click="getLocationInfo(item)"
                :icon="markerOption"
              />
              <GmapMarker 
                :position="currentLocation.position"
              />
              <DirectionsRender travelMode="DRIVING" :origin="this.origin" :destination="this.destionation"/>
            </GmapMap>
          </td>
          <td>
            <h4 class="text-xl">รายชื่อตู้แดง</h4>
            <div class="overflow-y-auto" style="height:360px">
            <table class="" >
              <tbody>
                <tr v-for="(item,index) in allMarker" :key="index" class="pt-10 pl-5">
                  <td class="px-4 py-3 p-5">
                  <h4 class="text-xl">{{ item.name }}</h4>
                  <div class="pt-1 space-x-2 ">
                    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300" @click="getLocationInfo(item)">Go To</button>
                    <!-- <button @click="getLocationInfo(item)" v-if="!isAllRedBox()">Add</button> -->
                    <!-- <router-link  
                      class=" p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300"
                      v-if="!isAllRedBox()"
                      :to="{
                        name: 'MakeNewReport',
                        params: { red_box_id: item.id, assignment_id:id.id },
                      }"
                    >Add
                    </router-link> -->
                    <button 
                      class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300" 
                      @click="goToAddReport(item)"
                      v-if="!isAllRedBox()"
                    >
                      Add
                    </button>
                    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-gray-100 focus:border-4 focus:border-red-300" @click=" deteleRedBox(item)" v-if="isAllRedBox()">Delete</button>
                  </div>
                  <div class="p-1 mt-1">
                    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300" @click="setOrigin(item)" v-if="!isAllRedBox()">Get Direction</button>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </td>
        </tr>
      </table>
    <div class="mt-2">
    <!-- Lati: {{currentLocation.position.lat}} Longi: {{ currentLocation.position.lng }} -->
    <span class="space-x-3">
        <span>Maps Menu : </span>
        <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300" @click="getCurrentLocation()">Reset</button>
        <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300" @click="getCurrentLocation()">Go to current location</button>
        <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300" v-if="!isAllRedBox()" @click="removeOrigin()">Remove Directrion</button>
    </span>

    </div>
    </div>
  </div>
</template>

<script>
import RedBoxService from '../../services/RedBox'
// import AllRedBox from '../../views/Redboxes/AllRedBox.vue'
import DirectionsRender from '../Maps/DirectionsRender.js'
export default {
  props: ["RedBoxes","Assignment"],
  components: {
    DirectionsRender
  },
 data() {
  return {
    currentLocation:{
      label:'currrent',
      position:{lat:0,lng:0}
    },
    allMarker:[
      { 
        id:1,
        label:'แยกเกษตร',
        position: {lat:13.839685,lng:100.575266}
      },
      {
        id:2,
        label:'เซ็นทรัลลาดพร้่าว',
        position: {lat:13.815520,lng:100.561074}
      },
    ],
    selectedLocation:"",
    path:[],
    centerMap:{
      position:{lat:0,lng:0}
    },
    markerOption:{
      url: require('../../assets/postbox.png'),
      size: {width: 25, height: 30},
      scaledSize: {width: 25, height: 30},
    },
    currentView:"",
    origin: null,
    destionation:null,
    id:""
  }
},
  watch:{
    RedBoxes(val, OldVal) {
      // console.log("------------------");
      // console.log(val);
      // console.log(OldVal);
      // console.log("------------------");
      this.validData();
    },
  },
  async created(){
    this.id = this.Assignment
    this.validData();
    // console.log(this.RedBoxes);
    this.getCurrentLocation()
    // console.log(this.$route.name);
    this.getCurrentView();
    // if(!this.isAllRedBox){
      
      console.log(this.id);
    // }
    // console.log(this.currentView);
  },
 mounted() {
  //  this.getCurrentLocation()
 },
  methods: {
    getCurrentLocation(){
      this.$getLocation({}).then(getLocate => {
        this.currentLocation.position.lat = getLocate.lat;
        this.currentLocation.position.lng = getLocate.lng;
        this.centerMap.position = this.currentLocation.position
        // this.path.push(this.currentLocation)
        // this.allMarker.push(this.currentLocation)
        // console.log(this.allMarker);
      })
    },
    getLocationInfo(item){
      // console.log(item);
      this.selectedLocation = item
      this.centerMap.position = this.selectedLocation.position
      // console.log(this.selectedLocation);
    },
    validData(){
      // console.log(this.RedBoxes);
      this.allMarker = this.RedBoxes;
      // console.log(this.allMarker);
    },
    getCurrentView(){
      this.currentView = this.$route.name;
    },
    async deteleRedBox(item){
      console.log(item);
      swal({
            title: "warning",
            text: `Would you like to Delete ${item.name} ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then(async (willRedeem) => {
            if (willRedeem) {
              await swal("Successful", {
                icon: "success",
              });
              let res = await RedBoxService.deleteCurrent(item.id);
              console.log(res);
              // this.$emit('fetchAllRedBox');
              this.$router.go()
              // await this.fetchFood();
            } else {
              swal("Canceled");
            }
          });
    },
    isAllRedBox(){
      // console.log(this.currentView);
      if(this.currentView === 'AllRedBox'){
        return true;
      }
      return false;
    },
    setOrigin(item){
      // var orgins = new google.maps.LatLng(this.currentLocation.position.lat,this.currentLocation.position.lng);
      // console.log(orgins);
      console.log(item);
      this.origin = this.currentLocation.position;
      console.log(this.origin);
      this.destionation = item.position
      console.log(this.destionation);
    },
    removeOrigin(){
      this.origin = null;
      this.destionation = null;
      console.log(this.origin);
      console.log(this.destionation);
      this.$router.go()

    },
    goToAddReport(item){
      this.$router.push({name: 'MakeNewReport',params: { red_box_id: item.id, assignment_id:this.id.id }})
    }
  }
}

</script>

<style>

</style>