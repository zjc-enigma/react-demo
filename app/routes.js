import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import React from 'react'
import { Route } from 'react-router'
import { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Search from './components/Search';

const TestBtn = () => {
  return (
      <MuiThemeProvider>
      <RaisedButton label={'heheda'} />
      </MuiThemeProvider>
  )
}
        //<Route path='/char/:charUnicode' component={DetailChar} />
const routes = (
    <Route>
    <Route path='/' component={Search} />
    </Route>)

export default routes
