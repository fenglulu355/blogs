<template>
    <div class="examinationd">
        <div class="box1">
            <h2>{{examinationd.title}}</h2>
            <div class="font" v-html="examinationd.content">
            
            </div>
            <div class="bottom">
                <a v-if="examinationdA" class="up" @click="front(examinationdA.id)">上一页</a>
                <a v-if="examinationdB" class="down" @click="after(examinationdB.id)">下一页</a>
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
            examinationd:[],
            examinationdA:[],
            examinationdB:[],
            title2:[],
            title:[],
            title1:[],
        }
    },
    created(){
        let examinationdId= {
            id:this.$route.params.id
        }
        axios.post('http://ssjy.public.5151fw.com/index/api/article_show',qs.stringify(examinationdId))
        .then(resp=>{
            //console.log(resp)
            this.examinationd = resp.data.data[0]
            this.title2 = resp.data.data[0]
            
            this.examinationdA = resp.data.data[1]
            this.examinationdB = resp.data.data[2]
            // this.title2.forEach(item => this.title1.push(item.title))
            document.title = this.title2.title  +"-四川省工业贸易学院"
            //console.log(1111)
        })
        this.$ajax.getConfig()
        .then(resp=>{
            this.title = resp.data.data.keyword
        })
    },
    mounted(){ 
        //   var self=this;
        //   pushHistory()
        //   window.addEventListener('popstate', function(e) {
        //         self.$router.back()
        //   }, false)
        
        //   function pushHistory() {
        //         var state = {
        //         title: 'title',
        //         url: '#'
        //         }
        //         window.history.pushState(state, 'title', '#')
        //   }
    },
    methods:{
        front(id){
            let _that = this
            _that.scrollTop -= 50
            document.getElementsByClassName("app-mine")[0].scrollTop = _that.scrollTop
            let examinationdId= {
            id:id
            }
            axios.post('http://ssjy.public.5151fw.com/index/api/article_show',qs.stringify(examinationdId))
            .then(resp=>{
            this.title = resp.data.data[0].title
            this.examinationd = resp.data.data[0]
            this.examinationdA = resp.data.data[1]
            this.examinationdB = resp.data.data[2]
            document.title = this.title + "-四川省工业贸易学院"
            //console.log(this.examinationdA)
            })
        },
        after(id){
            let _that = this
            _that.scrollTop -= 50
            document.getElementsByClassName("app-mine")[0].scrollTop = _that.scrollTop
            let examinationdId= {
            id:id
            }
            axios.post('http://ssjy.public.5151fw.com/index/api/article_show',qs.stringify(examinationdId))
            .then(resp=>{
            //console.log(resp)
            this.title = resp.data.data[0].title
            this.examinationd = resp.data.data[0]
            this.examinationdA = resp.data.data[1]
            this.examinationdB = resp.data.data[2]
            document.title = this.title + "-四川省工业贸易学院"
            })
        }
    },
    destroyed(){
        document.title = "四川省工业贸易学院"
    }
}
</script>

<style scoped>
.examinationd{
    margin-top: 20px;
    min-height: 500px;
}

.box1{
    padding-top: 20px;
    background: #fff;
    margin-bottom: 20px;
    padding-bottom:20px;
}
div:nth-child(3){
    margin-bottom: 0px; 
}
h2{
    text-align: center;
    margin-bottom: 30px;
}
.font{
    min-height: 27500px;
    padding: 0 30px 0 30px;
    background: #fff;
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
    min-height: 30px;
}
</style>
<style>
.examinationd table{
    width: 690px !important;
    font-size: 24px !important;
    background: #fff !important;
    text-align: center;
}
</style>
