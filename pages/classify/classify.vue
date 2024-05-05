<script setup>

</script>

<template>
  <view class="classfy-layout page-bg">
		<NavBar title="分类"></NavBar>
		<view class="classfy">
			<ThemeItem v-for="item in 15"></ThemeItem>
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
