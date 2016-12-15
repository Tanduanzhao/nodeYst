var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
// 药品列表信息
var defaultGroupsMes={
    searchName:null,
    pageNo:1,
    datas:undefined,
    otherDatas:[],
    types:[],
    infinite:false
}
export default function groupsMes(state=defaultGroupsMes,action){
    switch(action.type){
        case "LOADGTOUPSMESDATA" : return ObjectAssign({},state,{datas:action.datas});
        case "LOADGTOUPSMESOTHERDATA" : return ObjectAssign({},state,{otherDatas:state.otherDatas.concat(action.datas)});
        case "CHANGEGROUPSMESSEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName,datas:undefined,otherDatas:[]});
        case "RESETDATAGROUPSMES" : return ObjectAssign({},state,{datas:undefined,otherDatas:[]});
        case "RESETGROUPSMES" : return defaultGroupsMes;
        case "LOADGROUPSMESTYPES" : return ObjectAssign({},state,{types:action.datas});
        default : return state;
    }
}