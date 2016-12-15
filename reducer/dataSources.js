var ObjectAssign = require('object-assign');
let defaultState = {
    provinces:[],
    datas:[],
    pageNum:1,
    searchName:[]
}
export default function dataSource(state = defaultState,action){
    switch(action.type){
        case 'LOADDATASDATASOURCE' : return ObjectAssign({},state,{datas:state.datas.concat(action.datas)}); 
        case 'LOADPROVINCEDATASOURCE' : return ObjectAssign({},state,{provinces:action.datas});
        case 'RESETDATADATASOURCE' : return ObjectAssign({},state,{datas:[]});
        case 'CHANGESEARCHDATASOURCE' : return ObjectAssign({},state,{searchName:action.searchName,datas:[]});
        case 'RESETDATASOURCE' : return defaultState;
            default : return state;
    }
} 