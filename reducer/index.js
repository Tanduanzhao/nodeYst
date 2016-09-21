var ObjectAssign = require('object-assign');
import {SHOW,UNSHOW,LOADDATA} from '../components/config/variable';
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
export default function index(state=defaultIndex,action){
	switch(action.type){
		case SHOW : return ObjectAssign({},state,{showProvicen:true});
		case UNSHOW : return ObjectAssign({},state,{showProvicen:false});
        case LOADDATA : return ObjectAssign({},state,{data:action.data});
		default : return state;
	}
}