<template>
    <div class="s-header">
        <div class="s-header-top">
            <div class="header-top-left"><img src="../assets/LOGO.png"></div>
            <div class="header-top-conter"><p class="tongzhao">统招代码：<span>{{yb}}</span></p></div>
            <div class="header-top-right"><img src="../assets/phone.png"><p><a :href="'tel:'+phone">{{this.phone}}</a>
            <a :href="'tel:'+ mobilea">{{this.mobilea}}</a></p>
            </div>
        </div>
        <div class="s-header-center">
            <mt-swipe>
                <mt-swipe-item 
                class="s-header-center-swiper"
                v-for="item in banner"
                :key="item.id"
                >
                <img :src="host+item.cover">
                </mt-swipe-item>
                <!-- <mt-swipe-item class="s-header-center-swiper"><img src="../assets/banner.png"></mt-swipe-item>
                <mt-swipe-item class="s-header-center-swiper"><img src="../assets/banner.png"></mt-swipe-item> -->
            </mt-swipe>
        </div>
        <div class="s-herder-bottom">
            <ul>
                <li>
                    <router-link :to="{path:'/home'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon1.png"></div>
                    <div class="s-herder-bottom-title">学校首页</div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/survey'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon2.png"></div>
                    <div class="s-herder-bottom-title">学校概况</div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/major'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon3.png"></div>
                    <div class="s-herder-bottom-title">招生就业</div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/examination'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon4.png"></div>
                    <div class="s-herder-bottom-title">高考升学</div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/teaching'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon5.png"></div>
                    <div class="s-herder-bottom-title">教学管理</div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/campus'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon6.png"></div>
                    <div class="s-herder-bottom-title">学校环境</div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/charge'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon7.png"></div>
                    <div class="s-herder-bottom-title">收费标准</div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path:'/contact'}">
                    <div class="s-herder-bottom-icon"><img src="../assets/icon8.png"></div>
                    <div class="s-herder-bottom-title">联系我们</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            showBox: false,
            mobilea:[],
            banner:[],
            phone:[],
            yb:[],
            host:'http://www.scsgmx.com'
        }
    },
    created(){
        
        this.$ajax.getConfig()
        .then(resp=>{  
            this.mobilea = resp.data.data.mobile
            this.phone = resp.data.data.phone
            this.yb = resp.data.data.yb 
            // console.log(this.phone)
        })
        this.$ajax.getBanner()
        .then(resp=>{
            
            let arr = []
            for(var i in resp.data.data){
                if(resp.data.data[i].type == 2){
                    arr.push(resp.data.data[i])
                    console.log(resp.data.data)
                }
            }
            this.banner = arr
            console.log(this.banner)
        })
    },
    methods:{
        toTrue(){
            this.showBox = true
        },
        call(nub){
            window.location.href = "tel:" + nub
        }
    }
}
</script>

<style scoped>
.s-header{
    width: 100%;
    overflow: hidden;
}
.s-header-top{
    height: 110px;
    padding: 25px 25px; 
    background-color: #fff;
}
.header-top-left{
    float: left;
    width: 320px;
    height: 60px;
}
.header-top-left img{
    width: 320px;
    height: 60px;
}
.header-top-conter{
    float: left;
    margin-left: 10px;
    line-height: 28px;
    width: 120px;
    word-wrap: break-word;
    height: 40px;
    color: #333333;
}
.header-top-conter span{
    display: block;
    font-size: 24px;
    margin-top: 10px; 
}
.header-top-right{
    position: relative;
    float: left;
    height: 60px;
    word-wrap: break-word;
}
.header-top-right img{
    float: left;
    height: 100%;
}
.header-top-right p{
    float: left;
    font-size: 24px;
    width: 181px;
    color: #FA5252;
    font-weight: 900;
    line-height: 30px;
    letter-spacing:0px;
}
.header-top-right p a{
    color: #FA5252;
}
.s-header-center{
    height: 300px;
    overflow: hidden;
}

.s-header-center-swiper img{
    width: 100%;
    height: 100%;
}
.contact{
    width: 400px;
    height: 200px;
    padding:30px 50px;
    font-size: 30px;
}
.contact a{
    display: block;
    margin-top: 20px;
    color: #FA5252;
    font-weight: 900;
    text-align: center;
}
.s-herder-bottom-title{
    font-size: 30px;
}
</style>
<style>
.mint-swipe-indicators{
    width:80px;
    height:25px;
    position: absolute;
    left: 95%;
    bottom: 0;
    background:rgb(75, 73, 73,0.9);
    border-radius:5px 0px 0px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.mint-swipe-indicator{
    background: #888;
}
.mint-swipe-indicator.is-active{
    width: 10px;
    height: 10px;
    border: #FA5252;
    border-radius: 50%; 
}
.s-herder-bottom ul{
    background-color: #fff;
    width: 100%;
    height: 340px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 45px;
    padding-left: 34px;
    padding-right: 35px;
}
.s-herder-bottom ul li{
    width: 150px;
    height: 96px;
    text-align: center;
}
.s-herder-bottom-icon{
    width: 96px;
    height: 78px;
    margin: 0 auto;
}
.s-herder-bottom-icon img{
    width: 54px;
    height: 58px;
}
.tongzhao{
    font-size: 20px;
    line-height: 1;
}
</style>
