<template>
  <div class="mt-10 grid justify-items-center">
    <!-- <div>
        <h3>Map Coordinates:</h3>
        <p>Latitude :: {{ mapCoordiantes.lat }}  Longitude :: {{ mapCoordiantes.lng }}</p>
    </div> -->
    <div class="flex flex-row object-center">
        <div>
            <GmapMap
            :center="centerMap.position"
            :zoom="15"
            style="width:640px; height:360px"
            ref="mapRef">
                <GmapMarker
                :position="mapCoordiantes">
                </GmapMarker>
            </GmapMap>
        </div>
        <div class="object-center">
            <form action="" @submit.prevent="addNewRedBox">
                <div class="mt-20 ml-10">
                    <label for="name">ชื่อของตู้แดง :</label>
                    <input 
                    placeholder="ชื่อของตู้แดง"
                    class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    type="text" v-model="redBoxForm.name">
                </div>
                <div class="mt-5">
                    <h1>ตำแหน่งของหมุดปัจจุบัน</h1>
                </div>
                <div>
                    <label for="latitude">Latitude : {{ mapCoordiantes.lat }}</label>
                </div>
                <div>
                    <label for="longitude">Longitude : {{ mapCoordiantes.lng }}</label>
                </div>
                <div class="mt-5">
                    <button class="p-2 pl-5 pr-5 bg-transparent border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-gray-100 focus:border-4 focus:border-green-300">Submit</button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import RedBoxService from '../../services/RedBox'
export default {
    data() {
        return {
            map: null,
            currentLocation:{
                label:'currrent',
                position:{lat:0,lng:0}
            },
            centerMap:{
                position:{lat:0,lng:0}
            },
            redBoxForm:{
                name:"",
                latitude:0,
                longitude:0
            },
            mapCoordiante:{
                lat:0,
                lng:0
            }
        }
    },
    created(){
        this.getCurrentLocation()
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
        async addNewRedBox(){
            this.redBoxForm.latitude = this.map.getCenter().lat();
            this.redBoxForm.longitude = this.map.getCenter().lng();
            if(this.redBoxForm.name !== ""){
            swal({
            title: "warning",
            text: `Would you like to Add ${this.redBoxForm.name} ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
            }).then(async (willRedeem) => {
              if (willRedeem) {
                    let res = await RedBoxService.createNewRedBox(this.redBoxForm);
                    console.log(res);
                    if (res.success){
                    this.$swal('Add new Red Box Success', `${this.redBoxForm.name}`, 'success');
                 }
              }
              else{
              }
            });
            }
            else{
                    this.$swal(
                        'Add new RedBox',
                        'Please check that the information you have entered is complete.',
                        'error',
                            );  
            }
        }
    },
    mounted(){
        this.$refs.mapRef.$mapPromise.then(map => this.map = map);
        this.mapCoordiante = this.mapCoordiantes;
    },
    computed:{
        mapCoordiantes(){
            if(!this.map){
                return {
                    lat:0,
                    lng:0
                }
            }
            return {
                lat:this.map.getCenter().lat(),
                lng:this.map.getCenter().lng()
            }
        }
    }
}
</script>

<style>

</style>