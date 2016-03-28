<template lang="jade">
div(v-show="showing")
  .modal-bg(@click="showing = false")
  .modal-holder(@click="showing = false")
    .modal(@click.stop="")
      slot
</template>

<script>
export default {
  props: {
    showing: Boolean
  }
}
</script>
