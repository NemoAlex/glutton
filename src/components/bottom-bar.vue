<style scoped lang="sass">
@import "../assets/variables.sass"
.bottom-bar
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  height: 30px
  background: white
  border-top: 1px solid $color-grey-3
  text-align: right
  .icon-btn
    width: 30px
    height: 30px
    // margin-top: -2px
    text-align: center
    background: url(../assets/icon_disconnect.svg) center no-repeat
    display: inline-block
    &:hover
      background-image: url(../assets/icon_disconnect_hover.svg)
      position: relative
      // &:after
      //   content: ""
      //   display: block
      //   left: 0
      //   top: 0
      //   width: 100%
      //   border-top: 2px solid $color-primary
  .icon-btn.settings
    background-image: url(../assets/icon_settings.svg)
    &:hover
      background-image: url(../assets/icon_settings_hover.svg)
</style>

<template lang="jade">
.bottom-bar
  .icon-btn.settings(@click="showSettings")
  .icon-btn.disconnect(@click="disconnect")

</template>

<script>
export default {
  methods: {
    disconnect: function () {
      this.$dispatch('disconnect')
    },
    showSettings: function () {
      this.$dispatch('showSettings')
    }
  }
}
</script>
