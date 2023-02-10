<template>
    <view>
        <view :style="{height: headerBarHeight + 'px'}">
			<tui-navigation-bar @init="initNavigation($event)" @change="opacityChange($event)" :isOpacity="false" title="消息"
				:backgroundColor="themeStyles.themeBackgroundColor" color="#FFF" fontSize="32rpx" :scrollTop="64"
				:arrowHidden="true">
			</tui-navigation-bar>
		</view>
		<view class="content-container">
			chat
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
        return {
            // 自定义导航栏的高度
			headerBarHeight: 0,
			// 主题颜色
			themeStyles: styles,
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
    }
}
</script>

<style lang="scss" scoped>

</style>