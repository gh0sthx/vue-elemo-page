<template>
<transition name="fade" @after-leave="afterLeave">
	<div class="food-wrap" v-show="visiable">
		<cube-scroll ref="scroll" :data="ratings">
			<div class="food">
				<div class="top-img">
					<img :src="food.image" />
					<div class="back" @click="back">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="text">
					<div class="title">{{food.name}}</div>
					<div class="dec">
						<span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now"><i>￥</i>{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="ctrol-wrap">
						<cart-ctrol :food="food" @add="addFood"></cart-ctrol>
					</div>
					<transition name="add">
						<div class="buy-btn" v-show="!food.count" @click="buy">加入购物车</div>
					</transition>
				</div>
				<split></split>
				<div class="info">
					<div class="title">商品介绍</div>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<div class="title">商品评价</div>
					<rating-select
						:ratings="ratings"
						:desc="desc"
						:selectType="selectType"
						:onlyContent="onlyContent"
						@select="onSelect"
						@toggle="onToggle"></rating-select>
					<ul class="list" v-show="computedRatings && computedRatings.length">
						<li class="list-item" v-for="(item,index) in computedRatings" :key="index">
							<div class="user">
								<span class="name">{{item.username}}</span>
								<img class="avatar" :src="item.avatar" />
							</div>
							<div class="time">{{formateTime(item.rateTime)}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>
								{{item.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!computedRatings || !computedRatings.length">暂无评价</div>
				</div>

			</div>
		</cube-scroll>
	</div>
</transition>
</template>

<script>
import moment from 'moment'
import CartCtrol from 'components/cart-ctrol/cart-ctrol'
import Split from 'components/split/split'
import RatingSelect from 'components/rating-select/rating-select'
import ratingMixin from 'common/mixins/rating'
const EVENT_SHOW = 'show'
const EVENT_HIDE = 'hide'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'
export default {
 	name: 'food',
  	mixins: [ratingMixin],
	props: {
		food: {
			type: Object
			}
	},
	data() {
		return {
			visiable: {
				type: Boolean,
				default: false
			},
			desc: {
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			}
		}
	},
	methods: {
		show() {
			this.visiable = true
			this.$emit(EVENT_SHOW)
			this.$nextTick(() => {
				this.$refs.scroll.refresh() // 显示的时候更新重新计算高度
			})
		},
		hide() {
			this.visiable = false
			this.$emit(EVENT_HIDE)
		},
		back() {
			this.visiable = false
		},
		buy(event) {
			this.$set(this.food, 'count', 1)
			this.$emit(EVENT_ADD, event.target)
		},
		afterLeave() {
			this.$emit(EVENT_LEAVE)
		},
		addFood(target) {
			this.$emit(EVENT_ADD, target)
		},
		formateTime(time) {
			return moment(time).format('YYYY-MM-DD hh:mm')
		}
	},
	computed: {
		ratings() {
			return this.food.ratings
		},
	},
	components: {
		CartCtrol,
		Split,
		RatingSelect
	}
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"
.food-wrap
	position: fixed
	top: 0
	left: 0
	bottom: 48px
	z-index: 30
	width: 100%
	background: #fff
	&.fade-enter-active,&.fade-leave-active
		transition: all 0.4s linear
	&.fade-enter,&.fade-leave-active
		transform: translate3d(100%,0,0)
	.top-img
		position: relative
		width: 100%
		height: 0
		padding-bottom: 100%
		img{
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
		}
		.back
			position: absolute
			top: 0
			left: 0
			padding: 10px
			font-size: 14px
			color: #fff
	.text
		position: relative
		padding: 18px
		.title
			height: 14px
			line-height: 14px
			font-size: 14px
			color: #07111b
			font-weight: 700
		.dec
			height: 25px
			line-height: 25px
			font-size: 10px
			color: #93999f
			.sellCount
				margin-right: 12px
		.price
			height: 25px
			line-height: 25px
			margin-top: 8px
			.now
				margin-right: 8px
				color: #f01414
				font-size: 14px
				font-weight: 700
				i
					font-size: 10px
					font-style: normal
			.old
				font-size: 10px
				color: #93999f
				text-decoration: line-through;
		.ctrol-wrap
			position: absolute
			bottom: 12px
			right: 18px
		.buy-btn
			position: absolute
			bottom: 18px
			right: 18px
			height: 24px
			line-height: 24px
			width: 74px
			text-align: center
			color: #fff
			font-size: 10px
			background: #00a0dc
			border-radius: 12px
			&.add-enter-active,&.add-leave-active
				transition: all 0.3s linear
			&.add-enter,&.add-leave-active
				opacity: 0
				z-index: -1
	.info
		padding: 12px 18px 16px
		.title
			height: 25px
			line-height: 25px
			font-size: 14px
			color: #07111b
		.text
			margin: 0
			padding: 0
			font-size: 12px
			color: #4d555d
			line-height: 24px
	.rating
		margin-top: 18px
		.title
			line-height: 14px
			font-size: 14px
			color: #07111b
			padding: 0 18px
		.no-rating
			padding: 18px
			font-size: 12px
			color: #93999f
		.list
			padding: 0 18px
			.list-item
				position: relative
				border-1px(#e6e7e8)
				.user
					position: absolute
					right: 0
					top: 0
					.avatar
						width: 12px
						height: 12px
						border-radius: 50%
						overflow: hidden
						box-sizing: border-box
						border: 1px solid #b7b5af
					.name
						line-height: 12px
						font-size: 10px
						margin-right: 16px
						color: #93999f
				.time
					height: 18px
					line-height: 18px
					margin-top: 13px
					font-size: 10px
					color: #93999f
				.text
					line-height: 26px
					margin: 0
					padding: 0
					padding-bottom: 14px
					font-size: 12px
					color: #07111b
					.icon-thumb_up
						margin-right: 4px
						color: #00a0dc
					.icon-thumb_down
						margin-right: 4px
						color: #b7bbbf

</style>
