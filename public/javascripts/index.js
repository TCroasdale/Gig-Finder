(function (Vue, mapboxgl) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGNyb2FzZGFsZSIsImEiOiJjazFoeHVnYXAwMHBpM2ltbjc4eDEzcWkyIn0.KBvexyHWTEuO4-OGIwE0tA'

  const app = new Vue({
    el: '#app',
    data: {
      map: null,
      mapLocationSelector: null,
      mapVenueSelector: null,
      mapVenueView: null,
      venueFeatureLayer: null,
      createVenueForm: {
        name: '',
        location: { long: "", lat: "" },
        locationMarker: null
      },
      createGigForm: {
        lineup: ['', '', ''],
        date: '',
        venue: '',
        selectedMarker: null
      },
      venueViewData: {
        name: "",
        location: { long: "", lat: "" },
        upcomingGigs: []
      },
      venueViewMarker: null
    },
    computed: {
      noFutureGigsExist: function () {
        if (this.venueViewData.upcomingGigs == undefined) {
          return true
        }
        return this.venueViewData.upcomingGigs.length < 1
      }
    },
    methods: {
      openMenu: function () {
        this.$refs.menu.classList.add("open")
      },
      closeMenu: function () {
        this.$refs.menu.classList.remove("open")
      },
      createOtherMaps: function (){
        this.mapLocationSelector = new mapboxgl.Map({
          container: 'map-loc-select',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 8,
          center: [-1.464854, 52.561928] // starting position [lng, lat]
        })
        this.mapVenueSelector = new mapboxgl.Map({
          container: 'map-ven-select',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 8,
          center: [-1.464854, 52.561928] // starting position [lng, lat]
        })

        this.mapVenueView = new mapboxgl.Map({
          container: 'map-selected-ven-view',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 12,
          center: [-1.464854, 52.561928] // starting position [lng, lat]
        })
        this.venueViewMarker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(this.mapVenueView);

        this.mapLocationSelector.addControl(new mapboxgl.NavigationControl())
        this.mapLocationSelector.addControl(new mapboxgl.GeolocateControl())
        this.mapVenueSelector.addControl(new mapboxgl.NavigationControl())
        this.mapVenueSelector.addControl(new mapboxgl.GeolocateControl())

        this.createVenueForm.locationMarker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(this.mapLocationSelector);
        this.mapLocationSelector.on("click", (e) => {
          this.createVenueForm.location.long = e.lngLat.lng
          this.createVenueForm.location.lat = e.lngLat.lat
          this.createVenueForm.locationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat])
        })
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
      showVenue: function (venueId) {
        fetch ('venues/get/' + venueId)
        .then ((resp) => resp.json())
        .then ((data) => {
          if (data.success) {
            this.venueViewMarker.setLngLat([data.venue.location.long, data.venue.location.lat])
            this.mapVenueView.panTo([data.venue.location.long, data.venue.location.lat]);
            this.venueViewData = data.venue
            this.venueViewData.upcomingGigs = data.gigs
            console.log(data)
          } else {
            console.log("failed", data.error)
          }
        })
        .catch ((err) => {
          console.log (err)
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
        console.log(fetchData)
        fetch ('/gigs/create', fetchData)
        .then ((resp) => resp.json())
        .then ((data) => {
          if (data.success) {
            console.log(data)
          } else {
            console.log(data)
          }
        })
        .catch ((err) => {
          console.log (err)
        })
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

      this.createOtherMaps()

      fetch ('api/fetch-all')
      .then ((resp) => resp.json())
      .then ((data) => {
        if (data.success) {
          for (var v = 0; v < data.results.venues.length; v++) {
            let venue = data.results.venues[v]
            let marker = new mapboxgl.Marker().setLngLat([venue.location.long, venue.location.lat]).addTo(this.map);
            let venueMarker = new mapboxgl.Marker().setLngLat([venue.location.long, venue.location.lat]).addTo(this.mapVenueSelector);
            
            venueMarker.getElement().addEventListener('click', (e) => {
              this.selectMarker(venueMarker, venue)
            })

            marker.getElement().dataset.toggle="modal"
            marker.getElement().dataset.target="#view-venue-modal" //setAttribute('data', 'toggle: modal', 'target: #myModal')
            marker.getElement().addEventListener('click', (e) => {
              this.showVenue(venue._id)
            })
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