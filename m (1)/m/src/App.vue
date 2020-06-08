<template>
    <div class="app">
        <div class="app-body">
            <div class="app-mine" >
                <div class="app-header">
                    <s-header></s-header>
                </div>
                <router-view></router-view>
            </div>
            <!-- <div class="app-footer"> -->
                <!-- <s-footer></s-footer> -->
                <div class="footer">
                    <div class="footer-top">
                        <div class="footer-title">
                        <router-link :to="{path:'home'}" tag="div">首页</router-link>
                        <span>|</span>
                        <router-link :to="{path:'major'}" tag="div">招生专业</router-link>
                        <span>|</span>
                        <router-link :to="{path:'campus'}" tag="div">学校环境</router-link>
                        <span>|</span>
                        <a @click.stop="backTop">返回顶部</a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <div class="footer-bottom-box">
                            <div class="footer-icon1"><img src="./assets/dingwei.png"></div>
                            <p><a href='http://api.map.baidu.com/geocoder?address=四川省工业贸易学校&output=html'>地图导航</a></p>
                        </div>
                        <div class="footer-bottom-box" id="yellow" @click="toPhone">
                            <div class="footer-icon2"><img src="./assets/shape1.png"></div>
                            <p>拨打电话</p>
                        </div>
                        <div class="footer-bottom-box">
                            <a href="https://tb.53kf.com/code/client/3a9d5a2b9d4fd553ae193d55dbb7cf064/2">
                            <div class="footer-icon3"><img src="./assets/zixun.png"></div>
                            <p>在线咨询</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </div> -->
    </div>
</template>

<script>
import SHeader from './components/SHeader'
// import SFooter from './components/SFooter'
import axios from 'axios'
export default {

name: 'app',
components:{
    SHeader,
    // SFooter
    },
    data(){
        return{
            mobilea:[]
        }
    },
    created(){
        this.$ajax.getConfig()
        .then(resp=>{
            ////console.log(resp)
            this.mobilea = resp.data.data.mobile
            //// console.log(this.phone)
        })
    },
    mounted(){
        // if (window.history && window.history.pushState) {
        //     history.pushState(null, null, document.URL);
        //     window.addEventListener('popstate', this.goBack, false);
        // }
    },
    methods:{
        handleScroll() { 
            this.scrollTop = document.getElementsByClassName("app-mine")[0].scrollTop
        },
        backTop() {
            let _that = this
            _that.scrollTop -= 50
            document.getElementsByClassName("app-mine")[0].scrollTop = _that.scrollTop
        },
        toPhone(){
            window.location.href = 'tel:'+this.mobilea;
        },
        goBack(){
            // this.$router.push({path:'home'})
                
        }
    },
}
</script>

<style>
html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
    margin: 0;
    padding: 0;
}
*{box-sizing: border-box;}
body, p{
    font-family: "Microsoft YaHei";
    font-size:12px;
    color:#333;
}
h1, h2, h3, h4, h5, h6{font-weight:normal;}
ul,ol p{
    list-style: none;
}
img {
    border: none;
    vertical-align: middle;
}
a {
    text-decoration: none;
    color: #232323;
}
table {
    border-collapse: collapse;
    table-layout: fixed;
}
input, textarea {
    outline: none;
    border: none;
}
textarea {
    resize: none;
    overflow: auto;
}
p{
    line-height: 1;
}
.clearfix {
    zoom: 1;
}
.clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow:hidden;
}
.fl {
    float: left
}
.fr {
    float: right
}
.tl {
    text-align: left;
}
.tc {
    text-align: center
}
.tr {
    text-align: right;
}
.ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
html{
    height: 100%;
}
body{
    height: 100%;
    overflow: hidden;
    overflow-y:visible;
}
.app{
    height: 100%;
}
.app-body{
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #eee;
}
.app-mine{
    flex: 1;
    overflow-x: scroll;
}
.is-selected{
    border-bottom:6px solid #9F2020 !important;
    color: #9F2020 !important;
}
.footer{
    background-color:#fff; 
    height: 184px;
    width: 100%;
}
.footer-top{
    height: 94px;
    padding: 0 34px;
    text-align: center;
}
.footer-title{
    line-height: 84px;
    font-size: 28px;
    color: #666;
    font-weight:400;
    display: flex;
    justify-content: space-around;
}
.footer-title a{
    font-size: 28px;
}
.footer-top span{
    margin: 0 44px;
}
.footer-bottom{
    height: 90px;
    display: flex;
    justify-content: space-between;
}
.footer-bottom a{
    font-size: 28px;
    color: #fff;
}
.footer-bottom-box{
    width: 250px;
    padding-top: 25px;
    padding-left: 60px; 
    background: #9F2020;
}
.footer-bottom-box p{
    line-height: 45px;
    margin-left: 48px; 
    font-size: 28px;
    color: #fff;
}
.footer-icon1{
    width: 36px;
    float: left;
}
.footer-icon1 img{
    width: 36px;
}
.footer-icon2{
    float: left;
}
.footer-icon2 img{
    width: 40px;
}
.footer-icon3{
    float: left;
}
.footer-icon3 img{
    width: 38px;
}
#yellow{
    background: #F3B72F;
}
.mint-tab-item-label{
    font-size: 32px;
}
</style>

