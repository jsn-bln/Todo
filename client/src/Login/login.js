import React,{useContext , useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import UserContext from '../context/userContext'
import {TextField, Card, Button, CardContent, CardActions, Typography, Link} from '@material-ui/core'
import './login.css'


const LoginForm = ()  => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory();
  const register = () => history.push('/register')
  const {setUserData} = useContext(UserContext);

  const handleSubmit = (e) =>{
    e.preventDefault()
    const payload = {
      username: username,
      password: password
    }
    axios({
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        data: payload,
        withCredentials: true,
        url: "/users/login"
        
    }).then((res) =>
      {
        //! SET USER WITH CONTEXT
        setUserData({
          token: res.data.token,
          user: res.data.account
        })
        localStorage.setItem('auth-token', res.data.token)
        history.push('/')
        
      })
      .catch((err) => {
         console.log(err.response.data.message)
         setErrorMsg(err.response.data.message)
      })
  }
  

    return(
      <div className="login-container">
        <Card className='card' elevation={5}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <CardContent>
            <Typography variant='h5'>Sign in</Typography>
              <div className='card-actions'>
                <TextField className='login-field' id="username" label="Username" 
                    onChange= {e => setUsername(e.target.value)}
                    error={errorMsg === 'username'}
                    helperText={errorMsg === "username" ? 'Username not found!' : ' '}
                    />
                <TextField className='login-field' id="password" label="Password" 
                    onChange= {e => setPassword(e.target.value)} type="password"
                    error={errorMsg === 'password'}
                    helperText={errorMsg === "password" ? 'Password incorrect!' : ' '}
                    />
                    <Button className='login-btn' type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
            </CardContent>
            <CardActions className='card-register'>
                <Link className="card-link" onClick={register}>Create an account</Link>
            </CardActions>
          </form>
        </Card>
      </div>
    )
    
}

export default LoginForm

