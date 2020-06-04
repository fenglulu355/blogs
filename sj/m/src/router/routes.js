import SHeader from '@/components/SHeader'
// import SFooter from '@/components/SFooter'

const Home=()=>import('@/pages/Home')
const NotFound=()=>import('@/pages/NotFound')
const Survey=()=>import('@/pages/Survey')
const Major=()=>import('@/pages/Major')
const Examination=()=>import('@/pages/Examination')
const Teaching=()=>import('@/pages/Teaching')
const Campus=()=>import('@/pages/Campus')
const Charge=()=>import('@/pages/Charge')
const Contact=()=>import('@/pages/Contact')
const MajorD=()=>import('@/pages/MajorD')
const CampusD=()=>import('@/pages/CampusD')
const ExaminationD=()=>import('@/pages/ExaminationD')




const routes=[
    {
        path:'/',
        redirect:'/home'
    },{
        path:'*',
        redirect:'/404'
    },{
        path:'/404',
        components:{
            default:NotFound
        }
    },{
        path:'/home',
        name:'home',
        isTabbar:true,
        title:'首页',
        components:{
            default:Home,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/404',
        components:{
            default:NotFound
        }
    },{
        path:'/survey',
        name:'survey',
        isTabbar:true,
        title:'学校概况',
        components:{
            default:Survey,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/major',
        name:'major',
        isTabbar:true,
        title:'招生专业',
        components:{
            default:Major,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/examination',
        name:'examination',
        isTabbar:true,
        title:'高考升学',
        components:{
            default:Examination,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/teaching',
        name:'teaching',
        isTabbar:true,
        title:'教学管理',
        components:{
            default:Teaching,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/campus',
        name:'campus',
        isTabbar:true,
        title:'学校环境',
        components:{
            default:Campus,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/charge',
        name:'charge',
        isTabbar:true,
        title:'费用明细',
        components:{
            default:Charge,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/contact',
        name:'contact',
        isTabbar:true,
        title:'联系我们',
        components:{
            default:Contact,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/majorD/:id',
        name:'majorD',
        isTabbar:true,
        title:'联系我们',
        components:{
            default:MajorD,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/campusD/:id',
        name:'campusD',
        isTabbar:true,
        title:'联系我们',
        components:{
            default:CampusD,
            header:SHeader,
            // footer:SFooter
        }
    },{
        path:'/examinationD/:id',
        name:'examinationD',
        isTabbar:true,
        title:'联系我们',
        components:{
            default:ExaminationD,
            header:SHeader,
            // footer:SFooter
        }
    }
]






export default routes