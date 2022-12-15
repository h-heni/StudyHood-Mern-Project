const jwt = require('jsonwebtoken'),
    secret = 'my new key right now.234';

    module.exports.secret = secret;
    module.exports.authenticate = (req , res , next)=>{

        console.log('The cookie is:',req.cookies)
        jwt.verify(req.cookies.userToken , secret , (err)=>{
            if(err){
                console.log("this is err:", err);
                res.status(401).json({verfied:false});
            }
            else {
                console.log('Success');
                next();
            }
        })
    }
