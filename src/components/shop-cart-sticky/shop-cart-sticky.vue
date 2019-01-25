<template>
<div class="shop-cart-sticky" v-show="visiable">
    <cart-shop
      ref="CartShop"
      :selectFood="selectFood"
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
      :fold="fold"
      :list="list"
      :sticky=true
    >
    </cart-shop>
</div>
</template>

<script>
import CartShop from 'components/cart-shop/cart-shop'
const EVENT_HIDE = 'hide'
const EVENT_SHOW = 'hide'
export default {
  name: 'shop-cart-sticky',
  data() {
    return {
      visiable: false
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
    list: {
        type: Object,
        default() {
            return {}
        }
    }
  },
  methods: {
    drop(el) {
      this.$refs.CartShop.drop(el)
    },
    show() {
      this.visiable = true
      this.$emit(EVENT_SHOW)
    },
    hide() {
      this.visiable = false
      this.$emit(EVENT_HIDE)
    }
  },
  components: {
    CartShop
  }

}
</script>

<style lang="stylus" scoped>
.shop-cart-sticky
  position: absolute
  left: 0
  bottom: 0
  z-index: 999
  width: 100%
  height: 48px
</style>
