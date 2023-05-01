import axios from 'axios'
import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_DELETE_REQUEST,
  CAR_DELETE_SUCCESS,
  CAR_DELETE_FAIL,
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAIL,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
  CAR_UPDATE_FAIL,
} from '../constants/carConstants'
import { logout } from './userAction'

export const listCARs = () => async (
  dispatch,getState
) => {
  try {
    dispatch({ type: CAR_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/cars`,config
    )

    dispatch({
      type: CAR_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CAR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const deleteCAR = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAR_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cars/${id}`,config)

    dispatch({
      type: CAR_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CAR_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createCAR = (car) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAR_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/cars`, car,config)

    dispatch({
      type: CAR_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CAR_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateCAR = (car) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAR_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/cars/${car.id}`,
      car,
      config
    )

    dispatch({
      type: CAR_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CAR_UPDATE_FAIL,
      payload: message,
    })
  }
}
