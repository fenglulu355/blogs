<template>
    <div class="teaching">
        <mt-navbar class="page-part" v-model="seselected">
            <mt-tab-item id="1">教学管理</mt-tab-item>
            <mt-tab-item id="2">安全管理</mt-tab-item>
            <mt-tab-item id="3">行为规范</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="seselected">
        <mt-tab-container-item id="1">
            <div class="teaching-teachers">
                <!-- <div class="teaching-teachers-top">
                    <span></span>
                    <p>{{this.teaching.name}}</p>
                </div> -->
                <div class="teaching-teachers-bottom" v-html="this.teaching.content">
                </div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <div class="teaching-teachers">
                <!-- <div class="teaching-teachers-top">
                    <span></span>
                    <p>{{this.security.name}}</p>
                </div> -->
                <div class="teaching-teachers-bottom" v-html="this.security.content">
                </div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <div class="teaching-teachers">
                <!-- <div class="teaching-teachers-top">
                    <span></span>
                    <p>{{this.behavior.name}}</p>
                </div> -->
                <div class="teaching-teachers-bottom" v-html="this.behavior.content">
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
            seselected: '1',
            teaching:[],
            security:[],
            behavior:[]
        }
    }, 
    created(){
        // this.$ajax.getIndex()
        // .then(resp=>{
        //     console.log(resp)
        // })
        // this.$ajax.getIndex()
        // .then(resp=>{
        //     console.log(resp)
        //     this.teaching = resp.data.data.splice(29,1)[0]
        //     this.security = resp.data.data.splice(25,1)[0]
        //     this.behavior = resp.data.data.splice(25,1)[0]
        //     console.log(this.teaching)
        // })
        let teachingid = {
            id:33
        }
        let securityid = {
            id:29
        }
        let behaviorid = {
            id:30
        }
        axios.post('http://www.scsgmx.com/index.php/index/api/category_show',qs.stringify(teachingid))
        .then(resp=>{
            //console.log(resp)
            this.teaching = resp.data.data
        })
        axios.post('http://www.scsgmx.com/index.php/index/api/category_show',qs.stringify(securityid))
        .then(resp=>{
            //console.log(resp)
            this.security = resp.data.data
        })
        axios.post('http://www.scsgmx.com/index.php/index/api/category_show',qs.stringify(behaviorid))
        .then(resp=>{
            //console.log(resp)
            this.behavior = resp.data.data
        })
    },
    mounted(){
          var self=this;
          pushHistory()
          window.addEventListener('popstate', function(e) {
                self.$router.back()
          }, false)
        
          function pushHistory() {
                var state = {
                title: 'title',
                url: '#'
                }
                window.history.pushState(state, 'title', '#')
          }
        //pushHistory()
    },
}
</script>

<style scoped>
.teaching{
    margin-top: 20px;
}
.teaching-teachers{
    background: #fff;
    margin-bottom: 20px;
}
.teaching-teachers-top{
    height: 80px;
    border-bottom: 1px solid #9F2020;
}
.teaching-teachers-top span{
    margin-top: 20px;
    display: block;
    width: 3px;
    height: 30px;
    background: #9F2020;
    float: left;
    margin-left: 30px;
}
.teaching-teachers-top p:nth-child(2){
    float: left;
    font-size: 26px;
    font-weight: 400;
    line-height:  70px;
    margin-left: 15px;
}
.teaching-teachers-bottom{
    min-height: 500px;
    padding: 20px 30px;
}
</style>
<style>
.teaching-teachers-bottom span{
    line-height: 1.5 !important;
    font-size: 32px !important;
}
.teaching-teachers-bottom span{
    /* font-size: 24px !important; */
}
.teaching-teachers-bottom img{
    max-width: 700px !important;
}
</style>
