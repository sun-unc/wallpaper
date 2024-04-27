<script setup>
defineProps({
	title: {
		type: String,
	}
})
</script>

<template>
	<view class="common-title">
		<view class="name">{{title}}</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.common-title {
	display: flex;
	justify-content: space-between;
	.name {
		font-size: 40rpx;
	}
	.custom {
		margin-right: 30rpx;
	}
}
</style>