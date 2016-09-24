var ObjectAssign = require('object-assign');
import {INCREASE,DECREASE,CHANGEDATA,CHANGEVIP} from '../components/config/variable';
//时间信息

var defaultData = {
	yearMonth:2015,
    isVip:false
};
export default function data(state = defaultData,action){
    
	switch(action.type){
		case INCREASE : return ObjectAssign({},state,{yearMonth:++state.yearMonth});
		case DECREASE : return ObjectAssign({},state,{yearMonth:--state.yearMonth});
		case CHANGEDATA : return ObjectAssign({},state,{yearMonth:action.yearMonth});
        case CHANGEVIP : return ObjectAssign({},state,{isVip:true});
		default : return state;
	}
}