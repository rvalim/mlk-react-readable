import React, { Component } from 'react';
import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import {handleInitialData} from './actions/shared'

class App extends Component {
  componentDidMount(){
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

function mapStateToProps({categories}){
  return {categories}
}

export default connect(mapStateToProps)(App);
