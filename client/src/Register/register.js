import React,{useState, useContext} from 'react'
import axios from 'axios'
import UserContext from '../context/userContext'
import {useHistory} from 'react-router-dom'
import {TextField, Card, Button, CardContent, CardActions, Typography, Link} from '@material-ui/core'
import './register.css'

const RegisterForm = (e) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errorMsg, setErrMsg] = useState('')
  const history = useHistory()
  const {setUserData} = useContext(UserContext)
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios({
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        data:{
            username: username,
            password: password
        },
        withCredentials: true,
        url: "/users/register"
        
    }).then( async (res) => {
        console.log(res)
        const loginRes = await axios.post('/users/login',{
          username: username,
          password: password
        })
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.account
        })
        localStorage.setItem('auth-token',loginRes.data.token)
        history.push('/')
      }).catch(err => setErrMsg(err.response.data.message))
  }

  return(
    <div className="register-container">
      <Card className='card' elevation={5}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <CardContent>
            <Typography variant='h5'>Sign up</Typography>
              <div className='card-actions'>
                <TextField className='register-field' id="username" label="Username" 
                    onChange= {e => setUsername(e.target.value)}
                    error={errorMsg === "username"}
                    helperText={errorMsg === "username" ? 'Username already exist!' : ' '}
                    />
                <TextField className='register-field' id="password" label="Password" 
                    onChange= {e => setPassword(e.target.value)} type="password"
                    />
                  <Button className='register-btn' type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
            </CardContent>
          </form>
        </Card>
    </div>
  )
}



    

export default RegisterForm