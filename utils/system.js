	// 获取刘海高度（状态栏）
	const SYSTEM_INFO = uni.getSystemInfoSync()
	export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;
	
	export const getTitleBarHeight = () => {
		// 获取小程序胶囊菜单高度
		if(uni.getMenuButtonBoundingClientRect) {
			const {top, height} = uni.getMenuButtonBoundingClientRect()
			let titleBarHeight = height + (top - getStatusBarHeight()) * 2
			return titleBarHeight
		} else {
			return 40
		}
 	}
	
	// 计算navbar的高度
	export const getNavBarHeight = () => (getStatusBarHeight() + getTitleBarHeight())
	
	// 计算头条小程序（包含固定icon 及 元素）
	export const getLeftIcon = () => {
		// #ifdef MP-TOUTIAO 
			let {leftIcon: {left, width}} = tt.getCustomButtonBoundingClientRect
			return left + width
		// #endif
		
		// #ifndef MP-TOUTIAO 
			return 15
		// #endif
	}
	