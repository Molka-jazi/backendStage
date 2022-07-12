const express = require("express")

const app = express();


app.use(express.json())

app.use('/auth', require("./routes/auth"))

app.use('/crud',require("./routes/crud")) 


app.listen((5000), () => {
    console.log("Listening on port 5000")
})