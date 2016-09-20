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
		case SHOW : return Object.assign({},state,{showProvicen:true});
		case UNSHOW : return Object.assign({},state,{showProvicen:false});
        case LOADDATA : return Object.assign({},state,{data:action.data});
		default : return state;
	}
}