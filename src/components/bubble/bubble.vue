<template>
    <div class="num">{{totalCount}}</div>
</template>

<script>
export default {
    props: {
        totalCount: {
            type: Number
        }
    }
}
</script>

<style lang="stylus" scoped>
  .num
    position: absolute
    top: 0
    right: 0
    display: inline-block
    padding: 0 5px
    height: 16px
    line-height: 16px
    text-align: center
    color: #fff
    background: #f01414
    border-radius: 16px
    font-family: Helvetica
    font-size: 9px
    box-shadow: 4px 0 8px rgba(0,0,0,.4)
</style>
