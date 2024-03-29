const express = require("express")
const cors=require('cors')
const app = express();

app.use(express.json())
app.use(cors())
app.use('/auth', require("./routes/auth"))

app.use('/crud',require("./routes/crud"))

app.listen((5000), () => {
    console.log("Listening on port 5000")
})