var ObjectAssign = require('object-assign');
import {LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultSubscribePageList={
  data:[],
  subscribeTypeDate:[],
  pageNo:1,
  infinite:false,
  titleOrReportKey:null,
  isShowFilter:false,
  costStatus:null,
  column:0,
  briefContentList:true

}
export default function subscribePageList(state=defaultSubscribePageList,action) {
  switch(action.type){
    case "LOADSUBSCRIBEPAGELISTDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case "CHANGESUBSCRIBEPAGELISTTYPEDATE" : return ObjectAssign({},state,{subscribeTypeDate:action.subscribeTypeDate});
    case "CHANGESUBSCRIBEPAGEALLTITLEORREPORTKEY" : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case "SHOWFILTERSUBSCRIBEPAGE" : return ObjectAssign({},state,{isShowFilter:true});
    case "UNSHOWFILTERPSUBSCRIBEPAGE" : return ObjectAssign({},state,{isShowFilter:false});
    case "UNSHOWBRIEFCONTENTLIST" : return ObjectAssign({},state,{briefContentList:false});
    case "SHOWBRIEFCONTENTLIST" : return ObjectAssign({},state,{briefContentList:true});
    case "CHANGESUBSCRIBEPAGELISTEFILTER" : return ObjectAssign({},state,{costStatus:action.costStatus,column:action.column});
    case "RESETSUBSCRIBEPAGELIST" : return  ObjectAssign({},defaultSubscribePageList);
    default : return state;
  }
}