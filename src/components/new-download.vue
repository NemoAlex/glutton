<style src="../assets/modal.sass" lang="sass"></style>
<style scoped lang="sass">
@import "../assets/variables.sass"
.new-download
  .content
    .uris
      height: 100px
      white-space: nowrap
    .left-part
      float: left
      width: 68%
      padding-right: 12px
    .right-part
      float: right
      width: 32%
    .torrents-list
      overflow: auto
      white-space: nowrap
      min-height: 100px
      max-height: 160px
      border: 1px solid #DDD
      border-radius: 2px
      .torrent
        line-height: 30px
        padding: 0 8px
        position: relative
        cursor: default
        &:nth-child(odd)
          background-color: #FAFAFA
        &:hover
          background-color: $color-grey-4
          .remove
            visibility: visible
        .inner
          margin-right: 30px
          overflow: hidden
          text-overflow: ellipsis
        .remove
          visibility: hidden
          position: absolute
          right: 0
          top: 0
          height: 100%
          width: 30px
          background: url(../assets/icon_close.svg) center no-repeat
          cursor: pointer
</style>

<template lang="jade">
modal.new-download(:showing.sync="showing")
  .header
    .container NEW DOWNLOADS
    .close(@click="showing = false")
  .content
    .container
      .form-group(v-if="!torrents.length")
        .label LINK(S)
        textarea.uris(v-el:uri, placeholder="HTTP/FTP/SFTP/BitTorrent URIs", spellcheck="false", v-model="uris")
      .form-group(v-if="torrents.length")
        .label TORRENTS
        .torrents-list
          .torrent(v-for="(i, torrent) in torrents")
            .inner {{torrent.name}}
            .remove(@click="torrents.splice(i, 1)")
      .form-group
        input(type="file", multiple, @change="uploadFiles")
      .form-group.group
        .left-part
          .label DESTINATION
          input(v-model="destination", spellcheck="false")
        .right-part
          .label CONNECTIONS
          input(v-model="connections", type="number")
  .bottom
    .container
      btn(:disabled="!allowDownload", @click="addDownloads") Download
</template>

<script>
import Btn from './btn.vue'
import Modal from './modal.vue'
import {trim} from 'lodash'

export default {
  data () {
    return {
      uris: '',
      connections: 5
    }
  },
  props: {
    showing: Boolean,
    destination: String,
    torrents: Array
  },
  watch: {
    'showing': function (newVal) {
      if (!newVal) return
      if (this.$els.uri) this.$els.uri.focus()
    }
  },
  computed: {
    uriArray: function () {
      return trim(this.uris, '\n').split('\n').map(trim).filter(uri => !!uri)
    },
    allowDownload: function () {
      return this.uriArray.length || this.torrents.length
    }
  },
  methods: {
    reset: function () {
      this.uris = ''
      this.torrents = []
    },
    addDownloads: function () {
      if (!this.allowDownload) return
      if (this.torrents.length) {
        this.addTorrentDownloads(this.torrents)
      } else {
        this.addUriDownloads(this.uriArray)
      }
      this.showing = false
      this.reset()
    },
    addUriDownloads: function (uris) {
      this.$dispatch('addUriDownloads', {
        uris: uris,
        options: {
          'max-connection-per-server': this.connections,
          'dir': this.destination
        }
      })
    },
    addTorrentDownloads: function (torrents) {
      this.$dispatch('addTorrentDownloads', {
        torrents: torrents,
        options: {
          'max-connection-per-server': this.connections,
          'dir': this.destination
        }
      })
    },
    uploadFiles: function (e) {
      this.$dispatch('uploadFiles', e.target.files)
      e.target.value = ''
    }
  },
  components: {
    Btn,
    Modal
  }
}
</script>
