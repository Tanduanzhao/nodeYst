import {INCREASE,DECREASE,CHANGEDATA} from '../components/config/variable';
//时间信息

var defaultData = {
	yearMonth:2015
};
export default function data(state = defaultData,action){
    
	switch(action.type){
		case INCREASE : return Object.assign({},state,{yearMonth:++state.yearMonth});
		case DECREASE : return Object.assign({},state,{yearMonth:--state.yearMonth});
		case CHANGEDATA : return Object.assign({},state,{yearMonth:action.yearMonth});
		default : return state;
	}
}