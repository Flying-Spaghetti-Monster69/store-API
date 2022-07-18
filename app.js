require('dotenv').config();

// async error handling

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware

app.use(express.json());

// routes
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to the Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`listening on port ${port}!`))
    } catch (error) {
        console.log(error)
    }
}

start()