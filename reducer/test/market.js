var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../../components/config/variable';
// 药品列表信息
var defaultMarket={
  searchName:null,
  pageNo:1,
  data:[],
  //infinite:false,
  yearMonth:null
}
export default function market(state=defaultMarket,action){
  switch(action.type){
    case  "LOADMARKETATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case "RESETMARKETATA" : return defaultMarket;
    default : return state;
  }
}