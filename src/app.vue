<style src="normalize.css"></style>
<style lang="sass?indentedSyntax" src="./assets/global.sass"></style>

<template lang="jade">
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
