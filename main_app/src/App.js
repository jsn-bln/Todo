import React from 'react'
import LoginForm from './Login/login' 
import RegisterForm from './Register/register'
import {Link, Switch, Route} from "react-router-dom"


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      username : "",
      password : "",
      task: ""
    }
  }
 
  render(){
    return(
      <div className="main-container">
        <Route exact path = '/'>
          <h1>Homepage</h1>
        </Route>
        <Route path = '/login'>
          <LoginForm/>
        </Route>
        <Route path = '/register'>
          <RegisterForm/>
        </Route>
      </div>
    )
  }
}

export default App;
