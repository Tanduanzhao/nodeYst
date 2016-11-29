var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultSubscribeContent={
  data:[],
  pageNo:1
}
export default function subscribeContent(state=defaultSubscribeContent,action) {
  switch(action.type){
    case "LOADSUBSCRIBECONTRNTDATA" : return ObjectAssign({},state,{data:state.data.concat(action.message)});
    case "RESETSUBSCRIBECONTRNT" : return  ObjectAssign({},defaultSubscribeContent);
    default : return state;
  }
}