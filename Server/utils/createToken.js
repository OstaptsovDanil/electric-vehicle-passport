import jwt from 'jsonwebtoken'
import config from "config"

export default (userId) => { 
    const newToken = jwt.sign(
        {
            _id: userId
        },
        config.get('tokenSecret'),
        {
            expiresIn: '30d'
        }
    )

    return newToken
}