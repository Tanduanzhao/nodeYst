var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
var defaultGroups={
    searchName:null,
    pageNo:1,
    datas:[],
    infinite:false,
    types:[]
}
export default function groups(state=defaultGroups,action){
    switch(action.type){
        case "LOADGTOUPSDATA" : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)});
        case "CHANGEFACTORYNUMBER" : return ObjectAssign({},state,{min:action.min,max:action.max});
        case "CHANGEGROUPSSEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName,datas:[]});
        case "RESETDATAGROUPS" : return ObjectAssign({},state,{datas:[]});
        case "RESETGTOUPS" : return defaultGroups;
        case "LOADGROUPSTYPES" : return ObjectAssign({},state,{types:action.datas});
        default : return state;
    }
}