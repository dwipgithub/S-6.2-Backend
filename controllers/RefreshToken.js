import { users } from "../models/UserModel.js";
import jsonWebToken from 'jsonwebtoken'

export const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshTokenV2
    if(!refreshToken) {
        res.status(403).json({
            status: false,
            message: 'Unauthorized'
        })
        return
    }
    users.findAll({
        attributes: ['id','nama','email', 'rs_id', 'jenis_user_id'],
        where: {
            refresh_token: refreshToken
        }
    })
    .then((results) => {
        if(!results[0]) {
            res.status(403).json({
                status: false,
                message: 'Unauthorized'
            })
            return
        }
        
        const payloadObject = {
            id: results[0].id,
            nama: results[0].nama,
            email: results[0].email,
            rsId: results[0].rs_id,
            jenisUserId: results[0].jenis_user_id,
            jenis_user_id: results[0].jenis_user_id
        }
        
        // console.log(payloadObject)

        jsonWebToken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, jwtRes) => {
            if (err) return res.sendStatus(403)
            // const payloadObject = {
            //     id: jwtRes.id,
            //     jenis_user_id: jwtRes.jenis_user_id,
            //     nama: jwtRes.nama,
            //     email: jwtRes.email,
            //     rsId: jwtRes.rsId,
            //     jenisUserId: jwtRes.jenisUserId
            // }
            const accessToken = jsonWebToken.sign(payloadObject, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN})
            res.json({ accessToken })
        })
    })
    .catch((err) => {
        res.status(404).send({
            status: false,
            message: err
        })
        return
    })
}