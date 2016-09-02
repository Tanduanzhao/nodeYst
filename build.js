import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/index.js';

import {Router,Route,Link,browserHistory} from 'react-router';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import ystReducers from './reducer/reducer.js';

var store = createStore(ystReducers,applyMiddleware(thunk));
var _router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={Index} />
		</Router>
	</Provider>
);
var ele = document.getElementById('app');

ReactDOM.render(_router, ele, null);