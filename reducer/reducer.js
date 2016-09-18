import React from 'react';
import {combineReducers} from 'redux';


//首页默认数据仓库
var defaultIndex = {
	showProvicen:false,
    data:{
        businessCwm:[],
        businessSales:[],
        businessBreedUp:[],
        businessConcept:[]
        
    }
}

function index(state=defaultIndex,action){
	switch(action.type){
		case 'SHOW' : return Object.assign({},state,{showProvicen:true});
		case 'UNSHOW' : return Object.assign({},state,{showProvicen:false});
        case 'LOADDATA' : return Object.assign({},state,{data:action.data});
		default : return state;
	}
}

//省份信息

var defaultProvicen = {
	areaName:'广州市',
	areaId:'ZZOQD0000000000000000000000232',
    searchAreaType:1,
    data:[]
}

function provicen(state=defaultProvicen,action){
	switch(action.type){
		case 'CHANGE' : return Object.assign({},state,{areaName:action.areaName,areaId:action.areaId,searchAreaType:action.searchAreaType});
        case 'LOADPROVICEN' : return Object.assign({},state,{data:action.data});
		default : return state;
	}
}

//时间信息

var defaultData = {
	yearMonth:2015
};
function data(state = defaultData,action){
	switch(action.type){
		case 'INCREASE' : return Object.assign({},state,{yearMonth:++state.yearMonth});
		case 'DECREASE' : return Object.assign({},state,{yearMonth:--state.yearMonth});
		case 'CHANGEDATA' : return Object.assign({},state,{yearMonth:action.yearMonth});
		default : return state;
	}
}

//路由信息
function router(state={uri:'index'},action){
	switch(action.type){
		case 'ROUTER' : return Object.assign({},state,{uri:action.router});
		default : return state;
	}
}

//医院列表信息
var defaultHospital={
    isShowFilter:false,
    areaName:defaultProvicen.areaName,
    areaId:defaultProvicen.areaId,
    searchAreaType:defaultProvicen.searchAreaType,
    yearMonth:defaultData.yearMonth,
    hospitalLevel:null,
    searchName:null,
    pageNo:1,
    data:[],
    infinite:false
    
}
function hospital(state=defaultHospital,action){
  switch(action.type){
    case 'CHANGEHOSPITALFILTER' : return Object.assign({},state,{areaName:action.areaName,areaId:action.areaId,searchAreaType:action.searchAreaType,yearMonth:action.yearMonth,hospitalLevel:action.hospitalLevel});
    case 'SHOWFILTER' : return Object.assign({},state,{isShowFilter:true});
    case 'UNSHOWFILTER' : return Object.assign({},state,{isShowFilter:false});
    case 'CHANGEHOSPITALSEARCHNAME' : return Object.assign({},state,{searchName:action.searchName});
    case 'CLEARHOSPITALSEARCHNAME' : return Object.assign({},state,{searchName:null});
    case 'LOADHOSPITALDATA' : return Object.assign({},state,{data:action.data,pageNo:action.pageNo});
    case 'INFINITE' : return Object.assign({},state,{infinite:false});
    case 'UNINFINITE' : return Object.assign({},state,{infinite:true});
    default : return state;
  }
}

function feedBack(state={data:[{isReplay:1,feedContent:'您好，请问有什么能帮助您的？'}]},action){
    switch(action.type){
        case 'LOADFEEDBACK' : return Object.assign({},state,{data:state.data.concat(action.message)}); 
        default : return state;
    }
}
// 药品列表信息
var defaultDrug={
  isShowFilter:false,
  areaName:defaultProvicen.areaName,
  areaId:defaultProvicen.areaId,
  searchAreaType:defaultProvicen.searchAreaType,
  yearMonth:defaultData.yearMonth,
  hospitalLevel:null,
  searchName:null,
  pageNo:1,
  data:[],
  infinite:false

}
function drug(state=defaultDrug,action){
  switch(action.type){
    case 'CHANGEDRUGFILTER' : return Object.assign({},state,{areaName:action.areaName,areaId:action.areaId,searchAreaType:action.searchAreaType,yearMonth:action.yearMonth,hospitalLevel:action.hospitalLevel});
    case 'SHOWFILTERDRUG' : return Object.assign({},state,{isShowFilter:true});
    case 'UNSHOWFILTER' : return Object.assign({},state,{isShowFilter:false});
    case 'CHANGEDRUGSEARCHNAME' : return Object.assign({},state,{searchName:action.searchName});
    case 'CLEADRUGSEARCHNAME' : return Object.assign({},state,{searchName:null});
    case 'INFINITEDRUG' : return Object.assign({},state,{infinite:false});
    case 'UNINFINITEDRUG' : return Object.assign({},state,{infinite:true});
    case 'LOADDRUGDATA' : return Object.assign({},state,{data:action.data,pageNo:action.pageNo});
    default : return state;
  }
}
// 药品详情信息
var defaultDrugContent={
  drugContentData:"",
}
function drugContent(state=defaultDrugContent,action){
  switch(action.type){
    case 'DRUGCONTENTDATA' : return Object.assign({},state,{drugContentData:action.drugContentData});
    default : return state;
  }
}
// 报告信息
var defaultProduce={
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
  pageNo:1,
  data:[],
  infinite:false

}
function Produce(state=defaultProduce,action) {
  switch(action.type){
    case 'SHOWFILTERPRODUCE' : return Object.assign({},state,{isShowFilter:true});
    case 'UNSHOWFILTERPRODUCE' : return Object.assign({},state,{isShowFilter:false});
    default : return state;
  }
}
//合并仓库
const ystReducers = combineReducers({
	index,
	provicen,
	data,
	router,
  Produce,
    hospital,
    feedBack,
    drug,
      drugContent
})

export default ystReducers;