import {combineReducers} from 'redux';
import index from './index';
import provicen from './provicen';
import data from './data';
import router from './router';
import hospital from './hospital';
import feedBack from './feedBack';
import drug from './drug';
import drugContent from './drugContent';
import report from './report';
import purchase from './purchase';
import userInfo from './userInfo';
import defaultArea from './defaultArea';
import home from './home';
import marketPrice from './marketPrice';
import product from './product';
import bidList from './bidList';
import policy from './policy';
//合并仓库

const ystReducers = combineReducers({
	index,
	provicen,
	data,
	router,
    report,
    hospital,
    feedBack,
    drug,
    userInfo,
    drugContent,
    defaultArea,
    home,
    marketPrice,
    product,
    purchase,
    bidList,
    policy
})
export default ystReducers;