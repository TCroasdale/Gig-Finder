<template>
  <div id="search-range-container">
    <div id="search-range" v-bind:class="{ expanded: isExpanded }" class="bg-dark p-3 justify-content-center">
      <div v-if="isExpanded">
        <ul class="p-0">
          <li><a href="#">Today</a></li>
          <li><a href="#">This Week</a></li>
          <li><a href="#">Next Week</a></li>
          <li><a href="#" v-on:click="isExpanded = false" class="text-white text-decoration-none text-lg"><Icon icon="times" text="Pick Date"></Icon></a></li>
        </ul>
      </div>
      <div v-else>
        <a href="#" v-on:click="isExpanded = true" class="text-white text-decoration-none text-lg"><Icon icon="calendar-alt" text="Pick Date"></Icon></a>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  props: {
  },
  components: {
    Icon
  },
  data () {
    return {
      isExpanded: false
    }
  }
}
</script>

<style lang="scss" scope>
#search-range-container {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  transform: translateY(-1rem);
}

#search-range {
  display: inline-block;
  // width: 150px;
  height: 4rem;
  width: 4rem;
  font-size: 1rem;
  border-radius: 2rem;
  justify-content: center;
  overflow-y: hidden;
  
  max-width: 350px;

  transition: 0.5s width;
}

.text-lg {
  font-size: 2rem;
}

#search-range.expanded {
  width: 75%;
  ul {
    li {
      display: inline-block;
      margin: 0 5px;
    }
    width: 90%;
    display: block;
    margin: 0 auto;
    text-decoration: none;
  }
}


</style>