<script setup>
import { ref } from 'vue';
import { getBannerAPI, getRandomWrapperAPI, getClassifyAPI } from "@/api/api.js"
	// banner
	const bannerList = ref([])
	const getBanner = async () => {
		let res = await getBannerAPI()
		bannerList.value = res.data
	}
	getBanner()	
	
	// 每日推荐
	const randomWrapperList = ref([])
	const getRandomWrapper = async () => {
		let res = await getRandomWrapperAPI()
		randomWrapperList.value = res.data
	}
	getRandomWrapper()
	
	// 专题精选
	const classifyList = ref([])
	const getClassify = async () => {
		let res = await getClassifyAPI({
			select: true
		})
		classifyList.value = res.data
	}
	getClassify()
	// 公告 
	const noticeList = ref([
		"欢迎访问蓝胖子壁纸小程序😍",
		"如有问题请联系客服😘"
	])
	
	const goPreview = () => {
		uni.navigateTo({
			url: "/pages/preview/preview"
		})
	}
</script>

<template>
	<view class="home-layout page-bg">
		<NavBar></NavBar>
		<view class="banner">
			<swiper indicator-dots :autoplay="true" circular indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" >
				<swiper-item v-for="(item, index) in bannerList" :key="item._id">
					<image :src="item.picurl" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text>公告</text>
			</view>
			<view class="center">
				<swiper vertical circular :autoplay="true" :interval="1500" :duration="300">
					<swiper-item v-for="item in noticeList">
						<view class="swiper-item">{{item}}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<view class="select">
			<CommonTitle title="每日推荐">
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>							
						</view>						
					</view>
				</template>
			</CommonTitle>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomWrapperList" :key="item._id" @click="goPreview">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<CommonTitle title="专题精选">
				<template #custom>
					<navigator class="more">More+</navigator>
				</template>
			</CommonTitle>
			
			<view class="content">
				<ThemeItem v-for="item in classifyList" :key="item._id" :data="item"></ThemeItem>
				<ThemeItem :isMore="true"></ThemeItem>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.home-layout {
		.banner {
			width: 100%;
			padding: 30rpx;
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
			margin: 0 30rpx;
			.left {
				width: 140rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				> text {
					color: $brand-theme-color;
					font-weight: 600;
					font-size: 28rpx;
				}
				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
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
						color: $text-font-color-2;
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
		.select {
			margin-top: 50rpx;
			padding-left: 30rpx;
			.content {
				margin-top: 30rpx;
				width: 100%;
				scroll-view {
					white-space: nowrap;
					.box {
						display: inline-block;
						margin-right: 15rpx;
						image {
							width: 25vw;
							height: 25vh;
							border-radius: 10rpx;
						}
						&:last-child {
							margin-right: 30rpx;
						}
					}
				}
			}
			.date {
				display: flex;
				align-items: center;
				color: $brand-theme-color;
				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}
				.text {
					margin-left: 5rpx;
				}
			}
		}
		.theme {
			padding: 50rpx 0;
			padding-left: 30rpx;
			.more  {
				font-size: 32rpx;
				color: $text-font-color-2;
			}
			.content {
				margin-top: 30rpx;
				padding-right: 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>
