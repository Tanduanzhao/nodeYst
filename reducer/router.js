import {ROUTER} from '../components/config/variable';
//路由信息
export default function router(state={uri:'index'},action){
	switch(action.type){
		case ROUTER : return Object.assign({},state,{uri:action.router});
		default : return state;
	}
}