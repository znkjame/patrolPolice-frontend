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
            </GmapMap>
          </td>
          <td>
            <div>
            <table>
              <tbody>
                <tr v-for="(item,index) in allMarker" :key="index">
                  <h4>{{ item.label }}</h4>
                  <button @click="getLocationInfo(item)">Go To</button>
                  <button @click="getLocationInfo(item)">Add</button>
                </tr>
              </tbody>
            </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>