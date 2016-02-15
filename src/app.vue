<template lang="jade">
div
  h1 {{msg}}
  header-bar
  download-list
</template>

<script>
import HeaderBar from './components/header-bar.vue'
import DownloadList from './components/download-list.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    HeaderBar,
    DownloadList
  }
}
</script>
