import Vue from 'vue'
import Vuex from 'vuex'
// import footer_store from "./modules/footer_store.js"
// import index_store from "./modules/index_store.js"
Vue.use(Vuex)


let base_url = "http://hhwl.public.5151fw.com";
const store = new Vuex.Store({
	state: {
		openId:'',
		user_nickname:'',
		user_sex:'',
		user_image:'',
		wx_headimg:'',
		user_name:'',
		user_phone:'',
		user_type:'',
		base_url:"http://hhwl.public.5151fw.com",
		user_id:'',
		user:{
			openid:'',
			nickname:'',
			sex:'',
			headimg:''
		}
		//user_id:''
	},
	mutations: {
		//赋值
		serAssignment:function(state,e){
			state.openId = e.wx_openid
			state.user_nickname = e.user_nickname
			state.user_sex = e.user_sex
			state.user_phone = e.user_phone
			state.wx_headimg = e.wx_headimg
			state.user_name = e.user_name
			state.user_type = e.user_type
		},
		serAssignmentA:function(state,e){
			state.user.openid = e.openid
			state.user.nickname = e.nickname
			state.user.sex = e.sex
			state.user.headimg = e.headimg
			state.user_id = e.user_id
		},
		// 微信获取的用户信息
		setuserinfo:function(state,e){
			
		}
	},
	actions: {
		// 设置微信登录获取的用户信息
		getuserinfo:({
			commit
		}, data)=>{
		console.log(data,'user')
		},
		//微信快捷登录
		loginwx: ({
			commit
		}, data) => {
			console.log(data,'data')
			uni.showLoading({
				title:'加载中。。。',
				mask:true
			})
			uni.request({
				url: base_url + '/wxapp/login/wxLogin', //仅为示例，并非真实接口地址。
				method: 'POST',
				data: {
					code: data.code,
				},
				success: (res) => {
					console.log(res,'res')
					if(res.data.data.user_name){
						let data = {
							user_name:res.data.data.user_name,
							user_nickname:res.data.data.user_nickname,
							user_phone:res.data.data.user_phone,
							user_sex:res.data.data.user_sex,
							wx_headimg:res.data.data.wx_headimg,
							wx_openid:res.data.data.wx_openid,
							user_type:res.data.data.user_type,
							user_id:res.data.data.user_id
						}
						commit('serAssignment', data)
						let openid = {
							openid: res.data.data.wx_openid
						}
						console.log(openid,'openid')
						uni.request({
							url:base_url+'/wxapp/login/userInfo',
							method:'POST',
							data:openid,
							success:(res) =>{
								console.log(res,'aaaaaaaaa')
								// if(res.data.code == 0){
								// 	uni.showToast({
								// 		title:'请先注册账号',
								// 		icon:'none'
								// 	})
								// 	uni.navigateTo({
								// 		url:`/pages/register/register`,
								// 	})
								// }
							}
						})
						uni.setStorage({
							key:'userId',
							data:data,
							success: () => {
								uni.showToast({
									title:'登录成功！',
									icon:'none'
								})
								setTimeout(function () {
								    uni.hideLoading();
									if(res.data.data.user_type == 0){
										uni.navigateTo({
											url:'/pages/index/index'
										})
									}else if(res.data.data.user_type == 1){
										uni.navigateTo({
											url:'/pages/carrier/carrier'
										})
									}else if(res.data.data.user_type == 2){
										uni.navigateTo({
											url:'/pages/cars/cars'
										})
									}
								}, 1000);
								
							}
						})
					}else{
						console.log(res,'resss')
						let data = {
							openid:res.data.data.wx_openid,
							nickname:res.data.data.user_nickname,
							sex:res.data.data.user_sex,
							headimg:res.data.data.wx_headimg,
							user_id:res.data.data.user_id
						}
						let user_id = res.data.data.user_id
						commit('serAssignmentA', data)
						uni.showToast({
							title:'请先注册账号',
							icon:'none'
						})
						setTimeout(function(){
							uni.navigateTo({
								url:`/pages/register/register`,
							})
						},500)
						
					}
				}
			});
		},
		//账号密码登录
		denglu:({
			commit
		},data)=>{
			console.log(data,'dldata')
			let dldata = data.data
			let user = dldata.user
			let pwd = dldata.pwd
			uni.showLoading({
				title:'加载中。。。',
				mask:true
			})
			let adata = {
				user:user,
				pwd:pwd
			}
			uni.request({
				url:base_url+'/wxapp/login/userLogin',
				method:'POST',
				data:adata,
				success(e) {
					if(e.data.code==0){
						uni.showToast({
						  title:'账号或者密码错误',
						  icon:'none'
						})
						return
					}else{
						let user_id = {
							user_id:e.data.data
						}
						uni.request({
							url:base_url+'/wxapp/users/userInfo',
							method:'POST',
							data:user_id,
							success(res) {
								console.log(res,'dlcgres')
								//在用户已绑定微信了的情况走这
								if(res.data.data.wx_headimg){
									setTimeout(function () {
										let data = {
											user_name:res.data.data.user_name,
											user_nickname:res.data.data.user_nickname,
											user_phone:res.data.data.user_phone,
											user_sex:res.data.data.user_sex,
											wx_headimg:res.data.data.wx_headimg,
											wx_openid:res.data.data.wx_openid,
											user_type:res.data.data.user_type,
											user_id:res.data.data.user_id
										}
										uni.setStorage({
											key:'userId',
											data:data
										})
										uni.showToast({
											title:'登录成功！',
											icon:'none'
										})
										uni.hideLoading();
									}, 1000);
									if(res.data.data.user_type == 0){
										uni.navigateTo({
											url:'/pages/index/index'
										})
									}else if(res.data.data.user_type == 1){
										uni.navigateTo({
											url:'/pages/carrier/carrier'
										})
									}else if(res.data.data.user_type == 2){
										uni.setStorage({
											key:'carId',
											data:{
												car_id:res.data.data.car_id
											}
										})
										uni.navigateTo({
											url:'/pages/cars/cars'
										})
									}
								}else{
									//没有绑定走这
									let user = dldata.user
									let pwd = dldata.pwd
									uni.navigateTo({
										url: `/pages/logins/logins?user=${user}&pwd=${pwd}`
									});
								}
							}
						})
					}
				
				
				}
			})
		}
	},
	modules:{
		footer_store,
		index_store,
	}
})

export default store
