import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { handleInitialData } from './actions/shared'
import PostList from './components/postList'
import PostDetail from './components/postDetail'
import PostAdd from './components/postAdd'
import Nav from './components/nav'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={PostList} />
            <Route path="/edit/:postId" component={PostAdd} />
            <Route path="/add" component={PostAdd} />
            <Route path="/:category" exact component={PostList} />
            <Route path="/:category/:postId" component={PostDetail} />
            {/*<PrivateRoute path="/:category/:post_id" component={PostList} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/add" component={QuestionAdd} />
            <PrivateRoute path="/logout" component={LogoutPage} />
            <PrivateRoute path="/leaderboard" component={Leaderboard} />
            <Route component={NoMatch} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(App);
