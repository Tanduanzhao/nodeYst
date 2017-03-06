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
    ParseReport:[],
    ColumnList:[],
    goldBox:false,
    cashBox:false,
    hasRecord:true,
    isShowRecord:false,
    publishDate:"",
    newContent:""
};
export default function home(state = defaultData,action){
	switch(action.type){
		case LOADHOMEDATA : return ObjectAssign({},state,{data:action.data});
		case LOADHOMEIMG : return ObjectAssign({},state,{img:action.img});
        case 'LOADPUBLISHDATE' : return ObjectAssign({},state,{publishDate:action.publishDate,newContent:action.newContent});
        case "LOADHOMEPARSEREPORT" : return ObjectAssign({},state,{ParseReport:action.ParseReport});
        case "LOADHOMECOLUMNLIST" : return ObjectAssign({},state,{ColumnList:action.ColumnList});
        case 'UNSHOWGOLDBOX' : return ObjectAssign({},state,{goldBox:false});
        case 'UNSHOWCASHBOX' : return ObjectAssign({},state,{cashBox:false});
        case 'SHOWGOLDBOX' : return ObjectAssign({},state,{goldBox:true});
        case 'SHOWCASHBOX' : return ObjectAssign({},state,{cashBox:true});
        case 'HIDERECORD' : return ObjectAssign({},state,{isShowRecord:false,hasRecord:false});
        case 'SHOWRECORD' : return ObjectAssign({},state,{isShowRecord:true});
        case 'RESETHOMEREPORT' : return ObjectAssign({},state,{data:defaultData.data});
		default : return state;
	}
}