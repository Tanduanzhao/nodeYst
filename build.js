import React,{Component} from 'react';

import ReactDOM from 'react/lib/ReactDOM';

import {Router,Route,Link,browserHistory,IndexRoute} from 'react-router';

import {Provider} from 'react-redux';

import {store,loadWx,insertReportShare} from './components/function/ajax';
import {url2obj} from './components/function/common';

//行情
import Market from './components/index/test/market.js';
import MarketAll from './components/index/test/marketAll.js';
import MarketIntro from './components/index/test/marketIntro.js';
import MarketSearch from './components/index/test/marketSearch.js';
import MarketSearchDetail from './components/index/test/marketSearchDetail.js';


import Optional from './components/index/optionalClassify.js';
import Concept from './components/index/optionalConcept.js';

import RiseClassify from './components/index/riseClassify.js';
import RiseConcept from './components/index/riseConcept.js';
import RiseBreed from './components/index/riseBreed.js';
import RiseFactory from './components/index/riseFactory.js';

import Datas from './components/datas.js';
import marketPrice from './components/datas/marketPrice';
import bidList from './components/datas/bidList';
import bidListall from './components/datas/bidListall';
import product from './components/datas/product';

import Center from './components/center';
import FeedBack from './components/center/feedBack';
import purchase from './components/center/purchase';
import Collect from './components/collect';
import help from './components/center/help';
import User from './components/center/user';
import contribute from './components/center/contribute';
import dataIntro from './components/datas/dataIntro';

import report from './components/report';

import Home from './components/home';

import vip from './components/pay/vip';
import protocol from './components/center/protocol';
import Pdf from './components/pay/pdf';
import Picture from './components/picture';

import Policy from './components/datas/policy';
import Quality from './components/datas/datasPolicy/quality';
import Base from './components/datas/datasPolicy/base';
import Insurance from './components/datas/datasPolicy/insurance';
import Assist from './components/datas/datasPolicy/assist';
import LowPrice from './components/datas/datasPolicy/lowPrice';
import Anti from './components/datas/datasPolicy/anti';

import SubscribePage from './components/subscribePage/subscribePage';
import SubscribePageAll from './components/subscribePage/subscribePageAll';
import SubscribePageList from './components/subscribePage/subscribePageList';
import SubscribeContent from './components/subscribePage/subscribeContent';
import SubtrainPageAll from './components/subscribePage/subtrainPageAll';

import Groups from './components/datas/groups';
import GroupsMes from './components/datas/groupsMes';
import DataSources from './components/datas/dataSources';

import {WXKEY,HTTPURL} from './components/config';

if(url2obj().recommender){
    insertReportShare({
        shareUserId:sessionStorage.getItem("recommender"),
        reportId: sessionStorage.getItem("reportId"),
        callBack:(res)=>{}
    })
}
window.onload =function(){
    if(url2obj().recommender!=""){
        pushHistory();
    }
};
window.addEventListener("popstate",function(e){
    if(url2obj().recommender){
        location.href = HTTPURL;
    }
    var str =location.href.split('/');
    console.log(store.getState().report.fixedScroll,"fixedScroll");
    console.log(store.getState().report.pdf,"pdff");
    console.log(location.pathname=="/","str");
    if(str[str.length-1]=="report"){
        store.dispatch({
            type:'CHAGNGEFIXEDSCROLL',
            fixedScroll:2
        })
    }
    if(location.pathname == "/"){
        store.dispatch({
            type:'CHAGNGEFIXEDSCROLL',
            fixedScroll:1
        })
    }
});

//在history加链接?
function pushHistory(){
    window.history.pushState("title","title",HTTPURL);
}

