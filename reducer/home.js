var ObjectAssign = require('object-assign');
import {LOADHOMEDATA,LOADHOMEIMG} from '../components/config/variable';
//时间信息

var defaultData = {
	yearMonth:2015,
	data:{
		newReportMap:{datas:[]},
		hotReportMap:{datas:[]}
	},
 	img:[{}]
};
export default function home(state = defaultData,action){

	switch(action.type){
		case LOADHOMEDATA : return ObjectAssign({},state,{data:action.data});
		case LOADHOMEIMG : return ObjectAssign({},state,{img:action.img});
		default : return state;
	}
}