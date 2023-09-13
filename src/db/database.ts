import mongoose from 'mongoose'

const connectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    return
  }

  const mongoUri = process.env.MONGO_URI

  try {
    await mongoose.connect(mongoUri!)
    if (process.env.NODE_ENV !== 'test') {
      console.log('MongoDB connected')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      throw error
    } else {
      throw new Error('An unexpected error occurred when connecting to MongoDB')
    }
  }
}

export default connectDB
