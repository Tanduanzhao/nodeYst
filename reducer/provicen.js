var ObjectAssign = require('object-assign');
import {CHANGE,LOADPROVICEN} from '../components/config/variable';
//省份信息
var defaultProvicen = {
	areaName:'广州市',
	areaId:'ZZOQD0000000000000000000000232',
    searchAreaType:1,
    data:[]
}

export default function provicen(state=defaultProvicen,action){
	switch(action.type){
		case CHANGE : return ObjectAssign({},state,{areaName:action.areaName,areaId:action.areaId,searchAreaType:action.searchAreaType});
        case LOADPROVICEN : return ObjectAssign({},state,{data:action.data});
		default : return state;
	}
}