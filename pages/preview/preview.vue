<script setup>
import { computed, reactive, ref, watch } from 'vue';
import {getStatusBarHeight, getLeftIcon} from '@/utils/system.js'
import { useClassifyListStore } from '@/store/classifyList.js'
import { onLoad } from '@dcloudio/uni-app'
import { getSetupScoreAPI } from "@/api/api.js"

const maskStatus = ref(true)
const maskChange = () => {
	maskStatus.value = !maskStatus.value
}

const popupRef = ref(null)
const currentWrapper = reactive({
	index: 0,
	info: null
})
const showInfoPopup = () => {
	popupRef.value.open()
}
const closeInfoPopup = () => {
	popupRef.value.close()
}

const userRate = ref(0)
const isRated = computed(() => currentWrapper.info.hasOwnProperty('userScore'))
const changeRate = () => {
	
}
const scorePopupRef = ref(null)
const openRatePopup = () => {
	scorePopupRef.value.open()
}
const closeRatePopup = () => {
	scorePopupRef.value.close()
}

const submitScore = async () => {
	uni.showLoading({
		title: '加载中...'
	})
	let { classid, _id: wallId} = currentWrapper.info
	try {
		const res = await getSetupScoreAPI({
			classid,
			wallId,
			userScore: userRate.value
		})
		// 这里不需要判断errCode了，因为await相当于.then,只有resolve会进入这里
		// 而该api是在request.js里面判断errCode后resolve/reject的
		// if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
				icon: "none"
			})
			closeRatePopup()
		// }
		// 展示评分过的壁纸评分
		classifyList.value[currentWrapper.index].userScore = userRate.value
	} catch(err) {
		console.log(err);
	}
	uni.hideLoading()
}

const goBack = () => {
	uni.navigateBack()
}

const classifyListStore = useClassifyListStore()
const classifyList = ref([])
const getClassifyList = () => {
	return classifyListStore.classifyList.map((item, index) => {
		item.picurl = item.smallPicurl.replace('_small.webp', '.jpg')
		if (item._id === optionId) {
			currentWrapper.index = index
			currentWrapper.info = item
			loadedSwiperIndexList.value.push(index)
		}
		return item
	})
}

const title = ref('')
let optionId = ''
onLoad((option) => {
	title.value = option.title
	optionId = option.id
	classifyList.value = getClassifyList()
})

// 优化图片加载，防止一次加载全部图片
let loadedSwiperIndexList = ref([])
function swiperChange(ev) {
	const index = ev.detail.current
	currentWrapper.index = index
	currentWrapper.info = classifyList.value[index]
}

watch(
	() => currentWrapper.index,
	(index, old) => {
		userRate.value = currentWrapper.info.userScore || 0
		// 计算与index相邻的图片下标
		let left = index === 0 ? classifyList.value.length - 1 : index - 1
		let right = index === classifyList.value.length ? 0 : index + 1
		loadedSwiperIndexList.value.push(left, index, right)
		loadedSwiperIndexList.value = [...new Set(loadedSwiperIndexList.value)]
	})
</script>

