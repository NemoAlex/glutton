<template lang="jade">
a.btn(:href="href", :class="[color, {disabled: disabled, passive: passive, 'with-icon': icon, 'no-title': !_slotContents}]")
  i(v-if="icon", :class="icon")
  slot
</template>

<script>
export default {
  props: {
    href: String,
    icon: String,
    color: String,
    disabled: Boolean,
    passive: Boolean
  }
}
</script>
