var ObjectAssign = require('object-assign');
import {LOADBIFLISTCONTENTDATA,SHOWFILTERBIDLIST,UNSHOWFILTERPBIDLIST,INFINITE,UNINFINITE,CHANGEBIDLISTTITLEORREPORTKEY,CHANGEBIDLISTFILTER} from '../components/config/variable';
// 药品详情信息
var defaultBidList={
  data:[],
  isShowFilter:false,
  produceType:null,
  infinite:false,
  pageNo:1,
  municipality:1,
  searchName:null,
  getBidAreaInfo:[],
  getProjectStatus:[],
  searchProductStatus:-1,
  sord:null,
  sidx:null,
  request:true,
  active:0,
  areaName:'广东省',
  areaId:['ZZOQD0000000000000000000000020'],
  searchText:'请输入搜索关键词'
}
export default function bidList(state=defaultBidList,action){
  switch(action.type){
    case "getBidAreaInfo" : return ObjectAssign({},state,{getBidAreaInfo:action.getBidAreaInfo});
    case "getProjectStatus" : return ObjectAssign({},state,{getProjectStatus:action.getProjectStatus});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case "request": return ObjectAssign({},state,{request:false});
    case "requestss": return ObjectAssign({},state,{request:true});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case LOADBIFLISTCONTENTDATA : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case SHOWFILTERBIDLIST : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPBIDLIST : return ObjectAssign({},state,{isShowFilter:false});
    case CHANGEBIDLISTTITLEORREPORTKEY : return ObjectAssign({},state,{searchName:action.searchName,searchText:action.searchText});
    case CHANGEBIDLISTFILTER : return ObjectAssign({},state,{areaId:action.areaId,searchAreaType:action.searchAreaType,searchProductStatus:action.searchProductStatus,sord:action.sord,sidx:action.sidx,active:action.active});
    default : return state;
  }
}