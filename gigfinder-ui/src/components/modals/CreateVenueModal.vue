<template>
  <b-modal centered @shown="createMap" @hidden="onClose" title="Create Venue" v-model="modalState" ok-only ok-variant="danger" ok-title="Close">
    <form v-on:submit.prevent="createVenue">
        <div class="form-group">
            <label>Venue Name</label>
            <input class="form-control" type="text" v-model="createVenueForm.name" requried>
        </div>
        <div class="form-group">
            <label>Location</label>
            <div id="map-loc-select" class="small-map"></div>
        </div>
        <button @click.prevent="createVenue" class="form-control btn btn-primary" type="submit">Submit</button>
    </form>
  </b-modal>
</template>

<script>
const mapboxgl = require('mapbox-gl')

export default {
  props: {
      isOpen: Boolean
  },
  data () {
    return {
      modalState: false,
      createVenueForm: {
        name: '',
        location: { lng: '', lat: '' },
        locationMarker: null
      },
      map: null
    }
  },
  watch: {
    isOpen: function (newVal) {
      this.modalState = newVal
    }
  },
  methods: {
    createMap: function () {
      this.map = new mapboxgl.Map({
        container: 'map-loc-select',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 8,
        center: [-1.464854, 52.561928] // starting position [lng, lat]
      })
      this.map.addControl(new mapboxgl.NavigationControl())
      this.map.addControl(new mapboxgl.GeolocateControl())
      
      this.createVenueForm.locationMarker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(this.map)
      this.map.on('click', (e) => {
        this.createVenueForm.location.lng = e.lngLat.lng
        this.createVenueForm.location.lat = e.lngLat.lat
        this.createVenueForm.locationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat])
        this.map.panTo([e.lngLat.lng, e.lngLat.lat])
      })
    },
    createVenue: function () {
      let fetchData = {
        method: 'POST',
        body: JSON.stringify({
          name: this.createVenueForm.name,
          location: {
            lng: this.createVenueForm.location.lng,
            lat: this.createVenueForm.location.lat
          }
        }),
        headers: { 'Content-Type': 'application/json' }
      }
      fetch('http://api.localhost:3000/venues/create', fetchData)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            console.log(data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onClose: function() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.small-map {
  position: relative; 
  min-height: 200px;
  width:100%;
  border: 1px solid black;
}

</style>