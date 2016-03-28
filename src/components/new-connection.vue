<style src="../assets/modal.sass" lang="sass?indentedSyntax"></style>
<style scoped lang="sass?indentedSyntax">
@import "../assets/variables.sass"
.new-connection
  .content
    .label
      margin-bottom: 5px
      font-weight: 400
</style>

<template lang="jade">
modal.new-connection(:showing.sync="showing")
  .header
    .container NEW CONNECTION
    .close(@click="showing = false")
  .content
    .container
      .form-group
        .label HOST
        input-with-dropdown(:list.sync="history", :value.sync="server.host", :ssl.sync="server.ssl")
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
import btn from './btn.vue'
import modal from './modal.vue'
import inputWithDropdown from './input-with-dropdown.vue'

export default {
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
  components: {
    btn,
    modal,
    inputWithDropdown
  }
}
</script>
