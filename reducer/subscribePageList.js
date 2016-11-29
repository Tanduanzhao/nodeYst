var ObjectAssign = require('object-assign');
import {LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultSubscribePageList={
  data:[],
  pageNo:1,
  infinite:false,
  titleOrReportKey:null,
  isShowFilter:false
}
export default function subscribePageList(state=defaultSubscribePageList,action) {
  switch(action.type){
    case "LOADSUBSCRIBEPAGEALLDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case "CHANGESUBSCRIBEPAGEALLTITLEORREPORTKEY" : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case "SHOWFILTERSUBSCRIBEPAGE" : return ObjectAssign({},state,{isShowFilter:true});
    case "UNSHOWFILTERPSUBSCRIBEPAGE" : return ObjectAssign({},state,{isShowFilter:false});
    case "CHANGESUBSCRIBEPAGEFILTER" : return ObjectAssign({},state,{});
    case "RESETSUBSCRIBEPAGELIST" : return  ObjectAssign({},defaultSubscribePageList);
    default : return state;
  }
}