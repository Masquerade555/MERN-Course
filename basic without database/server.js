const express = require('express')
const app = express()
const path = require('path')
const port = process.env.port || 3000

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./basic-app/routes/root'))

app.all('*', (req,res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } 
    else if (req.accepts('json'))
    {
        res.json({message: '404 Page Not Found'})
    }
    else {
        res.type('txt').send('404 Page Not Found')
    }
})

app.listen(port, ()=> console.log('Server is running on port ${port}'))