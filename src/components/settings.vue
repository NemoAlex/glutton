<style scoped lang="sass">
.settings
  .checkbox
    display: block
    input
      margin-right: 6px
  .two-parts
    margin-bottom: 10px
    line-height: 32px
    .left
      width: 35%
      display: inline-block
      font-weight: 400
      vertical-align: top
      text-align: right
      padding-right: 10px
    .right
      width: 65%
      display: inline-block
      vertical-align: top
  .bottom
    text-align: left
</style>

<template lang="jade">
modal.settings(:showing.sync="showing")
  .header
    .container SETTINGS
  .content
    .container
      .two-parts
        .left Fetch interval (ms)
        .right
          input(v-model="config.fetchTime", debounce="500")
      .two-parts
        .left Subtitle features
        .right
          label.checkbox
            input(type="checkbox", v-model="config.enableSubtitleFeatures")
            | Enable
      .two-parts(v-if="config.enableSubtitleFeatures")
        .left 射手网(伪) token
        .right
          input(v-model="config.subtitleServices.shooterFake.token")
  .bottom
    .container
      .two-parts
        .left Reset settings
        .right
          btn(color="red", passive, @click="reset") Restore settings to defaults

</template>

<script>
import Modal from './modal.vue'
import Btn from './btn.vue'
import * as defaultConfig from '../config.json'

export default {
  props: ['config', 'showing'],
  components: {
    Modal,
    Btn
  },
  methods: {
    reset: function () {
      if (window.confirm('You sure about that?')) this.config = defaultConfig
    }
  }
}
</script>
