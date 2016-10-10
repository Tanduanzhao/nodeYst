var ObjectAssign = require('object-assign');
const defaultQuality = {
    gradeId:'',//文号id
    searchName:'',
    pageNo:1,
    qualityLevelTypeIds:[],
    origins:[],
    levels:[],
    datas:[]
}
export default function quality(state = defaultQuality,action){
    switch(action.type){
        case 'CHANGEQUALITY' : return ObjectAssign({},state,{qualityLevelTypeIds:action.qualityLevelTypeIds,gradeId:action.gradeId,datas:[],pageNo:1});
        case 'DEFAULTQUALITY' : return ObjectAssign({},state,{gradeId:action.gradeId,searchName:action.searchName});
        case 'PAGEADDQUALITY' : return ObjectAssign({},state,{pageNo:state.pageNo+1});
        case 'CHANGEQUALITYSEARCHNAME' : return ObjectAssign({},state,{searchName:action.searchName,pageNo:1,datas:[]});
        case 'LOADQUALITYMENU' : return ObjectAssign({},state,{levels:state.levels.concat(action.datas)});
        case 'loadQUALITYMENUFORM' : return ObjectAssign({},state,{origins:state.origins.concat(action.datas)});
        case 'LOADQUALITYDATA' : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)});
        case 'RESETQUALITY' : return defaultQuality;
        default : return state;
    }
}