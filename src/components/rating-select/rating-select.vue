<template>
	<div>
		<div class="wrap">
			<div class="select">
				<span class="normal" @click="select(2)" :class="{active:selectType===2}">{{desc.all}}<span class="num">{{ratings.length}}</span></span>
				<span class="normal" @click="select(0)" :class="{active:selectType===0}">{{desc.positive}}<span class="num">{{positives.length}}</span></span>
				<span class="normal negative" @click="select(1)" :class="{active:selectType===1}">{{desc.negative}}<span class="num">{{negatives.length}}</span></span>
			</div>
		</div>
		<div class="switch" @click="toggle" :class="{active:onlyContent}">
			<span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

const EVENT_SELECT = 'select'
const EVENT_SWITCH = 'toggle'
export default {
  props: {
		selectType: {
			type: Number,
			default: ALL
		},
		ratings: {
			type: Array,
			default() {
				return []
			}
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '一般'
				}
			}
		}
	},
	methods: {
		select(type) {
			this.$emit(EVENT_SELECT, type)
		},
		toggle() {
			this.$emit(EVENT_SWITCH)
		}
	},
	computed: {
		positives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE
			})
		},
		negatives() {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"
	.wrap
		padding: 0 18px
		.select
			height: 32px
			padding: 18px 0
			border-1px(#e6e7e8)
			.normal
				float: left
				margin-right: 8px
				height: 32px
				width: 60px
				line-height: 32px
				text-align: center
				border-radius: 2px
				background: #ccecf8
				font-size: 12px
				color: #4d555d
				.num
					font-size: 8px
					margin-left: 2px
				&.active
					color: #fff
					background: #00a0dc
			.negative
				background: #e9ebec
	.switch
		height: 50px
		line-height: 50px
		padding: 0 18px
		border-bottom: 1px solid #e6e7e8
		span
			display: inline-block
			font-size: 0
			vertical-align: top;
		.icon-check_circle
			font-size: 20px
			color: #b7bbbf
			margin-right: 6px
			margin-top: 15px
		.text
			font-size: 12px
			color: #93999f
		&.active
			.icon-check_circle
				color: #00a0dc

</style>
