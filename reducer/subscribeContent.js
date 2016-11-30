var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultSubscribeContent={
  data:[],
  dataAll:[],
  pageNo:1,
  infinite:false,
}
export default function subscribeContent(state=defaultSubscribeContent,action) {
  switch(action.type){
    case "LOADSUBSCRIBECONTRNTDATA" : return ObjectAssign({},state,{data:action.message});
    case "LOADSUBSCRIBECONTRNTDATAVVV" : return ObjectAssign({},state,{dataAll:action.message});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case "LOADSUBSCRIBECONTRNTDATASS" : return ObjectAssign({},state,{data:state.data.concat(action.message),pageNo:action.pageNo});
    case "RESETSUBSCRIBECONTRNT" : return  ObjectAssign({},defaultSubscribeContent);
    default : return state;
  }
}