import {Router} from "express"
import Products from "../models/products.js"
import authMiddleware from "../middleware/authMiddleware.js"
import userMiddleware from "../middleware/userMiddleware.js"

const router = Router()

router.get("/",  async (req, res) =>{
    const products = await Products.find().lean()
    
    res.render("index",{
        title: "Abdu || APP",
        products : products.reverse(),
        userId : req.userId? req.userId.toString() : null
    })

})

router.get("/products", async (req,res) => {
    const user = req.userId ? req.userId.toString() : null
    const myProducts = await Products.find({user}).populate("user").lean()
    
    res.render("products",{
        title: "Abdu || Products",
        isProduct : true,
        myProducts : myProducts,
        userId : user
    })
})

router.get("/product/:id", async (req,res) => {
    const id = req.params.id
    const product = await Products.findById(id).populate("user").lean()
    
    res.render("product",{
        title: `Abdu || ${product.title}`,
        product : product,
    })
    
})

// add product
router.get("/add", authMiddleware,(req,res) => {
    
    res.render("add",{
        title : "Abdu  || Add",
        isAdd : true,
        errorAddingProduct : req.flash("errorAddingProduct")
    })
})

router.post("/add-products", userMiddleware,async (req,res) =>{
    const {title,description,image,price} = req.body
    if(!title || !description || !image || !price) {
        req.flash("errorAddingProduct", "All fields are required")
        res.redirect("/add")
        return
    }
    
    await Products.create({...req.body, user : req.userId})
    res.redirect("/")
})

// edit product
router.get("/product-edit/:id", async (req,res) =>{
    
    const id = req.params.id
    const productEdit  = await Products.findById(id).populate("user").lean()

    res.render("product-edit", {
        title: `Abdu || ${productEdit.title}`,
        productEdit : productEdit,
        updateError: req.flash("updateError")
    })
    
})

router.post("/product-edit/:id", async (req,res)=> {
    const {title,description,image,price} = req.body
    const id = req.params.id
    if(!title || !description || !image || !price) {
        req.flash("updateError", "All fields are required")
        res.redirect(`/product-edit/${id}`)
        return
    }
    await Products.findByIdAndUpdate(id, {...req.body}, {new : true})
   res.redirect("/products")
})

router.post("/delete-post/:id", async (req,res) => {
    const id = req.params.id
    await Products.findByIdAndDelete(id)
    res.redirect("/")
})

export default router