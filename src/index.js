import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import createHistory from 'history/createBrowserHistory';
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import {Route, Switch} from "react-router";
import App from "./Components/App"
import LoginForm from "./Components/LoginForm"
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk';
import {tokenMiddleware} from "./middleware";

const store = createStore(
    reducer, applyMiddleware(thunkMiddleware, tokenMiddleware)
);
const history = createHistory();

ReactDOM.render((
   <Provider store={store}>
       <ConnectedRouter history={history}>
           <Switch>
               <Route path="/" component={App}/>
           </Switch>
       </ConnectedRouter>
   </Provider>
), document.getElementById('root'))
