import express from 'express'
const router = express.Router()
import {
  getCars,createCar,updateCar,deleteCar
} from '../controllers/car.js'
import { protect } from '../middleware/auth.js'

router.route('/').get(protect,getCars).post(protect,createCar)
router
  .route('/:id')
  .delete(protect,deleteCar)
  .put(protect,updateCar)

export default router