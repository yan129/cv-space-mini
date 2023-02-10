<template>
	<view class="helang-tab-bar">
		<view class="placeholder" v-if="fixedBottom"></view>
		<view class="bar" :class="{'fixed':fixedBottom}">
			<view :class="['h-flex-x', 'h-flex-' + tabList.length]">
				<view class="item h-flex-x h-flex-center"
					:class="{
						'active': tabbarIndex == index
					}"
					v-for="(item,index) in tabList" 
					:key="index" 
					@tap="changeIndex(index)"
				>
					
					<view>
						<view class="center-item" v-if="$commonJs.isNotEmpty(item.center) && item.center">
							<view class="center-img-box" :style="{boxShadow: (tabbarIndex == index) ? `0 0 10rpx ${$commonJs.hexToRgba(themeStyles.themeBackgroundColor, 0.3)}` : '' }">
								<image class="center-img" :src="item.imgPath"></image>
							</view>
						</view>
						<view class="not-center-item" v-else>
							<view class="h-flex-x h-flex-center">
								<view class="icon">
									<icon type="" :class="['iconfont', (tabbarIndex == index) ? item.activeIcon : item.icon]"></icon>
								</view>
							</view>
							<view class="h-flex-x h-flex-center">
								{{item.text}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import styles from '../../uni.module.scss';
	export default {
		name:"tabbar",
		props:{
			// 固定底部
			fixedBottom:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				themeStyles: styles,
				tabList:[
					{
						path: "/pages/index/index",
						icon: "icon-home-line",
						activeIcon: "icon-home-fill",
						text: "首页"
					},
					{
						path: "/pages/theme/theme",
						icon: "icon-label-line",
						activeIcon: "icon-label-fill",
						text: "专题"
					},
					{
						center: true,
						imgPath: 'data:image/png;base64,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'
					},
					{
						path: "/pages/chat/chat",
						icon: "icon-chat-line",
						activeIcon: "icon-chat-fill",
						text: "消息"
					},
					{
						path: "/pages/mine/mine",
						icon: "icon-mine-line",
						activeIcon: "icon-mine-fill",
						text: "我的"
					},
				],
			};
		},
		computed:{
			styles() {
				return styles;
			},
			tabbarIndex() {
				return this.$store.getters.getTabbarIndex;
			}
		},
		methods:{
			changeIndex(index){
				if(this.tabbarIndex == index){
					return;
				};
				// 更新tabbar下标到store，防止每次点击tabbar页面，current进行重置
				this.$store.commit('setTabbarIndex', index);
				if (this.$commonJs.isNotEmpty(this.tabList[this.tabbarIndex].path)) {
					uni.switchTab({ url: this.tabList[this.tabbarIndex].path });
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./helang-flex.scss";
@import "./tab-bar.scss";
@import "../../static/aliIcon/iconfont.scss";

.helang-tab-bar{
	height: auto;
	.item{
		height: 100rpx;
		position: relative;
		line-height: normal;
		overflow: hidden;
		
		> view{
			position: relative;
			z-index: 2;
		}

		.center-item {
			.center-img-box {
				width: 87rpx;
				height: 70rpx;
				// https://9elements.github.io/fancy-border-radius/#66.50.66.50--35.43.5
				border-radius: 50% 50% 50% 50% / 66% 66% 34% 34% ;
				overflow: hidden;
				.center-img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.not-center-item{
			color: #b4b3b8;
			font-size: 20rpx;
			.iconfont {
				font-size: 28px;
				color: #606266;
			}
		}
		
		&.active{
			.not-center-item {
				color: #2e3c50;
			}
		}

	}
}
</style>
