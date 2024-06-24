import express from "express"

const app = express()
const PORT = process.env.PORT || 5100
app.listen(5100, () => console.log(`Server is working on PORT : ${PORT}`))