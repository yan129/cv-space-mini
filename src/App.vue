<script>
export default {
	onLaunch: function () {
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show");
		// 隐藏官方的tabbar
		uni.hideTabBar();
	},
	onHide: function () {
		console.log("App Hide");
	},
	// 全局挂载数据
	globalData: {
		
	}
};
</script>

<style>
/*每个页面公共css */
/* 设置页面高度100%，需要在子页面标签中设置100% */
uni-page-body,
html,
body {
	height: 100%;
}

.container {
	padding: 30rpx 30rpx 0rpx;
}
</style>
