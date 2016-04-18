<style src="../assets/modal.sass" lang="sass"></style>
<style scoped lang="sass">
@import "../assets/variables.sass"
.subtitle-modal
  .content

</style>

<template lang="jade">
modal.subtitle-modal(:showing.sync="showing")
  .header
    .container SUBTITLES
    .close(@click="showing = false")
  .content
    .container
      .subtitles
        subtitle-line(v-for="subtitle in subtitles", :subtitle.sync="subtitle")
</template>

<script>
import modal from './modal.vue'
import SubtitleLine from './subtitle-line.vue'

export default {
  data () {
    return {
    }
  },
  props: {
    showing: Boolean,
    subtitles: Array
  },
  components: {
    modal,
    SubtitleLine
  }
}
</script>
