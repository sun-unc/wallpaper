<script setup>
	import { onLoad, onReachBottom } from '@dcloudio/uni-app';
	import { useClassifyListStore } from '@/store/classifyList.js'
	import { computed, ref } from 'vue';
	import { storeToRefs } from "pinia"

	const classifyListStore = useClassifyListStore()
	const { getClassify, loadMore, classifyList } = classifyListStore
	
	const requestParams = {
		classid: '',
		pageNum: 1,
		pageSize: 12
	};
	
	const title = ref('')
	onLoad((option) => {
		requestParams.classid = option.id
		title.value = option.title
		getClassify(requestParams)
		uni.setNavigationBarTitle({
			title: title.value
		})
	})
	
	onReachBottom(() => {
		loadMore(requestParams)
	})
	
	/**
	 * ref 定义的属性解构时会丢失响应式,所以通过computed来获取
	 * 而reactive定义的变量结构时不会丢失响应式
	*/ 
	const loading = computed(() => classifyListStore.loading)
	const skeleton = [{
		type: 'flex',
		children: [{
			type: 'custom',
			style: 'width:33.3vw;height:33.3vh;',
			num: 3,
			gap: '5rpx',
		},
		{
			type: 'custom',
			style: 'width:33.3vw;height:33.3vh;marginLeft:5rpx;',
			num: 3,
			gap: '5rpx'
		},
		{
			type: 'custom',
			style: 'width:33.3vw;height:33.3vh;marginLeft:5rpx;',
			num: 3,
			gap: '5rpx'
		}]
	}]

	const isNoMore = computed(() => classifyListStore.isNoMore)
</script>

<template>
		<view class="classify-list">
			<uv-skeletons :loading="loading" :skeleton="skeleton"  :animate="true">
				<view class="content">	
					<navigator :url="`/pages/preview/preview?title=${title}&id=${item._id}`" class="item" v-for="item in classifyList" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</navigator>
				</view>
				<view class="loading-layout">
					<uni-load-more :status="isNoMore ? 'no-more' : 'loading'"></uni-load-more>
				</view>
			</uv-skeletons>
		</view>

	<view class="safe-area-inset-bottom"></view>
</template>

<style scoped lang="scss">
	.classify-list {
		.content {
			display: grid;
			grid-template-columns: repeat(3,1fr);
			gap: 5rpx;
			.item {
				height: 33.3vh;
				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>
