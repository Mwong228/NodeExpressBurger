const express = require('express')
const app = express()
const db = require( './app/connection' )('burgers','pass1234')
const exphbs = require('express-handlebars')



const PORT = process.env.PORT || 3000 

app.engine('handlebars', exphbs ({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//routes

app.get('/', async function(req, res){
    const burgerList = await db.query('SELECT * FROM burger')
    res.render('index', {data: burgerList})
})

app.post('/', async function(req,res){
    console.log(`${req.body.userBurger}`)
    await db.query('INSERT INTO burger (name) VALUE (?)', [req.body.userBurger])
    console.log('Inserted')
    res.redirect('/')
})

app.post('/burger/:id', async function(req,res){
    await db.query(`UPDATE burger SET devoured=true WHERE id=${req.params.id}`)
    console.log('Devoured')
    res.redirect('/')
})

app.delete('/burger/:id', async function(req, res){
    await db.query(`DELETE FROM burger WHERE id=${req.params.id}`)
    console.log(`Deleted`)
    res.redirect('/')
})

app.listen(PORT, function(){
    console.log(`Serving burgers on PORT ${PORT}`)
})