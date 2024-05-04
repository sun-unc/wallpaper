<template>
	<view class="layout">
			<view class="navbar">
				<view class="status-bar" :style="{height: getStatusBarHeight() + 'px'}"></view>
				<view class="title-bar">
					<view class="title" :style="{height: getTitleBarHeight() + 'px', marginLeft: getLeftIcon() + 'px'}">标题</view>
					<view class="search">
						<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
						<text class="text">搜索</text>
					</view>
				</view>
			</view>
			<view class="fill" :style="{height: getNavBarHeight() + 'px'}"></view>
	</view>
</template>

<script  setup>
	import {getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIcon} from '@/utils/system.js'
</script>

<style lang="scss">
	.layout {
		.navbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			background:
			linear-gradient(to bottom, transparent, #fff 400rpx),
			linear-gradient(to right, #1E90FF 10%, #00CED1);
			.status-bar {
			}
			.title-bar {
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				.title {
					display: flex;
					align-items: center;
					font-size: 48rpx;
					font-weight: 700;
					color: $text-font-color-1;
				}
				.search {
					width: 220rpx;
					height: 50rpx;
					border-radius: 60rpx;
					background: rgba(255, 255, 255, 0.4);
					border: 1px solid #fff;
					margin-left: 30rpx;
					color: $text-font-color-2;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					.icon {
						margin-left: 5rpx;
					}
					.text {
						padding-left: 10rpx;
					}
				}
			}
		}
		.fill {
			
		}
	}
</style>