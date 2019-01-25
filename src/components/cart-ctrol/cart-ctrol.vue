<template>
  <div class="cart-ctrol">
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <span class="inner icon-remove_circle_outline icon"></span>
      </div>
    </transition>
    <div class="sum" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle icon"  @click.stop="add"></div>
  </div>
</template>

<script>
const EVENT_ADD = 'add'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit(EVENT_ADD, event.target)
    },
    decrease() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.cart-ctrol
  display: flex
  align-items: center
  .cart-decrease
    display: inline-block
    padding: 6px
    opacity: 1
    .inner
      display: inline-block
      transition: all 0.3s linear
      transform: rotate(0)
    &.fade-enter-active,&.fade-leave-active
      transition: all 0.3s linear
    &.fade-enter,&.fade-leave-active
      opacity: 0
      transform: translate3d(24px,0,0)
      .inner
        transform: rotate(180deg)
  .icon
    line-height: 24px
    font-size: 24px
    color: $color-blue
  .sum
    width: 12px
    line-height: 24px
    text-align: center
    font-size: 10px
    color: rgb(147,153,159)
  .cart-add
    display: inline-block
    padding: 6px
</style>
