function validateUserAuth(req, res, next){
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data: {},
            success: false,
            err: 'Email or Password is missing in Auth Process',
            message: 'Something went wrong'
        })
    }
    next();
}

function checkPasswordlen(req, res, next){
    if(req.body.password.length < 3){
        return res.status(400).json({
            data: {},
            success: false,
            err: 'Password should of atleast 3 character',
            message: 'Something went wrong'
        })
    }
    next();
}



module.exports = {
    validateUserAuth,
    checkPasswordlen
}