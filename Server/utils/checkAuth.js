import jwt from 'jsonwebtoken'
import config from 'config'

export default (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if(token) {
            try {
                const decoded = jwt.verify(token, config.get('tokenSecret'))
                req.userId = decoded._id
                next()
            } catch (err) {
                console.log(err)
                res.status(403).json({
                    message: 'Нет доступа. Возможно токен просрочен'
                })
            }
        } else {
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте позже...'
        })
    }
}