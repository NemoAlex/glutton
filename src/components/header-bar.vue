<style scoped lang="sass?indentedSyntax">
@import "../assets/variables.sass"
header
  height: 5.6rem
  padding-top: 1.3rem
  background: white
  position: relative
  border-bottom: 0.1rem solid #F7F7F7
.btn
  margin-right: 1rem
</style>

<template lang="jade">
header
  .container
    btn(icon="add", @click="$dispatch('showNewDownloadModal')") Add
    btn(icon="play", passive, @click="$dispatch('startSelectedDownloads')") Start
    btn(icon="pause", color="yellow", passive, @click="$dispatch('pauseSelectedDownloads')") Pause
    btn(icon="remove", color="red", passive, @click="$dispatch('removeSelectedDownloads')") Remove
</template>

<script>
import btn from './btn.vue'

export default {
  components: {
    btn
  }
}
</script>
