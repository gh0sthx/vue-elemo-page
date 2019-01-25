<template>
  <div class="header" @click="showDetail">
  	<div class="content-wrapper">
      <div class="content">
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64">
        </div>
        <div class="info-business">
          <div class="title">
            <span class="brand"></span>
            <span class="text">{{seller.name}}</span>
          </div>
          <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
          <div class="supports" v-if="seller.supports">
            <support-icon class="support-icon" :size='1' :type="seller.supports[0].type"></support-icon>
            <span class="icon"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="supportsnum" v-if="seller.supports">{{seller.supports.length}}个 <i class="icon-keyboard_arrow_right"></i></div>
      </div>
    </div>
    <div class="bulletin">
      <span class="title"></span>
      <span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SupportIcon from 'components/support-icon/support-icon'

  export default {
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      showDetail() {
        this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
          $props: {
            seller: 'seller'
          }
        }),
        this.headerDetailComp.show()
      }
    },
    components: {
      SupportIcon
   }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .header
    position: relative
    overflow: hidden
    color: $color-white
    background: $background-dark
    .content
      position: relative
      display: flex
      align-items: center center
      padding: 24px 12px 12px 18px
      .avatar
        flex: 0 0 64px
        margin-right: 16px
        border-radius: 2px
      .info-business
        flex: 1
        margin-top: 2px
        .title
          display: flex
          align-items: center center
          .brand
            width: 30px
            height: 18px
            bg-image ('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            margin-right:12px
            .text
              font-size: $fontsize-large
              font-weight: bold
        .description
          line-height: 30px
          font-size: $fontsize-small
          font-weight: 200
        .supports
          display: flex
          align-items: center
          line-height: 12px
          font-size: $fontsize-small-s
          font-weight: 200
          .support-icon
            margin-right: 4px
          line-height: 20px
          font-size: $fontsize-small-s
          font-weight: 200

      .supportsnum
        position: absolute
        right: 12px
        bottom: 18px
        height: 24px
        line-height: 24px
        padding: 0 10px
        border-radius: 12px
        font-size: $fontsize-small-s
        background: $background-dark5

    .bulletin
      position: relative
      display: flex
      align-items: center
      height: 28px
      line-height: 28px
      padding: 0 12px
      background: $background-dark1
      .title
        flex: 0 0 22px
        width: 22px
        height: 12px
        margin-right: 4px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .text
        flex: 1
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        font-size: $fontsize-small-s
      .icon-keyboard_arrow_right
        flex: 0 0 10px
        width: 10px
        font-size: $fontsize-small-s

    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)

</style>
