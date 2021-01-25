const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if(!token)  return res.status(401).json({message: 'No auth token!'})
        const verified = jwt.verify(token, process.env.ACCESS_KEY_SECRET)
        if(!verified) return res.status(400).json({message: 'Verification failed!'})

        req.user = verified.id

    } catch (error) {
        res.status(500).json({message: error.message})
    }
    


}


module.exports = auth