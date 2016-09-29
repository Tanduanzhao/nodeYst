/*
    低价药详细
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
        case 'CHANGELOWPRICE' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,datas:[],pageNo:1});
        case 'DEFAULTLOWPRICE' : return ObjectAssign({},state,{areaId:action.areaId,gradeId:action.gradeId,catalogEditionId:action.catalogEditionId,searchName:action.searchName});
        case 'PAGEADD' : return ObjectAssign({},state,{pageNo:state.pageNo+1});
        case 'LOADLOWPRICEMENU' : return ObjectAssign({},state,{filters:state.filters.concat(action.datas)});
        case 'LOADLOWPRICEDATA' : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)});
        default : return state;
    }
}