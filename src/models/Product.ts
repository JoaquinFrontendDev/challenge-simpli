import { bool } from 'joi'
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    isMultiple: { type: Boolean },
  },
  { versionKey: false, timestamps: true },
)

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default Product
