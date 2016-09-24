import {CHANGEPOLICYPROVICEN} from '../components/config/variable';
var ObjectAssign = require('object-assign');
var defaultPolicy ={
    areaName:'广东省'
}
export default function policy(state = defaultPolicy,action){
    switch(action.type){
        case 'CHANGEPOLICYPROVICEN' : return ObjectAssign({},state,{areaName:action.areaName});
        default : return state;
    }
}