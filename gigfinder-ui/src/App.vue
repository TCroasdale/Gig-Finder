<template>
  <div id="app">
    <CreateVenueModal v-bind:isOpen="venueModalOpen" @close="venueModalOpen = false"></CreateVenueModal>

    <SideMenu v-bind:closeMenu="closeMenu" v-bind:isOpen="menuOpen" @openVenueModal="venueModalOpen = true"></SideMenu>
    <Map></Map>
    <SearchMenu v-bind:openMenu="openMenu"></SearchMenu>
    <!-- <DateRange></DateRange> -->
  </div>
</template>

<script>
import Map from './components/Map.vue'
import SideMenu from './components/SideMenu.vue'
import SearchMenu from './components/SearchMenu.vue'
import CreateVenueModal from './components/modals/CreateVenueModal.vue'
// import DateRange from './components/DateRange.vue'

export default {
  name: 'App',
  components: {
    Map,
    SideMenu,
    SearchMenu,
    CreateVenueModal
  },
  data () {
    return {
      menuOpen: false,
      venueModalOpen: false
    }
  },
  methods: {
    openMenu: function () {
      this.menuOpen = true
    },
    closeMenu: function () {
      this.menuOpen = false
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
