<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrap">
      <tab :tabs="tabs" ></tab>
    </div>
  </div>
</template>

<script>
import qs from 'query-string'
import VHeader from 'components/v-header/v-header'
import { getSeller, getGoods, getRatings } from 'api'
import Tab from 'components/tab/tab'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'

export default {
  data() {
    return {
      seller: {
        id: qs.parse(location.search).id
      }

    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller({
          id: this.seller.id
        }).then((seller) => {
          this.seller = Object.assign({}, this.seller, seller)
      })
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
#app
  .tab-wrap
    position: fixed;
    top: 134px
    left: 0
    bottom: 0
    right: 0
</style>
