<template>
  <div id="main-map" class="w-100 y-stretch"></div>
</template>

<script>
const mapboxgl = require('mapbox-gl')
export default {
  name: 'Map',
  data () {
    return {
      map: undefined,
      markers: [],
    }
  },
  mounted () {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGNyb2FzZGFsZSIsImEiOiJjazFoeHVnYXAwMHBpM2ltbjc4eDEzcWkyIn0.KBvexyHWTEuO4-OGIwE0tA'
    this.map = new mapboxgl.Map({
      container: 'main-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 8,
      center: [-1.464854, 52.561928] // starting position [lng, lat]
    })
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.addControl(new mapboxgl.GeolocateControl())
        
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#main-map {
  position:absolute; 
  top:0; 
  bottom:0; 
  width:100%; 
  z-index: -1;
}

</style>
