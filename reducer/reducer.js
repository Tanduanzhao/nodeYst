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
//合并仓库
const ystReducers = combineReducers({
	index,
	provicen,
	data,
	router
})

export default ystReducers;