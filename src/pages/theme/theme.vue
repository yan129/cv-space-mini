<template>
    <view class="theme-container">
        <view :style="{height: headerBarHeight + 'px'}">
			<tui-navigation-bar @init="initNavigation($event)" @change="opacityChange($event)" :isOpacity="false" title="专题"
				:backgroundColor="themeStyles.themeBackgroundColor" color="#FFF" fontSize="32rpx" :scrollTop="64"
				:arrowHidden="true">
			</tui-navigation-bar>
		</view>
		<view class="content-container">
            theme
            <view class="paging-container">
                <z-paging ref="paging" :use-page-scroll="true" v-model="dataList" @query="queryList">
                    <view class="item" v-for="(item,index) in dataList" :key="index">
                        <view class="item-title">{{item}}</view>
                    </view>
                </z-paging>
            </view>
		</view>
		<view class="tabbar-container">
			<tab-bar></tab-bar>
		</view>
    </view>
</template>

<script>
import styles from '../../uni.module.scss';
export default {
    data() {
        return  {
            // 自定义导航栏的高度
			headerBarHeight: 0,
			// 主题颜色
			themeStyles: styles,
            dataList: []
        }
    },
    computed: {
        styles() {
			return styles;
		},
    },
    methods: {
        initNavigation($event) {
			this.headerBarHeight = $event.height;
		},
		opacityChange($event) {
			console.log($event)
		},
        queryList(pageNo, pageSize) {

            // //这里的pageNo和pageSize会自动计算好，直接传给服务器即可
            // //这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过this.$refs.paging.complete(请求回来的数组)将请求结果传给z-paging
            // this.$request.queryList({ pageNo,pageSize }).then(res => {
            //     //请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
                this.$refs.paging.complete([1,2,3,4,5]);
            // }).catch(res => {
            //     //如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
            //     //注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
            //     //在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
            //     this.$refs.paging.complete(false);
            // })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>