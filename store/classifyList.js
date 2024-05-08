import { reactive, ref } from 'vue';
import { defineStore } from "pinia";
import { getClassifyListAPI } from "@/api/api.js";
	
export const useClassifyListStore = defineStore('classifyList', () => {
	const classifyList = reactive([])
	// 底部加载更多
	const isNoMore = ref(false)
	// 骨架屏
	const loading = ref(true)
	
	const getClassify = async (requestParams) => {
		if (isNoMore.value) return
		let res = await getClassifyListAPI(requestParams)
		classifyList.push(...res.data)
		if (res.data.length < requestParams.pageSize) isNoMore.value = true
		loading.value = false
	};
	
	const loadMore = (requestParams) => {
		requestParams.pageNum++
		requestParams.pageSize = 9
		getClassify(requestParams)
	}
	return {
		getClassify,
		loadMore,
		classifyList,
		isNoMore,
		loading
	}
})