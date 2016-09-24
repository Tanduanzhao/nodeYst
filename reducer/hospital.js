var ObjectAssign = require('object-assign');
import {CHANGEHOSPITALFILTER,SHOWFILTER,UNSHOWFILTER,CHANGEHOSPITALSEARCHNAME,CLEARHOSPITALSEARCHNAME,LOADHOSPITALDATA,INFINITE,UNINFINITE} from '../components/config/variable';
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
//医院列表信息
var defaultHospital={
    isShowFilter:false,
    areaName:defaultProvicen.areaName,
    areaId:defaultProvicen.areaId,
    searchAreaType:defaultProvicen.searchAreaType,
    yearMonth:defaultData.yearMonth,
    hospitalLevel:null,
    searchName:null,
    hospital:true,
    municipality:1,
    pageNo:1,
    data:[],
    infinite:false
    
}
export default function hospital(state=defaultHospital,action){
  switch(action.type){
    case CHANGEHOSPITALFILTER : return ObjectAssign({},state,{areaName:action.areaName,areaId:action.areaId,searchAreaType:action.searchAreaType,yearMonth:action.yearMonth,hospitalLevel:action.hospitalLevel});
    case SHOWFILTER : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTER : return ObjectAssign({},state,{isShowFilter:false});
    case CHANGEHOSPITALSEARCHNAME : return ObjectAssign({},state,{searchName:action.searchName});
    case CLEARHOSPITALSEARCHNAME : return ObjectAssign({},state,{searchName:null});
    case LOADHOSPITALDATA : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case INFINITE : return ObjectAssign({},state,{infinite:false});
    case UNINFINITE : return ObjectAssign({},state,{infinite:true});
    default : return state;
  }
}