var ObjectAssign = require('object-assign');
import {CHANGE,LOADPROVICEN} from '../components/config/variable';
//省份信息
var defaultMarketProvicen= {
    data:[],
	areaId:"",
	areaName:"全部"
}

export default function marketProvicen(state=defaultMarketProvicen,action){
	switch(action.type){
		case "CHANGEMARKETPROVICEN" : return ObjectAssign({},state,{data:action.data});
		case "CHANGEMARKETPROVICENID" : return ObjectAssign({},state,{areaId:action.areaId});
		case "CHANGEMARKETPROVICENNAME" : return ObjectAssign({},state,{areaName:action.areaName});
		default : return state;
	}
}