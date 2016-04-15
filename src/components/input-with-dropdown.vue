<style scoped lang="sass">
@import "../assets/variables.sass"
.input-with-dropdown
  height: 32px
  line-height: 30px
  position: relative
  &.focus .menu
    border-color: #DDD
    position: relative
  &.expanded
    .bg
      position: fixed
      z-index: 1000
      left: 0
      top: 0
      width: 100%
      height: 100%
    .menu
      z-index: 1001
  .menu
    position: absolute
    left: 0
    top: 0
    width: 100%
    border: 1px solid #F1F1F1
    border-radius: 2px
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.04)
    background: $color-white
    .left-part
      position: absolute
      left: 0
      top: 0
      width: 60px
      padding-right: 10px
      text-align: right
      span
        cursor: pointer
        display: block
        user-select: none
    .right-part
      margin-left: 60px
      background: white
      input
        border: 0
        box-shadow: none
        border-radius: 0
        height: 30px
        line-height: 30px
        padding: 0 10px
      .caret
        position: absolute
        right: 0
        top: 0
        height: 30px
        width: 30px
        background: url(../assets/icon-down.svg) center no-repeat
        cursor: pointer
      .list
        max-height: 100px
        overflow: auto
        .selection
          padding: 0 10px
          cursor: default
          position: relative
          user-select: none
          &:hover
            background-color: #FAFAFA
            .remove
              visibility: visible
          .remove
            visibility: hidden
            position: absolute
            right: 0
            top: 0
            height: 100%
            width: 30px
            background: url(../assets/icon_close.svg) center no-repeat
            cursor: pointer
  &.ssl .menu .left-part
    width: 77px
    span
      color: $color-primary
      background: url(../assets/icon_lock_hover.svg) 10px center no-repeat
  &.ssl .menu .right-part
    margin-left: 77px

</style>

<template lang="jade">
.input-with-dropdown(:class="{ focus: focus, ssl: ssl, expanded: expanded }")
  .bg(@mousedown="focus = expanded = false")
  .menu(@mousedown="focus = true")
    .left-part
      span(@click="ssl = !ssl") {{ssl ? 'https://' : 'http://'}}
    .right-part
      input(v-model="value", @focus="focus = true", @blur="focus = false")
      .caret(@click="expanded = !expanded", v-show="list.length")
      .list(v-show="expanded && list.length")
        .selection(v-for="(i, item) in list", @click="select(i)")
          .icons(v-if="item.ssl")
          | {{item.host}}:{{item.port}}
          .remove(@click="list.splice(i, 1)")
</template>

<script>
export default {
  data () {
    return {
      focus: false,
      expanded: false
    }
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    value: {
      type: String,
      default: ''
    },
    ssl: {
      type: Boolean,
      default: false
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
    select: function (i) {
      this.expanded = false
      this.$dispatch('selectHistory', i)
    }
  }
}
</script>


