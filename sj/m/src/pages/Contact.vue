<template>
    <div class="contact">
        <mt-navbar class="page-part" v-model="seselected">
            <mt-tab-item id="1">联系方式</mt-tab-item>
            <mt-tab-item id="2">乘车路线</mt-tab-item>
            <mt-tab-item id="3">学校位置</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="seselected">
        <mt-tab-container-item id="1">
            <div class="contact-teachers">
                <!-- <div class="contact-teachers-top">
                    <span></span>
                    <p>{{this.contact.name}}</p>
                </div> -->
                <div class="contact-teachers-bottom" v-html="this.contact.content">
                </div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <div class="contact-teachers">
                <!-- <div class="contact-teachers-top">
                    <span></span>
                    <p>{{this.route.name}}</p>
                </div> -->
                <div class="contact-teachers-bottom" v-html="this.route.content">
                </div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <div class="contact-teachers">
                <!-- <div class="contact-teachers-top">
                    <span></span>
                    <p>{{this.position.name}}</p>
                </div> -->
                <div id="position" class="contact-teachers-bottom1">

                    <baidu-map class="map" :center="center" :zoom="zoom">
                        <!-- <bm-marker :position="{lng:104.126829,lat:30.7089}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker> -->
                    </baidu-map>
                    <a class="button" href='http://api.map.baidu.com/geocoder?address=四川省工业贸易学校&output=html' target='_blank'>现在就去</a>
                </div>
            </div>
        </mt-tab-container-item>
    </mt-tab-container>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import unit from '../unit.js'
export default {
    name: 'page-navbar',
    data(){
        return{
            seselected:'1',
            contact:[],
            route:[],
            position:[],
            center: {lng: 104.1194, lat: 30.7134},
            zoom: 16
        }
    },
    created(){
        this.$ajax.getIndex()
        .then(resp=>{
                this.position = resp.data.data.splice(17,1)[0]
        })
        let contactid = {
            id:21
        }
        let routeid = {
            id:22
        }
        axios.post('http://ssjy.public.5151fw.com/index/api/category_show',qs.stringify(contactid))
        .then(resp=>{
            console.log(resp)
            this.contact = resp.data.data
        })
        axios.post('http://ssjy.public.5151fw.com/index/api/category_show',qs.stringify(routeid))
        .then(resp=>{
            console.log(resp)
            this.route = resp.data.data
        })
    },
    mounted(){
        let id = this.$route.params.id
        this.seselected = id.toString()
        // var self=this;
        // pushHistory()
        // window.addEventListener('popstate', function(e) {
        //     self.$router.back()
        // }, false)
    
        // function pushHistory() {
        //     var state = {
        //     title: 'title',
        //     url: '#'
        //     }
        //     window.history.pushState(state, 'title', '#')
        // }
    }
}
</script>

<style scoped>
.contact{
    margin-top: 20px;
}
.contact{
    margin-top: 20px;
}
.contact-teachers{
    background: #fff;
    margin-bottom: 20px;
}
.contact-teachers-top{
    height: 80px;
    border-bottom: 1px solid #9F2020;
}
.contact-teachers-top span{
    margin-top: 20px;
    display: block;
    width: 3px;
    height: 30px;
    background: #9F2020;
    float: left;
    margin-left: 30px;
}
.contact-teachers-top p:nth-child(2){
    float: left;
    font-size: 26px;
    font-weight: 400;
    line-height:  70px;
    margin-left: 15px;
}
.contact-teachers-bottom{
    font-size: 18px !important;
    min-height: 500px;
    padding: 20px 30px;
}
.contact-teachers-bottom span{
    line-height: 2;
}
#position{
    padding: 0;
    padding-bottom: 1px;
}
.map{
    height: 500px;
}
.button{
    display: block;
    margin: 30px auto;
    width: 300px;
    height: 80px;
    background: #9F2020;
    color: #fff;
    font-size: 30px;
    line-height: 80px;
    text-align: center;
    border-radius: 15px;
}
</style>
<style>
.contact-teachers-bottom span{
    font-size: 32px !important;
    line-height: 1.5 !important;
}
.contact-teachers-bottom img{
    width: 650px !important;
}
</style>
