<template>
	<view class="searchlist">
		<navtop :title="navtop.title" :isHeight="false" hasBgc="white" :color="navtop.color" :isBack="false"></navtop>
		<view class="searchbox">
			<input type="text" value="" v-model="numbers" placeholder="请输入您想搜索的内容" />
			<image @click="tosearchlist" class="img" src="../../static/search.png" mode=""></image>
		</view>
		<view class="text">
			搜索结果
		</view>
		<view class="search-list">
			<view class="searchli"  >
				<view class="s-li-top">
					<view class="red pag"></view>
					<view class="start address">
						{{infos.fcd[0].bsite}}
					</view>
				</view>
				<view class="s-li-center">
					<image class="img" src="../../static/切换.png" mode=""></image>
					<view class="border">
					</view>
				</view>
				<view class="s-li-bot">
					<view class="orange pag"></view>
					<view class="end address">
						{{infos.fcd[0].esite}}
					</view>
				</view>
				<view class="numbox">
					<view class="ordernum">
						运单号：{{infos.tyd[0].unit}}
					</view>
					<view class="type">
						<text class="online" v-if="infos.tyd[0].s==0">新开单</text>
						<text class="online" v-if="infos.tyd[0].s==1">发车</text>
						<text class="online" v-if="infos.tyd[0].s==2">到车</text>
						<text class="online" v-if="infos.tyd[0].s==5">已提货</text>
						<text class="online" v-if="infos.tyd[0].s==6">送货中</text>
						<text class="online" v-if="infos.tyd[0].s==10">中转</text>
						<text class="complete" v-if="infos.tyd[0].s==100">作废</text>
						<!-- <text class="complete" v-else>已完成</text> -->
					</view>
					<view class="more" @click="tomore">
						详情
					</view>
				</view>
				
			</view>
		</view>
	<!-- 	<view class="morelist">
			更多订单
		</view> -->
	</view>
</template>

<script>import navtop from "../../components/nav_top/nav_top.vue"
	export default {
		data() {
			return {
				navtop: {
							title: '四川弘浩物流',
							color: 'black'
						},
						infos:{},
						number:'',
						numbers:''
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
			tomore(){
				uni.navigateTo({
					url:`../ordermains/ordermain?number=`+this.number
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
							console.log(this.infos);
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
	tosearchlist(){
		console.log(1);
		if(this.numbers==''){
			uni.showToast({
			    title: "订单号/货号为空",
			    icon: "none"
			})
		}else{
			uni.request({
				url: 'http://hhwl.com/wxapp/login/getHh',
				method: 'POST',
				data: {number:this.numbers,type:1},
				success: res => {
					if(res.data.data.result==1){
						uni.showToast({
							title:res.data.data.msg,
							icon: "none"
						})
					}else if(res.data.data.result==0){
						uni.showLoading({
							title:'跳转中....'
						})
						setTimeout(function() {
						  uni.hideLoading()
						}, 10);
						uni.navigateTo({
							url:`../searchlist/searchlist?number=`+this.numbers
						})
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
		
		
	},
			
		}
	}
</script>

<style scoped>
.searchlist{
		width: 100%;
		min-height: 1400rpx;
		background: #f5f5f5;
		box-sizing: border-box;
		padding: 200rpx 25rpx 80rpx 25rpx;
		
	}
.searchlist .searchbox{
	width: 100%;
	height: 100rpx;
	box-sizing: border-box;
	margin-top: 20rpx;	
	background: white;
	position: relative;
	border-radius: 20rpx;
}
.searchlist .searchbox input{
	width: 90%;
	height: 100%;
	font-size: 30rpx;
	box-sizing: border-box;
	padding: 0 30rpx 0 10rpx;
}
.searchlist .searchbox .img{
	position: absolute;
	width: 40rpx;
	height: 40rpx;
	right: 40rpx;
	top: 50%;
	transform: translateY(-50%)
}
.text{
	font-size: 30rpx;
	color: #666666;
	box-sizing: border-box;
	padding: 30rpx 0;
}
.search-list{
width: 100%;
}
.searchli{
	width: 100%;
	background: white;
	border-radius: 20rpx;
	margin-bottom: 20rpx ;
	box-sizing: border-box;
	padding: 40rpx 40rpx;
	
}

 .pag{
	width: 15rpx;
	height: 15rpx;
	border-radius: 50%;
	background:#ff5e5e ;
	margin: 0 auto;
	align-self: center;
}
 .orange{
	background:#ffb000 ;
}
.img{
	margin: 0 auto;
	align-self: center;
	width: 10rpx;
	height: 46rpx;
}
.s-li-top,.s-li-center,.s-li-bot,.numbox{
	/* background: #007AFF; */
	display: flex;
	justify-content: space-between;
}
.address{
	width: 90%;
	font-size: 32rpx;
	line-height: 42rpx;
	}
.border{	
	align-self: center;
	width: 90%;
	height: 2rpx;
	background: #efefef;
}
.numbox{
	width: 90%;
position: relative;
left: 10%;
box-sizing: border-box;
padding-top: 20rpx;
}
.ordernum{
	color:#a7a7a7 ;
	font-size: 26rpx;
}
.type{
	font-size: 26rpx;
}
.online{
	color: #77e097;
}
.complete{
	color:#a7a7a7 ;
}
.more{
width: 125rpx;	
height: 55rpx;
background: #f08519;
color: white;
border-radius: 10rpx;
text-align: center;
line-height: 55rpx;
font-size: 28rpx;
position: relative;
bottom: 8rpx;
}
.morelist{
	width: 100%;
	height: 75rpx;
	background:#ececec ;
	border-radius: 20rpx;
	text-align: center;
	line-height: 75rpx;
	font-size: 30rpx;
	color: #666666;
}

</style>
