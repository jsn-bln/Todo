const express = require('express');
const router = express.Router();
const Users = require('../Models/users');
const brcypt = require('bcrypt');

router.post('/register', (req, res) => {
    Users.findOne({username : req.body.username}, async (err, match) => {
        if(err) return res.status(500).json({message: err.message})
        if(match) {
            console.log("username already exist!")
            return res.status(400).json({message: `username ${req.body.username} already exist`})
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
router.get('/', (req,res) => {
    Users.find()
    .then(todo => res.json(todo))
    .catch(error => res.status(400).json('error'+error))

})

router.post('/login' ,(req, res) => {
    Users.findOne({ username : req.body.username}, async (err, account) => {
        if(err) return res.status(500).json({message: err.message})
        if(!account) {
            console.log('username not found')
            return res.status(400).json({message: ` username ${req.body.username} is not found!`})
        }
        if(account){
            const isMatch = await brcypt.compare(req.body.password, account.password)
            if(!isMatch) {
                console.log('password incorrect!')
                return res.status(400).json({message: ` password is incorrect!`})
            }
            res.status(200).json({message: `welcome ${account.username}!`})
        }
        console.log(res)
    })
})
router.patch('/task/:id', (req,res) =>{
    Users.findOneAndUpdate({_id : req.params.id}, {$addToSet:{task:{todo: req.body.todo}}},(err, account) => {
        if(err) return res.status(500).json({message: err.message})
        if(!account) return res.status(400).json({message: `account not found`})
        if(account){
            res.status(200).json({message: `added task successfully`})
        }
    })
})

module.exports = router