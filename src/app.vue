<style src="normalize.css"></style>
<style lang="sass" src="./assets/global.sass"></style>
<style scoped lang="sass">
@import "./assets/variables.sass"
.login
  background: #979797
  width: 100%
  height: 100%
.main
  height: 100%
  background: $color-grey-1
  &.drag-over
    opacity: .6
  .header-els
    position: fixed
    left: 0
    top: 0
    width: 100%
    z-index: 1
  .content
    height: 100%
    padding: 88px 0 30px
    .scroll-holder
      height: 100%
      overflow-y: auto
</style>

<template lang="jade">
.login(v-show="!loggedIn")
  new-connection(:history.sync="serverHistory", :server.sync="server")
.main(v-if="loggedIn", @drop.stop.prevent="dropFiles", @dragover.stop.prevent="onDragOver", @dragenter="dragOver = true", @dragleave="dragOver = false", @drop="dragOver = false", :class="{ 'drag-over': dragOver }")
  .header-els
    header-bar
    status-bar(:download-speed="downloadSpeed", :upload-speed="uploadSpeed", :filter.sync="filter", :order-by.sync="orderBy")
  .content
    .scroll-holder(@click="selectedGids = []")
      download-list(:list="downloadList", :selected.sync="selectedGids", @click.stop="")
  bottom-bar
  subtitle
  new-download(:showing.sync="newDownloadModalShowing", :destination="defaultDestination", :torrents.sync="torrents")
  settings(:showing.sync="settingsWindowShowing", :config.sync="config")
</template>

<script src="./app.js"></script>
