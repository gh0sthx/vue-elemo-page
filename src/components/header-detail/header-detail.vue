<template>
  <transition name='fade'>
    <div class="header-detail" v-show="visable">
      <div class="detail-wrap">
        <div class="detail-main">
          <div class="name">{{seller.name}}</div>
          <div class="star">
            <star :size=3 :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li v-for="(item,index) of seller.supports" :key="index" class="item">
              <support-icon :size=1 :type="item.type" class="icon"></support-icon>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import SupportIcon from 'components/support-icon/support-icon'
import Star from 'components/star/star'

export default {
  name: 'header-detail',
  data() {
    return {
      visable: false
    }
  },
  methods: {
    show() {
      this.visable = true
    },
    hide() {
      this.visable = false
    }
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    SupportIcon,
    Star
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.header-detail
  position: fixed
  top: 0
  left: 0
  z-index: 100
  width: 100%
  height: 100%
  overflow: auto
  background: $background-dark
  backdrop-filter: blur(10px)
  opacity: 1
  color: $color-white
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s
  &.fade-enter, &.fade-leave-active
    opacity: 0
    background: $background-dark1
  .detail-wrap
    display: inline-block
    width: 100%
    min-height: 100%
    .detail-main
      margin-top: 64px
      padding-bottom: 64px
      .name
        line-height: 16px
        padding: 32px 0 16px 0
        text-align: center
        font-size: $fontsize-large
        font-weight: 700
      .star
        height: 24px
        text-align: center
        .star-item
          margin: 0 10px
      .title
        width: 80%
        margin: 28px auto 24px
        display: flex
        .line
          flex: 1
          position: relative
          top: -6px
          border-bottom: 1px solid rgba(255,255,255,.2)
        .text
          line-height: 14px
          padding: 0 12px
          font-size: 14px
          font-weight: 700

      .supports
        width: 80%
        margin: 24px auto 28px
        .item
          height: 16px
          margin: 0 12px 12px
          .icon
            margin-right: 6px
          .text
            line-height: 16px
            font-size: $fontsize-small
            font-weight: 200

      .bulletin
        width: 80%
        margin: 0 auto
        padding: 0 12px
        box-sizing: border-box
        font-size: $fontsize-small
        line-height: 24px
        font-weight: 200
  .detail-close
    position: relative
    width: 32px
    height: 32px
    margin: -64px auto 0 auto
    font-size: 32px

</style>
