import {Router} from "express"
import bcrypt from "bcrypt"
import User from "../models/user.js  "
import flash from "express-flash"

const router = Router()

router.get("/login", (req,res) => {
    res.render("login",{
        title:"Abdu || Login",
        isLogin : true,
        loginError : req.flash("loginError")
    })
})

router.get("/register", (req,res) => {
    res.render("register", {
        title:"Abdu || Register",
        isRegister : true,
        registerError : req.flash("registerError")
    })
})

router.post("/login", async (req,res)=> {
    const {email,password} = req.body
    if(!email || !password) {
        req.flash("loginError", "All fields are required")
        res.redirect("/login")
        return
    }


    const existUser = await User.findOne({email})
    if(!existUser) {
        req.flash("loginError", "Email is not found")
        res.redirect("/login")
        return
    }
    
    const existPassword = await bcrypt.compare(password, existUser.password)
    if(!existPassword) {
        req.flash("loginError", "Password is not correct")
        res.redirect("/login")
        return
    }

    console.log(existUser)
    res.redirect("/")
    
})
router.post("/register", async (req,res) =>{
    const {firstname,lastname,email,password}  = req.body
    if(!firstname || !lastname || !email || !password) {
        req.flash("registerError", "All fields are required")
        res.redirect("/register")
        return
    }

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