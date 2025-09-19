const jwt = require("jsonwebtoken");


module.exports = function (role) {
    return function(req, res, next){
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: 'No authorised'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            if (decoded.id.role !== role) {
                return res.status(403).message({message: 'No access'})
            }
            next()
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}
