//Imports
const express = require('express');
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')

//Import custom middleware
const  { errorHandler } = require('./middlware/errorMiddlware.js')
//Import mongoDB connection
const connectDB = require('./mongoDB/dbConfig/db.js')

//Run mongoDB connection
connectDB()

//Create express app
const app = express()

//Express Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/goals', require('./routes/goalRoutes.js'))
app.use('/api/users', require('./routes/userRoutes.js'))

//Production check, server frontend static assets
if(process.env.NODE_ENV === 'production') {
  //Build folder with front end static assets
  app.use(express.static(path.join(__dirname, "../frontend/build")))
  //Serve html file in frontend
  app.get('*', (req,res) => {
    res.sendFile((
      //__dirname -> '../' -> frontend -> build -> html
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    ))
  })
} else {
  app.get('/', (req,res) => res.send('set process.env.NODE_ENV = production'))
}

//Custom Middleware [You define error-handling middleware last, after other app.use() and routes calls]
app.use(errorHandler)

//App listening
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})