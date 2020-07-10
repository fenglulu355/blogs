<template>
	<view class="ordermain">
		<navtop :title="navtop.title" :isHeight="false" hasBgc="white" :color="navtop.color" :isBack="false"></navtop>
		<view class="order-top">
				<image class="img" src="../../static/top.png" mode="" style="height: 65rpx; width: 80rpx"></image>
			
			<!-- <view class="text">待物流取货</view> -->
			<view class="text" v-if="infos.tyd[0].s==0">新开单</view>
			<view class="text" v-if="infos.tyd[0].s==1">发车</view>
			<view class="text" v-if="infos.tyd[0].s==2">到车</view>
			<view class="text" v-if="infos.tyd[0].s==5">已提货</view>
			<view class="text" v-if="infos.tyd[0].s==6">送货中</view>
			<view class="text" v-if="infos.tyd[0].s==10">中转</view>
			<view class="complete" v-if="infos.tyd[0].s==100">作废</view>
			<!-- <view class="text-g">请尽快包装好货品，物流将上门取货</view> -->
			<view class="ot-btn">
				<view class="ot-btn-state btn" @tap="toonline">
					物流状态
				</view>
				<view class="tocall btn curbtn"  @tap="tocall('028-83087633')">
					联系物流
				</view>
			</view>
		</view>
		<view class="order-data">
			<view >	{{infos.fcd[0].bsite}} → {{infos.fcd[0].esite}}</view>
			<view class='time'>全程预计3天</view>
			
		</view>
		<view class="infos">
			<!-- 运输信息 -->
			<view class="intransit odbox">
				<view class="icon">
					<image src="../../static/car.png" mode=""  
					style="height: 40rpx; width: 40rpx"></image>
					<text>运输信息</text>
				</view>
				<view class="sendinfo ">
					<view class="line">
						<text class="left">发货地址</text>
						<text class="right">{{infos.fcd[0].bsite}}</text>
					</view>
					<view class="line">
						<text class="left">发货电话</text>
						<text class="right" v-if="infos.tyd[0].shippertel"
						 @tap="tocall(infos.tyd[0].shippertel)"
						>{{infos.tyd[0].shippertel}}</text>
						<text class="right" v-else
						 @tap="tocall(infos.tyd[0].shippermb)"
						>{{infos.tyd[0].shippermb}}</text>
					</view>
					<view class="line">
						<text class="left">收货地址</text>
						<text class="right">{{infos.tyd[0].address}}</text>
					</view>
					<view class="line">
						<text class="left">收货电话</text>
						<text class="right" v-if="infos.tyd[0].shippertel"
						@tap="tocall(infos.tyd[0].consigneetel)"
						>{{infos.tyd[0].consigneetel}}</text>
						<text class="right" v-else
						>{{infos.tyd[0].consigneemb}}</text>
					</view>
					<view class="line">
						<text class="left">发货时间</text>
						<text class="right">{{infos.fcd[0].senddate}}</text>
					</view>
				</view>
			</view>
			<!-- 货物信息 -->
			<view class="intransit odbox">
				<view class="icon">
					<image src="../../static/send.png" mode="" style="height: 40rpx; width: 40rpx"
					></image>
					<text>货物信息</text>
				</view>
				<view class="sendinfo ">
					<view class="line">
						<text class="left">交接方式</text>
						<text class="right">{{infos.tyd[0].okprocess}}</text>
					</view>
					<view class="line">
						<text class="left">货品名称/数量</text>
						<text class="right">{{infos.tyd[0].product}}/{{infos.tyd[0].qty}}</text>
					</view>
					<view class="line">
						<text class="left">体积/重量</text>
						<text class="right">{{infos.tyd[0].v}}/{{infos.tyd[0].w}}</text>
					</view>
				</view>
			</view>
			<!-- 其他信息 -->
			<view class="intransit odbox">
				<view class="icon">
					<image src="../../static/other.png" mode="" style="height: 40rpx; width: 40rpx"></image>
					<text>其他信息</text>
				</view>
				<view class="sendinfo ">
					<view class="line">
						<text class="left">下单时间</text>
						<text class="right">{{infos.tyd[0].billdate}}</text>
					</view>
					<view class="line">
						<text class="left">运单号</text>
						<text class="right">{{infos.tyd[0].unit}}</text>
					</view>
					<view class="line">
						<text class="left">发车时间</text>
						<text class="right">{{infos.fcd[0].senddate}}</text>
					</view>
					<view class="line" v-if="infos.fcd[0].bsite">
						<text class="left">发车站点</text>
						<text class="right">{{infos.fcd[0].bsite}}</text>
					</view>
					<view class="line" v-if="infos.fcd[0].esite">
						<text class="left">发车到车站点</text>
						<text class="right">{{infos.fcd[0].esite}}</text>
					</view>
					<view class="line" v-if="infos.fcd[0].arriveddate">
						<text class="left">发车到车时间</text>
						<text class="right">{{infos.fcd[0].arriveddate}}</text>
					</view>
					<view class="line"  v-if="infos.out[0].outdate">
						<text class="left">中转时间</text>
						<text class="right">{{infos.out[0].outdate}}</text>
					</view>
					<view class="line" v-if="infos.out[0].outcygs">
						<text class="left">中转承运公司</text>
						<text class="right">{{infos.out[0].outcygs}}</text>
					</view>
					<view class="line" v-if="infos.out[0].outbillno">
						<text class="left">中转单号</text>
						<text class="right">{{infos.out[0].outbillno}}</text>
					</view>
					<view class="line" v-if="infos.out[0].billdate">
						<text class="left">中转跟踪时间</text>
						<text class="right">{{infos.out[0].billdate}}</text>
					</view>
					<view class="line" v-if="infos.out[0].content">
						<text class="left">中转跟踪内容</text>
						<text class="right">{{infos.out[0].content}}</text>
					</view>
					<view class="line" v-if="infos.out[0].createby">
						<text class="left">中转跟踪人</text>
						<text class="right">{{infos.out[0].createby}}</text>
					</view>
					<view class="line" v-if="infos.send[0].sendvehicleno">
						<text class="left">送货车号</text>
						<text class="right">{{infos.send[0].sendvehicleno}}</text>
					</view>
					<view class="line" v-if="infos.send[0].sendman">
						<text class="left">送货司机</text>
						<text class="right">{{infos.send[0].sendman}}</text>
					</view>
					<view class="line" v-if="infos.send[0].sendmantel">
						<text class="left">送货司机电话</text>
						<text class="right" @tap="tocall(infos.send[0].sendmantel)">
						{{infos.send[0].sendmantel}}</text>
					</view>
					<view class="line" v-if="infos.send[0].sendqty">
						<text class="left">送货件数</text>
						<text class="right">{{infos.send[0].sendqty}}</text>
					</view>
					<view class="line" v-if="infos.send[0].esitesenddate">
						<text class="left">送货时间</text>
						<text class="right">{{infos.send[0].esitesenddate}}</text>
					</view> 
					<view class="line" v-if="infos.fetch[0].fetchman">
						<text class="left">签收人</text>
						<text class="right">{{infos.fetch[0].fetchman}}</text>
					</view>
					<view class="line" v-if="infos.fetch[0].fetchmancode">
						<text class="left">签收人证件</text>
						<text class="right">{{infos.fetch[0].fetchmancode}}</text>
					</view>
					<view class="line" v-if="infos.fetch[0].fetchdate">
						<text class="left">签收时间</text>
						<text class="right">{{infos.fetch[0].fetchdate}}</text>
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
						infos:{},
				startinfo:'成都市武侯区新希望大厦7楼704室',
				endinfo:'成都市武侯区新希望大厦',
				time:'2019-08-07 11:30',
				type:'玻璃制品',
				num:'艺术品/50箱',
				size:'30*30*30cm',
				creattime:'2019-08-07 11:30',
				ordernum:'aeqweqwd484sd894',
				code:'1565sd',
				number:''
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
			toonline(){
				uni.navigateTo({
					url:'../online/online'
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
			}
		}
	}
