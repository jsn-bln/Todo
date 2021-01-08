const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    todo: String,
    isDone : {
        type: Boolean,
        default: false,
    },
    Date: {
        type: Date,
        default:Date.now()
    }

})

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    task: [taskSchema]
})


module.exports = mongoose.model('users', userSchema);