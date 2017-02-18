// components
import HeaderBar from './components/header-bar.vue'
import StatusBar from './components/status-bar.vue'
import BottomBar from './components/bottom-bar.vue'
import DownloadList from './components/download-list.vue'
import NewDownload from './components/new-download.vue'
import NewConnection from './components/new-connection.vue'
import Subtitle from './components/subtitle.vue'
import Settings from './components/settings.vue'

// requirements
import * as rpc from './services/rpc'
import * as util from './services/util'
import * as defaultConfig from './config.json'
import * as _ from 'lodash'

export default {
  data () {
    return {
      originalDownloadList: [],
      selectedGids: [],
      server: Object.assign({}, defaultConfig.defaultServer),
      serverHistory: [
      ],
      globalOption: {},
      torrents: [],
      downloadSpeed: 0,
      uploadSpeed: 0,
      newDownloadModalShowing: false,
      settingsWindowShowing: false,
      defaultDestination: '',
      filter: '',
      orderBy: 'name',
      loggedIn: false,
      dragOver: false,
      fetchTimer: {}
    }
  },
  computed: {
    selectedDownloads: function () {
      return this.downloadList.filter(download => ~this.selectedGids.indexOf(download.gid))
    },
    downloadList: function () {
      let sorting = ['complete', 'error', 'paused', 'waiting', 'active']
      // sort
      var list = this.originalDownloadList.slice(0).sort((a, b) => {
        if (a.status == b.status) {
          if (this.orderBy == 'size')
            return Number(b.totalLength) > Number(a.totalLength) ? 1 : -1
          return util.getEntryFileName(b) > util.getEntryFileName(a) ? 1 : -1
        } else {
          return sorting.indexOf(b.status) > sorting.indexOf(a.status) ? 1 : -1
        }
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
    BottomBar,
    NewDownload,
    NewConnection,
    Subtitle,
    Settings
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
    showSettings: function () {
      this.settingsWindowShowing = true
    },
    addUriDownloads: function (download) {
      var args = download.uris.map((uri, i) => {
        return {
          methodName: 'aria2.addUri',
          params: [[uri], Object.assign({}, download.options, { gid: util.generateGid(i) })]
        }
      })
      rpc.multicall(this.server, args)
      .then(() => this.fetch())
    },
    addTorrentDownloads: function (download) {
      var args = download.torrents.map((torrent, i) => {
        return {
          methodName: 'aria2.addTorrent',
          params: [torrent.base64, [], Object.assign({}, download.options, { gid: util.generateGid(i) })]
        }
      })
      rpc.multicall(this.server, args)
      .catch(err => alert(err.message))
      .then(() => this.fetch())
    },
    connectToServer: function (server) {
      this.connectToServer(server)
      .catch(err => {
        alert(err.message)
      })
    },
    disconnect: function () {
      // this.server = {}
      this.loggedIn = false
    },
    searchSubtitle: function (download) {
      this.$broadcast('searchSubtitle', download)
    },
    uploadFiles: function (files) {
      for (var i = 0; i < files.length; i++) {
        this.addTorrent(files[i])
      }
      this.newDownloadModalShowing = true
    }
  },
  ready: function () {
    this.getStoredConfig()
    this.getServerHistory()

    var server = this.checkServerString() || this.serverHistory[0]
    if (server) {
      this.server = Object.assign({}, server)
      this.connectToServer(server).catch(function (err) {
        return err
      })
    }
    this.hideQueryParam()
  },
  methods: {
    startFetching: function () {
      clearTimeout(this.fetchTimer)
      this.fetch()
      this.fetchTimer = setInterval(this.fetch, this.config.fetchTime)
    },
    fetch: function () {
      if (!this.loggedIn) return
      rpc.multicall(this.server, {
        'aria2.getGlobalStat': null,
        'aria2.tellActive': [],
        'aria2.tellWaiting': [0, 1000],
        'aria2.tellStopped': [0, 1000],
        'aria2.getGlobalOption': null
      })
      .then(result => {
        this.downloadSpeed = Number(result[0].downloadSpeed)
        this.uploadSpeed = Number(result[0].uploadSpeed)
        if (!this.settingsWindowShowing) this.globalOption = result[4]
        var list = _.concat(result[1], result[2], result[3])
        this.originalDownloadList = list
      })
    },
    connectToServer: function (server) {
      return this.testConnection(server)
      .then(() => {
        // Login successed
        this.loggedIn = true
        this.server = Object.assign({}, server)
        // Get options
        this.getOptions()
        // Handle the history
        var duplicateIndex = _.findIndex(this.serverHistory, server)
        if (~duplicateIndex) this.serverHistory.splice(duplicateIndex, 1)
        this.serverHistory.unshift(server)
        // Start fetching
        this.startFetching()
      })
    },
    testConnection: function (server) {
      return rpc.call(server, 'aria2.getGlobalOption')
    },
    checkServerString: function () {
      var serverString = util.getQueryParam('s')
      if (!serverString) return null
      serverString = window.atob(serverString)
      var server = util.parseServerString(serverString)
      return server
    },
    hideQueryParam: function () {
      window.history.replaceState(null,null,'./')
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
      if (!history) return
      history = JSON.parse(history).map(server => {
        return Object.assign({}, this.config.defaultServer, server)
      })
      this.serverHistory = history
    },
    getStoredConfig: function () {
      var storedConfig = window.localStorage.getItem('glutton_config')
      storedConfig = JSON.parse(storedConfig || '{}')
      this.config = Object.assign({}, defaultConfig, storedConfig)
    },
    onDragOver: function (e) {
      if (!e.dataTransfer) return
      this.dragOver = true
      // Deal with Chrome Downloads Bar
      var b = e.dataTransfer.effectAllowed
      e.dataTransfer.dropEffect = (b === 'move' || b === 'linkMove') ? 'move' : 'copy'
    },
    dropFiles: function (e) {
      let files = e.dataTransfer.files
      for (var i = 0; i < files.length; i++) {
        this.addTorrent(files[i])
      }
      this.newDownloadModalShowing = true
    },
    addTorrent: function (file) {
      this.type = 'bt'
      var reader = new FileReader()
      reader.onload = (e) => {
        this.torrents.push({
          name: file.name,
          base64: window.btoa(e.target.result)
        })
      }
      reader.readAsBinaryString(file)
    }
  },
  watch: {
    'serverHistory': function (value) {
      window.localStorage.setItem('glutton_server_history', JSON.stringify(value))
    },
    'config': {
      handler: function (config) {
        var diff = _.pickBy(config, (value, key) => {
          return !_.isEqual(value, defaultConfig[key])
        })
        window.localStorage.setItem('glutton_config', JSON.stringify(diff))
      },
      deep: true
    },
    'config.fetchTime': function (value) {
      if (value < 100) return
      this.startFetching()
    },
    'downloadSpeed': function (value) {
      if (value === '0') document.title = 'Glutton'
      else document.title = '↓ ' + util.bytesToSize(value) + '/s - Glutton'
    }
  },
  props: ['config']
}
