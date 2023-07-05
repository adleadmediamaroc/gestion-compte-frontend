import React from 'react'
import { Route } from 'react-router-dom';
import {login} from './Login'

function Routes() {
  return (
    <div className="layout-main-container">
    <div className="layout-main">
    <Route path="/auth" component={login} />
   </div>
 </div>
  )
}
export default Routes;
