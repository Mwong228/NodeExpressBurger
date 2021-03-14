const express = require('express')
const app = express()
const db = require( './app/connection' )('burgers','pass1234')
const exphbs = require('express-handlebars')


const PORT = process.env.PORT || 3000 

app.use(express.static('pulic'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.listen(PORT, function(){
    console.log(`Serving burgers on PORT ${PORT}`)
})