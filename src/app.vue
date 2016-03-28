<style src="normalize.css"></style>
<style lang="sass?indentedSyntax" src="./assets/global.sass"></style>
<style scoped lang="sass?indentedSyntax">
@import "./assets/variables.sass"
.main
  height: 100%
  background: $color-grey-1
  &.drag-over
    opacity: .6
</style>

<template lang="jade">
.login(v-show="!loggedIn")
  new-connection(:history.sync="serverHistory", :server.sync="server")
.main(v-if="loggedIn", @drop.stop.prevent="dropFiles", @dragover.stop.prevent="dragOver = true", @dragenter="dragOver = true", @dragleave="dragOver = false", @drop="dragOver = false", :class="{ 'drag-over': dragOver }")
  .header-els
    header-bar
    status-bar(:download-speed="downloadSpeed", :upload-speed="uploadSpeed", :filter.sync="filter")
  .content
    download-list(:list="downloadList", :selected.sync="selectedGids")
  bottom-bar
  new-download(:showing.sync="newDownloadModalShowing", :destination="defaultDestination", :torrents.sync="torrents")
</template>

<script src="./app.js"></script>
