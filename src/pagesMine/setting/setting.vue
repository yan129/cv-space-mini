<template>
    <view class="setting-container">
        <view :style="{height: headerBarHeight + 'px'}">
			<tui-navigation-bar @init="initNavigation($event)" @change="opacityChange($event)" :isOpacity="false" title="设置"
				:backgroundColor="themeStyles.themeBackgroundColor" color="#FFF" fontSize="32rpx" :scrollTop="64"
				:arrowHidden="false">
			</tui-navigation-bar>
		</view>
        <view class="content-container">
            <tui-list-view title="带箭头，有点击效果" color="#777">
                <tui-list-cell arrow>
                    带箭头，有点击效果
                </tui-list-cell>
            </tui-list-view>
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
        toSetting() {
            uni.navigateTo({url: '../../pagesMine/setting/setting'});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>