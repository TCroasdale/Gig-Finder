<template>
  <font-awesome-icon v-bind:icon="icon">{{ text }}</font-awesome-icon>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

export default {
  props: {
    icon: String,
    text: String
  }
}
</script>