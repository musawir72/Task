import asyncHandler from 'express-async-handler'
import generateToken from '../utills/generateToken.js'
import User from '../models/user.js'
import {transport} from '../utills/nodemailer.js'
import bcrypt from 'bcryptjs'
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await  bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body
  const random_psswrd = Math.random().toString(36).slice(-8);
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const salt = await bcrypt.genSalt(10)
  let password = await bcrypt.hash(random_psswrd, salt)
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    const email = {
        from: 'Musawir Hussain',
        to: user.email,
        subject: 'Registration Successfull',
        text: `Thanks for registraioin please used the below credential for sign in/n
        username:${user.email}/n
        password:${random_psswrd}`
    };
    transport.sendMail(email, function(error, success){
        if (error) {
            res.status(400)
            throw new Error('Registration failed plesase try again')
        } else {
            res.status(201).json({
                data:"Please check your email"
              })
        }
    });
   
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export {
  authUser,
  registerUser,
}