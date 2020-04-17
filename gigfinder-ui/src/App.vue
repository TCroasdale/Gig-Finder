<template>
  <div id="app">
    <SideMenu></SideMenu>
    <Map></Map>
    <SearchMenu></SearchMenu>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import SideMenu from './components/SideMenu.vue'
import SearchMenu from './components/SearchMenu.vue'

export default {
  name: 'App',
  components: {
    Map,
    SideMenu,
    SearchMenu
  },
  methods: {
    openMenu: function () {
      this.$refs.menu.classList.add('open')
    },
    closeMenu: function () {
      this.$refs.menu.classList.remove('open')
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
