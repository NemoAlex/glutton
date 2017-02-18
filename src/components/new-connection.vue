<style src="../assets/modal.sass" lang="sass"></style>
<style scoped lang="sass">
@import "../assets/variables.sass"
.new-connection
  .content
    .host
      position: relative
      .input-with-dropdown
        vertical-align: top
        margin-right: 40px
        &.short
          width: 70%
          display: inline-block
          margin-right: 0
      .show-extension
        position: absolute
        right: 0
        bottom: 0
        width: 30px
        height: 32px
        line-height: 32px
        background: $color-white
        color: $color-text
        border: 1px solid $color-grey-4
        &:hover
          border-color: #DDD
      .extension
        vertical-align: top
        width: 30%
        display: inline-block
        white-space: nowrap
        span
          display: inline-block
          width: 20%
          padding: 0 10px
        input
          display: inline-block
          width: 80%
</style>

<template lang="jade">
modal.new-connection(:showing.sync="showing", :closeable="false")
  .header
    .container NEW CONNECTION
  .content
    .container
      .form-group.host
        .label HOST
        input-with-dropdown(:list.sync="history", :value.sync="server.host", :ssl.sync="server.ssl", :class="{'short': extensionShowing}")
        .extension(v-show="extensionShowing")
          span /
          input(v-model="server.extension", placeholder="jsonrpc")
        btn.show-extension(passive, @click="extensionShowing = true", v-show="!extensionShowing") ...
      .form-group
        .label PORT
        input(v-model="server.port", spellcheck="false", type="number", number)
      .form-group
        .label SECRET TOKEN
        input(v-model="server.secret", placeholder="optional")
  .bottom
    .container
      btn(@click="connect") Connect
</template>

<script>
import Btn from './btn.vue'
import Modal from './modal.vue'
import InputWithDropdown from './input-with-dropdown.vue'

export default {
  data () {
    return {
      extensionShowing: false,
      defaultPort: this.server.port
    }
  },
  props: {
    showing: {
      type: Boolean,
      default: true
    },
    history: {
      type: Array,
      default: []
    },
    server: Object
  },
  events: {
    selectHistory: function (i) {
      this.server = Object.assign({}, this.history[i])
    }
  },
  methods: {
    connect: function () {
      this.$dispatch('connectToServer', this.server)
    }
  },
  watch: {
    'server.ssl': function (val) {
      this.server.port = (val ? 443 : this.$data.defaultPort)
    }
  },
  components: {
    Btn,
    Modal,
    InputWithDropdown
  }
}
</script>
