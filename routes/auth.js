import {Router} from "express"

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
router.post("/register", (req,res) =>{
    res.redirect("/")
    console.log(req.body)
})

export default router