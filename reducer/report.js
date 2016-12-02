var ObjectAssign = require('object-assign');
import {SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGEREPORTTYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE,CLEARTITLEORREPORTKEY} from '../components/config/variable';
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
var defaultReport={
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
  fixedScroll:0,
  pdf:false
}
export default function report(state=defaultReport,action) {
  switch(action.type){
    case "CHANGEREPORTTYPEDATE" : return ObjectAssign({},state,{ReportTypeDate:action.ReportTypeDate});
    case "LOADREPORTTYPE" : return ObjectAssign({},state,{ReportType:action.ReportType});
    //case "CHANGEREPORTTAG" : return ObjectAssign({},state,{reportTag:true});
    case "UNCHANGEREPORTTAG" : return ObjectAssign({},state,{reportTag:false});
    case "CHAGNGEFIXEDSCROLL" : return ObjectAssign({},state,{fixedScroll:action.fixedScroll});
    case "CHAGNGEFIXEDSCROLLPDF" : return ObjectAssign({},state,{pdf:action.pdf});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case SHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:false});
    case LOADPRODUCEDATA : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case CHANGEREPORTTYPE : return ObjectAssign({},state,{searchType:action.searchType,reportType:action.reportType,active:action.active,sord:action.sord,sidx:action.sidx,costStatus:action.costStatus,reportTag:action.reportTag});
    case GOREPORT : return ObjectAssign({},state,{data:action.data,searchType:action.searchType,pageNo:action.pageNo});
    case "GOREPORTTYPE" : return ObjectAssign({},state,{data:action.data,reportType:action.reportType,pageNo:action.pageNo});
    case "GOREPORTFREE" : return ObjectAssign({},state,{data:action.data,costStatus:action.costStatus,pageNo:action.pageNo});
    case CHANGETITLEORREPORTKEY : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    //case CLEARTITLEORREPORTKEY : return ObjectAssign({},state,{titleOrReportKey:null});
    case "RESETREPORT" : return  ObjectAssign({},defaultReport,{fixedScroll:state.fixedScroll});
    default : return state;
  }
}