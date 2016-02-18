<style scoped lang="sass?indentedSyntax">
@import "../assets/variables.sass"
header
  height: 5.6rem
  padding-top: 1.3rem
  background: white
  position: relative
.btn
  margin-right: 1rem
</style>

<template lang="jade">
header
  .container
    btn(icon="add") Add
    btn(icon="play") Start
    btn(icon="pause", color="yellow") Pause
    btn(icon="remove", color="red", passive) Remove
    // ul.status-bar
      li downloadSpeed: {{downloadSpeed}}
      li numActive: {{numActive}}
      li numStopped: {{numStopped}}
      li numStoppedTotal: {{numStoppedTotal}}
      li numWaiting: {{numWaiting}}
      li uploadSpeed: {{uploadSpeed}}
</template>

<script>
import * as rpc from '../services/rpc'
import * as config from 'json!../config.json'
import btn from './btn.vue'

export default {
  data () {
    return {
      downloadSpeed: 0,
      numActive: 0,
      numStopped: 0,
      numStoppedTotal: 0,
      numWaiting: 0,
      uploadSpeed: 0
    }
  },
  methods: {
    fetch: function () {
      var self = this
      rpc.call('aria2.getGlobalStat')
      .then(function (result) {
        Object.assign(self.$data, result)
      })
    }
  },
  ready: function () {
    this.fetch()
    setInterval(this.fetch, config.fetchTime)
  },
  components: {
    btn
  }
}
</script>
