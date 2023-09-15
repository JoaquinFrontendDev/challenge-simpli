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

const Bike = mongoose.models.Bike || mongoose.model('Bike', productSchema)

const Accessory =
  mongoose.models.Accessory || mongoose.model('Accessory', productSchema)

export { Bike, Accessory, Product }
