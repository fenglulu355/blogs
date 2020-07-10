<template>
    <div class='majord'>
        <div class="box">
            <h2>{{majord.title}}</h2>
            <div class="font" v-html="majord.content">

            </div>
            <div class="bottom">
                <a v-if="majordA" class="up" @click="front(majordA.id)">上一页</a>
                <a v-if="majordB" class="down" @click="after(majordB.id)">下一页</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import unit from '../unit.js'
export default {
    data(){
        return{
            majord:[],
            majordA:[],
            majordB:[],
            title:[]
        }
    },
    created(){
        let majordid = {
            id:this.$route.params.id
        }
        axios.post('http://www.scsgmx.com/index.php/index/api/article_show',qs.stringify(majordid))
        .then(resp=>{
            //console.log(resp)
            this.majord = resp.data.data[0]
            this.majordA = resp.data.data[1]
            this.majordB = resp.data.data[2]
            this.title = this.majord.title
            document.title = this.title + "-四川省工业贸易学院"
            //console.log(this.majord)
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
        front(id){
            let _that = this
            _that.scrollTop -= 50
            document.getElementsByClassName("app-mine")[0].scrollTop = _that.scrollTop
            let majordId= {
            id:id
            }
            axios.post('http://www.scsgmx.com/index.php/index/api/article_show',qs.stringify(majordId))
            .then(resp=>{
                //console.log(resp)
            this.majord = resp.data.data[0]
            this.majordA = resp.data.data[1]
            this.majordB = resp.data.data[2]
            this.title = this.majord.title
            //console.log(this.majordA)
            document.title = this.title + "-四川省工业贸易学院"
            })
        },
        after(id){
            let _that = this
            _that.scrollTop -= 50
            document.getElementsByClassName("app-mine")[0].scrollTop = _that.scrollTop
            let majordId= {
            id:id
            }
            axios.post('http://www.scsgmx.com/index.php/index/api/article_show',qs.stringify(majordId))
            .then(resp=>{
                //console.log(resp)
            this.majord = resp.data.data[0]
            this.majordA = resp.data.data[1]
            this.majordB = resp.data.data[2]
            this.title = this.majord.title
            //console.log(this.examinationdA)
            document.title = this.title + "-四川省工业贸易学院"
            })
        }
    },
    destroyed(){
        document.title = "四川工业贸易学院"
    }
}
</script>

<style>
.box{
    background: #ffffff;
    margin:20px 0;
    padding:20px 30px;
}
h2{
    text-align: center;
    margin-bottom: 30px;
}
.up{
    float: left;
    margin-left: 20px;
    text-decoration:underline;
}
.down{
    float:right;
    margin-right: 20px;
    text-decoration:underline;
}
.bottom{
    height: 30px;
}
.font p{
    /* font-size: 24px!important; */
    line-height: 1.8!important;
}
.font p span{
    /* font-size: 24px!important; */
    line-height: 1.8!important;
}
.font p img{
    width: 690px !important;
    text-align: center !important;
}
</style>
