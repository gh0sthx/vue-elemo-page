<template>
  <transition name="fade">
    <cube-popup
      type="shop-cart-list"
      ref="popup"
      v-show="visible"
      :mask-closable=true
      position="bottom"
      :z-index="90"
      @mask-click="maskClick"
    >
      <transition name="move" @after-leave="afterLeave">
        <div class="shop-cart-list-content" @click="hide">
          <div class="title">
            <div class="name">购物车</div>
            <div class="btn" @click.stop="empty">清空</div>
          </div>

          <cube-scroll class="list" ref="listContent">
            <ul>
              <li class="list-item" v-for="(item,index) in selectFood" :key="index">
                <div class="name">{{item.name}}</div>
                <div class="price">￥{{item.price*item.count}}</div>
                <div class="cart-ctrol-wrap">
                  <cart-ctrol :food="item" @add="onadd"></cart-ctrol>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>
<script type="text/ecmascript-6">
import CartCtrol from 'components/cart-ctrol/cart-ctrol'
  const COMPONENT_NAME = 'shop-cart-list'
  const EVENT_ADD = 'add'
  const EVENT_HIDE = 'hide'
  const EVENT_LEAVE = 'leave'
  export default {
    name: COMPONENT_NAME,
    props: {
      selectFood: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
        this.$emit('show')
        this.$nextTick(() => {
          this.$refs.listContent.refresh() // 显示的时候更新重新计算高度
        })
      },
      hide() {
        this.visible = false
        this.$emit(EVENT_HIDE)
      },
      maskClick() {
        this.hide()
      },
      afterLeave() {
        this.$emit(EVENT_LEAVE)
      },
      onadd(target) {
        this.$emit(EVENT_ADD, target)
      },
      empty() {
        this.DialogComp = this.$createDialog({
          type: 'confirm',
          content: '确认清空吗？',
          $events: {
            confirm: () => {
              this.selectFood.forEach((food) => {
                food.count = 0
              })
              this.hide()
            }
          }
        })
        this.DialogComp.show()
      }
    },
    components: {
      CartCtrol
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin';
  .cube-shop-cart-list
    bottom: 48px
    &.fade-enter,&.fade-leave-active
      opacity: 0
    &.fade-active,&.fade-leave-active
      transition: all 0.3s  ease-in-out
    .move-enter, .move-leave-active
      transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
      transition: all .3s ease-in-out
    .shop-cart-list-content
      .title
        height: 39px
        line-height: 39px;
        border-bottom: 1px solid #dbdee1
        background: #f3f5f7
        padding: 0 18px
        .name
          float: left
          font-size: 14px
          color: #07111b
        .btn
          float: right
          color: #00a0dc
          font-size: 12px
      .list
        max-height: 217px
        padding:0 18px
        overflow: hidden
        background: #fff
        .list-item
          display: flex
          height: 48px
          border-1px(#e6e7e8)
          .name
            flex: 1
            line-height: 48px
            font-size: 14px
            color: #07111b
          .price
            width: 42px
            line-height: 48px
            text-align: center
            color: #f01414
            font-size: 10px
            font-weight: 700
          .cart-ctrol-wrap
            margin-top: 6px
</style>
