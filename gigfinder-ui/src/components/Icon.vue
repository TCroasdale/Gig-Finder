<template>
  <font-awesome-icon v-bind:icon="icon">{{ text }}</font-awesome-icon>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


library.add(faSearch)
library.add(faCalendarAlt)
library.add(faTimes)

export default {
  props: {
    icon: String,
    text: String
  }
}
</script>