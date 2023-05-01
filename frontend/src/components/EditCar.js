import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Spinner'
import FormContainer from '../components/FormContainer'
import { updateCAR } from '../actions/carAction'
import {CAR_UPDATE_RESET} from '../constants/carConstants'

const EditCar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {state} = useLocation();

  //state
  const [category, setCategory] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [year, SetYear] = useState(0)
  const [price, setPrice] = useState('')
 
  //selectors
  const carUpdate = useSelector((state) => state.carUpdate)
  const {
    loading,
    error,
    success,
    car,
  } = carUpdate
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo } = userLogin
  useEffect(() => {
    if(!userInfo){
        navigate('/')
    }
    if (success) {
        dispatch({ type: CAR_UPDATE_RESET })
        navigate('/dashboard')
      } else {
        debugger
          setColor(state.color)
          setPrice(state.price)
          setModel(state.model)
          setCategory(state.category)
          SetYear(state.year)
        }
      
  }, [dispatch,success])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
        updateCAR({
       category,
       model,
       year,
       color,
       price,
       id:state._id
      })
    )
  }

  return (
    <>
      <Link to='/dashboard' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
          <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicSelect">
          <Form.Label>Select Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          >
             <option >select category</option>
               <option value="Toyota">Toyota</option>
                <option value="Suzuki">Suzuki</option>
                <option value="BMW">BMW</option>
                <option value="Jeep">Jeep</option>
           </Form.Select>
          </Form.Group>
      

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Model</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter model'
                value={model}
                onChange={(e) => setModel(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter year'
                value={year}
                onChange={(e) => SetYear(e.target.value)}
              ></Form.Control>
            </Form.Group>

            

            <Form.Group controlId='description'>
              <Form.Label>color</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        
      </FormContainer>
    </>
  )
}

export default EditCar