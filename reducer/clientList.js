var ObjectAssign = require('object-assign');
import {CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG} from '../components/config/variable';

// 药品列表信息
var defaultClientList={
  searchName:"",
  pageNo:1,
  data:[],
  infinite:false
}
export default function clientList(state=defaultClientList,action){
  switch(action.type){
    case  'LOADCLIENTLISTDATA': return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    //case 'CHANGECLIENTLISTSEARCHNAME' : return ObjectAssign({},state,{searchName:action.searchName});
    //case CLEADRUGSEARCHNAME : return ObjectAssign({},state,{searchName:null});
    case INFINITEDRUG : return ObjectAssign({},state,{infinite:false});
    case UNINFINITEDRUG : return ObjectAssign({},state,{infinite:true});
    case "RESETCLIENTLIST" : return defaultClientList;
    default : return state;
  }
}