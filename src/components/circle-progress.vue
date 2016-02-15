<template lang="jade">
canvas#a.circle-progress(:width="size*2", :height="size*2", v-el:canvas, :style="{ width: size + 'px', height: size + 'px'}")
</template>

<script>
export default {
  data () {
    return {
      size: 20,
      ratio: 2,
      lineWidth: 4,
      colors: {
        primary: '#37B963',
        bg: '#D8D8D8'
      }
    }
  },
  props: {
    progress: 0.2
  },
  methods: {
    drawBackground: function () {
      let context = this.$els.canvas.getContext('2d')
      let radius = this.size / 2 * this.ratio
      context.lineWidth = this.lineWidth * this.ratio
      context.beginPath()
      context.arc(radius, radius, 8 * this.ratio, 0, 2 * Math.PI)
      context.strokeStyle = this.colors.bg
      context.stroke()
    },
    drawProgress: function () {
      let context = this.$els.canvas.getContext('2d')
      let radius = this.size / 2 * this.ratio
      context.lineWidth = this.lineWidth * this.ratio
      context.beginPath()
      context.arc(radius, radius, 8 * this.ratio, 1.5 * Math.PI, (1.5 + this.progress * 2) * Math.PI)
      context.strokeStyle = this.colors.primary
      context.stroke()
    },
    clear: function () {
      let context = this.$els.canvas.getContext('2d')
      context.clearRect(0, 0, this.size * this.ratio, this.size * this.ratio)
    }
  },
  ready: function () {
    console.log('---------------')
    console.log(this.progress)
    console.log('---------------')
    this.drawBackground()
    this.drawProgress()
  },
  watch: {
    'progress': function () {
      this.clear()
      this.drawBackground()
      this.drawProgress()
    }
  }
}
</script>
