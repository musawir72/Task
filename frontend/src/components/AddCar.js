import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Spinner'
import FormContainer from '../components/FormContainer'
import { createCAR } from '../actions/carAction'
import {CAR_CREATE_RESET} from '../constants/carConstants'

const AddCar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [category, setCategory] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [year, SetYear] = useState(0)
  const [price, setPrice] = useState('')
  
  //selectors
  const carCreate = useSelector((state) => state.carCreate)
  const {
    loading,
    error,
    success,
    car,
  } = carCreate
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo } = userLogin

  useEffect(() => {
    if(!userInfo){
      navigate('/')
  }
    dispatch({ type: CAR_CREATE_RESET })
    if (success) {
        setCategory('')
        setPrice('')
        setModel('')
        SetYear(0)
        setColor('')
      navigate('/dashboard')
    }
  }, [success])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
        createCAR({
       category,
       model,
       year,
       color,
       price
      })
    )
  }

  return (
    <>
      <Link to='/dashboard' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>
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
              Save
            </Button>
          </Form>
        
      </FormContainer>
    </>
  )
}

export default AddCar