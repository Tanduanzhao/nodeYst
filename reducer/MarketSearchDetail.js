var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
// 药品列表信息
var defaultMarketSearchDetail={
  data:[],
  pageNo:1,
  searchName:""
}
export default function marketSearchDetail(state=defaultMarketSearchDetail,action){
  switch(action.type){
    case  "LOADMARKETSEARCHDETAILDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case  "CHANGEMARKETSEARCHDETAILSEARCHNAME" : return ObjectAssign({},state,{searchName:action.searchName});
    case "RESETMARKETSEARCHDETAIL" : return defaultMarketSearchDetail;
    default : return state;
  }
}