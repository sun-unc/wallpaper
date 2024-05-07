<script setup>
	import { ref } from 'vue';
	import { getClassifyListAPI } from "@/api/api.js";
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	
	const classifyList = ref([])
	const requestParams = {
		classid: '',
		pageNum: 1,
		pageSize: 12
	}
	const getClassify = async () => {
		let res = await getClassifyListAPI(requestParams)
		classifyList.value.push(...res.data)
		loading.value = false
	}
	
	onLoad((option) => {
		const { id, name } = option
		requestParams.classid = id
		getClassify()
		uni.setNavigationBarTitle({
			title: name
		})
	})
	
	onReachBottom(() => {
		requestParams.pageNum++
		requestParams.pageSize = 9
		getClassify()
	})
	
	const loading = ref(true)
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
</script>

<template>
		<view class="classify-list">
			<uv-skeletons :loading="loading" :skeleton="skeleton"  :animate="true">
				<view class="content">	
					<navigator url="/pages/preview/preview" class="item" v-for="item in classifyList" :key="item._id">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</navigator>
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
