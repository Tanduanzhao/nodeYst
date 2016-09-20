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
    pageNo:1,
    data:[],
    infinite:false
    
}
export default function hospital(state=defaultHospital,action){
  switch(action.type){
    case CHANGEHOSPITALFILTER : return Object.assign({},state,{areaName:action.areaName,areaId:action.areaId,searchAreaType:action.searchAreaType,yearMonth:action.yearMonth,hospitalLevel:action.hospitalLevel});
    case SHOWFILTER : return Object.assign({},state,{isShowFilter:true});
    case UNSHOWFILTER : return Object.assign({},state,{isShowFilter:false});
    case CHANGEHOSPITALSEARCHNAME : return Object.assign({},state,{searchName:action.searchName});
    case CLEARHOSPITALSEARCHNAME : return Object.assign({},state,{searchName:null});
    case LOADHOSPITALDATA : return Object.assign({},state,{data:action.data,pageNo:action.pageNo});
    case INFINITE : return Object.assign({},state,{infinite:false});
    case UNINFINITE : return Object.assign({},state,{infinite:true});
    default : return state;
  }
}