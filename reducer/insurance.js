/*
    医保详细
*/
var ObjectAssign = require('object-assign');
var defaultInsurance = {
    areaId:[],
    gradeId:null,//文号id
    catalogEditionId:null,//目录版本
    searchName:'',
    pageNo:1,
    provinces:[],
    filters:[],
    datas:[]
    
    
    
};
export default function insurance(state=defaultInsurance,action){
    switch(action.type){
        case 'CHANGEINSURANCE' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,datas:[],pageNo:1});
        case 'DEFAULTINSURANCE' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,searchName:action.searchName});
        case 'PAGEADDINSURANCE' : return ObjectAssign({},state,{pageNo:state.pageNo+1});
        case 'CHANGEINSURANCESEARCHNAME' : return ObjectAssign({},state,{searchName:action.searchName,pageNo:1,datas:[]});
        case 'LOADINSURANCEMENU' : return ObjectAssign({},state,{filters:state.filters.concat(action.datas)});
        case 'LOADINSURANCEDATA' : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)});
        case 'RESETINSURANCE' : return defaultInsurance;
        default : return state;
    }
}