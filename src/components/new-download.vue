<style src="../assets/modal.sass" lang="sass?indentedSyntax"></style>
<style scoped lang="sass?indentedSyntax">
@import "../assets/variables.sass"
.new-download
  .content
    .label
      margin-bottom: 0.5rem
      font-weight: 400
    .uris
      height: 10rem
      white-space: nowrap
    .left-part
      float: left
      width: 68%
      padding-right: 1.2rem
    .right-part
      float: right
      width: 32%
</style>

<template lang="jade">
.modal-bg(v-show="showing", @click="showing = false")
.modal.new-download(v-show="showing")
  .header
    .container NEW DOWNLOADS
    .close(@click="showing = false")
  .content
    .container
      .form-group
        .label LINK(S)
        textarea.uris(v-el:uri, placeholder="HTTP/FTP/SFTP/BitTorrent URIs", spellcheck="false", v-model="uris")
      .group
        .left-part
          .label DESTINATION
          input(v-model="destination", spellcheck="false")
        .right-part
          .label CONNECTIONS
          input(v-model="connections", type="number")
  .bottom
    .container
      btn(:disabled="!uriArray.length", @click="addDownloads") Download
</template>

<script>
import btn from './btn.vue'
import {trim} from 'lodash'

export default {
  data () {
    return {
      uris: '',
      connections: 5
    }
  },
  props: {
    showing: false,
    destination: ''
  },
  watch: {
    'showing': function (newVal) {
      if (!newVal) return
      this.$els.uri.focus()
    }
  },
  computed: {
    uriArray: function () {
      return trim(this.uris, '\n').split('\n').map(trim).filter(uri => !!uri)
    }
  },
  methods: {
    reset: function () {
      this.uris = ''
    },
    addDownloads: function () {
      if (!this.uriArray.length) return
      this.$dispatch('addDownloads', {
        uris: this.uriArray,
        options: {
          'max-connection-per-server': this.connections,
          'dir': this.destination
        }
      })
      this.showing = false
      this.reset()
    }
  },
  components: {
    btn
  }
}
</script>
