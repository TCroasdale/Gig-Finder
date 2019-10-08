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
        function () {

        })
      }
    },
    mounted () {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 6,
        center: [-1.464854, 52.561928] // starting position [lng, lat]
      })
      this.map.addControl(new mapboxgl.NavigationControl())
      this.map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))
    }
  })
  console.log(app)
}) (Vue, mapboxgl, jQuery) // eslint-disable-line