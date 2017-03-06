var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultOrderInfo={
  vipLevel:0
}
export default function orderInfo(state=defaultOrderInfo,action) {
  switch(action.type){
    case "VIPLEVEL" : return ObjectAssign({},state,{vipLevel:action.vipLevel});
    case "RESETORDERINFO" : return  defaultOrderInfo;
    default : return state;
  }
}