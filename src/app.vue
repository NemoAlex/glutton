<style src="normalize.css"></style>
<style lang="sass?indentedSyntax" src="./assets/global.sass"></style>

<template lang="jade">
.login(v-if="!loggedIn")
  new-connection(:history.sync="serverHistory")
.main(v-if="loggedIn")
  .header-els
    header-bar
    status-bar(:download-speed="downloadSpeed", :upload-speed="uploadSpeed", :filter.sync="filter")
  .content
    download-list(:list="downloadList", :selected.sync="selectedGids")
  new-download(:showing.sync="newDownloadModalShowing", :destination="defaultDestination")
</template>

<script src="./app.js"></script>
