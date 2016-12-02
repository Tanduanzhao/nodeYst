var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultSubscribePageAll={
  data:[],
  pageNo:1,
  infinite:false,
  titleOrReportKey:null,
  briefContent:true
}
export default function subscribePageAll(state=defaultSubscribePageAll,action) {
  switch(action.type){
    case "LOADSUBSCRIBEPAGEALLDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case "CHANGESUBSCRIBEPAGEALLTITLEORREPORTKEY" : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case "SHOWBRIEFCONTENT" : return ObjectAssign({},state,{briefContent:true});
    case "UNSHOWBRIEFCONTENT" : return ObjectAssign({},state,{briefContent:false});
    case "RESETSUBSCRIBEPAGEALL" : return  ObjectAssign({},defaultSubscribePageAll);
    default : return state;
  }
}