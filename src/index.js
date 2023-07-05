/*import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <App></App>

        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister(); */
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter, Route, Switch } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
//import Archive from './pages/ArchiveUsers';
import Login from './pages/AuthUser/Login';
import forgetPassword from './pages/AuthUser/ForgetPassword'
//import ForgetPassword from './pages/auth/ForgetPassword';
import resetPassword from './pages/AuthUser/ResetPassword'


ReactDOM.render(
  <HashRouter>
    <ScrollToTop>
      <ScrollToTop>
        <App></App>
      </ScrollToTop>

    </ScrollToTop>
  </HashRouter>,
  document.getElementById('root')
);


{
  ReactDOM.render(
    <HashRouter>
      <ScrollToTop>
        <Switch>
          {/* <Route exact path="/" render={() => isLoggedIn ? <App /> : <Login />} /> */}
         
          <Route path="/login" component={Login} />
          <Route path="/forgetPassword" component={forgetPassword} />
          <Route path="/resetPassword/:token" component={resetPassword} />



          <App></App>
        </Switch>
      </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
  );
}