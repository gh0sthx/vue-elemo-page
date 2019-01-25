<template>
  <div class="tab">

    <cube-tab-bar
      v-model="selectedLabel"
      show-slider
      class="border-bottom-1px"
      :use-transition="disabled"
      :data="tabs"
      ref="tabNav"
    >
    </cube-tab-bar>

    <div class="slid-wrap">
      <cube-slide
        ref="slide"
        :loop="false"
        :initial-index="index"
        :auto-play="false"
        :show-dots="false"
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <!-- 设置动态组件 -->
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
 export default {
   props: {
     tabs: {
       type: Array,
       default() {
         return []
       }
     },
     initialIndex: {
       type: Number,
       default: 0
     }
   },
  data () {
    return {
      disabled: false,
      index: this.initialIndex, // 默认显示第几个
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        return this.index = this.tabs.findIndex((value) => {
          return value.label === newVal
        })
      }
    }
  },
  methods: {
    changePage(current) {
      this.index = current
      const component = this.$refs.component[current]
      component.fetch && component.fetch() // 动态获取数据
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    }
  },
  mounted() {
    this.changePage(this.index)
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.border-bottom-1px
  border-1px($color-row-line)

.tab
  display: flex
  flex-direction: column
  height: 100%
  >>>.cube-tab
    padding 10px 0
  .slid-wrap
    flex: 1
    overflow: hidden
</style>
