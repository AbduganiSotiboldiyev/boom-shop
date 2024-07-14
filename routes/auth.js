import {Router} from "express"
import bcrypt from "bcrypt"
import User from "../models/user.js  "

const router = Router()

router.get("/login", (req,res) => {
    res.render("login",{
        title:"Abdu || Login",
        isLogin : true
    })
})

router.get("/register", (req,res) => {
    res.render("register", {
        title:"Abdu || Register",
        isRegister : true
    })
})

router.post("/login", async (req,res)=> {
   
    const existUser = await User.findOne({email : req.body.email})
    
    if(!existUser) {
        console.log("User not founnd")
        return
    }
    
    const existPassword = await bcrypt.compare(req.body.password, existUser.password)
    if(!existPassword) {
        console.log("Password not match")
        return
    }

    console.log(existUser)
    res.redirect("/")
    
})
router.post("/register", async (req,res) =>{
    const {firstname,lastname,email,password}  = req.body
    const hashedPassword = await bcrypt.hash(password,8)
    const userDate = {
        firstName  : firstname,
        lastName : lastname,
        email : email,
        password : hashedPassword
    }

    const user = await User.create(userDate)

    console.log(user)

	res.redirect('/')
})

export default router