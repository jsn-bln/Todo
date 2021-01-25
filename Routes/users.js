const express = require('express');
const router = express.Router();
const Users = require('../Models/users');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');


router.post('/register', (req, res) => {
    Users.findOne({username : req.body.username}, async (err, match) => {
        if(err) return res.status(500).json({message: err.message})
        if(match) {
            return res.status(400).json({message: 'username'})
        }
        if(!match){
            const hash = await brcypt.hash(req.body.password, 10)
            const newUser = new Users({
                username : req.body.username,
                password: hash
            })
            await newUser.save();
            res.status(201).json({message: 'account registered successfully!'})
        }
    })
})

router.get('/', auth, async (req,res) => {
    const user = await Users.findById(req.user)
    res.json(user)

})
router.post('/', (req,res) => {
    Users.findOne({username: req.body.username}, (err, account) => {
        if(err) return res.status(500).json(err.message)
        res.status(200).json({task: account.task})
    })
})

router.post('/login' ,(req, res) => {
    Users.findOne({ username : req.body.username}, async (err, account) => {
        if(err) return res.status(500).json({message: err.message})
        if(!account) {
            return res.status(400).json({message: "username"})
        }
        if(account){
            const isMatch = await brcypt.compare(req.body.password, account.password)
            if(!isMatch) {
                return res.status(400).send({message: "password"})
            }
            const token = jwt.sign({ id: account._id},process.env.ACCESS_KEY_SECRET)
            res.status(200).json({token, account: { username: account.username, task: account.task}})
        }
    })
})
router.patch('/task', (req,res) =>{
    if(req.body.action === 'addtask'){
        Users.findOneAndUpdate({ username : req.body.username}, {$addToSet:{task:{todo: req.body.todo}}},(err, account) => {
        if(err) return res.status(500).json({message: err.message})
        if(!account) return res.status(400).json({message: `account not found`})
        if(account){
            res.status(200).json({username : account.username})
        }
    })
    }else if(req.body.action === 'isdone'){
        Users.findOneAndUpdate({ "task._id" : req.body.id }, {$set :{"task.$.isDone": req.body.isDone}},
            { new: true },(err, account) => {
            if(err) return res.status(500).json({message: err.message})
            if(!account) return res.status(400).json({message: `account not found`})
            if(account){
                res.status(200).json({task : account.task})
                
            }
        })
    }else if(req.body.action === 'removetask'){
        Users.findOneAndUpdate({ username : req.body.username}, {$pull:{task:{_id: req.body.id}}},
            { new: true },(err, account) => {
            if(err) return res.status(500).json({message: err.message})
            if(!account) return res.status(400).json({message: `account not found`})
            if(account){
                res.status(200).json({task :account.task})
            }
        })
    }else if(req.body.action === 'edittodo'){
        Users.findOneAndUpdate({ "task._id" : req.body.id }, {$set :{"task.$.todo": req.body.todo}},
            { new: true },(err, account) => {
            if(err) return res.status(500).json({message: err.message})
            if(!account) return res.status(400).json({message: `account not found`})
            if(account){
                res.status(200).json({task : account.task})
                
            }
        })
    }
    
})

router.post('/isTokenValid', async (req, res) => {
    const token = req.header('x-auth-token') 
    if(!token) return res.json(false)
    const isValid = jwt.verify(token, process.env.ACCESS_KEY_SECRET)
    if(!isValid) return res.json(false)
    const user = await Users.findById(isValid.id)
    if(!user) return res.json(false)
    return res.json(true)
    

})


module.exports = router