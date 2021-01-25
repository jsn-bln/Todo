const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        
        const token = req.header("x-auth-token")
        if(!token) return res.status(401).json({message: "no auth token"})
        const verified = jwt.verify(token, process.env.ACCESS_KEY_SECRET)
        if(!verified) return res.status(400).json({message: " token verification failed!"})
        
        res.user = verified

    } catch (error) {
        res.status(500).json({message: error.message})
    }


    next()
}