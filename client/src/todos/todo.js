import {useState, useContext} from 'react'
import {IconButton,TextField,Button,ButtonGroup, Typography, Checkbox ,Dialog,DialogTitle,DialogActions, DialogContent} from '@material-ui/core'
import './todo.css'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import axios from 'axios'
import UserData from '../context/userContext'


const Todo = (props) => {
    const [checked, setChecked] = useState(props.isDone)
    const {userData, setUserData} = useContext(UserData)
    const [todo, setTodo] = useState('');
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleDelete = () => {
        axios({
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                username: props.username,
                id: props.id,
                action: 'removetask'
            },
            url: '/users/task'
        }).then(res => {
            setUserData({
                token: userData.token,
                user: {
                    username: userData.user.username,
                    task: res.data.task
                }
            })
            
        }).catch(err => console.log(err.response.data.message))
    }

    const handleCheckBox = () => {
        axios({
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                id: props.id,
                isDone: !props.isDone,
                action: 'isdone'
            },
            url: '/users/task'
        }).then(res => {
            setUserData({
                token: userData.token,
                user: {
                    username: userData.user.username,
                    task: res.data.task
                }
            })
            console.log(userData)
        }).catch(err => console.log(err.response.data.message))
        
    }
    
    const handleEdit = () => {
        axios({
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            data: {
                id: props.id,
                todo: todo,
                action: 'edittodo'
            },
            url: '/users/task'
        }).then(res => {
            setUserData({
                token: userData.token,
                user: {
                    username: userData.user.username,
                    task: res.data.task
                }
            })
            console.log(userData)
        }).catch(err => console.log(err.response.data.message))
        handleClose()
    }
    
    return(
        <div>
        <ButtonGroup className='btn-group'>
            <Checkbox className='checkbox' icon={<CheckCircleOutlineIcon />} checkedIcon={<CheckCircleIcon />} 
                name="checked" checked={props.isDone} onClick={handleCheckBox}/>
            {props.isDone?
                <>
                    <Typography className='todo-text completed'>{props.data}</Typography>
                    <IconButton disabled onClick={handleClickOpen} className='todo-btn'>{<EditIcon/>}</IconButton>
                </>
                :
                <>
                    <Typography className='todo-text'>{props.data}</Typography>
                    <IconButton onClick={handleClickOpen} className='todo-btn'>{<EditIcon/>}</IconButton>
                </>
            }
            <IconButton onClick={handleDelete} className='todo-btn'>{<DeleteIcon/>}</IconButton>
        </ButtonGroup>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Enter task"
            type="text"
            fullWidth
            onChange={e => setTodo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </div>
        
    )
}


export default Todo
