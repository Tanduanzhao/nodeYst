var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
// 药品列表信息
var defaultGroupsMes={
    searchName:null,
    pageNo:1,
    columnBigType:null,
    isShowFilter:false,
    municipality:1,
    produceType:null,
    tradeType:3,
    data:[],
    infinite:false
}
export default function groupsMes(state=defaultGroupsMes,action){
    switch(action.type){
        case "LOADGTOUPSMESDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
        case "CHANGEGTOUPSMESLOADDATE" : return ObjectAssign({},state,{searchName:action.searchName,catalogId:action.catalogId});
        case "CHANGEDRUGSMESEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
        case "CHANGEFA" : return ObjectAssign({},state,{columnBigType:action.columnBigType});
        case "RESETGTOUPSMES" : return defaultGroupsMes;
        default : return state;
    }
}