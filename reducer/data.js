var ObjectAssign = require('object-assign');
import {INCREASE,DECREASE,CHANGEDATA,CHANGEVIP} from '../components/config/variable';
//时间信息

var defaultData = {
	yearMonth:2015,
    isVip:false,
	img:[],
	loading:true
};
export default function data(state = defaultData,action){
    
	switch(action.type){
		case "ssss" : return ObjectAssign({},state,{loading:action.loading});
		case INCREASE : return ObjectAssign({},state,{yearMonth:++state.yearMonth});
		case DECREASE : return ObjectAssign({},state,{yearMonth:--state.yearMonth});
		case CHANGEDATA : return ObjectAssign({},state,{yearMonth:action.yearMonth});
        case CHANGEVIP : return ObjectAssign({},state,{isVip:true});
		case "LOADDATA" : return ObjectAssign({},state,{data:action.data});
		default : return state;
	}
}