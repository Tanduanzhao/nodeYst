import {combineReducers} from 'redux';
import index from './index';
import provicen from './provicen';
import data from './data';
import router from './router';
import hospital from './hospital';
import feedBack from './feedBack';
import drug from './drug';
import drugContent from './drugContent';
import Produce from './Produce';
import userInfo from './userInfo';
import defaultArea from './defaultArea';
import home from './home';
import bidList from './bidList';
import bidDataContent from './bidDataContent';
import policy from './policy';
//合并仓库

const ystReducers = combineReducers({
	index,
	provicen,
	data,
	router,
    Produce,
    hospital,
    feedBack,
    drug,
    userInfo,
    drugContent,
    defaultArea,
    home,
    bidList,
    bidDataContent,
    policy
})
export default ystReducers;