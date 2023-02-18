<template>
	<view class="main-container">
		<view :style="{height: headerBarHeight + 'px'}">
			<tui-navigation-bar @init="initNavigation($event)" @change="opacityChange($event)" :isOpacity="false" title="猿空间"
				:backgroundColor="themeStyles.themeBackgroundColor" color="#FFF" fontSize="32rpx" :scrollTop="0"
				:arrowHidden="true">
			</tui-navigation-bar>
		</view>
		<view class="content-container">
			<view v-for="(item, index) in 50" :key="index" class="fish" @click="aa" :style="{color: themeStyles.themeBackgroundColor}">我是一条鱼{{ item }}</view>
		</view>
		<view class="tabbar-container">
			<tab-bar></tab-bar>
		</view>
	</view>
</template>

<script>
/** vue3项目需要将uni.scss后缀改为.module.scss才能引入，不然得配置忽略.module，这里暂时不知道怎么配置 */
import styles from '../../uni.module.scss';
const themeData = require('../../static/json/theme.json');
export default {
	data() {
		return {
			// 自定义导航栏的高度
			headerBarHeight: 0,
			// 主题颜色
			themeStyles: styles,
		}
	},
	onLoad() {
		
	},
	onReady() {
		// 计算内容部分的盒子高度
		// uni.createSelectorQuery()
		// 	.select('.tabbar-container')
		// 	.boundingClientRect(data => {
		// 		this.contentHeight = uni.getSystemInfoSync().screenHeight - (data.height + this.headerBarHeight);
		// 		console.log(this.contentHeight)
		// 	}).exec();
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
		aa() {
			let themeObject = JSON.parse(JSON.stringify(themeData));
			this.$store.commit('setTheme', themeObject.sakuraPink);
			// this.styles.themeBackgroundColor = themeObject.sakuraPink.backgroundColor;
		}
	}
}
</script>

<style lang="scss" scoped>
.main-container {
	.content-container {

	}
}
</style>
