var ObjectAssign = require('object-assign');
import { LOADPRODUCTDATA,CHANGETRADETYPE,SHOWFILTERPRODUCT,UNSHOWFILTERPRODUCT,CHANGEDRUGSEARCHNAME,CLEADRUGSEARCHNAME,INFINITEDRUG,UNINFINITEDRUG,LOADDRUGDATA} from '../components/config/variable';
// 药品列表信息
var defaultProduct={
  isShowFilter:false,
  municipality:1,
  searchName:null,
  produceType:null,
  pageNo:1,
  tradeType:3,
  data:[],
  infinite:false
}
export default function product(state=defaultProduct,action){
  switch(action.type){
    case  "LOADPRODUCTDATA" : return ObjectAssign({},state,{data:action.data,pageNo:action.pageNo});
    case CHANGETRADETYPE : return ObjectAssign({},state,{tradeType:action.tradeType});
    case SHOWFILTERPRODUCT : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPRODUCT : return ObjectAssign({},state,{isShowFilter:false});
    case CHANGEDRUGSEARCHNAME : return ObjectAssign({},state,{searchName:action.searchName});
    case CLEADRUGSEARCHNAME : return ObjectAssign({},state,{searchName:null});
    case INFINITEDRUG : return ObjectAssign({},state,{infinite:false});
    case UNINFINITEDRUG : return ObjectAssign({},state,{infinite:true});
    default : return state;
  }
}