import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    category : {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    model: {
        type: String,
        required: true,
      },
    color: {
      type: String,
      required: true,
    },
    price: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
)




const Car = mongoose.model('Car', userSchema)

export default Car