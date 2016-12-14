var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
// 药品列表信息
var defaultGroups={
    isShowFilter:false,
    municipality:1,
    searchName:null,
    produceType:null,
    pageNo:1,
    tradeType:3,
    data:[],
    infinite:false
}
export default function groups(state=defaultGroups,action){
    switch(action.type){
        case "LOADGTOUPSDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
        case "CHANGEFACTORYNUMBER" : return ObjectAssign({},state,{min:action.min,max:action.max});
        case "CHANGEGROUPSSEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
        case "CHANGEFA" : return ObjectAssign({},state,{columnBigType:action.columnBigType});
        case "RESETGTOUPS" : return defaultGroups;
        default : return state;
    }
}