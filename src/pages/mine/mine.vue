<template>
    <view class="mine-container" :style="{height: contentHeight + 'px'}">
        <view class="mine-pm-box" :style="{ height: (contentHeight * 0.35) + 'px', background: (backImg != '' ? `url(${backImg})` : 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)') }">
            <view class="stars">
                <view class="star" style="top: 100rpx; left: 400rpx; animation-delay: 3s;"></view>
                <view class="star" style="top: 30rpx; left: 310rpx; animation-delay: 2.5s;"></view>
                <view class="star" style="top: 140rpx; left: 480rpx; animation-delay: 2s;"></view>
                <view class="star" style="top: 35rpx; left: 540rpx; animation-delay: 4s;"></view>
                <view class="star" style="top: 90rpx; left: 640rpx; animation-delay: 2s;"></view>
                <view class="star" style="top: 25rpx; left: 738rpx; animation-delay: 3.5s;"></view>
            </view>
            <view class="pm-wrapper">
                <view class="avatar-box">
                    <view class="avatar">
                        <image @click="previewImg(userInfo)" :src="$commonJs.isNotEmpty(userInfo) ? '' : 'https://ape-space.oss-cn-shenzhen.aliyuncs.com/avatar/avatar.jpg'"></image>
                    </view>
                </view>
                <view class="baseinfo-box">
                    <view class="baseinfo">
                        <text class="loginRegist" v-if="false" @click="toLoginPage()">登录/注册</text>
                        <slot v-else>
                            <view class="baseinfo-left">
                                <view class="nickname">用户名</view>
                                <view class="remark">介绍自己更易获得关注哦^o^</view>
                            </view>
                            <view class="baseinfo-right">
                                <tui-icon name="arrowright" :size="26" color="rgba(255, 255, 255, 0.7)"></tui-icon>
                            </view>
                        </slot>
                    </view>
                </view>
            </view>
            <view class="statistics-box">
                <view class="statistics-list-cards">
                    <view class="card-wrapper" v-for="(item, index) in statisticsListCard" :key="index">
                        <view class="card-number">{{ item.number }}</view>
                        <view class="card-text">{{ item.text }}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="mine-content-container" :style="{ height: (contentHeight * (1 - 0.35)) + 'px', display: 'table'}">
            <view class="list-cards">
                <view class="selector-card" 
                    v-for="(item, index) in selectorCard" 
                    :key="index" 
                    :style="{backgroundImage: 'url(' + item.png + ')'}">
                    <text class="maintitle">{{ item.text }}</text>
                    <text class="subtitle">{{ item.subText }}</text>
                </view>
            </view>
            <view class="list-box">
                <view class="list-item" v-for="(item, index) in listItem" :key="index" @click="callItem(item)">
                    <icon :class="['iconfont', item.icon]"></icon>
                    <text class="text">{{ item.text }}</text>
                    <icon class="iconfont icon-arrowright"></icon>
                </view>
            </view>
            <view class="more-container">
                <view class="title">
                    <view class="color-block" :style="{ backgroundColor: themeStyles.themeBackgroundColor}"></view>
                    <text>更多功能</text>
                </view>
                <view class="more-wrapper">
                    <view class="more-list-item" v-for="(item, index) in moreListItem" :key="index">
                        <icon :class="['iconfont', item.icon]"></icon>
                        <text class="item-text">{{ item.text }}</text>
                    </view>
                </view>
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
        return {
			// 主题颜色
			themeStyles: styles,
            contentHeight: 0,
            // 背景图片
            backImg: '',
            statisticsListCard: {
                follow: {
                    number: 0,
                    text: '关注'
                },
                fans: {
                    number: 0,
                    text: '粉丝'
                },
                likes: {
                    number: 0,
                    text: '获赞'
                },
                footmark: {
                    number: 0,
                    text: '浏览'
                }
            },
            // 卡片列表
            selectorCard: {
                publish: {
                    text: '帖子',
                    subText: '我发布的',
                    png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVRoge2azW7TQBhF73UiakGBqLRSFiyiwooVC8RbQGKeoKvW4oEQYdU3sCkbHoIFK3agLPmp1BSFKlXruWywY4SSjn/UcZDPKra+zJwrzXg09lASAIAkACB4eXQ3SZJdkj6ADTSDc0nzTqfzJXr1/BQAMu98gNF+tC2PjwB4zlRXY2j0KX4THKfemehoL+qKHKC58gDgiRyM9qJudiP9YXxtgdh041UAYtP42kovvcV9+G6MipN3zQIIbPLQ+Yu869pIL6MN4Jru1SULKPww1K+ynREclP3vMqwDEPoYj4Npxf4mwzB+CuBmxXYybIfQNH5dWR4AIOh7He2kWAWgcFFbhwaXdbUFWAYQsTMKo14dHYrs19FOivUcEPh4GMZTQdOynTmdxH/oEezVLVGFtV8H2gCusZ8DwozSV3iYLa2htwHhvqDbdcjZYB3g7Xj0wbL02/AgfnJdmyO7dQCaFGlU1HEpmxLYrcT0dvL70Cvrr/FRazeJpVvy+TAIj+6tKnux//7GMIx3AfRqcLOiyELWNzD9YRgvLUgwryxUlLV/jLYBXNMGcE0bwDVtANe0AVzTBnBNG8A1bQDX/EcB6CUOPYqRc80CdOhgQ1uSvOviO/GZOYFWvHVrCsJMZ+YkvcwCxIfBJaUJgCYPpYTSJD4Msq88/Oe4zcG7O/LMA0E+1JDjNsQ5wTmN9zkaP/sJLI7b/AZMAKCP8S0gpwAAAABJRU5ErkJggg==',
                },
                comment: {
                    text: '评论',
                    subText: '我发出的',
                    png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADu0lEQVRoge2Z3VPbRhTFz13ZEMYY/AUhTHno2CZpXhpsz/S1/3wf2kGkbx1AJEBCKGCMKNA4WNbpA6ajb8uyLcNMfm9Xu7o6Z3a1ursSknjOqFkLGJfvBmZNxhmISKIktcvGkkCWRbBM4bxANAIZcJBfYAlgEewD8o3EFRT+MQr6TZLnOd9bcQUjGKiajbyy1SuQZQjmkwgB0AWkYyv79KCwE9vMWAb+Fw6ujyh2CPIlrpHEBuqXzQ0IqmOoHA5xsF/WP0V2GdXAj7e/zGXve1VCXk5IZiQCnvXmsgcfF3+/D2ofyUDtZisnPfUTgMXJS43klln7LyP//s7b4NQcuYwOxL9F+uIBYFF66m3tZisX1SnUgEN8ZIIpkxtmItSA9FQVsxX/SG6gJZBAA/VOax1AaWqSRqc00OTDZ6B2upUFuTF9TSNCbtROt7Leyz4D8kKtQrCQjqoRECyoObXmvRw0hSopyEmG0KfNZaB63VgAUUxP0WgQsuxdkVwGxEIqX9qxuJcVZ+ieQkpepComCR6N7v0AY728FgUmLPmsNK4QWAXgWx0AdCEwaeNSKaySWAnoEzdXqMaMp33oCBA4Nor68SA061ctgvzB9yAbxl5Fbw/Ci3qn+Q5AIUmuKI3uKUSfIR+Wpf52xpqmvgR0u3OIH+TmecJcXlwj5F1GfZWfF03ruwq7vmUFTbvcm6t37tFUsuRTomxXH6tnxfn6f3WldQaMYUAJ1jbbzQrwUPCRyAf1s2y1VjUbeQDYbDcroHv6AACFpdpFqwA87KuhxNfHh0jXFTpr69ed1gbj77hMwC8qgDsMLwrj5gIEn/cK28Zj6BoBW8lX/x2hxHtgvIo2bi6gz2tn6H4H2mYHxL+xk6UN8W2/snPhvOQyYNQNGwpn6aqKDwHfSuYr5pRoZwD6qSgaDUKLYWC38EcXeIKjQDkJOskL3JFJFx+f2LvQo8WToIZAA3vrek+J7E5XU3xInhgv9cAVMnRTv1vavuYTMEHy0CjvHIa1R54LGcXtUwj2J64qJsPEAzGPFjfbrSUqNiaqbhgRZ6SJDnc32z/PU7JvIJz2lvOWxAejrHfCOox1vF7vNH8dT18oFoBzay5zGHao+4hT89D6f9oMKuAzGzj/UNK7Q2/wMCsDdyDatsLVQVE3x0k0SQM3SuTIpk1AMgQ0R35LHsoTi1m7G3RknpQJGZBPqj9/uLvyW+o11FgGBLi2yaOoFWPaJPlPbAIAiKP1Yv5Po7wzM/GAZxl9jjz7P/XfDcya/wDlBZhRExXvjwAAAABJRU5ErkJggg==',
                },
                statistics: {
                    text: '统计',
                    subText: '帖子统计',
                    png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD0klEQVRogdWawWsjZRiHn3emaTZp0tAu3SyiuCtuFOnSi4h4EYTuwSU9FAJ62IO39A/Qs2e9Co0nDwoiCx4a9KAnETwIHsQ9SC8rVKS1WGk7TTZNZ14PzcbMZCaZSSbT5HcJ33wz3zy/eWfm++Z9I6rKLMu4aoBxNfMG5nobIhLpYK1U5Li1nEth5hQtqGpWxDBBTeDpLyA2YIPYqo4tIg1BjtvYViF9ZMnDh5Hu497bXlyNEAb27z0ws+mFFQNWEFkEUlFO7qM2qicOHDZaZ4c3v/vcHnbASAbONqo5RYrACnBtLORgPQEOBT1Y2KlZQTtFNnBart4W5DkkoWdGcRTdy9drj327oxiwyluvIWQngDlcSiNX3/65b3MP88ArapWra1cGDyBkrXJ1bdAugQascrWIyFL8VBElsmSVq8Wgbl8D1sZWToXS5KiiSYWStbGV8+sLikBREHOCTJHUYfGNQp+B/XsPTC5fldOmlQ6bS30GsumFSb7nx9G1DptLfQaMGK9+anOd+fc24xrOl821FtJKRc5aUojjZJntDzGeuQGA+cqLNN//aPxBRQpaqQjQnQhcEWg2l/N4TI0ic7XUhQcwSrcwV2N5qc11GP8fu7fhGOZiHGeZpLyM3mcgTwTJjevIUuKeXYzuZ0CdTNhvgszHH2CUbgFw8f1PtD75Iia+wVJ1Mr1tVwQuP0aGy3x1tQsPMLf+BqTGfnRCycvouYU0nIE7z/dve+mFMbCiSAcZIPHlg2Qiz5kuRk/c1YRo38Wjav7d+6TeuQ9A+9sfOP/0q5BHDo5AYnoKD5B6+82R5wmPARn6QR2H/GDNu3dCHu1m9EYgEQNjapCBZCIwngZEQNWZegNeRs9EJo1kcaLLy+g2gBwnixNdXkaXgTZ2YDZsWuRldBkopI8soD1skPMvv3G1nd0/sB/tdtv2o12cv/4O3e83ZhB/h7GrvsycVa7eReT6sJGM288y99br4Dicf/a17z6pzXWkkB/cn57n4sdfcP7cH46v+k+uXvttYGrxpFy9aYi8PHy05OWo/r5Yr+0PTC02WmeHXGaJp01POmwu9Rno5Of7dpwC+dYOfBdzgh6gOJNnCinFEfTAr8vXwMJOzVJ0b7JU4aXoXlDBI3A5na/XHqNc/cysNIIKHRCqwFFdu7I0u+q/uXrt1/7NEUtMVrlaVKGUVMZaUVuU3Vy95nvfj1Tk6+TnEynyAQe5ne34iny98pRZC4yfirxA9XjiZVbfgSoVaTaX8510X/4yMRam0G00gVPDsU8ymaPT2Ards6iZ/6/EzBv4DwVWin1diXHIAAAAAElFTkSuQmCC',
                },
                collect: {
                    text: '收藏',
                    subText: '我的收藏',
                    png: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECUlEQVRogdWZzW8bRRjGn3fWTexs0tiu1KZ2G1JCUcSBA2lsirgjwA6c+N/4FzhQgp1Ajz3aCUKA1EggKLRNmob4K9jgxN55OJBG/XB2x7vjhPwkH7zz7rzPMzOeLwtGQPPOYoIXYq8BTEKDBBtjVL9PflI5tJ0rZrvC3S/echhzFkBOAwAEEEiiJ3QAbNrOp2xXODYxOQ9gekDRlWYpl7Gdz6qBdik3SeJEkRrIbny+KDZzWjXQE1z1KxfAfSPjXLeZ05qBv9byLohsUByJ7M7dtx1bea0Z0Jq+rX+MYDzei8/aymvFQKuUT2jimmk8NbLN8vtWZkArBjzQWDwAQBCjPrxhI3dkA41v3o0Lgsf+Kwiy7ZX8WNT8kQ2Ip0OP577Duaj5Ixmo3V0a95v3gyCRqX21NB5FQ2gDrW9vJ9ShijyOlaNutFZuJ8K+H7gqcu1D1dJ1lx5dUXABcQm6ACK13AC6ADqEdByw42nppJYrbQlQ+ELxzpfvjcVifddRmKCmCxFXBC5of9NnSE+ANiEdITsepNMb/6cz88GP3rMAAYB6OXdJEZcJXDkjocPQE8ieBvbSxUpN9ldzE57GOxjB1nqkCLrJv9tV5Wm8jvMmHgCIeH18clYBPH/ij1AKcesHmtOFcUXBk7OWERrhY5UurD8Vwe5ZaxkWErupwsbe8TrQ+Dq/AOHMWYoyRYTbycL6z8BLC1mjtHQTkOF3lqcIgUfpYvXXZ99fWajrpdy8AFbPrbYQwYNkofrHC88GBdZWcnNKYe5UVBlCyC/pYmXr5ecnbpWapdx1AvOjlWWGAjeni+tPB5X57vXqpXxWwJujkWVEn8RmerlaOykgcDvdWF2agZYFu7qM6NLDZvrTassvKHAlTn28vqPJ+/Z0mUHl/BQkHjA8kSlHIh++hyWmQZM4s72QHnhZO1II76JJnOlmbiqCllBo0CinqYF4BC2hEIidHqiVckYV2YaGvR5oQCmciQEA2F/NTQTFBA8hz2wsjgICk0ExgQYoEljJqNBaAhsv0IAArh05YdDRDLRKt6KOfx59wiERe4BUYYdPn8SDVLF6L1Ws3iPxG4H+0LUQTtAP2fdKhQoyZPt1BdhKFquPnn+YXq4+BPDwv92tngXE+F71wPN8/0/zNeARB0b/xol0QDxJFSuP/cKODiRbzXI+A/AaicBpMh7TXb9y/x7QFxpQvTZOms5EWqK5kyxWhrqaSRYq2wC2m+V8hpoZyOD6CWxPffR9z6+u4PNA6VZS4LxJ8Li1SNQVuJNcXrdyHdMs5zMkr+K51ZfEfr/b/uHyZ/c9n1eDDRwnWVtM0HMcB97BxeJ3vq0SlmY5P+V5vDTm6D+nChsdk3eEDD/L/R8453ejwL+YPGPSZcnnTwAAAABJRU5ErkJggg==',
                }
            },
            listItem: [
                // {
                //     icon: 'icon-home-line',
                //     text: '创作中心',
                //     callPopup: false,
                //     navigateUrl: './creation'
                // },
                // {
                //     icon: 'icon-home-line',
                //     text: '专题管理',
                //     callPopup: false,
                //     navigateUrl: './theme'
                // },
                {
                    icon: 'icon-setting2',
                    text: '历史足迹',
                    callPopup: true
                },
                {
                    icon: 'icon-setting2',
                    text: '意见反馈',
                    callPopup: false,
                    navigateUrl: ''
                },
                {
                    icon: 'icon-setting2',
                    text: '设置',
                    callPopup: false,
                    path: '../../pagesMine/setting/setting'
                },
            ],
            moreListItem: [
                {
                    icon: 'icon-feedback',
                    text: '意见反馈',
                },
                {
                    icon: 'icon-about',
                    text: '关于我们',
                },
            ],
        }
    },
    onReady() {
		// 计算内容部分的盒子高度
		uni.createSelectorQuery()
			.select('.tabbar-container')
			.boundingClientRect(data => {
				this.contentHeight = uni.getSystemInfoSync().screenHeight - data.height;
			}).exec();
	},
    computed: {
        styles() {
			return styles;
		},
        userInfo(){
            return this.$store.getters.getUserInfo;
        }
    },
    methods: {
        toSetting() {
            uni.navigateTo({url: '../../pagesMine/setting/setting'});
        },
        // 预览图片
        previewImg(userInfo){
            let images = [];
            if (userInfo != null){
                images[0] = userInfo.avatar;
            }else{
                images[0] = 'https://ape-space.oss-cn-shenzhen.aliyuncs.com/avatar/avatar.jpg';
            }
            uni.previewImage({
                current: 0,
                urls: images,
                longPressActions: {
                    //长按保存图片到相册
                    itemList: ['保存图片'],
                    success: (data) => {
                    uni.saveImageToPhotosAlbum({
                        //保存图片到相册
                            filePath: payUrl,
                            success: function () {
                                uni.showToast({icon:'success',title:'保存成功'})
                            },
                            fail: (err) => {
                                uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
                            }
                        });
                    },
                    fail: (err)=> {
                        console.log(err.errMsg);
                    }
                }
            });
        },
        // 页面跳转
        callItem(item) {
            if (item.callPopup){

            }else{
                uni.navigateTo({url: item.path})
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../static/aliIcon/iconfont.scss';
@-webkit-keyframes star-opacity{
    0% {
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@keyframes star-opacity{
    0% {
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-webkit-keyframes star-pos{
    0% {
        transform: scale(0) rotate(0) translate3d(0, 0, 0);
        -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
        -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
    }
    100% {
        transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
        -webkit-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
        -moz-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
    }
}

@keyframes star-pos{
    0% {
        transform: scale(0) rotate(0) translate3d(0, 0, 0);
        -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
        -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
    }
    100% {
        transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
        -webkit-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
        -moz-transform: scale(1) rotate(0) translate3d(-250rpx, 250rpx, 0);
    }
}

.mine-container {
    display: flex;
    flex-direction: column;
    .mine-pm-box {
        position: relative;
        // display: flex;
        // flex: 4;
        flex: none;
        flex-direction: row;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .stars{
            height: 0;
            .star{
                display: block;
                width: 10rpx;
                height: 10rpx;
                border-radius: 50%;
                position: relative;
                top: 80rpx;
                left: 500rpx;
                background-color: #fff;
                -webkit-transform-origin: 100% 0;
                transform-origin: 100% 0;
                -webkit-animation: star-opacity 5s infinite ease-in, star-pos 5s infinite ease-in;
                animation: star-opacity 5s infinite ease-in, star-pos 5s infinite ease-in;
                -webkit-box-shadow: 0 0 10rpx 10rpx rgba(255, 255, 255, .3);
                box-shadow: 0 0 10rpx 10rpx rgba(255, 255, 255, .3);
                z-index: 100;
                opacity: 0;
                &::after{
                    content: '';
                    display: block;
                    top: 0;
                    left: 8rpx;
                    border: 0 solid #fff;
                    border-width: 0 120rpx 4rpx;
                    border-color: transparent transparent transparent rgba(255, 255, 255, .3);
                    -webkit-transform: rotate(-45deg) translate3d(2rpx, 6rpx, 0);
                    transform: rotate(-45deg) translate3d(2rpx, 6rpx, 0);
                    -webkit-box-shadow: 0 0 2rpx 0 rgba(255, 255, 255, .1);
                    box-shadow: 0 0 2rpx 0 rgba(255, 255, 255, .1);
                    -webkit-transform-origin: 0% 100%;
                    transform-origin: 0% 100%;
                }
            }
        }

        .pm-wrapper {
            width: 100%;
            height: 200rpx;
            display: flex;
            // align-self: flex-end;
            // margin-bottom: 90rpx;
            position: absolute;
            bottom: 100rpx;
            overflow: hidden;
            .avatar-box {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 25%;
                height: 100%;
                .avatar{
                    width: 130rpx;
                    height: 130rpx;
                    border-radius: 50%;
                    border: 6rpx solid rgba(255, 255, 255, .3);
                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
            }
            .baseinfo-box {
                display: flex;
                align-items: center;
                width: 75%;
                height: 100%;
                padding-left: 3%;
                .baseinfo{
                    display: flex;
                    flex: 4.3;
                    align-items: center;
                    width: 100%;
                    height: 70%;
                    .loginRegist{
                        font-size: 40rpx;
                        color: rgba(255, 255, 255, .7);
                    }
                    .baseinfo-left {
                        display: flex;
                        flex: 4;
                        flex-direction: column;
                        justify-content: center;
                        .nickname{
                            font-size: 48rpx;
                            color: #333;
                            font-weight: bold;
                        }
                        .remark{
                            width: 80%;
                            height: auto;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            line-clamp: 2;
                            display: -webkit-box;
                            word-break: break-all;
                            -webkit-box-orient: vertical;
                            margin-top: 8rpx;
                            font-size: 26rpx;
                            color: rgba(255, 255, 255, 0.7);
                        }
                    }
                    .baseinfo-right {
                        display: flex;
                        flex: 0.7;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }

        .statistics-box {
            width: 90%;
            height: 120rpx;
            position: absolute;
            bottom: 0;
            left: 5%;
            .statistics-list-cards {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: 20rpx;
                font-size: 24rpx;
                color: rgba(255, 255, 255, 0.7);
                .card-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 22%;
                    height: 80rpx;
                }
                .card-number {
                    line-height: 40rpx;
                    font-weight: 700;
                }
                .card-text {
                    width: 60%;
                    text-align: center;
                    // line-height: 40rpx;
                    // background: rgba(255, 34, 255, 0.13);
                    // height: 40rpx;
                    // border-radius: 0 0 18rpx 18rpx;
                    // font-size: 20rpx;
                }
            }
        }
    }
    .mine-content-container {
        .list-cards {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 30rpx;
            .selector-card {
                display: flex;
                justify-content: center;
                flex-direction: column;
                width: 23%;
                height: 120rpx;
                border-radius: 16rpx;
                box-shadow: 0px 1px 6px 0 rgba(0, 0, 0, .1);
                overflow: hidden;
                background-repeat: no-repeat;
                background-size: 40%;
                background-position: 110% 120%;
                text {
                    margin-left: 20rpx;
                }
                .maintitle {
                    color: #333;
                    font-weight: bold;
                }
                .subtitle {
                    margin-top: 4rpx;
                    color: #9e9e9e;
                    font-size: 24rpx;
                }
            }
        }
        .list-box{
            border-top: 30rpx solid #f2f2f2;
            color: $uni-text-color;
            .list-item{
                height: 120rpx;
                line-height: 120rpx;
                padding-left: 30rpx;
                padding-right: 30rpx;
                box-sizing: border-box;
                color: $uni-text-color;
                .iconfont{
                    width: auto;
                    font-size: 50rpx;
                }
                .text{
                    height: 119rpx;
                    width: 100%;
                    position: absolute;
                    margin-left: 26rpx;
                    border-bottom: 1rpx solid #F7F7F7;
                }
                .icon-arrowright{
                    right: 20rpx;
                    position: absolute;
                    font-size: 48rpx;
                    color: #ddd;
                }
                &:last-child .text{
                    height: 120rpx;
                    border-bottom: none !important;
                }
                .icon-setting2 {
                    color: #858EBD; //#FF9325
                }
            }
        }
        .more-container{
            border-top: 30rpx solid #f2f2f2;
            padding-left: 30rpx;
            padding-right: 30rpx;
            padding-bottom: 30rpx;
            color: #333;
            .title{
                width: 100%;
                height: 100rpx;
                line-height: 100rpx;
                display: flex;
                align-items: center;
                .color-block {
                    display: inline-block;
                    width: 8rpx;
                    height: 50rpx;
                    // background-color: #DE5678;
                    margin-right: 20rpx;
                    margin-left: 10rpx;
                }
            }
            .more-wrapper {
                display: flex;
                flex-wrap: wrap; // 换行
                align-items: flex-start;
                .more-list-item {
                    margin-bottom: 30rpx;
                    width: 25%;
                    height: 120rpx;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 28rpx;
                    .iconfont {
                        font-size: 50rpx;
                    }
                    .item-text {
                        margin-top: 10rpx;
                    }
                    .icon-feedback {
                        color: #5BBCFF;
                    }
                    .icon-about {
                        color: #F4BA62;
                    }
                }
            }
        }
    }
}
</style>