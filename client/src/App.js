import {useState, useEffect} from 'react'
import LoginForm from './Login/login' 
import RegisterForm from './Register/register'
import {Route, BrowserRouter} from "react-router-dom"
import Homepage from './Homepage/homepage'
import UserContext from './context/userContext'
import Nav from './Nav/nav'
import axios from 'axios'

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLogin = async () => {
      let token = localStorage.getItem('auth-token')
      if(token === null) {
        localStorage.setItem("auth-token","")
        token = ""
      }
      const tokenRes = await axios.post('/users/isTokenValid', null , {
        headers: {
          "x-auth-token" : token
        }
      })
      if(tokenRes.data){
        const userRes = await axios.get('/users',{
          headers:{
            "x-auth-token" : token
          }
        })
        setUserData({
          token,
          user: userRes.data
        })
      }
    }
    checkLogin();
  },[])


    return(
      <div className="main-container">
        <UserContext.Provider value={{userData, setUserData}}>
          <BrowserRouter>
           <Nav/>
            <Route exact path = '/'>
              <Homepage/>
            </Route>
            <Route path = '/login'>
              <LoginForm />
            </Route>
            <Route path = '/register'>
              <RegisterForm/>
            </Route>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    )
  
}

export default App;

