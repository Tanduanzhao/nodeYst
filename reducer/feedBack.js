import {LOADFEEDBACK} from '../components/config/variable';
export default function feedBack(state={data:[{isReplay:1,feedContent:'您好，请问有什么能帮助您的？'}]},action){
    switch(action.type){
        case LOADFEEDBACK : return Object.assign({},state,{data:state.data.concat(action.message)}); 
        default : return state;
    }
}