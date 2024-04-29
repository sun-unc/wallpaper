<script setup>

</script>

<template>
  <view class="classfy-layout page-bg">
	<view class="classfy" v-for="item in 15">
		<ThemeItem ></ThemeItem>
	</view>
  </view>
</template>

<style scoped lang="scss">
	.classfy-layout {
		padding: 30rpx;
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(3, 1fr);
		.classfy {
			width: 100%;
		}
	}
</style>
