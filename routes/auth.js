import {Router} from "express"
import User from "../models/User.js"

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

    const user = new User.create(req.body)
    try {
    await user.save()
    response.send(user);
  } catch (error) {
    response.status(500).send(error);
  }
    console.log(user)
    res.redirect("/")
})

export default router