<template>
  <div class="cart-shop">
    <div class="cart-wrap"  @click="toggleList">
      <div class="left-info">
        <div class="logo-wrap">
          <div class="logo" :class="{'highlight':totalPrice>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <bubble v-show="totalCount>0" :totalCount="totalCount"></bubble>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="deliver" :class="{active:totalPrice>=minPrice}" @click="payPrice">
        {{pay}}
      </div>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition
            @before-enter="beforedrop"
            @enter="dropping"
            @after-enter='afterdrop'
          >
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from 'components/bubble/bubble'

const LENG = 10
const innerClsHook = 'inner-hook'
function creatBall() {
  let balls = []
  for (let i = 0; i < LENG; i++) {
    balls.push({
      show: false
    })
    return balls
  }
}

export default {
  data() {
    return {
      balls: creatBall(),
      listFold: this.fold
    }
  },
  props: {
    selectFood: {
      type: Array,
      default() {
          return []
      }
    },
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    fold: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.dropballs = []
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFood.forEach((food) => {
        total += food.count * food.price
      })
      return total
    },
    totalCount() {
      let total = 0
      this.selectFood.forEach((food) => {
        total += food.count
      })
      return total
    },
    pay() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropballs.push(ball)
          return
        }
      }
    },
    beforedrop(el) {
      const ball = this.dropballs[this.dropballs.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 32)
      el.style.display = ''
      el.style.transform = el.style.WebkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName(innerClsHook)[0]
      inner.style.transform = inner.style.WebkitTransform = `translate3d(${x}px,0,0)`
    },
    dropping(el, done) {
        // 驱动重绘制
       this._reflow = document.body.offsetHeight
        el.style.transform = el.style.WebkitTransform = 'translate3d(0,0,0)'
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.WebkitTransform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
    },
    afterdrop(el) {
      const ball = this.dropballs.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList() {
      if (this.listFold) {
        if (!this.totalCount) {
          return
        }
        this.listFold = false
        this._showCartList()
        this._showCartSticky()
      } else {
        this.listFold = true
        this._hideCartList()
      }
    },
    _showCartList() {
      this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
        $props: {
          selectFood: 'selectFood'
        },
        $events: {
          hide: () => {
            this.listFold = true // 点击背景影藏的时候把listFold设置为true
          },
          add: (el) => {
            this.shopCartStycky.drop(el)
          },
          leave: () => {
            this._hideCartSticky()
          }
        }
      })
      this.shopCartListComp.show()
    },
    _hideCartList() {
      const com = this.sticky ? this.$parent.list : this.shopCartListComp // 判断是否存在sticky
      com.hide() && com.hide()// 有hide就执行
    },
    _showCartSticky() {
      this.shopCartStycky = this.shopCartStycky || this.$createShopCartSticky({
        $props: {
          selectFood: 'selectFood',
          minPrice: 'minPrice',
          deliveryPrice: 'deliveryPrice',
          fold: 'listFold',
          list: this.shopCartListComp
        }
      })
      this.shopCartStycky.show()
    },
    _hideCartSticky() {
      this.shopCartStycky.hide()
    },
    payPrice(e) {
      if (this.totalPrice < this.minPrice) {
        return
      }
      this.DiaoCom = this.$createDialog({
        title: '支付',
        content: `共${this.totalPrice}元`
      })
      this.DiaoCom.show()
      e.stopPropagation()
    }

  },
  watch: {
    fold(newVal) {
      this.listFold = newVal
    },
    totalCount(newVal) {
      if (!this.listFold && !newVal) {
        this._hideCartList()
      }
    }
  },
  components: {
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.cart-shop
  background: $clor-dark1
  height: 48px
  .cart-wrap
    display: flex
    .left-info
      flex:1
      display: flex
      .logo-wrap
        position: relative
        z-index: 999
        top: -10px
        left: 12px
        width: 56px
        height: 56px
        border-radius: 50%
        background: #08121c
        padding: 6px
        box-sizing: border-box
        .logo
          width: 44px
          height: 44px
          border-radius: 50%
          background: #2b343c
          color: #80858a
          font-size: 20px
          line-height: 44px
          text-align: center
          &.highlight
            background: #00a0dc
            color: #fff
      .price
        line-height: 48px
        margin: 0 12px
        font-size: 16px
        color: #919396
        font-weight: bold
        &.highlight
         color: #fff
      .desc
        height: 24px
        line-height: 24px
        margin: 12px 0
        padding-left: 12px
        border-left: 1px solid #2c343d
        color: #72777d
        font-size: 10px
    .deliver
      width: 105px
      height: 48px
      line-height: 48px
      text-align: center
      background: #2b333b
      color: #808589
      font-size: 12px
      font-weight: bold
      &.active
        background: #00b43c
        color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 999999
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          display: inline-block
          width: 16px
          height: 16px
          border-radius: 50%
          background: $color-blue
          transition: all 0.4s linear

</style>
