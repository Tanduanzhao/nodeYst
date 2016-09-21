var ObjectAssign = require('object-assign');
import {ROUTER} from '../components/config/variable';
//路由信息
export default function router(state={uri:'index'},action){
	switch(action.type){
		case ROUTER : return ObjectAssign({},state,{uri:action.router});
		default : return state;
	}
}