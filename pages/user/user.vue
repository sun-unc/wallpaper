<script setup>
	const sectionInfo = [
		{
			icon: "download-filled",
			text: "我的下载",
			href: "/pages/classifyList/classifyList",
			value: 0
		},
		{
			icon: "star-filled",
			text: "我的评分",
			href: "#",
			value: 0
		}
	]
	
	const sectionHelp = [
		{
			icon: "chatboxes-filled",
			text: "联系客服",
		},
		{
			icon: "notification-filled",
			text: "订阅更新",
		},
		{
			icon: "help-filled",
			text: "常见问题",
		}
	]
	
	function clickContact() {
		uni.makePhoneCall({
			phoneNumber: '17355479052'
		})
	}
</script>

<template>
  <view class="user-layout page-bg">
	<view class="user-info">
		<view class="avatar">
			<image src="../../static/logo.webp" mode="aspectFill" :webp="true"></image>
		</view>
		<view class="user-name">
			Looooo
		</view>
	</view>
	<view class="section">
		<view class="list">
			<navigator :url="item.href" class="row" v-for="(item, index) in sectionInfo" :key="index">
				<view class="left">
					<uni-icons :type="item.icon" size="20"></uni-icons>
					<div class="text">{{item.text}}</div>
				</view>
				<view class="right">
					<view class="text">{{item.value}}</view>
					<uni-icons type="right" size="15" color="#aaa"></uni-icons>
				</view>
			</navigator>
		</view>
	</view>
	<view class="section">
		<view class="list">
			<view class="row" v-for="(item, index) in sectionHelp" :key="index">
				<view class="left">
					<uni-icons :type="item.icon" size="20"></uni-icons>
					<div class="text">{{item.text}}</div>
				</view>
				<view class="right">
					<view class="text" v-if="item.value">{{item.value}}</view>
					<uni-icons type="right" size="15" color="#aaa"></uni-icons>
				</view>
				<view class="button" v-if="item.text === '联系客服'">
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
  </view>
</template>

<style scoped lang="scss">
	.user-layout {
		padding: 0 30rpx;
		.user-info {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;
			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.user-name {
				font-size: 44rpx;
				color: $text-font-color-1;
				padding: 20rpx 0 5rpx;
			}
		}
		.section {
			width: 100%;
			margin: 50rpx auto;
			border: 1px solid $border-color-1;
			border-radius: 12rpx;
			box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
			overflow: hidden;
			.list {
				.row {
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: relative;
						padding: 0 30rpx;
						height: 100rpx;
						border-bottom: 1px solid $border-color-1;
						background-color: #fff;
						&:last-child {
							border-bottom: none;
						}
						.left,.right {
							display: flex;
							align-items: center;
							&.left{
								:deep() {
									.uni-icons {
										color: $brand-theme-color !important;
									}
								}
								 .text {
									padding-left: 20rpx;
									color: $text-font-color-2;
								}
							}
							&.right > .text {
								font-size: 28rpx;
								color: $text-font-color-3;
							}
						}
						.button {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							opacity: 0;
						}
				}
			}
		}
	}

</style>
