import {Router} from "express"

const router = Router()

router.get("/", (req, res) =>{
    res.render("index",{
        title: "Abdu || APP"
    })

})

router.get("/products", (req,res) => {
    res.render("products",{
        title: "Abdu || Products",
        isProduct : true
    })
})

router.get("/add", (req,res) => {
    res.render("add",{
        title : "Abdu  || Add",
        isAdd : true
    })
})

router.post("/add-products", (req,res) =>{
    console.log(req.body)
    res.redirect("/")
})

export default router