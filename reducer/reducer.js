import {combineReducers} from 'redux';
import index from './index';
import provicen from './provicen';
import data from './data';
import router from './router';
import feedBack from './feedBack';
import report from './report';
import purchase from './purchase';
import userInfo from './userInfo';
import defaultArea from './defaultArea';
import home from './home';
import marketPrice from './marketPrice';
import product from './product';
import bidList from './bidList';
import bidListall from './bidListall';
import policy from './policy';
import quality from './quality';
import insurance from './insurance';
import base from './base';
import assist from './assist';
import lowPrice from './lowPrice';
import anti from './anti';
import collect from './collect';
import subscribePage from './subscribePage';
import subscribePageAll from './subscribePageAll';
import subscribePageList from './subscribePageList';
import subscribeContent from './subscribeContent';
import pdf from './pdf';
import marketProvice from './marketProvice';

import groups from './groups';
import groupsMes from './groupsMes';
import dataSources from './dataSources';

import market from './market';
import marketSearch from './marketSearch';
import marketSearchDetail from './MarketSearchDetail';
import optionalClassify from './optionalClassify';
import riseBrees from './riseBrees';
import riseFactory from './riseFactory';

import managerList from './managerList';
import clientList from './clientList';
//合并仓库

const ystReducers = combineReducers({
	index,
    market,
    marketSearch,
    marketSearchDetail,
    marketProvice,
    optionalClassify,
    riseBrees,
    riseFactory,
	provicen,
    groups,
    pdf,
    groupsMes,
    dataSources,
	data,
	router,
    report,
    feedBack,
    userInfo,
    defaultArea,
    home,
    marketPrice,
    product,
    purchase,
    bidList,
    policy,
    quality,
    insurance,
    base,
    assist,
    lowPrice,
    anti,
    collect,
    bidListall,
    managerList,
    clientList,
    subscribePage,
    subscribePageAll,
    subscribePageList,
    subscribeContent
})
export default ystReducers;