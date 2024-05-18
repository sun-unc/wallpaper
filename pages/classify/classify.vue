<script setup>
	import { ref } from 'vue';
	import { getClassifyAPI } from "@/api/api.js"
	import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
	
	const classifyList = ref([])
	const getClassify = async () => {
		let res = await getClassifyAPI({
			pageSize: 15
		})
		classifyList.value = res.data
	}
	getClassify()
	
	// 分享好友功能
	onShareAppMessage(() => {
		return {
			title: "蓝胖子壁纸——分类",
			path: "/pages/classify/classify"
		}
	})
	// 分享朋友圈 该功能为Beta版 目前仅支持安卓
	onShareTimeline(() => {
		return {
			title: "蓝胖子壁纸"
		}
	}) 	
</script>

<template>
  <view class="classfy-layout page-bg">
		<NavBar title="分类"></NavBar>
		<view class="classfy">
			<ThemeItem v-for="item in classifyList" :key="item._id" :data="item"></ThemeItem>
		</view>
  </view>
</template>

<style scoped lang="scss">
	.classfy-layout {
		padding: 30rpx;
		.classfy {
			width: 100%;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