//var store = createStore(ystReducers,applyMiddleware(thunk));
import {Token} from './components/function/token';
Token((res) => {
    //store.dispatch({
    //    type: 'CHANGE',
    //    areaName: res.datas.areaName,
    //    areaId: res.datas.areaId,
    //    searchAreaType: res.datas.searchAreaType
    //});
    //console.log( res.datas.provinceId);
    //store.dispatch({
    //    type: 'CHANGEALLPROVINCEIDNAME',
    //    provinceName: res.datas.provinceName,
    //    provinceId: res.datas.provinceId
    //});
    //store.dispatch({
    //    type: 'CHANGEDATA',
    //    yearMonth: res.datas.yearMonth
    //});
}
    ,store
);
export class Reactrouter extends Component{
    componentWillMount(){
        
    }
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route>
                        <Route path='/' component={Home}/>
                        <Route path='optional'>
                            <Route path='classify/:sid' component={Optional}/>
                            <Route path='concept/:cid' component={Concept}/>
                        </Route>
                        <Route path="rise">
                            <Route path="classify" component={RiseClassify}/>
                            <Route path="concept" component={RiseConcept}/>
                            <Route path="breed" component={RiseBreed}/>
                            <Route path="factory" component={RiseFactory}/>
                        </Route>
                        <Route path="datas">
                            <IndexRoute component={Datas}/>
                            <Route path="marketPrice" component={marketPrice}/>
                            <Route path="policy">
                                <IndexRoute component={Policy}/>
                                <Route path="quality" component={Quality}/>
                                <Route path="quality/:gradeId" component={Quality}/>
                                <Route path="base" component={Base}/>
                                <Route path="base/:gradeId/:catalogEditionId" component={Base}/>
                                <Route path="insurance" component={Insurance}/>
                                <Route path="insurance/:gradeId/:catalogEditionId" component={Insurance}/>
                                <Route path="assist" component={Assist}/>
                                <Route path="assist/:gradeId/:catalogEditionId" component={Assist}/>
                                <Route path="lowPrice" component={LowPrice}/>
                                <Route path="lowPrice/:gradeId/:catalogEditionId" component={LowPrice}/>
                                <Route path="anti" component={Anti}/>
                                <Route path="anti/:gradeId/:catalogEditionId" component={Anti}/>
                            </Route>
                            <Route path="product" component={product}/>
                            <Route path="bidList" component={bidList}/>
                            <Route path="bidList/:productName/:prepName/:spec/:manufacturerName" component={bidList}/>
                            <Route path="groups" component={Groups}/>
                            <Route path="groupsMes/:id/:searchName" component={GroupsMes}/>
                            <Route path="dataSources" component={DataSources}/>
                        </Route>
                        <Route path="bidListall/:productName/:prepName/:spec/:manufacturerName/:id">
                            <IndexRoute component={bidListall}/>
                        </Route>
                        <Route path="center">
                            <IndexRoute component={Center}/>
                            <Route path="feedback" component={FeedBack}/>
                            <Route path="help" component={help}/>
                            <Route path="user" component={User}/>
                            <Route path="contribute" component={contribute}/>
                            <Route path="dataIntro" component={dataIntro}/>
                        </Route>
                        <Route path="purchase">
                            <IndexRoute component={purchase}/>
                        </Route>
                        <Route path="collect">
                            <IndexRoute component={Collect}/>
                        </Route>
                        <Route path="report">
                            <IndexRoute component={report}/>
                        </Route>
                        <Route path="market">
                            <IndexRoute component={Market}/>
                            <Route path="rise">
                                <Route path="classify" component={RiseClassify}/>
                                <Route path="concept" component={RiseConcept}/>
                                <Route path="breed" component={RiseBreed}/>
                                <Route path="factory" component={RiseFactory}/>
                            </Route>
                            <Route path="marketAll" component={MarketAll}/>
                            <Route path="marketIntro/:reportUrl" component={MarketIntro}/>
                            <Route path="marketSearch">
                                <IndexRoute component={MarketSearch}/>
                                <Route path="marketSearchDetail/:searchName/:id" component={MarketSearchDetail}/>
                                <Route path="marketSearchDetail/:parentId" component={MarketSearchDetail}/>
                            </Route>
                        </Route>
                        <Route path="subscribePage">
                            <IndexRoute component={SubscribePage}/>
                        </Route>
                        <Route path="subscribePageAll/:id">
                            <IndexRoute component={SubscribePageAll}/>
                        </Route>
                        <Route path="subscribePageList/:id/:reportType">
                            <IndexRoute component={SubscribePageList}/>
                        </Route>
                        <Route path="subscribeContent/:id/:reportId/:typeName">
                            <IndexRoute component={SubscribeContent}/>
                        </Route>
                        <Route path="subtrainPageAll/:id">
                            <IndexRoute component={SubtrainPageAll}/>
                        </Route>
                        <Route path="pay/pdf/:id" component={Pdf}></Route>
                        <Route path="picture/:url" component={Picture}></Route>
                        <Route path="pay/vip">
                            <IndexRoute component={vip}/>
                            <Route path="protocol" component={protocol}/>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}
var ele = document.getElementById('app');
ele.className="christmas";
ReactDOM.render(<Reactrouter/>, ele, null);