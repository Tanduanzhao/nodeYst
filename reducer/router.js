var ObjectAssign = require('object-assign');
import {ROUTER} from '../components/config/variable';
//路由信息

let defaultRouter = {
	path:null,
	uri:'index'
};
export default function router(state=defaultRouter,action){
	switch(action.type){
		case 'CHANGEROUTER' :  return ObjectAssign({},state,{path:action.path});
		case ROUTER : return ObjectAssign({},state,{uri:action.router});
		default : return state;
	}
}