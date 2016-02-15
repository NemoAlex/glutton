<style scoped lang="sass?indentedSyntax">
.status-bar
  @import "../assets/variables.sass"
  color: $color-primary
</style>

<template lang="jade">
ul.status-bar
  li downloadSpeed: {{downloadSpeed}}
  li numActive: {{numActive}}
  li numStopped: {{numStopped}}
  li numStoppedTotal: {{numStoppedTotal}}
  li numWaiting: {{numWaiting}}
  li uploadSpeed: {{uploadSpeed}}
</template>

<script>
import * as rpc from '../services/rpc'

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
    setInterval(this.fetch, 5000)
  }
}
</script>
