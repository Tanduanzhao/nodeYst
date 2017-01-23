var ObjectAssign = require('object-assign');
import {LOADMARKETTDATA,CHANGEDRUGFILTER,SHOWFILTERDRUG,UNSHOWFILTER,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG} from '../components/config/variable';
//省份信息
var defaultProvicen = {
	areaName:'广州市',
	areaId:'ZZOQD0000000000000000000000232',
    searchAreaType:1,
    data:[]
}
var defaultData = {
	yearMonth:2015
};
// 药品列表信息
var defaultManagerList={
  searchName:"",
  pageNo:1,
  data:[],
  infinite:false
}
export default function managerList(state=defaultManagerList,action){
  switch(action.type){
    case  'LOADMANAGERLISTDATA': return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case 'CHANGEMANAGERLISTSEARCHNAME' : return ObjectAssign({},state,{searchName:action.searchName});
    case CLEADRUGSEARCHNAME : return ObjectAssign({},state,{searchName:null});
    case INFINITEDRUG : return ObjectAssign({},state,{infinite:false});
    case UNINFINITEDRUG : return ObjectAssign({},state,{infinite:true});
    case "RESEMANAGERLIST" : return defaultManagerList;
    default : return state;
  }
}