import axios from 'axios'
import { Indicator } from 'mint-ui';
// import qs from 'qs'


const ajax=axios.create({

})
//拦截器，请求数据时执行任务
ajax.interceptors.request.use(config=>{
   //添加loading加载页面的效果
    Indicator.open('拼命加载中...');
    return config
})

//响应时拦截操作
ajax.interceptors.response.use(resp=>{

            Indicator.close();//1秒后关闭loading
    return resp
})
//获取首页数据
export const getIndex=()=>{
    return ajax.post('http://www.scsgmx.com/index.php/index/api/index')
}
//获取轮播图
export const getBanner=()=>{
    return ajax.post('http://www.scsgmx.com/index.php/index/api/get_banner')
}
//获取网站配置
export const getConfig=()=>{
    return ajax.post('http://www.scsgmx.com/index.php/index/api/web_config')
}
//获取链接
export const getList=()=>{
    return ajax.post('http://www.scsgmx.com/index.php/index/api/bannerlink_list')
}