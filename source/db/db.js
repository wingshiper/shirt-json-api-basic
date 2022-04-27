const mongoose = require('mongoose');

const dbConnect = async (req, res) => {
    try {
        await mongoose.connect('mongodb://localhost:27017/my_ojb');
        console.log("Connect succesfully")
    }catch(err) {
        console.log("Connect Failly")
    }
}


module.exports = dbConnect