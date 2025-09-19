const apiError = require('../error/apiErrors')

module.exports = function (err, req, res, next){
    if(err instanceof apiError){
        return res.status(err.status).json({message: err.message})
    }
}