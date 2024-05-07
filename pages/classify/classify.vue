<script setup>
	import { ref } from 'vue';
	import { getClassifyAPI } from "@/api/api.js"
	const classifyList = ref([])
	const getClassify = async () => {
		let res = await getClassifyAPI({
			pageSize: 15
		})
		classifyList.value = res.data
	}
	getClassify()
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
