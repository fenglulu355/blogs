<template>
    <div class="survey">
        <!-- <div class="survey-teachers" v-for="item in category" :key="item.id">
            <div class="survey-teachers-top">
                <span></span>
                <p>{{item.name}}</p>
            </div>
            <div class="survey-teachers-bottom" v-html="item.content">
            </div>
        </div> -->
        <!-- <div class="survey-honor">
            <div class="survey-honor-top">
                <span></span>
                <p>学校荣誉</p>
            </div>
            <div class="survey-honor-bottom">
            </div>
        </div>
        <div class="survey-overview">
            <div class="survey-overview-top">
                <span></span>
                <p>学校总览</p>
            </div>
            <div class="survey-overview-bottom">
            </div>
        </div> -->
        <mt-navbar class="page-part" v-model="seselected">
            <mt-tab-item id="1">学校概况</mt-tab-item>
            <mt-tab-item id="2">学校师资</mt-tab-item>
            <mt-tab-item id="3">学校荣誉</mt-tab-item>
            <!-- <mt-tab-item id="4">学校位置</mt-tab-item> -->
        </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="seselected">
        <mt-tab-container-item id="1">
            <div class="survey-teachers">
                <!-- <div class="survey-teachers-top">
                    <span></span>
                    <p>{{this.survey.name}}</p>
                </div> -->
                <div class="survey-teachers-bottom" v-html="this.survey.content">
                </div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <div class="survey-teachers">
                <!-- <div class="survey-teachers-top">
                    <span></span>
                    <p>{{this.teachers.name}}</p>
                </div> -->
                <div class="survey-teachers-bottom s-t-teshu" v-html="this.teachers.content">
                </div>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <div class="survey-teachers">
                <!-- <div class="survey-teachers-top">
                    <span></span>
                    <p>学校荣誉</p>
                </div> -->
                <div class="survey-teachers-bottom">
                    <ul>
                        <li
                        v-for="item in honor"
                        :key="item.id"
                        @click="toArticle(item.id)"
                        >
                            <div class="pic">
                                <img :src="host+item.thumb">
                                <p>{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
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
            //map:[],//地图
            survey:[],//概况
            honor:[],//荣誉
            teachers:[],//师资
            host:'http://www.scsgmx.com'
        }
    },
    created(){
        // this.$ajax.getIndex()
        // .then(resp=>{
        //     //console.log(resp)
        //     this.survey = resp.data.data.splice(1,1)[0]
        //     this.teachers = resp.data.data.splice(3,1)[0]
        // })
        let honorid = {
            type: 6
        }
        let surveyid = {
            id: 2
        }
        let teachersid = {
            id: 5
        }
        axios.post('http://www.scsgmx.com/index.php/index/api/category_show',qs.stringify(surveyid))
        .then(resp=>{
            console.log(resp)
            this.survey = resp.data.data
        })
        axios.post('http://www.scsgmx.com/index.php/index/api/category_show',qs.stringify(teachersid))
        .then(resp=>{
            console.log(resp)
            this.teachers = resp.data.data
        })
        axios.post('http://www.scsgmx.com/index.php/index/api/category_article',qs.stringify(honorid))
        .then(resp=>{
            //console.log(resp)
            this.honor = resp.data.data.data
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
    },
    methods:{
        toArticle(id){
            this.$router.push({path :`/majorD/${id}`})
        },
    }
}
</script>

<style scoped>
.survey{
    margin-top: 20px;
}
.survey-teachers{
    background: #fff;
    margin-bottom: 20px;
}
.survey-teachers-top{
    height: 80px;
    border-bottom: 1px solid #9F2020;
}
.survey-teachers-top span{
    margin-top: 20px;
    display: block;
    width: 3px;
    height: 30px;
    background: #9F2020;
    float: left;
    margin-left: 30px;
}
.survey-teachers-top p:nth-child(2){
    float: left;
    font-size: 26px;
    font-weight: 400;
    line-height:  70px;
    margin-left: 15px;
}
.survey-teachers-bottom{
    overflow: hidden;
    min-height: 500px;
    padding: 20px 30px;
}
.survey-teachers-bottomp img{
    max-width: 100%;
}
.survey-teachers-bottomp{
    line-height: 2;
}
.survey-teachers-bottom ul{
    width: 100%;
    min-height: 660px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.survey-teachers-bottom ul li{
    width: 330px;
    height: 303px;
}
.survey-teachers-bottom ul li .pic img{
    width: 330px;
    height: 230px;
}
.survey-teachers-bottom ul li p{
    height: 73px;
    line-height: 73px;
    text-align: center;
    font-size:28px;
    font-weight:600;
}
</style>
<style>
.survey-teachers-bottom span{
    font-size: 32px !important;
    line-height: 1.5 !important;
}
.survey-teachers-bottom p span{
    text-align: center;
}
.survey-teachers-bottom p span img{
    width: 690px !important;
}
</style>
