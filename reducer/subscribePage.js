var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultSubscribePage={
  data:[],
  pageNo:1,
  infinite:false,
  titleOrReportKey:null
}
export default function subscribePage(state=defaultSubscribePage,action) {
  switch(action.type){
    case "LOADSUBSCRIBEPAGEDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case "CHANGESUBSCRIBEPAGETITLEORREPORTKEY" : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case "RESETSUBSCRIBEPAGE" : return  ObjectAssign({},defaultSubscribePage);
    default : return state;
  }
}