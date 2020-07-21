<template>
	<view class="home ">
		<navtop :title="navtop.title" :isHeight="false" hasBgc="white" :color="navtop.color" :isBack="false"></navtop>
		<view class="home-banner">
			<image class="img" src="../../static/home.png" mode=""
			></image>
		</view>
		<view class="searchbox">
			<input type="text" value="" v-model="number" placeholder="搜索订单号/货号" />
			<image @tap="tosearchlist" class="img" src="../../static/search.png" mode=""></image>
		</view>
		<view class="tel">
			查询、投诉电话：<text @tap="tocall('028-83087633')">028-83087633</text>
		</view>
		<view class="text">
			康定  色达  雅江  即将开通敬请期待
		</view>
		<view class="tomore"> 
			<view class="gywm">
				关于我们 
			</view>
		</view>
		<view class="footer">
			<image class="img" src="../../static/logo.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import navtop from "../../components/nav_top/nav_top.vue"
	export default {
		data() {
			return {
				navtop: {
							title: '四川弘浩物流',
							color: 'black'
						},
						number:'',
			}
		},
		components: {
			navtop
		},
		created() {
			
			this.isBarHeight999().then((isTemp)=>{
				this.barHeight = isTemp
					if(this.barHeight.statusBarHeight > 20){
						this.touheight = 20
					}else{
						this.touheight = 5
					}
			})
		},
		methods: {
			tocall(tel){
				uni.makePhoneCall({
					phoneNumber:tel,
					success: (res) => {
					},
					fail: (res) => {
						console.log(res);
						uni.showToast({
						    title: "拨打失败，请手动拨打电话",
						    icon: "none"
						})
					}
				})
			},
			tosearchlist(){
				console.log(1);
				if(this.number==''){
					uni.showToast({
					    title: "订单号/货号为空",
					    icon: "none"
					})
				}else{
					// uni.navigateTo({
					// 	url:`../searchlist/searchlist?number=`+this.number
					// })
					console.log(1);
					uni.request({
						url: 'http://hhwl.public.5151fw.com/wxapp/login/getHh',
						method: 'POST',
						 header: {'content-type': 'application/x-www-form-urlencoded'},
						data: {number:this.number,type:1},
						success: res => {
							console.log(res)
							// if(res.data.data.result==1){
							// 	uni.showToast({
							// 		title:res.data.data.msg,
							// 		icon: "none"
							// 	})
							// }else if(res.data.data.result==0){
							// 	uni.showLoading({
							// 		title:'跳转中....'
							// 	})
							// 	setTimeout(function() { 
							// 	  uni.hideLoading()
							// 	}, 10);
							// 	uni.navigateTo({
							// 		url:`../searchlist/searchlist?number=`+this.number
							// 	})
							// }
						},
						fail: (res) => {
							console.log(res,'fail');
						},
						complete: (res) => {
							console.log(res,'complete');
						},
					});
				}
				
				
			},
			search(){
				
			}
			
		}
	}
</script>

<style scoped>
.home{
	width: 100%;
	background: #f5f5f5;
	box-sizing: border-box;
	padding: 200rpx 25rpx 80rpx 25rpx;
	
}
.home .home-banner{
	width: 100%;
	height: 355rpx;
	border-radius: 20rpx;
	
}
.home .home-banner .img{
	width: 100%;
	height: 100%;
	border-radius: 20rpx;	
}
.home .searchbox{
	width: 100%;
	height: 100rpx;
	box-sizing: border-box;
	margin-top: 20rpx;	
	background: white;
	position: relative;
	border-radius: 20rpx;
}
.home .searchbox input{
	width: 90%;
	height: 100%;
	font-size: 30rpx;
	box-sizing: border-box;
	padding: 0 30rpx 0 10rpx;
}
.home .searchbox .img{
	position: absolute;
	width: 40rpx;
	height: 40rpx;
	right: 40rpx;
	top: 50%;
	transform: translateY(-50%)
	
}
.home .tel{
	box-sizing: border-box;
	padding: 65rpx 0 25rpx;
	font-size: 30rpx;
	text-align: center;
	color: #6a6a6a;
}
.home .text{
	font-size: 26rpx;
	text-align: center;
	color: #6a6a6a;
	background: #ececec;
	width: 70%;
	margin: 0 auto;
	line-height: 40rpx;
	border-radius: 20rpx;
}
.home .footer{
	box-sizing: border-box;
	padding-top: 300rpx;
	text-align: center;
}
.home .footer .img{
	width: 420rpx;
	height: 60rpx;
}
</style>
