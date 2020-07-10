import Vue from 'vue'
import App from './App'














//获取不同机型的头部高度
Vue.prototype.isBarHeight999 = function() {
	return new Promise((resolve, reject) => {
		var that = this
		var isTemp = {}
		uni.getSystemInfo({
			success(res) {
				let totalTopHeight = 80
				if (res.model.indexOf('iPhone X') !== -1) {
					totalTopHeight = 88
				} else if (res.model.indexOf('iphone') !== -1) {
					totalTopHeight = 80
				}
				isTemp['statusBarHeight'] = res.statusBarHeight
				isTemp['titleBarHeight'] = totalTopHeight - res.statusBarHeight
				isTemp['allHeight'] = totalTopHeight
				resolve(isTemp)
			},
			fail(e) {
				reject(e)
			}
		})
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
