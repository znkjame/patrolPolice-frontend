<template>
  <div>
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
            <div>
            <table>
              <tbody>
                <tr v-for="(item,index) in allMarker" :key="index">
                  <td>
                  <h4>{{ item.name }}</h4>
                  <button @click="getLocationInfo(item)">Go To</button>
                  <button @click="getLocationInfo(item)" v-if="!isAllRedBox()">Add</button>
                  <button @click=" deteleRedBox(item)" v-if="isAllRedBox()">Delete</button>
                  <div>
                    <button @click="setOrigin(item)" v-if="!isAllRedBox()">Get Direction</button>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </td>
        </tr>
      </table>
    <div>
    Lati: {{currentLocation.position.lat}} Longi: {{ currentLocation.position.lng }}
    <button @click="getCurrentLocation()">Reset</button>
    <button @click="getCurrentLocation()">Go to current location</button>
    <button @click="removeOrigin()">Remove Directrion</button>
    </div>
    </div>
  </div>
</template>

<script>
import RedBoxService from '../../services/RedBox'
// import AllRedBox from '../../views/Redboxes/AllRedBox.vue'
import DirectionsRender from '../Maps/DirectionsRender.js'
export default {
  props: ["RedBoxes"],
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
    destionation:null
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
  created(){
    this.validData();
    // console.log(this.RedBoxes);
    this.getCurrentLocation()
    // console.log(this.$route.name);
    this.getCurrentView();
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
            text: `Would you like to Delete ${name} ?`,
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

    }
  }
}

</script>

<style>

</style>