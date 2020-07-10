<template>
	<view class="onlinebox">
		<navtop :title="navtop.title" :isHeight="false" hasBgc="white" :color="navtop.color" :isBack="false"></navtop>
		<view class="t-info">
			<image class="img" src="../../static/head.png" mode=""></image>
			<view class="infos">
				<view class="name">{{infos.name}}</view>
				<view class="num gary">
					运单号：{{infos.tyd[0].unit}}
				</view>
				<view class="tel gary" @tap="tocall('028-83087633')">
					官方电话：028-83087633
				</view>
			</view>
		</view>
		<view class="onlinelist">
			<view class="receive">
				<image src="../../static/shou.png" mode=""></image>
				<view class="text">
					【收货地址】{{infos.tyd[0].address}}
				</view>
			</view>
			<view class="list">
				<view class="on-li" v-for="(item,index) of infos.locus" :key='index'>
					
					<view class="left">
							<view class="day">{{item.billdate}}</view>
							<view class="time">{{item.time}}</view>
					</view>
					<view class="center">
						<image class="img" v-if="item.icon" :src="item.icon" mode=""></image>
						<view class="pag" v-else></view>
					</view>
					<view class="right">
						<view class="title" :class="item.type==4 && item.icon?'sel':''"
						 v-if="item.type===4 && item.icon">运输中</view>
						<view class="title" v-if="item.type===3">已发货</view>
						<view class="title" v-if="item.type===2">已装车</view>
						<view class="title" v-if="item.type===1">已取货</view>
						<view class="text sel">{{item.content}}</view>
						<view class="text" :class="item.type==4 && item.icon?'sel':''">{{item.text}}</view>
					</view>
					
				</view>
			</view>
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
				infos:{}
			}
		},
		components: {
			navtop
		},	
		onLoad:function(option){//opthin为object类型，会序列化上页面传递的参数
		this.number=option.number
		this.requst(this.number)
			console.log(option.number);//打印出上页面传递的参数
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
						    title: "拨打失败，可手动拨打电话",
						    icon: "none"
						})
					}
				})
			},
			requst(number){
				uni.request({
					url: 'http://hhwl.com/wxapp/login/getHh',
					method: 'POST',
					data: {number:number,type:1},
					success: res => {
						if(res.data.data.result==1){
							uni.showToast({
								title:res.data.data.msg,
								icon: "none"
							})
						}else if(res.data.data.result==0){
							console.log(res.data.data);
							this.infos=res.data.data.msg
							this.infos.locus=this.infos.locus.reverse()
								let a=this.infos.locus.length
							if(a==1){
								this.infos.locus[0].icon='../../static/ysz.png'
								}
							else{
								this.infos.locus[0].icon='../../static/ysz.png'
								this.infos.locus[a - 1].icon='../../static/yxd.png'
							}
						
							this.infos.locus[a - 1].icon='../../static/yxd.png'
							console.log(this.infos.locus);
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
.onlinebox{
	width: 100%;
	background: #f5f5f5;
	box-sizing: border-box;
	padding: 200rpx 0rpx 80rpx 0rpx;
}
.t-info{
	display: flex;
	justify-content: space-between;
	background: white;
	box-sizing: border-box;
	padding: 25rpx 25rpx;
}
.t-info .img{
	width: 120rpx;
	height: 120rpx;
}
.t-info .infos{

	width: 80%;
	font-size: 32rpx;
}
.t-info .gary{
	font-size: 26rpx;
	box-sizing: border-box;
	padding-top: 8rpx;
	color: #333333;
}
.onlinelist{
	background: white;
	box-sizing: border-box;
	padding: 25rpx 25rpx;
	margin-top: 20rpx;
	
}
.receive{
	/* background: #007AFF; */
	width: 85%;
	position: relative;
	left: 15%;
	
	display: flex;
	justify-content: space-between;
	align-self: center;
}
.receive .text{
	font-size: 28rpx;
	width: 90%;
	color: #dddddd;
}
.receive image{
	width: 50rpx;
	height: 50rpx;
}
.list{
	width: 100%;
	box-sizing: border-box;
	padding-top: 30rpx;
}
.on-li{
	display: flex;
	justify-content: space-between;

	position: relative;

}


.on-li .left{
	/* background: #007AFF; */
	width: 25%;
	font-size: 24rpx;
	text-align: right;
	box-sizing: border-box;
	padding-right: 5rpx;	
	color: #dddddd;
	text-align: right;
}
.on-li .left .day{
		font-size: 22rpx;
}
.on-li .center{
	/* background: #4CD964; */
	width: 10%;
	text-align: center;
	position: absolute;
	left: 25%;
}
.on-li .center .img{
	width: 50rpx;
	height: 50rpx;
	
}
.on-li .center .pag{
	background: #dddddd;
	width: 10rpx;
	height: 10rpx;
	border-radius: 50%;
margin: 0 auto;
}
.on-li .right{
	width: 70%;
	font-size: 28rpx;
	color: #dddddd;
	border-left: 1rpx solid #dddddd;
	box-sizing: border-box;
	padding: 0rpx 0 50rpx 40rpx;
}
.sel {
color: #333333;
}
.none{
	border-left: none;
}
.list :last-child .right{
	border-left: none;
}
</style>
