import React,{Component} from "react";
import ReactDOM from "react/lib/ReactDOM";
require('./public/scss/style.scss');
import {Router,Route,browserHistory,IndexRoute,useRouterHistory} from "react-router";
import {Provider} from "react-redux";

import {HTTPURL} from "./components/config";
import {store,insertReportShare} from "./components/function/ajax";
import {url2obj} from "./components/function/common";

//首页
import Home from "./components/home";
import Survey from "./components/survey";
import Picture from "./components/picture";
import SubscribePage from "./components/subscribePage/subscribePage";
import SubscribePageAll from "./components/subscribePage/subscribePageAll";
import SubscribePageList from "./components/subscribePage/subscribePageList";
import SubscribeContent from "./components/subscribePage/subscribeContent";
import SubtrainPageAll from "./components/subscribePage/subtrainPageAll";

//报告
import report from "./components/report";
import Pdf from "./components/pay/pdf";
import OrderInfo from "./components/pay/orderInfo";

//数据
import Datas from "./components/datas.js";
import marketPrice from "./components/datas/marketPrice";
import bidList from "./components/datas/bidList";
import bidListall from "./components/datas/bidListall";
import product from "./components/datas/product";
import Policy from "./components/datas/policy";
import Quality from "./components/datas/datasPolicy/quality";
import Base from "./components/datas/datasPolicy/base";
import Insurance from "./components/datas/datasPolicy/insurance";
import Assist from "./components/datas/datasPolicy/assist";
import LowPrice from "./components/datas/datasPolicy/lowPrice";
import Anti from "./components/datas/datasPolicy/anti";
import Groups from "./components/datas/groups";
import GroupsMes from "./components/datas/groupsMes";
import DataSources from "./components/datas/dataSources";
import dataIntro from "./components/datas/dataIntro";
//数据>行情
import Market from "./components/market.js";
import MarketAll from "./components/index/marketAll.js";
import MarketIntro from "./components/index/marketIntro.js";
import MarketSearch from "./components/index/marketSearch.js";
import MarketSearchDetail from "./components/index/marketSearchDetail.js";
import Optional from "./components/index/optionalClassify.js";
import RiseClassify from "./components/index/riseClassify.js";
import RiseBreed from "./components/index/riseBreed.js";
import RiseFactory from "./components/index/riseFactory.js";

//全局搜索
import Search from "./components/search.js";

//个人中心
import Center from "./components/center";
import ManagerList from "./components/center/ManagerList";
import ClientList from "./components/center/clientList";
import ManagerProtocol from "./components/center/ManagerProtocol";
import ManagerForm from "./components/center/managerForm";
import Community from "./components/community";
import BecomeManager from "./components/center/becomeManager";
import FeedBack from "./components/center/feedBack";
import purchase from "./components/center/purchase";
import nearHospital from "./components/center/nearHospital";
import Collect from "./components/collect";
import help from "./components/center/help";
import User from "./components/center/user";
import contribute from "./components/center/contribute";

//会员页面
import vip from "./components/pay/vip";
import protocol from "./components/center/protocol";

if (url2obj().recommender) {
    insertReportShare({
        shareUserId: sessionStorage.getItem("recommender"),
        reportId: sessionStorage.getItem("reportId"),
        callBack: (res)=> {
        }
    })
}
window.onload = function () {
    if (url2obj().recommender != "" && (typeof url2obj().recommender != "undefined")) {
        pushHistory();
    }
};
window.addEventListener("popstate", function (e) {
    if (url2obj().recommender) {
        location.href = HTTPURL;
    }
    var str = location.href.split("/");
    if (str[str.length - 1] == "report") {
        store.dispatch({
            type: "CHAGNGEFIXEDSCROLL",
            fixedScroll: 2
        })
    }
    if (location.pathname == "/") {
        store.dispatch({
            type: "CHAGNGEFIXEDSCROLL",
            fixedScroll: 1
        })
    }
});

//在history加链接
function pushHistory() {
    window.history.pushState("title", "title", HTTPURL);
}

import {Token} from "./components/function/token";

Token((res) => {}, store);
let locationHrefs = location.href;
export class Reactrouter extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route>
                        <Route path="/" component={Home}/>
                        <Route path="survey" component={Survey}/>
                        <Route path="search">
                            <IndexRoute component={Search}/>
                        </Route>
                        <Route path="optional">
                            <Route path="classify/:sid/:searchName" component={Optional}/>
                        </Route>
                        <Route path="rise">
                            <Route path="classify" component={RiseClassify}/>
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
                            <Route path="managerList" component={ManagerList}/>
                            <Route path="clientList" component={ClientList}/>
                            <Route path="managerProtocol" component={ManagerProtocol}/>
                            <Route path="managerForm" component={ManagerForm}/>
                            <Route path="becomeManager" component={BecomeManager}/>
                            <Route path="help" component={help}/>
                            <Route path="user" component={User}/>
                            <Route path="contribute" component={contribute}/>
                            <Route path="dataIntro" component={dataIntro}/>
                            <Route path="nearHospital/:place" component={nearHospital}/>
                            <Route path="community" component={Community}/>
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
                                <Route path="breed" component={RiseBreed}/>
                                <Route path="factory" component={RiseFactory}/>
                            </Route>
                            <Route path="marketIntro/:reportUrl" component={MarketIntro}/>
                            <Route path="marketSearch">
                                <IndexRoute component={MarketSearch}/>
                                <Route path="marketSearchDetail" component={MarketSearchDetail}/>
                                <Route path="marketSearchDetail/:searchName/:id/:icoType" component={MarketSearchDetail}/>
                                <Route path="marketSearchDetail/:searchName/:id" component={MarketSearchDetail}/>
                                <Route path="marketSearchDetail/:searchName" component={MarketSearchDetail}/>
                            </Route>
                        </Route>
                        <Route path="marketAll">
                            <IndexRoute component={MarketAll}/>
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
                        <Route path="picture/:url">
                            <IndexRoute component={Picture}/>
                        </Route>
                        <Route path="pay">
                            <Route path="vip" component={vip}/>
                            <Route path="pdf/:id" component={Pdf}/>
                            <Route path="orderInfo/:id" component={OrderInfo}/>
                            <Route path="protocol" component={protocol}/>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}
var ele = document.getElementById("app");
//ele.className="christmas";
//ele.className="NewYear ";
ReactDOM.render(<Reactrouter/>, ele, null);