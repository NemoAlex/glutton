<style scoped lang="sass">
@import "../assets/variables.sass"
header
  height: 56px
  padding-top: 13px
  background: white
  position: relative
  border-bottom: 1px solid #F7F7F7
.btn
  margin-right: 10px
</style>

<template lang="jade">
header
  .container
    btn(icon="add", @click="$dispatch('showNewDownloadModal')") Add
    btn(icon="play", passive, @click="$dispatch('startSelectedDownloads')")
    btn(icon="pause", color="yellow", passive, @click="$dispatch('pauseSelectedDownloads')")
    btn(icon="remove", color="red", passive, @click="$dispatch('removeSelectedDownloads')")
</template>

<script>
import Btn from './btn.vue'

export default {
  components: {
    Btn
  }
}
</script>
