(function (Vue, mapboxgl, $) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGNyb2FzZGFsZSIsImEiOiJjazFoeHVnYXAwMHBpM2ltbjc4eDEzcWkyIn0.KBvexyHWTEuO4-OGIwE0tA'

  const app = new Vue({
    el: '#app',
    data: {
      map: null,
      createVenueForm: {
        name: '',
        number: '',
        postCode: ''
      },
      createGigForm: {
        lineup: ['', '', ''],
        date: '',
        venue: ''
      }
    },
    methods: {
      openMenu: function () {
        this.$refs.menu.classList.add("open")
      },
      closeMenu: function () {
        this.$refs.menu.classList.remove("open")
      },
      createVenue: function () {
        console.log(this.createVenueForm)
        console.log ({name: this.createVenueForm.name, address: this.createVenueForm.number + ", " + this.createVenueForm.postCode})
        $.post("/venues/create", 
        {name: this.createVenueForm.name, address: this.createVenueForm.number + ", " + this.createVenueForm.postCode}, 
        function (data) {
          console.log(data)
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

      // Make Request for data.
      $.get("/api/fetch-all", (data) => {
        if (data.success) {
          for (var v = 0; v < data.results.venues.length; v++) {
            var venue = data.results.venues[v]
            var marker = new mapboxgl.Marker().setLngLat([venue.location.long, venue.location.lat]).addTo(this.map);
          }
        }       
      })
      
    }

    
  })
  console.log(app)
}) (Vue, mapboxgl, jQuery) // eslint-disable-line