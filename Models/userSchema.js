// 1)import mongoose 
const mongoose = require('mongoose');

// 2 create schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require:true,
    },
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    profile: {
        type: String,
    },
})
// 3) create Model
// mongoose.model() method is used to create model it access two arguments
// 1) name of the collectons that needsto map with this model
// 2) the schema is created 
const users = mongoose.model("users", userSchema)
// 4) Export the model

module.exports = users;