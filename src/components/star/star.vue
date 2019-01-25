<template>
  <div class="star-wrap" :class="starType">
    <span v-for="(item,index) in starCls" :class="item"  :key="index" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5
const ClS_ON = 'on'
const ClS_HALF = 'half'
const ClS_OFF = 'off'

export default {
  props: {
    score: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    starCls() {
      let result = []
      const score = Math.floor(this.score * 2) / 2
      const half = score % 1 !== 0
      const light = Math.floor(score)
      for (let i = 0; i < light; i++) {
        result.push(ClS_ON)
      }
      if (half) {
        result.push(ClS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(ClS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"

  .star-wrap
    display: flex
    align-items: center
    justify-content: center
    .star-item
      background-repeat: no-repeat
    &.star-1
      .star-item
        width: 12px
        height: 12px
        background-size: 12px 12px
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
    &.star-2
      .star-item
        width: 18px
        height: 18px
        background-size: 18px 18px
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-3
      .star-item
        width: 24px
        height: 24px
        background-size: 24px 24px
        margin-right: 22px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')

</style>
