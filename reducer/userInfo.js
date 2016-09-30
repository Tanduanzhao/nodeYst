var ObjectAssign = require('object-assign');
import {LOGIN,LOADUSERINFO} from '../components/config/variable';
//用户信息仓库

var defaultUserInfo = {
    id:null,
    userName:null,
    imgUrl:'/images/logo.jpg',
    level:true,
    isLogin:false,
    isVip:false
}
export default function userInfo(state = defaultUserInfo,action){
    switch(action.type){
        case LOGIN : return ObjectAssign({},state,{isLogin:true});
        case LOADUSERINFO : return ObjectAssign({},state,{imgUrl:action.datas.imgUrl,id:action.datas.id,userName:action.datas.userName,isVip:actions.datas.isVip});
            default : return state;
    }
    
}