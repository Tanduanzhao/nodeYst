var ObjectAssign = require('object-assign');
import {LOADPURCHASEDATA,SHOWFILTERPRODUCE,UNSHOWFILTERPRODUCE,LOADPRODUCEDATA,GOREPORT,CHANGETYPE,CHANGETITLEORREPORTKEY,INFINITE,UNINFINITE} from '../components/config/variable';
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
var defaultPurchase={
  isShowFilter:false,
  areaName:defaultProvicen.areaName,
  areaId:defaultProvicen.areaId,
  searchAreaType:defaultProvicen.searchAreaType,
  yearMonth:defaultData.yearMonth,
  hospitalLevel:null,
  produceType:null,
  searchName:null,
  searchType:0,
  pageNo:1,
  data:[],
  infinite:false,
  titleOrReportKey:null,
  ReportType:[],
  reportType:"行业报告",
  ReportTypeDate:[]

}
export default function purchase(state=defaultPurchase,action) {
  switch(action.type){
    case "CHANGEPURCHASETYPE" : return ObjectAssign({},state,{ReportTypeDate:action.ReportTypeDate});
    case "LOADREPORTTYPE" : return ObjectAssign({},state,{ReportType:action.ReportType});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    case SHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:false});
    case LOADPURCHASEDATA : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case CHANGETYPE : return ObjectAssign({},state,{searchType:action.searchType,reportType:action.reportType});
    case GOREPORT : return ObjectAssign({},state,{data:action.data,searchType:action.searchType,pageNo:action.pageNo});
    case CHANGETITLEORREPORTKEY : return ObjectAssign({},state,{titleOrReportKey:action.titleOrReportKey});
    default : return state;
  }
}