const baseURL = 'https://tea.qingnian8.com/api/bizhi'

export function request(url, config = {}) {
	let {
		method = 'GET',
		header = {},
		data = {}
	} = config
	header["access-key"] = "looooo"
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + url,
			method,
			header,
			data,
			success: res => {
				if (res.data.errCode === 0) {
					resolve(res.data)
				} else if (res.data.errCode === 400) {
					uni.showModal({
						title: "错误提示",
						content: res.data.errMsg,
						showCancel: false
					})
					reject(res.data)
				} else {
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					reject(res.data)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}