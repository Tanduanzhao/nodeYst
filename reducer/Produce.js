var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,CHANGETYPE} from '../components/config/variable';
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
var defaultProduce={
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
  searchType:0,
  pageNo:1,
  data:[],
  infinite:false

}
export default function Produce(state=defaultProduce,action) {
  switch(action.type){
    case SHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:false});
    case LOADPRODUCEDATA : return ObjectAssign({},state,{data:action.data});
    case CHANGETYPE : return ObjectAssign({},state,{searchType:action.searchType});
    default : return state;
  }
}