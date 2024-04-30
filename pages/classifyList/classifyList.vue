<script setup></script>

<template>
	<view class="classify-list">
		<view class="content">
			<navigator url="" class="item" v-for="item in 10">
				<image src="../../common/images/preview2.jpg" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
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
