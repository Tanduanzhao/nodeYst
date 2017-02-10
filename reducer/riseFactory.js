var ObjectAssign = require('object-assign');
//时间信息

var defaultRiseFactory = {
	data:[],
	searchName:''
};
export default function riseFactory(state = defaultRiseFactory,action){
    
	switch(action.type){
		case "LOADFACTORYDATA" : return ObjectAssign({},state,{data:action.data});
		case "FACTORYSEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
		case "RESETFACTORY" : return defaultRiseFactory;
		default : return state;
	}
}