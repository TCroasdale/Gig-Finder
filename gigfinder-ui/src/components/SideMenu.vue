<template>
  <div id="side-menu" class="side-menu y-stretch bg-dark text-white" v-bind:class="{ 'open': isOpen }" ref="menu">
      <div id="menu-close" class="" v-on:click="closeMenu($refs.menu)">
          <div class="menu-bar-deco"></div>
          <div class="menu-bar-deco"></div>
      </div>
      <ul class="list-group-flush bg-dark px-0">
          <li class="list-group-item bg-dark">About</li>
          <a href="#" @click="openGigCreate" data-toggle="modal" data-target="#create-gig-modal"><li class="list-group-item bg-dark">Hosting a Gig?</li></a>
          <a href="#" @click="openVenueCreate"><li class="list-group-item bg-dark">Add a Venue</li></a>
          <li class="list-group-item bg-dark">FAQ</li>
          <li class="list-group-item bg-dark">Contact us!</li>
      </ul>
      <div id="menu-footer" class="p-2 bg-dark">
          <p>Thanks for using Gig Finder</p>
          <p>&copy; Tom Croasdale 2020</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    closeMenu: Function,
    isOpen: Boolean
  },
  data () {
    return {
      
    }
  },
  methods: {
    openVenueCreate: function () {
      this.$emit('openVenueCreate')
    },
    openGigCreate: function () {
      this.$emit('openGigCreate')
    }
  }
}
</script>

<style scoped>
.side-menu {
  height: 100%; 
  width: 0; 
  position: fixed;
  z-index: 10; 
  top: 0; 
  left: -75%;
  width: 75%;
  max-width: 350px; 
  overflow-x: hidden; 
  padding-top: 60px;
  transition: 0.5s; 
}
.side-menu.open{
  left: 0;
  box-shadow: 5px 0px 10px black;
}

#menu-close {
  position: absolute;
  padding: 4px;
  top: 8px;
  right: 8px;
  width: 48px;
  height: 48px;
  transition: 0.1s linear;
  z-index: 15;
}

.menu-bar-deco {
  margin: 6px auto;
  padding: 0 0;
  display: block;
  height: 4px;
  width: 75%;
  max-width: 48px;
  background-color: darkgray;
}

#menu-footer {
  position: absolute;
  bottom: 0;
}

#menu-close .menu-bar-deco {
  margin: 0 auto;
}
#menu-close:hover .menu-bar-deco {
  background-color: white;
}
#menu-close div:first-child {
  transform: translate(0, 16px) rotateZ(-45deg)
}
#menu-close div:last-child {
  transform: translate(0px, 13px) rotateZ(45deg);
}
</style>