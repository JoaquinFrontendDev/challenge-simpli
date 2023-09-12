import mongoose from 'mongoose'

const connectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    return
  }

  const mongoUri = process.env.MONGO_URI
  try {
    await mongoose.connect(mongoUri!)
    console.log('MongoDB connected')
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      throw error
    }
    process.exit(1)
  }
}

export default connectDB
