import express from "express"
import { create } from "express-handlebars"
import AuhtRouter from "./routes/auth.js"
import ProductsRouter from "./routes/products.js"


const app = express()

const hbs = create({defaultLayout:"main", extname:"hbs"})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')


app.use(AuhtRouter)
app.use(ProductsRouter)




const PORT = process.env.PORT || 5100
app.listen(5100, () => console.log(`Server is working on PORT : ${PORT}`))