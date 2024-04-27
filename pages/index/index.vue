<script setup>
	
</script>

<template>
	<view class="home-layout">
		<view class="banner">
			<swiper indicator-dots :autoplay="true" circular indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" >
				<swiper-item v-for="(item, index) in 3" :key="index">
					<image src="/common/images/banner1.jpg" mode=""></image>
					<image src="/common/images/banner2.jpg" mode=""></image>
					<image src="/common/images/banner3.jpg" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<text>公告</text>
			</view>
			<view class="center">
				<swiper vertical circular :autoplay="true" :interval="1500" :duration="300">
					<swiper-item v-for="item in 3">
						<view class="swiper-item">测试内容测试内容测试内容测试内容测试内容测试内容测试内容</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.home-layout {
		.banner {
			width: 100%;
			padding: 30rpx 0;
			swiper {
				width: 100%;
				height: 340rpx;
					&-item  {
						width: 100%;
						height: 100%;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
			}
		}
		.notice {
			display: flex;
			height: 80rpx;
			background-color: #f9f9f9;
			border-radius: 80rpx;
			margin: 0 auto;
			.left {
				width: 140rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				> text {
					color: #28b398;
					font-weight: 600;
					font-size: 28rpx;
				}
			}
			.center {
				flex: 1;
				swiper {
					height: 100%;
					&-item {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #666;
						.swiper-item{
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
			}
			.right {
				width: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
