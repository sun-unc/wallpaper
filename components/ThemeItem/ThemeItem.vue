<script setup>
import { computed } from 'vue';
import { timeSince } from '@/utils/common.js'
defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
		default: () => ({
			name: "默认名称",
			picurl: "../../common/images/preview1.jpg",
			updateTime: Date.now() - 1000 * 60 * 60 * 5
		})
	}
})
</script>

<template>
	<view class="theme-item">
		<navigator v-if="!isMore" :url="`/pages/classifyList/classifyList?id=${data._id}&title=${data.name}`" class="box" >
			<image class="pic" :src="data.picurl" mode="aspectFill"></image>
			<view class="mask">{{data.name}}</view>
			<view class="tab">{{timeSince(data.updateTime)}}前更新</view>
		</navigator>
		
		<navigator v-else url="/pages/classify/classify" open-type="switchTab" class="box more">
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