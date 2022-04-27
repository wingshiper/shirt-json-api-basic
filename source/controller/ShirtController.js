const Shirts = require('../models/shirt')
const {StatusCodes} = require('http-status-codes')
const {
    NotFoundError,
    BadRequestError
} = require('../error/index')
const query = require('express/lib/middleware/query')
const getAll = async function(req, res){
    const {brand,size,name,_sort,fields,numericFilter} = req.query
    const queryObject = {}
   
    if (brand){
        queryObject.brand = brand
    }

    if (size) {
        queryObject.size = size
    }

    if (name) {
        queryObject.name =  { $regex: name, $options: 'i' };
    }
   

    if ( numericFilter ) {
        const oparatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        // console.log(oparatorMap)
        const regEx = /<=|>=|=|>|</g
        let filter = await numericFilter.replace(regEx,(match) => {
             return `${oparatorMap[match]}`
             
        })
        const options = ['rating','price']
        filter = filter.split(",").forEach ( item => {
            const [fields,operator,value] = item.split(' ')
            if (options.includes(fields)) {
                queryObject[fields] = { [operator]: Number(value) };
            }
        })
    }

    let result = Shirts.find(queryObject)
    if (_sort){
        const sortList = _sort.split(',').join(' ')
        result = result.sort(sortList);
    }else {
        result = result.sort('createAt')
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);

      }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
   
    const skip = (page-1) * limit


    result = result.skip(skip).limit(limit)
    const Shirt = await result
    
    res.status(StatusCodes.OK).json({Shirt,total: Shirt.length})
} 



// GET ONE
const getOne = async function(req, res){
    const {
        params: {id: id},
        user : {userId: userId}
    } = req
    const Shirt = await Shirts.findOne(
        {
            createBy: userId
            ,_id:id
        }
    )
    if (!Shirt) {
        throw new NotFoundError(`Do not find shirt id : ${id} `)
    }
    res.status(StatusCodes.OK).json(Shirt)
} 
// CREATE
const create = async function(req, res){
    req.body.createBy = req.user.userId
    const Shirt = await Shirts.create({...req.body})
    res.status(StatusCodes.OK).json(Shirt)
} 
const update = async function(req, res){
    const {
        body : {price,name},
        params: {id: id},
        user : {userId: userId}
    } = req
    
    if (!price === '' || !name === '') {
        throw new BadRequestError('Name and price is not empty') 
    }

    const Shirt = await Shirts.findOneAndUpdate({
        userId : userId,
        _id : id
    },{
        price : price,
        name : name
    })

    res.status(StatusCodes.OK).json(Shirt)


} 
// DELETE
const deleteShirt = async function(req, res){
    const {
        params: {id: id},
        user : {userId: userId}
    } = req
    const Shirt = await Shirts.deleteOne(
        {
            createBy: userId
            ,_id:id
        }
    )

    res.status(StatusCodes.OK).json({msg: 'SUCCESS'})
} 

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteShirt
}