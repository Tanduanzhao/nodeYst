var ObjectAssign = require('object-assign');
//时间信息

var defaultOptionalClassify = {
	data:[],
	searchName:''
};
export default function optionalClassify(state = defaultOptionalClassify,action){
    
	switch(action.type){
		case "LOADOPTIONALCLASSIFYDATA" : return ObjectAssign({},state,{data:action.data});
		case "SAVESEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
		case "RESETOPTIONALCLASSIFY" : return defaultOptionalClassify;
		default : return state;
	}
}