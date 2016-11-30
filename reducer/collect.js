var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,INFINITE,UNINFINITE} from '../components/config/variable';

// 报告信息
var defaultCollect={
  isShowFilter:false,
  subscribe:2346,
  subscribeTwo:3434,
  hospitalLevel:null,
  produceType:null,
  searchName:null,
  searchType:1,
  pageNo:1,
  data:[],
  infinite:false,
  titleOrReportKey:"",
  reportType:0,
  ReportTypeDate:[],
  reportTag:true,
  sord:null,
  sidx:null,
  active:0,
  costStatus:null,
  showCollectPopup:false,
  showCollectPopupID:false,
  columnBigType:null
}
export default function collect(state=defaultCollect,action) {
  switch(action.type){
    case "LOADCOLLECT" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case SHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:false});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case "CHANGECOLLECTREPORTTYPEDATE" : return ObjectAssign({},state,{ReportTypeDate:action.ReportTypeDate});
    case "CHANGECOLLECTTITLEORREPORTKEY" : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    case "SELECTCHANGERCOLLECT" : return ObjectAssign({},state,{columnBigType:action.columnBigType,searchType:action.searchType,reportType:action.reportType,active:action.active,sord:action.sord,sidx:action.sidx,costStatus:action.costStatus,reportTag:action.reportTag});
    case "SHOWCOLLECTPOPUP" : return ObjectAssign({},state,{showCollectPopup:action.showCollectPopup,showCollectPopupID:action.showCollectPopupID});
    case "RESETREPORTCOLLECT" : return  defaultCollect;
    default : return state;
  }
}