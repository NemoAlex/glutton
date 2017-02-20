<style lang="sass" scoped>
@import "../assets/variables.sass"
.btf
  position: absolute
  bottom: 7%
  display: block
  width: 100%
  height: 6px
</style>

<template lang="jade">
canvas.btf
</template>

<script>
export default {
  props: {
    bitfield: String,
    numPieces: String
  },
  methods: {
    updateBitfield: function () {
      let canvas = this.$el
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#28a956'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let chunks = this.getChunksFromHex(this.bitfield, this.numPieces)
      let x = 0
      chunks.forEach((element, index) => {
        let dx = element.ratio * canvas.width
        if (element.show) {
          ctx.fillRect(x, 0, dx, canvas.height)
        }
        x += dx
      })
    },
    getChunksFromHex: function (bitfield, numOfPieces) {
      var chunks = []
      var len = 0
      var numPieces = parseInt(numOfPieces)
      if (!bitfield) return []

      var totalDownloaded = 0
      if (numPieces > 1) {
        var chunkRatio = 1 / numPieces
        var piecesProcessed = 0
        for (var i = 0; i < bitfield.length; i++) {
          var hex = parseInt(bitfield[i], 16)
          for (var j = 1; j <= 4; j++) {
            var bit = hex & (1 << (4 - j))
            if (bit) totalDownloaded++
            var prog = !!bit
            if (len >= 1 && chunks[len - 1].show === prog) {
              chunks[len - 1].ratio += chunkRatio
            } else {
              chunks.push({
                ratio: chunkRatio,
                show: prog
              })
              len++
            }
            piecesProcessed++
            if (piecesProcessed === numPieces) {
              return chunks
            }
          }
        }
      }
      return chunks
    }
  },
  watch: {
    'bitfield': function () {
      this.updateBitfield()
    }
  }
}
</script>
