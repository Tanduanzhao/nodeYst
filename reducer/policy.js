import {CHANGEPOLICYPROVICEN} from '../components/config/variable';
var ObjectAssign = require('object-assign');
var defaultPolicy ={
    areaName:'广东省',
    areaId:['ZZOQD0000000000000000000000020'],
    loadState:2,//当前加载的政策准入数据模块
    searchName:'头孢呋辛',
    pageNo:1,
    provinces:[],
    modules:[],
    quality:[],
    base:[],
    insurance:[],
    assist:[],
    lowPrice:[],
    anti:[]
}
export default function policy(state = defaultPolicy,action){
    switch(action.type){
        case 'CHANGEPOLICYPROVICEN' : return ObjectAssign({},state,{areaName:action.areaName});
        case 'LOADPOLICYPROVINCE' : return ObjectAssign({},state,{provinces:state.provinces.concat(action.datas)});
        case 'LOADPOLICYMODULES' : return ObjectAssign({},state,{modules:action.datas});
        case 'BREAKSTATE' : return ObjectAssign({},state,{loadState:state.loadState+1,pageNo:1});
        case 'LOADQUALITYDATA' : return ObjectAssign({},state,{quality:state.quality.concat(action.datas)});
        case 'PAGEPOLICYADD' : return ObjectAssign({},state,{pageNo:state.pageNo+1});
        case 'LOADBASEDATA' : return ObjectAssign({},state,{base:state.base.concat(action.datas)});
        case 'LOADINSURANCEDATA' : return ObjectAssign({},state,{insurance:state.insurance.concat(action.datas)});
        case 'LOADASSISTDATA' : return ObjectAssign({},state,{assist:state.assist.concat(action.datas)});
        case 'LOADLOWPRICEDATA' : return ObjectAssign({},state,{lowPrice:state.lowPrice.concat(action.datas)});
        case 'LOADANTIDATA' : return ObjectAssign({},state,{anti:state.anti.concat(action.datas)});
        case 'POLICYRESET' : return ObjectAssign({},state,{areaName:action.areaName,areaId:action.areaId,loadState:2,pageNo:1,modules:[],quality:[],base:[],insurance:[],assist:[],lowPrice:[],anti:[]});
        case 'POLICYSEARCHCHANGE' : return ObjectAssign({},state,{searchName:action.searchName});
        default : return state;
    }
    
}