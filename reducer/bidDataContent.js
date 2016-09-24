var ObjectAssign = require('object-assign');
import {LOADBIFLISTCONTENTDATA,SHOWFILTERPRODUCE,UNSHOWFILTERPBIDLIST} from '../components/config/variable';
// 药品详情信息
var defaultBidDataContent={
  data:[],
  isShowFilter:false,
  produceType:null,
}
export default function bidDataContent(state=defaultBidDataContent,action){
  switch(action.type){
    case LOADBIFLISTCONTENTDATA : return ObjectAssign({},state,{data:action.data});
    case SHOWFILTERPRODUCE : return ObjectAssign({},state,{isShowFilter:true});
    case UNSHOWFILTERPBIDLIST : return ObjectAssign({},state,{isShowFilter:false});
    default : return state;
  }
}