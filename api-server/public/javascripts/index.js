(function (Vue, mapboxgl, fetch) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidGNyb2FzZGFsZSIsImEiOiJjazFoeHVnYXAwMHBpM2ltbjc4eDEzcWkyIn0.KBvexyHWTEuO4-OGIwE0tA'

  const app = new Vue({
    el: '#app',
    data: {
      map: null,
      markers: [],
      mapLocationSelector: null,
      mapVenueSelector: null,
      mapVenueView: null,
      mapGigView: null,
      venueFeatureLayer: null,
      createVenueForm: {
        name: '',
        location: { lng: '', lat: '' },
        locationMarker: null
      },
      createGigForm: {
        lineup: [''],
        date: '',
        venue: '',
        selectedMarker: null
      },
      venueViewData: {
        name: '',
        location: { lng: '', lat: '' },
        upcomingGigs: []
      },
      venueViewMarker: null,
      gigViewData: {
        lineup: ['', '', ''],
        date: '',
        venue: ''
      },
      gigViewMarker: null,
      searchOption: 'All',
      searchQuery: ''
    },
    computed: {
      noFutureGigsExist: function () {
        if (this.venueViewData.upcomingGigs === undefined) {
          return true
        }
        return this.venueViewData.upcomingGigs.length < 1
      }
    },
    methods: {
      openMenu: function () {
        this.$refs.menu.classList.add('open')
      },
      closeMenu: function () {
        this.$refs.menu.classList.remove('open')
      },
      createOtherMaps: function () {
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
        this.venueViewMarker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(this.mapVenueView)

        this.mapGigView = new mapboxgl.Map({
          container: 'map-gig-view',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 12,
          center: [-1.464854, 52.561928] // starting position [lng, lat]
        })
        this.gigViewMarker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(this.mapGigView)

        this.mapLocationSelector.addControl(new mapboxgl.NavigationControl())
        this.mapLocationSelector.addControl(new mapboxgl.GeolocateControl())
        this.mapVenueSelector.addControl(new mapboxgl.NavigationControl())
        this.mapVenueSelector.addControl(new mapboxgl.GeolocateControl())

        this.createVenueForm.locationMarker = new mapboxgl.Marker().setLngLat([0, 0]).addTo(this.mapLocationSelector)
        this.mapLocationSelector.on('click', (e) => {
          this.createVenueForm.location.lng = e.lngLat.lng
          this.createVenueForm.location.lat = e.lngLat.lat
          this.createVenueForm.locationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat])
          this.mapLocationSelector.panTo([e.lngLat.lng, e.lngLat.lat])
        })
      },
      createVenue: function () {
        console.log(this.createVenueForm.location.lng, this.createVenueForm.location.lat)
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
        fetch('/venues/create', fetchData)
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
      showVenue: function (venueId) {
        fetch('venues/get/' + venueId)
          .then((resp) => resp.json())
          .then((data) => {
            if (data.success) {
              this.venueViewMarker.setLngLat([data.venue.location.lng, data.venue.location.lat])
              this.mapVenueView.panTo([data.venue.location.lng, data.venue.location.lat])
              this.venueViewData = data.venue
              this.venueViewData.upcomingGigs = data.gigs
              console.log(data)
            } else {
              console.log('failed', data.error)
            }
          })
          .catch((err) => {
            console.log(err)
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
        fetch('/gigs/create', fetchData)
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
      showGig: function (gigId) {
        fetch('gigs/get/' + gigId)
          .then((resp) => resp.json())
          .then((data) => {
            if (data.success) {
              console.log(data)
              this.gigViewMarker.setLngLat([data.gig.venue.location.lng, data.gig.venue.location.lat])
              this.mapGigView.panTo([data.gig.venue.location.lng, data.gig.venue.location.lat])
              this.gigViewData = data.gig
            } else {
              console.log('failed', data.error)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      doSearch: function () {
        console.log(this.searchQuery, this.searchOption)
        fetch(`/search?type=${this.searchOption}&query=${this.searchQuery}`)
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            if (data.success) {
              if (data.results.venues) {
                this.addMarkers(data.results.venues)
              }
            }
          })
      },
      doLocationSearch: function () {
        let center = this.map.getCenter()
        fetch(`search/getarea?lat=${center.lat}&lng=${center.lng}&r=500`)
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
          let venueMarker = new mapboxgl.Marker().setLngLat(loc).addTo(this.mapVenueSelector)

          this.markers.push(marker)

          venueMarker.getElement().addEventListener('click', (e) => {
            this.selectMarker(venueMarker, venue)
          })

          marker.getElement().dataset.toggle = 'modal'
          marker.getElement().dataset.target = '#view-venue-modal'
          marker.getElement().addEventListener('click', (e) => {
            this.showVenue(venue._id)
          })
        }
        this.zoomToMarkers()
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
      this.doLocationSearch()
    }

  })
  console.log(app)
}) (Vue, mapboxgl, fetch) // eslint-disable-line
