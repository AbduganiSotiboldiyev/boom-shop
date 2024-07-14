import express from "express"
import { create } from "express-handlebars"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import flash from "express-flash"
import session from "express-session"
import AuhtRouter from "./routes/auth.js"
import ProductsRouter from "./routes/products.js"

dotenv.config()
const app = express()

const hbs = create({defaultLayout:"main", extname:"hbs"})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))
app.use(express.json())
app.use(session({secret :"Abdu", resave : false,saveUninitialized:false}))
app.use(flash())
app.use(AuhtRouter)
app.use(ProductsRouter)


const startApp = async () => {
    try {
        const options = {
          socketTimeoutMS: 5000 // Set a 5-second timeout
        };
        
       await mongoose.connect(process.env.MONGO_URI, options)
          console.log("MongoDB was connected")
        
        const PORT = process.env.PORT || 5100
        app.listen(5100, () => console.log(`Server is working on PORT : ${PORT}`))
        
    } catch (error) {
        console.log(error.message)
    }
}

startApp()
