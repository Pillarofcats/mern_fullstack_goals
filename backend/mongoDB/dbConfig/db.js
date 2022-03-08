const mongoose = require('mongoose')

connectDB = async () => {
  //Returns a promise
  try {
    const initConnect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${initConnect.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB