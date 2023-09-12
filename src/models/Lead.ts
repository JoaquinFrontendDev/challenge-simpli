import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: String,
})

const Lead = mongoose.model('Lead', leadSchema)
export default Lead
