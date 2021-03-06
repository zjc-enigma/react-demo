import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import React from 'react'
import { Route } from 'react-router'
import { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Search from './components/Search'
import SelectionTable from './components/Selection'
import Writer from './components/Writer'
import Result from './components/Result'
import CreativeEditor from './components/Editor'
import SelectList from './components/SelectList'
import SelectTable from './components/SelectTable'
import GenerateTable from './components/Generate'
import TempEditor from './components/TempEditor'

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
      <Route name='editor' path='/editor' component={CreativeEditor} />
      <Route name='select_list' path='/select_list' component={SelectList} />
      <Route name='select_table' path='/select_table' component={SelectTable} />
      <Route name='generate_res_table' path='/generate_res_table' component={GenerateTable} />
      <Route name='selection' path='/selection' component={SelectionTable} />
      <Route name='writer' path='/writer' component={Writer} />
      <Route name='result' path='/result' component={Result} />
    </Route>)

export default routes
