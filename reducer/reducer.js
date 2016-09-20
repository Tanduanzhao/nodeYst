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
    defaultArea
})
export default ystReducers;