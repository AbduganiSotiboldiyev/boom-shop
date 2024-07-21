import User from "../models/user.js  "
import jwt from "jsonwebtoken"
export default async function(req, res,next) {
    if(!req.cookies.token) {
        // res.redirect("/login")
        next()
        return
    }

    const token = req.cookies.token
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)
    req.userId = user._id
    next() 
 }