<template>
  <div id="app">
    <CreateVenueModal v-bind:isOpen="venueCreateOpen" @close="venueCreateOpen=false"></CreateVenueModal>
    <CreateGigModal  v-bind:isOpen="gigCreateOpen" @close="gigCreateOpen=false"></CreateGigModal>
    <SideMenu v-bind:closeMenu="closeMenu" v-bind:isOpen="menuOpen" @openGigCreate="gigCreateOpen=true" @openVenueCreate="venueCreateOpen=true"></SideMenu>
    <Map ref="main-map"></Map>
    <SearchMenu @search="performSearch" v-bind:openMenu="openMenu"></SearchMenu>
    <!-- <DateRange></DateRange> -->
  </div>
</template>

<script>
import Map from './components/Map.vue'
import SideMenu from './components/SideMenu.vue'
import SearchMenu from './components/SearchMenu.vue'
import CreateVenueModal from './components/modals/CreateVenueModal.vue'
import CreateGigModal from './components/modals/CreateGigModal.vue'

// import DateRange from './components/DateRange.vue'

export default {
  name: 'App',
  components: {
    Map,
    SideMenu,
    SearchMenu,
    CreateVenueModal,
    CreateGigModal
  },
  data () {
    return {
      menuOpen: false,
      venueCreateOpen: false,
      gigCreateOpen: false
    }
  },
  methods: {
    openMenu: function () {
      this.menuOpen = true
    },
    closeMenu: function () {
      this.menuOpen = false
    },
    performSearch: function(data) {
      console.log(data)
      fetch(`http://api.localhost:3000/search?type=${data.option}&query=${data.query}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          if (data.results.venues) {
            this.$refs['main-map'].addMarkers(data.results.venues)
          }
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}


a {
  color: #00B7FF;
}

</style>
