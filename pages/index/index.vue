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
	</view>
</template>

<style lang="scss" scoped>
	.home-layout {
		.banner {
			width: 750rpx;
			padding: 30rpx 0;
			swiper {
				width: 100%;
				height: 340rpx;
					&-item  {
						width: 100%;
						height: 100%;
						padding: 0 30rpx;
						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
			}
		}
	}
</style>
