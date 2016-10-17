/*
    抗菌药物详细
*/
var ObjectAssign = require('object-assign');
var defaultAnti = {
    areaId:[],
    gradeId:null,//文号id
    catalogEditionId:null,//目录版本
    searchName:'',
    pageNo:1,
    provinces:[],
    filters:[],
    datas:[]
    
    
    
};
export default function insurance(state=defaultAnti,action){
    switch(action.type){
        case 'CHANGEANTI' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,datas:[],pageNo:1});
        case 'DEFAULTANTI' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,searchName:action.searchName});
        case 'PAGEADDANTI' : return ObjectAssign({},state,{pageNo:state.pageNo+1});
        case 'LOADANTIMENU' : return ObjectAssign({},state,{filters:state.filters.concat(action.datas)});
        case 'LOADANTIDATA' : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)});
        case 'CHANGEANTISEARCHNAME' : return ObjectAssign({},state,{searchName:action.searchName,pageNo:1,datas:[]});
        case 'RESETANTI' : return defaultAnti;
        default : return state;
    }
}