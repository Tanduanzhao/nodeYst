import {DRUGCONTENTDATA} from '../components/config/variable';
// 药品详情信息
var defaultDrugContent={
  drugContentData:"",
}
export default function drugContent(state=defaultDrugContent,action){
  switch(action.type){
    case 'DRUGCONTENTDATA' : return Object.assign({},state,{drugContentData:action.drugContentData});
    default : return state;
  }
}