var ObjectAssign = require('object-assign');
import {INFINITEDRUG,UNINFINITEDRUG} from '../components/config/variable';
// 药品列表信息
var defaultSearch={
  searchName:"",
  pageNo:1,
  smallType:"",
  data:[],
  clickSearch:false,
  hotDatea:[],
  searchNull:true,
  searchType:0,
  searchLinkType:false,
  searchLink:"",
  searchValue:"",
  yearMonth:2015
}
export default function search(state=defaultSearch,action){
  switch(action.type){
    case  "LOADSEARCHDATA" : return ObjectAssign({},state,{data:action.data});
    case  "SEARCHYEARMONTH" : return ObjectAssign({},state,{yearMonth:action.yearMonth});
    case  "SEARCHLINKTYPR" : return ObjectAssign({},state,{searchLinkType:true});
    case  "LOADHOTDATA" : return ObjectAssign({},state,{hotDatea:action.hotDatea});
    case  "CHANGESEARCHTYPE" : return ObjectAssign({},state,{searchType:action.searchType});
    case  "CHANGESEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
    case  "CLICKKSEARCH" : return ObjectAssign({},state,{clickSearch:action.clickSearch});
    case  "CHANGESMALLTYPE" : return ObjectAssign({},state,{smallType:action.smallType});
    case  "CHANGESMALLNULL" : return ObjectAssign({},state,{searchNull:true});
    case  "SAVESEARCHVALUE" : return ObjectAssign({},state,{searchValue:action.searchValue});
    case "RESETSEARCH" :return  ObjectAssign({},defaultSearch ,{smallType:state.smallType});
    default : return state;
  }
}