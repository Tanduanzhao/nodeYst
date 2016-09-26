var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,CHANGETYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE} from '../components/config/variable';
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
// 报告信息
var defaultReport={
  isShowFilter:false,
  subscribe:2346,
  subscribeTwo:3434,
  areaName:defaultProvicen.areaName,
  areaId:defaultProvicen.areaId,
  searchAreaType:defaultProvicen.searchAreaType,
  yearMonth:defaultData.yearMonth,
  hospitalLevel:null,
  produceType:null,
  searchName:null,
  searchType:null,
  pageNo:1,
  data:[],
  infinite:false,
  titleOrReportKey:null

}
export default function report(state=defaultReport,action) {
  switch(action.type){
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case SHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:false});
    case LOADPRODUCEDATA : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case CHANGETYPE : return ObjectAssign({},state,{searchType:action.searchType});
    case CHANGETITLEORREPORTKEY : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    default : return state;
  }
}