<template>
	<view class="preview">
		<swiper circular @change="swiperChange" :current="currentWrapper.index" @click="maskChange">
			<swiper-item v-for="(item, index) in classifyList" :key="index">
				<image v-if="loadedSwiperIndexList.includes(index)" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="mask" :style="{display: maskStatus ? 'visiable' : 'none'}"  v-if="currentWrapper.info">
			<view @click="goBack" class="goBack" :style="{top: getStatusBarHeight() + 'px', left: getLeftIcon() + 'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="index">{{`${currentWrapper.index + 1} / ${classifyList.length}`}}</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"/>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"/>
			</view>
			<view class="footer">
				<view class="box" @click="showInfoPopup">
					<uni-icons type="info" size="28"></uni-icons>
					<text class="text">信息</text>
				</view>
				
				<view class="box" @click="openRatePopup">
					<uni-icons type="star" size="28"></uni-icons>
					<text class="text">{{currentWrapper.info.score}}分</text>
				</view>
				
				<view class="box">
					<uni-icons type="download" size="28"></uni-icons>
					<text class="text">下载</text>
				</view>
			</view>
		</view>
		
		<!-- 壁纸信息 -->
		<uni-popup ref="popupRef" type="bottom" :safe-area="false">
			<view class="info-popup">
				<view class="header">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="closeInfoPopup">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				
				<scroll-view scroll-y>
					<view class="content" v-if="currentWrapper.info">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable user-select class="value">{{currentWrapper.info._id}}</text>
						</view>
						
						<view class="row">
							<view class="label">分类：</view>
							<text  class="value class">{{title}}</text>
						</view>
						
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">蓝胖子</text>
						</view>
						
						<view class="row">
							<view class="label">评分：</view>
							<view class="value rate-box">
								<uni-rate readonly :touchable="false" :value="currentWrapper.info.score" size="16"/>
								<text class="score">{{currentWrapper.info.score}}分</text>
							</view>
						</view>
						
						<view class="row">
							<view class="label">摘要：</view>
							<text selectable user-select class="value">
								{{currentWrapper.info.description}}
							</text>
						</view>
						
						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="(tab, index) in currentWrapper.info.tabs" :key="index">{{tab}}</view>
							</view>
						</view>
						
						<view class="copyright">
								声明：本图片来源于网络，非商业使用，用于免费学习交流，如有侵权，您可以拷贝壁纸ID发送至平台邮箱17355479052@163.com，管理将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<!-- 评分 -->
		<uni-popup ref="scorePopupRef" :is-mask-click="false">
			<view class="score-popup">
				<view class="header">
					<view></view>
					<view class="title">{{isRated ? '已经评分过啦～' : '壁纸评分'}}</view>
					<view class="close" @click="closeRatePopup">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="userRate" :disabled="isRated" disabled-color="#FFCA3E" allow-half></uni-rate>
					<text class="text">{{userRate}} 分</text>
				</view>
				<view class="footer">
					<button @click="submitScore" :disabled="isRated" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<style scoped lang="scss">
	.preview {
		width: 100vw;
		height: 100vh;
		position: relative;
		swiper {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.mask {
			display: flex;
			align-items: center;
			flex-direction: column;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			&>view {
				position: absolute;
				z-index: 10;
				color: #fff;
			}
			.goBack {
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100px;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
				pointer-events: auto;
			}
			.index {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
				
				// width: fit-content;
			}
			.time {
				top: calc(10vh + 80rpx);
				font-size: 140rpx;
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4px rgba(0, 0, 0, 0.3);
			}
			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2px rgba(0, 0, 0, 0.3);
			}
			.footer {
				display: flex;
				justify-content: center;
				align-items: center;
				justify-content: space-around;
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				background-color: rgba(255, 255, 255, 0.8);
				border-radius: 120rpx;
				color: $text-font-color-1;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);
				pointer-events: auto;
				.box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100%;
					padding: 0 12rpx;
					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}
		
		.info-popup, .score-popup {
			background-color: #fff;
			padding: 30rpx;
			overflow: hidden;
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title {
					color: $text-font-color-2;
					font-size: 32rpx;
				}
				.close {
					padding: 6rpx;
				}
			}
			scroll-view {
				max-height: 60vh;
				.content {
					.row {
						display: flex;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;
						.label {
							color: $text-font-color-2;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
						}
						.value {
							flex: 1;
							width: 0;
							&.class {
								color: $brand-theme-color;
							}
							&.rate-box {
								width: 100%;
								display: flex;
								align-items: center;
								.score {
									font-size: 26rpx;
									color: $text-font-color-3;
									padding-left: 20rpx;
								}
							}
							&.tabs {
								display: flex;
								flex-wrap: wrap;
								.tab {
									border: 1px solid $brand-theme-color;
									color: $brand-theme-color;
									font-size: 22rpx;
									padding: 10rpx 30rpx;
									border-radius: 40rpx;
									line-height: 1.5em;
									margin: 0 10rpx;
								}
							}
						}
					}
					.copyright {
						font-size: 28rpx;
						padding: 20rpx;
						background: #F6F6F6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}
				}
			}
		}
		.score-popup {
			width: 70vw;
			border-radius: 30rpx;
			.content {
				display: flex;
				justify-content: center;
				padding: 30rpx 0;
				.text {
					color: #ffca3e;
					line-height: 1.75em;
					width: 3.5em;
					text-align: center;
				}
			}
			.footer {
				display: flex;
				justify-content: center;
			}
		}
	}
</style>
