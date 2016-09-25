import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import React from 'react'
import { Route } from 'react-router'
import { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Search from './components/Search'
import SelectionTable from './components/Selection'
import Writer from './components/Writer'

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
    <Route name='index' path='/' component={Search} />
    <Route name='selection' path='/selection' component={SelectionTable} />
    <Route name='writer' path='/writer' component={Writer} />
    </Route>)

export default routes
