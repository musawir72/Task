import asyncHandler from 'express-async-handler'
import Car from '../models/car.js'

// @desc    Fetch all cars
// @route   GET /api/cars
// @access  Private
const getCars = asyncHandler(async (req, res) => { 
  const cars = await Car.find()
  res.json({ cars })
})



// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id)

  if (car) {
    await Car.findByIdAndDelete(req.params.id)
    res.json({ message: 'Car removed' })
  } else {
    res.status(404)
    throw new Error('Car not found')
  }
})

// @desc    Create a car
// @route   POST /api/cars
// @access  Private
const createCar = asyncHandler(async (req, res) => {
    const {
      category,
        year,
        model,
        color,
        price
      } = req.body

  const car = new Car({
    category,
    year,
    model,
    color,
    price
  })

  const createdCar = await car.save()
  res.status(201).json(createdCar)
})

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private
const updateCar = asyncHandler(async (req, res) => {
  const {
    category,
      year,
      model,
      color,
      price
    } = req.body

  const car = await Car.findById(req.params.id)

  if (car) {
    car.category = category
    car.year = year
    car.model = model
    car.color = color
    car.price = price
    

    const updatedProduct = await car.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})




export {
createCar,
updateCar,
deleteCar,
getCars
}
