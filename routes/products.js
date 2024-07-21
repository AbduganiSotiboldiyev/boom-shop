import {Router} from "express"
import Products from "../models/products.js"
import authMiddleware from "../middleware/authMiddleware.js"
import userMiddleware from "../middleware/userMiddleware.js"

const router = Router()

router.get("/",  async (req, res) =>{
    const products = await Products.find().lean()
    
    res.render("index",{
        title: "Abdu || APP",
        products : products
    })

})

router.get("/products", (req,res) => {
    res.render("products",{
        title: "Abdu || Products",
        isProduct : true
    })
})

router.get("/add", authMiddleware,(req,res) => {
  
    res.render("add",{
        title : "Abdu  || Add",
        isAdd : true,
        errorAddingProduct : req.flash("errorAddingProduct")
    })
})

router.post("/add-products", userMiddleware,async (req,res) =>{
    const {title,description,image,price} = req.body
    if(!title, !description,!image,!price) {
        req.flash("errorAddingProduct", "All fields are required")
        res.redirect("/add")
        return
    }
 
    await Products.create({...req.body, user : req.userId})
    res.redirect("/")
})

export default router