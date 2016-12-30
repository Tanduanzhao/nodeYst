var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
// 药品列表信息
var defaultMarketSearch={
  data:[],
  pageNo:1,
  searchName:"",
}
export default function marketSearch(state=defaultMarketSearch,action){
  switch(action.type){
    case  "LOADMARKETSEARCHDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case  "CHANGEMARKETSEARCHSEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
    case "RESETMARKETSEARCH" : return defaultMarketSearch;
    default : return state;
  }
}