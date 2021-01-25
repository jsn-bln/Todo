import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/userContext'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import './nav.css'
import { Typography } from '@material-ui/core'


const Nav = () =>{
    const { userData, setUserData} = useContext(UserContext)
    const history = useHistory();

    const login = () => history.push('/login')
    const register = () => history.push('/register')
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', "")
        history.push('/')
        
    }
    return(
        <AppBar className="appbar" position="static">
            <Toolbar className="nav">      
                {
                    userData.user === undefined ? 
                    <>
                    <Link className="nav-brand" href='/' variant="h5">Todododo List!</Link>
                    <div className="nav-items">
                        <Link className="nav-link">
                            <Button onClick={login} className="nav-btn" color="inherit">Login</Button>
                            </Link>
                        <Link className="nav-link">
                            <Button onClick={register} className="nav-btn" color="inherit">Register</Button>
                        </Link>
                    </div>
                    </>
                    :
                    <>
                    <Typography className="nav-brand" variant="h5">Todododo List!</Typography>
                    <Link className="nav-link">
                        <Button onClick={logout} className="nav-btn" color="inherit">Logout</Button>
                    </Link>
                    </>
                    
                }
            </Toolbar>
        </AppBar>
    )
}

export default Nav;