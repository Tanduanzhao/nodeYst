var ObjectAssign = require('object-assign');
import {INCREASE,DECREASE,CHANGEDATA} from '../components/config/variable';
//时间信息

var defaultData = {
	yearMonth:2015
};
export default function data(state = defaultData,action){
    
	switch(action.type){
		case INCREASE : return ObjectAssign({},state,{yearMonth:++state.yearMonth});
		case DECREASE : return ObjectAssign({},state,{yearMonth:--state.yearMonth});
		case CHANGEDATA : return ObjectAssign({},state,{yearMonth:action.yearMonth});
		default : return state;
	}
}