import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import '@/main.scss';
import App from '@/Components/App';
import ErrorBoundary from '@/ErrorBoundary';
import  Muis from '@/Components/Muis/Muis.jsx'
import registerServiceWorker from '@/registerServiceWorker';
// import  MVweb from '@/Components/MVweb/index.jsx'
ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <Switch>
        {/* <Route path="/MV" component = {MVweb} />  */}
        <Route path="/muis" component = {Muis} />   
        <Route path = '/' component = {App} />
      </Switch>
    </Router>
  </ErrorBoundary>
  , document.getElementById('root'));//注意此处的名字
registerServiceWorker();
