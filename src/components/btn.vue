<template lang="jade">
a.btn(:href="href", :class="[color, disabled ? 'disabled' : '', passive ? 'passive' : '']")
  i(v-if="icon", :class="icon")
  slot
</template>

<script>
export default {
  props: {
    href: null,
    icon: null,
    color: null,
    disabled: false,
    passive: false
  }
}
</script>
