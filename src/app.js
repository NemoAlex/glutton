// components
import HeaderBar from './components/header-bar.vue'
import StatusBar from './components/status-bar.vue'
import DownloadList from './components/download-list.vue'
import NewDownload from './components/new-download.vue'
import NewConnection from './components/new-connection.vue'

// requirements
import * as rpc from './services/rpc'
import * as util from './services/util'
import * as config from 'json!./config.json'
import * as _ from 'lodash'

export default {
  data () {
    return {
      originalDownloadList: [],
      selectedGids: [],
      server: {
        host: 'localhost',
        port: 6800,
        secret: '',
        ssl: false
      },
      serverHistory: [
      ],
      downloadSpeed: 0,
      uploadSpeed: 0,
      newDownloadModalShowing: false,
      defaultDestination: '',
      filter: '',
      loggedIn: false
    }
  },
  computed: {
    selectedDownloads: function () {
      return this.downloadList.filter(download => ~this.selectedGids.indexOf(download.gid))
    },
    downloadList: function () {
      // sort by gid
      var list = this.originalDownloadList.slice(0).sort(function (a, b) {
        return parseInt(b.gid, 16) - parseInt(a.gid, 16)
      })
      // filter
      if (this.filter) {
        list = list.filter(download => {
          if (!download.files[0].path) return false
          return ~download.files[0].path.toLowerCase().indexOf(this.filter.toLowerCase())
        })
      }
      return list
    }
  },
  components: {
    HeaderBar,
    DownloadList,
    StatusBar,
    NewDownload,
    NewConnection
  },
  events: {
    startSelectedDownloads: function () {
      rpc.multicall(this.server, this.selectedGids.map(gid => ({methodName: 'aria2.unpause', params: [gid]})))
      .then(() => this.fetch())
    },
    pauseSelectedDownloads: function () {
      rpc.multicall(this.server, this.selectedGids.map(gid => ({methodName: 'aria2.pause', params: [gid]})))
      .then(() => this.fetch())
    },
    removeSelectedDownloads: function () {
      rpc.multicall(this.server, this.selectedDownloads.map(download => ({
        methodName: `aria2.${~['active', 'paused'].indexOf(download.status) ? 'remove' : 'removeDownloadResult'}`,
        params: [download.gid]
      })))
      .then(() => this.fetch())
    },
    showNewDownloadModal: function () {
      this.newDownloadModalShowing = true
    },
    addDownloads: function (download) {
      var args = download.uris.map((uri, i) => {
        let gid = util.addZeros(Date.now().toString(16), 14, 'f') + util.addZeros(i.toString(16), 2)
        return {
          methodName: 'aria2.addUri',
          params: [[uri], Object.assign({}, download.options, { gid: gid })]
        }
      })
      rpc.multicall(this.server, args)
      .then(() => this.fetch())
    },
    connectToServer: function (server) {
      server = Object.assign({}, server)
      // Test connection
      rpc.call(server, 'aria2.getGlobalOption')
      .then(() => {
        this.loggedIn = true
        this.server = server
        // Handle the history
        var duplicateIndex = _.findIndex(this.serverHistory, server)
        if (~duplicateIndex) this.serverHistory.splice(duplicateIndex, 1)
        this.serverHistory.unshift(server)
      })
      .catch(err => {
        alert(err)
      })
    }
  },
  ready: function () {
    this.getServerHistory()
    this.fetch()
    setInterval(this.fetch, config.fetchTime)
  },
  methods: {
    fetch: function () {
      if (!this.loggedIn) return
      rpc.multicall(this.server, {
        'aria2.getGlobalStat': null,
        'aria2.tellActive': [],
        'aria2.tellWaiting': [0, 1000],
        'aria2.tellStopped': [0, 1000]
      })
      .then(result => {
        this.downloadSpeed = result[0].downloadSpeed
        this.uploadSpeed = result[0].uploadSpeed
        var list = _.concat(result[1], result[2], result[3])
        this.originalDownloadList = list
      })
    },
    getOptions: function () {
      return rpc.call(this.server, 'aria2.getGlobalOption')
      .then(result => {
        this.defaultDestination = result.dir
        return result
      })
    },
    getServerHistory: function () {
      var history = window.localStorage.getItem('glutton_server_history')
      if (history) this.serverHistory = JSON.parse(history)
    }
  },
  watch: {
    'serverHistory': function (value) {
      window.localStorage.setItem('glutton_server_history', JSON.stringify(value))
    }
  }
}
