<script setup>
import { ref } from 'vue';
const maskStatus = ref(true)
const maskChange = () => {
	console.log(11111);
	maskStatus.value = !maskStatus.value
}
</script>

<template>
	<view class="preview">
		<swiper circular>
			<swiper-item v-for="item in 5">
				<image @click="maskChange" src="../../common/images/classify2.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="mask" v-show="maskStatus">
			<view class="goBack"></view>
			<view class="index">3 / 5</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="mm:ss"/>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"/>
			</view>
			<view class="footer">
				<view class="box">
					<uni-icons type="info" size="28"></uni-icons>
					<text class="text">信息</text>
				</view>
				
				<view class="box">
					<uni-icons type="star" size="28"></uni-icons>
					<text class="text">5分</text>
				</view>
				
				<view class="box">
					<uni-icons type="download" size="28"></uni-icons>
					<text class="text">下载</text>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.preview {
		width: 100vw;
		height: 100vh;
		position: relative;
		swiper {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.mask {
			display: flex;
			align-items: center;
			flex-direction: column;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			&>view {
				position: absolute;
				color: #fff;
			}
			.goBack {
				
			}
			.index {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
				
				// width: fit-content;
			}
			.time {
				top: calc(10vh + 80rpx);
				font-size: 140rpx;
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4px rgba(0, 0, 0, 0.3);
			}
			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2px rgba(0, 0, 0, 0.3);
			}
			.footer {
				display: flex;
				justify-content: center;
				align-items: center;
				justify-content: space-around;
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				background-color: rgba(255, 255, 255, 0.8);
				border-radius: 120rpx;
				color: $text-font-color-1;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);
				.box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100%;
					padding: 0 12rpx;
					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}
	}
</style>
