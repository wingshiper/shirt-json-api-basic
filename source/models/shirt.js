const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShirtSchema = new Schema ({
    name: {
        type: String,
        required: [true,'please provide name of product'],
    },

    price: {
        type: Number,
        required: [true,'please provide price of product'],
        strim: true

    },

    rating: {
        type: Number,
        default: 4,
    },

    size : {
        type: String,
        enum: ['S','M','L','XL','XXL','XXXL'],
        default: 'L'
    },
    brand: {
        type: String,
        enum: ['Owen','Veneta','Grimm DC'],
        strim: false
    },

    createBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
},   
{timestamps: true}
)


module.exports = mongoose.model('ShirtSchema',ShirtSchema)