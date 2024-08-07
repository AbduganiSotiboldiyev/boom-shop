import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const accessToken = jwt.sign({userId} , process.env.JWT_SECRET, {expiresIn : "12d"})
    return accessToken
}

export default generateToken