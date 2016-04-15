<style scoped lang="sass">
.circle-progress
  display: inline-block
  .progress
    -webkit-transition: all ease-out .8s;
    transition: all ease-out .8s;
</style>

<template lang="jade">
.circle-progress
  svg(v-if="displayStatus !== 'complete' && displayStatus !== 'uploading'", :width="size", :height="size", :viewbox="'0 0 ' + size + ' ' + size", version="1.1", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink", fill="none")
    circle(:cx="size/2", :cy="size/2", :r="(size-lineWidth)/2", :stroke="colors.bg", :stroke-width="lineWidth")
    circle.progress(:cx="size/2", :cy="size/2", :r="(size-lineWidth)/2", transform="translate(10, 10) rotate(-90) translate(-10, -10)", :stroke-width="lineWidth", :stroke="progressColor", :style="{'stroke-dasharray': totalPoints, 'stroke-dashoffset': progressPoints}")
    path.pause-icon(v-if="displayStatus === 'paused'", :fill="colors.bg", :transform="'scale('+size/20+')'", d="M13,7.25 L13,12.75 C13,12.8177087 12.9752607,12.8763018 12.9257812,12.9257812 C12.8763018,12.9752607 12.8177087,13 12.75,13 L10.75,13 C10.6822913,13 10.6236982,12.9752607 10.5742188,12.9257812 C10.5247393,12.8763018 10.5,12.8177087 10.5,12.75 L10.5,7.25 C10.5,7.18229133 10.5247393,7.12369816 10.5742188,7.07421875 C10.6236982,7.02473934 10.6822913,7 10.75,7 L12.75,7 C12.8177087,7 12.8763018,7.02473934 12.9257812,7.07421875 C12.9752607,7.12369816 13,7.18229133 13,7.25 L13,7.25 Z M9.5,7.25 L9.5,12.75 C9.5,12.8177087 9.47526066,12.8763018 9.42578125,12.9257812 C9.37630184,12.9752607 9.31770867,13 9.25,13 L7.25,13 C7.18229133,13 7.12369816,12.9752607 7.07421875,12.9257812 C7.02473934,12.8763018 7,12.8177087 7,12.75 L7,7.25 C7,7.18229133 7.02473934,7.12369816 7.07421875,7.07421875 C7.12369816,7.02473934 7.18229133,7 7.25,7 L9.25,7 C9.31770867,7 9.37630184,7.02473934 9.42578125,7.07421875 C9.47526066,7.12369816 9.5,7.18229133 9.5,7.25 L9.5,7.25 Z")
  svg(v-if="displayStatus === 'complete'", :width="size", :height="size", :viewbox="'0 0 ' + size + ' ' + size", version="1.1", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink", fill="none")
    g(:transform="'scale('+size/20+')'")
      circle(:fill="colors.primary", cx="10", cy="10", r="10")
      path(d="M16.0546875,7.421875 C16.0546875,7.63020937 15.9817716,7.80729094 15.8359375,7.953125 L10.1796875,13.609375 L9.1171875,14.671875 C8.97135344,14.8177091 8.79427187,14.890625 8.5859375,14.890625 C8.37760313,14.890625 8.20052156,14.8177091 8.0546875,14.671875 L6.9921875,13.609375 L4.1640625,10.78125 C4.01822844,10.6354159 3.9453125,10.4583344 3.9453125,10.25 C3.9453125,10.0416656 4.01822844,9.86458406 4.1640625,9.71875 L5.2265625,8.65625 C5.37239656,8.51041594 5.54947813,8.4375 5.7578125,8.4375 C5.96614687,8.4375 6.14322844,8.51041594 6.2890625,8.65625 L8.5859375,10.9609375 L13.7109375,5.828125 C13.8567716,5.68229094 14.0338531,5.609375 14.2421875,5.609375 C14.4505219,5.609375 14.6276034,5.68229094 14.7734375,5.828125 L15.8359375,6.890625 C15.9817716,7.03645906 16.0546875,7.21354063 16.0546875,7.421875 L16.0546875,7.421875 Z", fill="#FFFFFF")
  svg(v-if="displayStatus === 'uploading'", :width="size", :height="size", :viewbox="'0 0 ' + size + ' ' + size", version="1.1", xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink", fill="none")
    g(:transform="'scale('+size/20+')'")
      circle(:fill="colors.primary", cx="10", cy="10", r="10")
      path(d='M14.5348547,10.4484884 L11.8106105,10.4484884 L11.8148205,14.5448607 C11.8148205,14.6772899 11.7722547,14.7860694 11.6871216,14.8712024 C11.6019885,14.9563355 11.493209,14.9989014 11.3607798,15.0019185 L8.63653564,14.9989014 C8.50410644,14.9989014 8.39532695,14.9563355 8.31019389,14.8712024 C8.22506083,14.7860694 8.18249494,14.6772899 8.18249494,14.5448607 L8.1782849,10.4484884 L5.4540407,10.4484884 C5.3216115,10.4484884 5.212832,10.4059225 5.12769895,10.3207895 C5.04256589,10.2356564 5,10.1268769 5,9.9944477 C5,9.88093696 5.04729543,9.76742792 5.14188772,9.65391718 L9.66810595,5.12769895 C9.77215746,5.04256589 9.88093696,5 9.9944477,5 C10.1079584,5 10.2167379,5.04256589 10.3207895,5.12769895 L14.8611965,9.66810595 C15.0030849,9.81945361 15.0361917,9.98498762 14.9605179,10.164713 C14.884844,10.3538975 14.7429577,10.4484884 14.5348547,10.4484884 Z', fill='#FFFFFF')


</template>

<script>
export default {
  data () {
    return {
      size: 20,
      lineWidth: 3,
      colors: {
        primary: '#37B963',
        bg: '#D8D8D8',
        dark: '#979797'
      }
    }
  },
  props: {
    progress: Number,
    status: String
  },
  computed: {
    displayStatus: function () {
      if (this.status === 'complete' || (this.status === 'paused' && this.progress === 1)) {
        return 'complete'
      } else if (this.status === 'active' && this.progress === 1) {
        return 'uploading'
      } else if (this.status === 'active') {
        return 'active'
      } else if (this.status === 'waiting') {
        return 'waiting'
      } else if (this.status === 'paused') {
        return 'paused'
      } else if (this.status === 'error') {
        return 'error'
      } else if (this.status === 'removed') {
        return 'removed'
      }
    },
    progressColor: function () {
      return this.status === 'active' ? this.colors.primary : this.colors.dark
    },
    totalPoints: function () {
      return (this.size - this.lineWidth) * Math.PI
    },
    progressPoints: function () {
      return (1 - this.progress) * this.totalPoints
    }
  }
}
</script>
