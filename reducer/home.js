var ObjectAssign = require('object-assign');
import {LOADHOMEDATA,LOADHOMEIMG,CHANGETYPE} from '../components/config/variable';
//时间信息

var defaultData = {
	yearMonth:2015,
	data:{
		newReportMap:{datas:[]},
		hotReportMap:{datas:[]}
	},
 	img:[{}],
    goldBox:false,
    cashBox:false
};
export default function home(state = defaultData,action){
	switch(action.type){
		case LOADHOMEDATA : return ObjectAssign({},state,{data:action.data});
		case LOADHOMEIMG : return ObjectAssign({},state,{img:action.img});
        case 'UNSHOWGOLDBOX' : return ObjectAssign({},state,{goldBox:false});
        case 'UNSHOWCASHBOX' : return ObjectAssign({},state,{cashBox:false});
        case 'SHOWGOLDBOX' : return ObjectAssign({},state,{goldBox:true});
        case 'SHOWCASHBOX' : return ObjectAssign({},state,{cashBox:true});
		default : return state;
	}
}