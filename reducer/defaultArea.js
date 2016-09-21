var ObjectAssign = require('object-assign');
import {DEFAULT} from '../components/config/variable';
export default function defaultArea(state = {},action){
    switch(action.type){
        case DEFAULT : return ObjectAssign({},state,{areaId:action.areaId,areaName:action.areaName,searchAreaType:action.searchAreaType});
        default : return state;
    }
}