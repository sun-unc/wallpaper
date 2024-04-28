<script setup>
defineProps({
	isMore: {
		type: Boolean,
		default: false
	}
})
</script>

<template>
	<view class="theme-item">
		<navigator url="" class="box" v-if="!isMore">
			<image class="pic" src="../../common/images/preview1.jpg" mode="aspectFill"></image>
			<view class="mask">图片标题</view>
			<view class="tab">3天前更新</view>
		</navigator>
		
		<navigator url="" class="box more" v-else>
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<text class="text">更多</text>
			</view>
		</navigator>
	</view>
</template>

<style lang="scss" scoped>
	.theme-item {
		.box {
			position: relative;
			height: 33.33vh;
			border-radius: 10rpx;
			overflow: hidden;
			.pic {
				width: 100%;
				height: 100%;
			}
			.mask  {
				width: 100%;
				height: 70rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				background-color: rgba(0, 0, 0, 0.25);
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				backdrop-filter: blur(20rpx);
				font-weight: bold;
				font-size: 30rpx;
			}
			.tab {
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(30, 116, 240, 0.8);
				backdrop-filter: blur(20rpx);
				color: #fff;
				font-size: 24rpx;
				padding: 6rpx 14rpx;
				border-radius:  0 0 20rpx 0;
				transform: scale(0.8);
				transform-origin: left top;
			}
			&.more {
				.mask {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.text {
						font-size: 28rpx;
						font-weight: normal;
					}
				}
			}
		}
	}
</style>