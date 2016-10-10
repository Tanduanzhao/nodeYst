/*
    基药详细
*/
var ObjectAssign = require('object-assign');
var defaultBase = {
    areaId:[],
    gradeId:null,//文号id
    catalogEditionId:null,//目录版本
    searchName:'',
    pageNo:1,
    provinces:[],
    filters:[],
    datas:[]
};
export default function insurance(state=defaultBase,action){
    switch(action.type){
        case 'CHANGEBASE' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,datas:[],pageNo:1});
        case 'DEFAULTBASE' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,searchName:action.searchName});
        case 'PAGEADD' : return ObjectAssign({},state,{pageNo:state.pageNo+1});
        case 'LOADBASEMENU' : return ObjectAssign({},state,{filters:state.filters.concat(action.datas)});
        case 'LOADBASEDATA' : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)});
        case 'REASETBASE' : return defaultBase;
        default : return state;
    }
}