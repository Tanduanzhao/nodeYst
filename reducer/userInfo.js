import {LOGIN,LOADUSERINFO} from '../components/config/variable';
//用户信息仓库

var defaultUserInfo = {
    id:null,
    userName:null,
    imgUrl:null,
    level:true,
    isLogin:false
}
export default function userInfo(state = defaultUserInfo,action){
    switch(action.type){
        case LOGIN : return Object.assign({},state,{isLogin:true});
        case LOADUSERINFO : return Object.assign({},state,{imgUrl:action.datas.imgUrl,id:action.datas.id,userName:action.datas.userName});
            default : return state;
    }
    
}