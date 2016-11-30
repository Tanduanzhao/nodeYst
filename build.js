import React,{Component} from 'react';

import ReactDOM from 'react/lib/ReactDOM';

import {Router,Route,Link,browserHistory,IndexRoute} from 'react-router';
//import {createStore,applyMiddleware} from 'redux';
//import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
//import ystReducers from './reducer/reducer.js';

import {store,loadWx,insertReportShare} from './components/function/ajax';
import {url2obj} from './components/function/common';

import Index from './components/index.js';
import Optional from './components/optionalClassify.js';
import Concept from './components/optionalConcept.js';

import RiseClassify from './components/riseClassify.js';
import RiseConcept from './components/riseConcept.js';
import RiseBreed from './components/riseBreed.js';

import Datas from './components/datas.js';
import HospitalList from './components/datas/hospitalList';
import drugList from './components/datas/drugList';
import drugContent from './components/datas/drugContent';
import marketPrice from './components/datas/marketPrice';
import bidList from './components/datas/bidList';
import bidListall from './components/datas/bidListall';
import product from './components/datas/product';

import Center from './components/center';
import FeedBack from './components/feedBack';
import purchase from './components/purchase';
import Collect from './components/collect';
import help from './components/help';
import User from './components/user';
import contribute from './components/contribute';
import dataIntro from './components/dataIntro';

import report from './components/report';
import free from './components/report/free';
import charge from './components/report/charge';

import Home from './components/home';

import vip from './components/vip';
import protocol from './components/protocol';
import Pdf from './components/pdf';
import Picture from './components/picture';

import ReportContent from "./components/reportContent";
import Policy from './components/policy';
import Quality from './components/quality';
import Base from './components/base';
import Insurance from './components/insurance';
import Assist from './components/assist';
import LowPrice from './components/lowPrice';
import Anti from './components/anti';

import SubscribePage from './components/subscribePage';
import SubscribePageAll from './components/subscribePageAll';
import SubscribePageList from './components/subscribePageList';
import SubscribeContent from './components/subscribeContent';
import SubtrainPageAll from './components/subtrainPageAll';


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
    console.log(store.getState().report.fixedScroll,"fixedScroll")
    console.log(store.getState().report.pdf,"pdff")
    console.log(location.pathname=="/","str")
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
    store.dispatch({
        type: 'CHANGE',
        areaName: res.datas.areaName,
        areaId: res.datas.areaId,
        searchAreaType: res.datas.searchAreaType
    });
    console.log( res.datas.provinceId);
    store.dispatch({
        type: 'CHANGEALLPROVINCEIDNAME',
        provinceName: res.datas.provinceName,
        provinceId: res.datas.provinceId
    });
    store.dispatch({
        type: 'CHANGEDATA',
        yearMonth: res.datas.yearMonth
    });

//    ReactDOM.render(_router, ele, null);
}
    ,(res)=>{
        //store.dispatch({
        //    type:'LOADUSERINFO',
        //    datas:res.datas
        //});
        ////alert("dddd")
        //name=res.datas.id;
    }
    ,store
);
export class Reactrouter extends Component{
    componentDidMount(){
        //loadWx({
        //    code:url2obj().code,
        //    callBack:(res)=>{
        //        store.dispatch({
        //                    type:'LOADUSERINFO',
        //                    datas:res.datas
        //                });
        //            name=res.datas.id;
        //    }
        //})
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
                        </Route>
                        <Route path="datas">
                            <IndexRoute component={Datas}/>
                            <Route path="hospitalList" component={HospitalList}/>
                            <Route path="drugList" component={drugList}/>
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
                        </Route>
                        <Route path="bidListall/:productName/:prepName/:spec/:manufacturerName/:id">
                            <IndexRoute component={bidListall}/>
                        </Route>
                        <Route path="drugContent/:sid">
                            <IndexRoute component={drugContent}/>
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
                            <Route path="free" component={free}/>
                            <Route path="charge" component={charge}/>
                        </Route>
                        <Route path="home">
                            <IndexRoute component={Index}/>
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
                        <Route path="pdf/:id/:title/:price" component={Pdf}></Route>
                        <Route path="picture/:url" component={Picture}></Route>
                        <Route path="vip">
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
ReactDOM.render(<Reactrouter/>, ele, null);