var ObjectAssign = require('object-assign');
import {CHANGEDRUGFILTER,SHOWFILTERDRUG,UNSHOWFILTER,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
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
var defaultDrug={
  isShowFilter:false,
  drug:1,
  areaName:defaultProvicen.areaName,
  areaId:defaultProvicen.areaId,
  searchAreaType:defaultProvicen.searchAreaType,
  yearMonth:defaultData.yearMonth,
  hospitalLevel:null,
  searchName:null,
  pageNo:1,
  data:[],
  infinite:false
}
export default function drug(state=defaultDrug,action){
  switch(action.type){
    case CHANGEDRUGFILTER : return ObjectAssign({},state,{areaName:action.areaName,areaId:action.areaId,searchAreaType:action.searchAreaType,yearMonth:action.yearMonth,hospitalLevel:action.hospitalLevel});
    case SHOWFILTERDRUG : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTER : return ObjectAssign({},state,{isShowFilter:false});
    case CHANGEDRUGSEARCHNAME : return ObjectAssign({},state,{searchName:action.searchName});
    case CLEADRUGSEARCHNAME : return ObjectAssign({},state,{searchName:null});
    case INFINITEDRUG : return ObjectAssign({},state,{infinite:false});
    case UNINFINITEDRUG : return ObjectAssign({},state,{infinite:true});
    case LOADDRUGDATA : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    default : return state;
  }
}