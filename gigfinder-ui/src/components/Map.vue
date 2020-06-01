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
  methods: {
    doLocationSearch: function () {
      let center = this.map.getCenter()
      fetch(`http://api.localhost:3000/search/getarea?lat=${center.lat}&lng=${center.lng}&r=500`)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            this.addMarkers(data.results.venues)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    zoomToMarkers: function (fallback) {
      if (this.markers !== undefined) {
        // No markers on the map, use a fallback fn
        // one marker, pan to it
        // multiple, create bounds and fit map to it. 
        if (this.markers.length === 0) {
          if (fallback) fallback()
        } else if (this.markers.length === 1) {
          this.map.panTo(this.markers[0].getLngLat())
        } else {
          var bounds = new mapboxgl.LngLatBounds()

          for (let i = 0; i < this.markers.length; i++) {
            bounds.extend(this.markers[i].getLngLat())
          }
          this.map.fitBounds(bounds)
        }
      } else if (fallback) {
        fallback()
      }
    },
    addMarkers: function (markerList) {
      if (this.markers !== undefined) {
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].remove()
        }
        this.markers = []
      }
      for (var v = 0; v < markerList.length; v++) {
        let venue = markerList[v]
        let loc = venue.location.coordinates
        let marker = new mapboxgl.Marker().setLngLat(loc).addTo(this.map)

        this.markers.push(marker)

        // venueMarker.getElement().addEventListener('click', (e) => {
        //   this.selectMarker(venueMarker, venue)
        // })

        // marker.getElement().dataset.toggle = 'modal'
        // marker.getElement().dataset.target = '#view-venue-modal'
        // marker.getElement().addEventListener('click', (e) => {
        //   this.showVenue(venue._id)
        // })
      }
      this.zoomToMarkers()
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
    this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))
    this.map.on('moveend', () => {
      // this.doLocationSearch()
    })
    this.doLocationSearch()
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
