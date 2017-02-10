var ObjectAssign = require('object-assign');
//时间信息

var defaultRiseBrees = {
	data:[],
	searchName:''
};
export default function riseBrees(state = defaultRiseBrees,action){
    
	switch(action.type){
		case "LOADRISEBREESDATA" : return ObjectAssign({},state,{data:action.data});
		case "RISEBREESSEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
		case "RESETRISEBREES" : return defaultRiseBrees;
		default : return state;
	}
}