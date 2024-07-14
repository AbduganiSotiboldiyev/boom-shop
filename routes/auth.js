import {Router} from "express"
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

router.post("/login", (req,res)=> {
    res.redirect("/")
    console.log(req.body)
})
router.post("/register", async (req,res) =>{
    const {firstname,lastname,email,password}  = req.body
    const userDate = {
        firstName  : firstname,
        lastName : lastname,
        email : email,
        password : password
    }

    const user = await User.create(userDate)

    console.log(user)

	res.redirect('/')
})

export default router