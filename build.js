import {Token} from './components/function/token';
import React,{Component} from 'react';

import ReactDOM from 'react/lib/ReactDOM';

import {Router,Route,Link,browserHistory,IndexRoute} from 'react-router';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import ystReducers from './reducer/reducer.js';



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

import Center from './components/center';
import FeedBack from './components/feedBack';

import produce from './components/produce';
import free from './components/produce/free';
import charge from './components/produce/charge';

import Home from './components/home';

import vip from './components/vip';

var store = createStore(ystReducers,applyMiddleware(thunk));
//alert(Token);
//Token((res) => {
//    store.dispatch({
//        type:'CHANGE',
//        areaName:res.datas.areaName,
//        areaId:res.datas.areaId,
//        searchAreaType:res.datas.searchAreaType
//    });
//    store.dispatch({
//        type:'CHANGEDATA',
//        yearMonth:res.datas.yearMonth
//    });
//    
//    ReactDOM.render(_router, ele, null);
//});
var _router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route>
                <Route path='/' component={Index}/>
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
                </Route>
                <Route path="drugContent/:sid">
                  <IndexRoute component={drugContent}/>
                </Route>
                <Route path="center">
                   <IndexRoute component={Center}/>
                   <Route path="feedback" component={FeedBack}/>
                </Route>
                <Route path="produce">
                  <IndexRoute component={produce}/>
                  <Route path="free" component={free}/>
                  <Route path="charge" component={charge}/>
                </Route>
                <Route path="home">
                    <IndexRoute component={Home}/>
                </Route>
                <Route path="vip" component={vip}></Route>
            </Route>
		</Router>
	</Provider>
);
var ele = document.getElementById('app');
ReactDOM.render(_router, ele, null);