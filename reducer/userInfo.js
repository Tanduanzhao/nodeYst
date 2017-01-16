var ObjectAssign = require('object-assign');
import {LOGIN,LOADUSERINFO} from '../components/config/variable';
//用户信息仓库

var defaultUserInfo = {
    id:null,
    userName:null,
    imgUrl:'/images/logo.jpg',
    level:true,
    isLogin:false,
    isVip:false,
    vipEndDate:false,
    datas:[],
    isSign:"",
    score:0
}
export default function userInfo(state = defaultUserInfo,action){
    switch(action.type){
        case LOGIN : return ObjectAssign({},state,{isLogin:true});
        case 'OPENVIP' : return ObjectAssign({},state,{isVip:true});
        case LOADUSERINFO : return ObjectAssign({},state,{datas:action.datas,imgUrl:action.datas.imgUrl,id:action.datas.id,userName:action.datas.userName,isVip:action.datas.userVip,isLogin:true,vipEndDate:action.datas.vipEndDate,isSign:action.datas.isSign,score:action.datas.score});
        case 'ISSIGN' : return ObjectAssign({},state,{isSign:action.isSign,score:action.score});
        default : return state;
    }
    
}