</script>

<style scoped> 
.ordermain{
	width: 100%;
	background: #f5f5f5;
	box-sizing: border-box;
	padding: 200rpx 25rpx 80rpx 25rpx;
}
/* top */
.order-top{
	width: 100%;
	height: 350rpx;
	background: white;
	border-radius: 20rpx;
	text-align: center;
	box-sizing: border-box;
	padding-top: 55rpx;
}
.order-top .text{
	font-size: 32rpx;
	box-sizing: border-box;
	padding-top: 15rpx;
}
.order-top .text-g{
	font-size: 30rpx;
	color: #a1a1a1;
		box-sizing: border-box;
	padding-top: 15rpx;
}
.order-top .ot-btn{
	box-sizing: border-box;
	padding-top: 20rpx;
}
.order-top .btn{
	display: inline-block;
	box-sizing: border-box;
	margin: 0 10rpx;
	width: 160rpx;
	height: 65rpx;
	border:1rpx solid #999999;
	text-align: center;
	line-height: 65rpx;
	font-size: 30rpx;
	border-radius: 10rpx;
}
.order-top .curbtn{
	border-color:#f08519;
	background: #f08519;
	color: white;
}
/* order-data */
.order-data{
	width: 100%;
	height: 95rpx;
	background: white;
	border-radius: 20rpx;
	text-align: center;
	box-sizing: border-box;
	padding: 0rpx 25rpx;
	margin-top:20rpx ;
	display: flex;
	justify-content: space-between;
}
.order-data view{
	line-height: 95rpx;
	font-size: 32rpx;
}
.order-data .time{
	font-size: 28rpx;
}
/* infos */
.infos{
	box-sizing: border-box;
	margin-top: 20rpx;
}
.infos .odbox{
	width: 100%;
	/* height: 320rpx; */
	background: white;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 25rpx 25rpx;
	margin-top: 20rpx;
}
.infos .odbox .icon{
	font-size: 30rpx
}
.infos .odbox .icon text{
	box-sizing: border-box;
	padding-left: 10rpx;
	position: relative;
	bottom: 6rpx;
}
.infos .odbox .sendinfo .line{
	/* background: #007AFF; */
	box-sizing: border-box;
	padding-top: 20rpx;
	font-size: 30rpx;
	display: flex;
	justify-content: space-between;
}
.infos .odbox .sendinfo .line .left{
	width: 35%;
	color: #d3d3d3;
}
.infos .odbox .sendinfo .line .right{
	width: 65%;
	text-align: right;
}
</style>
