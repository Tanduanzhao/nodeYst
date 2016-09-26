var ObjectAssign = require('object-assign');
import {LOADBIFLISTCONTENTDATA,SHOWFILTERPRODUCE,UNSHOWFILTERPBIDLIST} from '../components/config/variable';
// 药品详情信息
var defaultBidList={
  data:[],
  isShowFilter:false,
  produceType:null,
}
export default function bidList(state=defaultBidList,action){
  switch(action.type){
    case LOADBIFLISTCONTENTDATA : return ObjectAssign({},state,{data:action.data});
    case SHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPBIDLIST : return ObjectAssign({},state,{isShowFilter:false});
    default : return state;
  }
}