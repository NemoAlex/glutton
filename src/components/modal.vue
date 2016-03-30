<template lang="jade">
div(v-show="showing")
  .modal-bg(@click="close")
  .modal-holder(@click="close")
    .modal(@click.stop="")
      slot
      .close(@click="showing = false", v-if="closeable")
</template>

<script>
export default {
  props: {
    showing: Boolean,
    closeable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close: function () {
      if (this.closeable) this.showing = false
    }
  }
}
</script>
