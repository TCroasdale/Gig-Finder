<template>
  <b-modal centered @shown="createMap" @hidden="onClose" title="Create Gig" v-model="modalState" ok-only ok-variant="danger" ok-title="Close">
    <form v-on:submit.prevent="createGig">
      <div class="form-group">
        <label>Venue</label>
        <label>{{ this.createGigForm.venue.name }}</label>
        <div id="map-ven-select" class="small-map"></div>
      </div>
      <div class="form-group">
        <label>Lineup</label>
        <input v-for="(artist, index) in createGigForm.lineup" v-bind:key="index" class="form-control" type="text" v-model="createGigForm.lineup[index]" requried>
        <button type="button" class="btn btn-info" v-on:click="createGigForm.lineup.push('')">Add</button>
        <button type="button" class="btn btn-danger" v-on:click="createGigForm.lineup.pop()">Remove</button>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input class="form-control" type="date" v-model="createGigForm.date" requried>
      </div>
      <button class="form-control btn btn-primary" type="submit">Submit</button>
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
      createGigForm: {
        lineup: [''],
        date: '',
        venue: '',
        selectedMarker: null
      },
      map: null,
      markers: []
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
        container: 'map-ven-select',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 8,
        center: [-1.464854, 52.561928] // starting position [lng, lat]
      })
      this.map.addControl(new mapboxgl.NavigationControl())
      this.map.addControl(new mapboxgl.GeolocateControl())

      this.map.on('moveend', () => {
        this.doLocationSearch()
      })
      
    },
    selectMarker: function (marker, venue) {
      this.createGigForm.selectedMarker = marker
      this.createGigForm.venue = venue
      console.log(marker, venue, this.createGigForm)
    },
    createGig: function () {
      let fetchData = {
        method: 'POST',
        body: JSON.stringify({
          date: this.createGigForm.date,
          lineup: this.createGigForm.lineup,
          venue: this.createGigForm.venue._id
        }),
        headers: { 'Content-Type': 'application/json' }
      }
      fetch('http://api.localhost:3000/gigs/create', fetchData)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            console.log(data)
          } else {
            console.log(data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    doLocationSearch: function () {
      let center = this.map.getCenter()
      fetch(`http://api.localhost:3000/search/getarea?lat=${center.lat}&lng=${center.lng}&r=500`)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            console.log(data.results.venues.length)
            this.addMarkers(data.results.venues)
          }
        })
        .catch((err) => {
          console.log(err)
        })
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

        marker.getElement().addEventListener('click', () => {
          this.selectMarker(marker, venue)
        })
      }
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