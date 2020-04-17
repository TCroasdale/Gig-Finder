<template>
  <div id="nav-bar" class="navbar row">
      <div id="menu-btn" class="col-2 nav-elem" v-on:click="openMenu($refs.menu)">
          <div class="menu-bar-deco"></div>
          <div class="menu-bar-deco"></div>
          <div class="menu-bar-deco"></div>
      </div>
      <form class="col-10 mx-0 p-0 input-group nav-elem" v-on:submit.prevent="doSearch">
          <input type="text" class="px-1 form-control" id="search-bar" placeholder="Search" v-model="searchQuery">
          <div class="input-group-append">
              <button type="submit" class="btn btn-dark">Go</button>
          </div>
      </form>
      <select class="badge badge-pill badge-dark" id="search-options" v-model="searchOption">
          <option>All</option>
          <option>Venue</option>
          <option>Artist</option>
          <option>City</option>
      </select>
  </div>
</template>

<script>
export default {
  props: {
    openMenu: Function
  },
  data () {
    return {
      searchOption: 'All',
      searchQuery: ''
    }
  }
}
</script>

<style scoped>
#nav-bar {
  position: fixed;
  z-index: 5;
  top: 10px;
  left: 5%;
  height: 48px;
  width: 330px;
  pointer-events: auto;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 2px gray;
  padding: 0;
}

@media (min-width: 992px) {
  #nav-bar {
    max-width: 350px;
  }
}

#search-options {
  position: absolute;
  display: block;
  right: 15%;
  border-bottom-left-radius: 10rem;
  border-bottom-right-radius: 10rem;
  transition: border-radius 0.1s linear;
}

#search-options:focus:active{
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

#search-bar {
  height: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

#menu-btn {
  max-width: 64px;
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

.nav-elem{
  padding: 6px 12px;
  height: 100%;
}

#nav-bar .nav-elem:first-child{
  height: 100%;
  border-right: 1px solid gray;
  transition: 0.1s linear;
}

#nav-bar .nav-elem:first-child:hover{
  background-color: #efefef;
}
</style>