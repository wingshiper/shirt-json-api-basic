const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true,'Please provide a name'],
        maxlength: 50,
        minlength: 3,
    },

    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: 3,
    },

    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide your email'
        ],
        required: [true,'Please provide your email address'],
        unique: true
    }
})

UserSchema.pre('save', function() {
    const salt =  bcrypt.genSaltSync(10)
    this.password =   bcrypt.hashSync(this.password, salt);
})


UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, userName: this.name},'secret',{expiresIn: '30d'});
}

UserSchema.methods.comparePassword = function(hash) {
    const isMatch = bcrypt.compareSync(hash, this.password)
    return isMatch
}
module.exports = mongoose.model('UserSchema',UserSchema )