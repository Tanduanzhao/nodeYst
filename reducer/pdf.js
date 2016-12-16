var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
// 报告信息
var defaultPdf={
  data:[],
  dataAll:[],
  pageNo:1,
  infinite:false,
}
export default function pdf(state=defaultPdf,action) {
  switch(action.type){
    case "LOADPDFDATA" : return ObjectAssign({},state,{data:action.message});
    case "LOADSUBSCRIBECONTRNTDATAVVV" : return ObjectAssign({},state,{dataAll:action.message});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case "LOADPDFCONCATDATA" : return ObjectAssign({},state,{data:state.data.concat(action.message)});
    case "RESETSPDF" : return  defaultPdf;
    default : return state;
  }
}