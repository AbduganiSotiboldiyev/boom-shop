import {Router} from "express"
import Products from "../models/products.js"

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

router.post("/add-products", async (req,res) =>{
    const {title,description,image,price} = req.body
    const products = await Products.create(req.body)
    console.log(products)
    res.redirect("/")
})

export default router