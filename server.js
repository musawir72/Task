import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/error.js'
import connectDB from './config/db.js'

import carRoutes from './routes/car.js'
import userRoutes from './routes/user.js'


dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api/cars', carRoutes)
app.use('/api/users', userRoutes)
app.get('/',(req,res) => {
  res.send('dd')
})
//app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)