<style scoped lang="sass?indentedSyntax">
</style>

<template lang="jade">
ul
  li(v-for="download in list", track-by="gid")
    circle-progress(:progress="download.completedLength / download.totalLength", :status="download.status")
    |{{getName(download)}}
</template>

<script>
import * as rpc from '../services/rpc'
import * as util from '../services/util'
import * as config from 'json!../config.json'
import { concat } from 'lodash'
import CircleProgress from './circle-progress.vue'

export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    fetch: function () {
      var self = this
      rpc.multicall({
        'aria2.tellActive': [],
        'aria2.tellWaiting': [0, 1000],
        'aria2.tellStopped': [0, 1000]
      })
      .then(function (result) {
        self.list = concat(...result)
      })
    },
    getName: function (download) {
      return util.getFileName(download.files[0].path)
    }
  },
  ready: function () {
    this.fetch()
    setInterval(this.fetch, config.fetchTime)
  },
  components: {
    CircleProgress
  }
}
</script>
