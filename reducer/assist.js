/*
    医保详细
*/
var ObjectAssign = require('object-assign');
var defaultAssist = {
    areaId:[],
    gradeId:null,//文号id
    catalogEditionId:null,//目录版本
    searchName:'',
    pageNo:1,
    provinces:[],
    filters:[],
    datas:[]
    
    
    
};
export default function insurance(state=defaultAssist,action){
    switch(action.type){
        case 'CHANGEASSIST' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,datas:[],pageNo:1});
        case 'DEFAULTASSIST' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,searchName:action.searchName});
        case 'PAGEADD' : return ObjectAssign({},state,{pageNo:state.pageNo+1});
        case 'LOADASSISTMENU' : return ObjectAssign({},state,{filters:state.filters.concat(action.datas)});
        case 'LOADASSISTDATA' : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)});
        case 'RESETASSIST' : return defaultAssist;
        default : return state;
    }
}