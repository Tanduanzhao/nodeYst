var ObjectAssign = require('object-assign');
import {LOADBIFLISTCONTENTDATA,SHOWFILTERBIDLIST,UNSHOWFILTERPBIDLIST,INFINITE,UNINFINITE,CHANGEBIDLISTTITLEORREPORTKEY,CHANGEBIDLISTFILTER} from '../components/config/variable';
// 药品详情信息
var defaultBidListall={
  data:[],
  isShowFilter:false,
  produceType:null,
  infinite:false,
  pageNo:1,
  municipality:1,
  searchName:"",
  getBidAreaInfo:[],
  getProjectStatus:[],
  searchProductStatus:-1,
  sord:null,
  sidx:null,
  request:true,
  active:0,
  areaName:null,
  areaId:['0'],
  provinceId:["ZZOQD0000000000000000000000020"],
  provinceName:null,
  mpAreaID:null,
  areas:null,
  specAttrName:null
}
export default function bidListall(state=defaultBidListall,action){
  switch(action.type){
    case "LOADBIFLISTCONTENTDATAALL" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo,areas:action.areas,specAttrName:action.specAttrName});
    case "getBidAreaInfo" : return ObjectAssign({},state,{getBidAreaInfo:action.getBidAreaInfo});
    case "getProjectStatus" : return ObjectAssign({},state,{getProjectStatus:action.getProjectStatus});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case "requestall": return ObjectAssign({},state,{request:false});
    case "requestssall": return ObjectAssign({},state,{request:true});
    case "mpAreaID": return ObjectAssign({},state,{mpAreaID:true});
    case "CHANGEALLPROVINCEIDNAME": return ObjectAssign({},state,{provinceName:action.provinceName,provinceId:[action.provinceId]});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case SHOWFILTERBIDLIST : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPBIDLIST : return ObjectAssign({},state,{isShowFilter:false});
    case CHANGEBIDLISTTITLEORREPORTKEY : return ObjectAssign({},state,{searchName:action.searchName});
    case "CHANGEBIDLISTFILTERALL" : return ObjectAssign({},state,{areaId:action.areaId,searchAreaType:action.searchAreaType,searchProductStatus:action.searchProductStatus,sord:action.sord,sidx:action.sidx,active:action.active});
    case "RESETBIDLISTAREAId" : return  ObjectAssign({},defaultBidListall,{areaId:action.areaId});
    case "RESETBIDLISTALL" : return  ObjectAssign({},defaultBidListall,{provinceName:state.provinceName,provinceId:state.provinceId})
    default : return state;
  }
}