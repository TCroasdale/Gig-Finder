(function (Vue, mapboxgl) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGNyb2FzZGFsZSIsImEiOiJjazFoeHVnYXAwMHBpM2ltbjc4eDEzcWkyIn0.KBvexyHWTEuO4-OGIwE0tA'

  const app = new Vue({
    el: '#app',
    data: {
      map: null,
      mapLocationSelector: null,
      createVenueForm: {
        name: '',
        location: { long: "", lat: "" },
        locationMarker: null
      },
      createGigForm: {
        lineup: ['', '', ''],
        date: '',
        venue: ''
      }
    },
    computed: {
      mapCenter () {
        return this.mapLocationSelector ? this.mapLocationSelector.getCenter().toArray() : [0, 0]
      }
    },
    methods: {
      openMenu: function () {
        this.$refs.menu.classList.add("open")
      },
      closeMenu: function () {
        this.$refs.menu.classList.remove("open")
      },
      createVenueMap: function (){
        this.mapLocationSelector = new mapboxgl.Map({
          container: 'map-loc-select',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 8,
          center: [-1.464854, 52.561928] // starting position [lng, lat]
        })
        this.mapLocationSelector.addControl(new mapboxgl.NavigationControl())
        this.mapLocationSelector.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }))
        this.createVenueForm.locationMarker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(this.mapLocationSelector);
        this.mapLocationSelector.on("click", (e) => {
          console.log(e)
          this.createVenueForm.location.long = e.lngLat.lng
          this.createVenueForm.location.lat = e.lngLat.lat
          this.createVenueForm.locationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat])
        })

        console.log("mapLocaSelect", this.mapLocationSelector)
      },
      createVenue: function () {
        let fetchData = { 
          method: 'POST', 
          body: JSON.stringify({ 
            name: this.createVenueForm.name, 
            location: {
              long: this.createVenueForm.location.long,
              lat: this.createVenueForm.location.lat
            }
          }),
          headers: { 'Content-Type': 'application/json' }
        }
        console.log(fetchData)
        fetch ('/venues/create', fetchData)
        .then ((resp) => resp.json())
        .then ((data) => {
          if (data.success) {
            console.log(data)
          }
        })
        .catch ((err) => {
          console.log (err)
        })
      },
      createGig: function () {
        console.log(this.createGigForm)
      }
    },
    mounted () {
      this.map = new mapboxgl.Map({
        container: 'map',
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

      this.createVenueMap()

      fetch ('api/fetch-all')
      .then ((resp) => resp.json())
      .then ((data) => {
        if (data.success) {
          for (var v = 0; v < data.results.venues.length; v++) {
            var venue = data.results.venues[v]
            var marker = new mapboxgl.Marker().setLngLat([venue.location.long, venue.location.lat]).addTo(this.map);
          }
        }
      })
      .catch ((err) => {
        console.log (err)
      })

    }

    
  })
  console.log(app)
}) (Vue, mapboxgl) // eslint-disable-line