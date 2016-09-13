import React from 'react';

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

import Center from './components/center';
import FeedBack from './components/feedBack';

var store = createStore(ystReducers,applyMiddleware(thunk));
var _router = (
	<Provider store={store}>
		<Router history={browserHistory}>
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
            <Route path="center">
               <IndexRoute component={Center}/>
               <Route path="feedback" component={FeedBack}/>
            </Route>
		</Router>
	</Provider>
);
var ele = document.getElementById('app');

ReactDOM.render(_router, ele, null);