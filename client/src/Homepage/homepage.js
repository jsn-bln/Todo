import React,{useContext, useState} from 'react'
import  UserContext from '../context/userContext'
import axios from 'axios';
import Todo from '../todos/todo'
import './homepage.css'
import {ButtonGroup, Button, TextField, Card} from '@material-ui/core'




const Homepage = (props) =>{
    const{userData, setUserData} = useContext(UserContext)  
    const [todo, setTodo] = useState('');
  
    const todolist = () => {
        let todolist_items = []
        for(let i = 0; i< userData.user.task.length; i++){
            todolist_items.push(
            <Todo 
                key={userData.user.task[i]._id}
                data={userData.user.task[i].todo}
                isDone={userData.user.task[i].isDone}
                id={userData.user.task[i]._id}
                username={userData.user.username}
            />
            )
        }
        return todolist_items
    }

    
    const addTask = () => {
        if(todo === "") return console.log("error")
        axios({
            method: 'PATCH',
            headers:{
            'Content-Type': 'application/json'
            },
            data: {
                username: userData.user.username,
                todo: todo,
                action: 'addtask'
            },
            withCredentials: true,
            url: "/users/task"
        }).then( res => {
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: res.data.username
                },
                url: "/users"
            }).then(res => {
                setUserData({
                    token: userData.token,
                    user:{
                        username: userData.user.username,
                        task: res.data.task
                    }
                })
                
            }).catch(err => console.log(err.response.data))
        })
        .catch(err => console.log(err))
        
    }
    
    
    return(
        <div className="homepage-container">
            {userData.user? 
            <Card className='card-container' elevation={5}>
                <div className="homepage-sub">
                    <h1>{userData.user.username}'s list of tasks</h1>
                    <ButtonGroup className='addtask-group'>
                        <TextField onChange={e => setTodo(e.target.value)} className='add-textfield' label="Add Task" />
                        <Button onClick={addTask} className='add-btn'>Add</Button>
                    </ButtonGroup>
                <div className="todo-container">
                    {todolist()}
                </div>
                </div>
            </Card>
            :
            <div className="homepage-info">
                <h1 className="home-text-brand"><strong className="brand">Todododo List!</strong></h1>
                <h2 className="home-text-info">Manage your task easily</h2>
                <Button className="cta-btn" href='/register'> Register now for free</Button>
            </div>
            }
        </div>
    )

}
export default Homepage