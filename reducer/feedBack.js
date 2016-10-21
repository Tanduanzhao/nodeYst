var ObjectAssign = require('object-assign');
import {LOADFEEDBACK} from '../components/config/variable';
export default function feedBack(state={data:[{isReplay:1,feedContent:'您好，由于当前咨询人数较多，留言后我们的客服会尽快记录并进行回复，您也可以直接拨打客服热线反馈您的意见：020-28121852'}]},action){
    switch(action.type){
        case LOADFEEDBACK : return ObjectAssign({},state,{data:state.data.concat(action.message)}); 
        default : return state;
    }
}