
<template>
	<view>
		<view class="nav_top" :style="{height:barHeight.allHeight+ touheight + 'px',
		'background-color':hasBgc}">
			<view class="status-bar" :style="{height:barHeight.statusBarHeight+'px'}"></view>
			<view class="topContent">
				<image class="nav_logo" @click="goBack" src="../../static/back.png" mode=""></image>
				<view class="title" :style="{color:color}">{{title}}</view>
				<ul class="decorate_box">
					<li class="decorate2" style="width: 100vh;height: 6rpx; background-color: #f0b404;">
					</li>
					<li class="decorate3" style="width: 100vh;height: 19rpx; background-color: #067d83;">
					</li>
				</ul>
			</view>
		</view>
		<view v-if="isHeight" class="marginBox" :style="{height:barHeight.allHeight + 12.5 +'px' }"></view>
	</view>
</template>
 
<script>
	import {mapState} from 'vuex'
	
	export default {
		props:{
			title:{
				type:String,
				default:'四川弘浩物流'
			},
			hasBgc:{   //背景色
				type:String,
				default:'white'
			},
			color:{ //字体颜色
				type:String,
				default:'black;'
			},
			isBack:{   //是否有返回箭头
				type: Boolean,
				default:false
			},
			backColor:{ //回退箭头颜色
				type:String,
				default:'white'
			},
			isHeight:{   //头部撑开高度
				type:Boolean,
				default:true
			},
			isNavBack:{   //固定返回前面的页面
				type:Boolean,
				default:true
			},
			backUrl:{    //返回到那个页面
				type:String,
				default:'index'
			},
			backNum:{   //返回几个页面
				type:Number,
				default:1
			}
		},
		computed:{
			// ...mapState(['barHeight'])
		},
		data() {
			return {
				barHeight:'',
				touheight:''
			};
		},
		methods:{
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		created() {
			//兼容不同浏览器的导航栏高度
			
			this.isBarHeight999().then((isTemp)=>{
				this.barHeight = isTemp
					if(this.barHeight.statusBarHeight > 20){
						this.touheight = 20
					}else{
						this.touheight = 5
					}
			})
			
			
			// if(!this.barHeight.allHeight||!this.barHeight.statusBarHeight){
			// 	this.isBarHeight999().then((isTemp)=>{
			// 		this.$store.state.barHeight = isTemp
			// 	})
			// }
			
		}
	}
</script>
 
<style lang="scss">
.nav_top{
		width: 100vw;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 900;
		display: flex;
		flex-direction: column;
		background-color: white;
		.topContent{
			width: 100vw;
			height: 100rpx;
			position: relative;
			.goBack{
				position: absolute;
				top: 0;
				left: 0;
				width: 15vw;
				height: 100upx;
				display: flex;
				align-items: center;
				padding-left: 20upx;
				box-sizing: border-box;
				z-index: 9999;
				image{
					width: 40upx;
					height: 42upx;
				}
			}
			.nav_logo{
				position: absolute;
				top: 23rpx;
				left: 27rpx;
				width: 57rpx;
				height: 53rpx;
				padding-left: 20upx;
				image{
					width: 40rpx;
					height: 42rpx;
				}
			}
			.title{
				text-align: center;
				width: 100%;
				height: 100%;
				line-height: 100upx;
				font-size: 40upx;
				font-family:'自定义字体';
			}
			.decorate_box{
				height: 25rpx;
				// background: #222222;
				overflow: hidden;
			}
		}
	}
</style>