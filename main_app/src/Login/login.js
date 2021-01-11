import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios'

const LoginForm = (props) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

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
        console.log(res))
      .catch(err => console.log(err))
  }
    
  
    return(
        <Form onSubmit={handleSubmit}>
        <h2> Login</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  value={password}
              onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
          <div className='btns'>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Link className='register-link' to='/register'>Register</Link>
          </div>
        </Form>
    )
    
}

export default LoginForm

