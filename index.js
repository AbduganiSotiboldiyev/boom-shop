import express from "express"
import path ,{dirname} from "path"
import { fileURLToPath } from "url"
import { engine } from "express-handlebars"

const app = express()
const __file = fileURLToPath(import.meta.url)
const __dirname = dirname(__file)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get("/", (req, res) =>{
    res.render("index")
    // res.sendFile(path.join(__dirname, "templates" , "index.html"))
    // res.send("Main page")
})

app.get("/about", (req, res) =>{

    res.render("about")

    // res.sendFile(path.join(__dirname, "templates" , "about.html"))
})

const PORT = process.env.PORT || 5100
app.listen(5100, () => console.log(`Server is working on PORT : ${PORT}`))