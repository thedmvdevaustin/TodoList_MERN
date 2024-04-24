import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error('User already Exists')
    } else {
        const user = await User.create({name, email, password})
        if (user){
            generateToken(res, user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })
        } else{
            res.status(400)
            throw new Error("Invalid User data")
        }
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({email})
    if (!userExists){
        res.status(400)
        throw new Error("User does not exist")
    } else {
        if (await userExists.matchPassword(password)){
            generateToken(res, userExists._id)
            res.status(200).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email
            })
        } else {
            res.status(400)
            throw new Error("Invalid Password, Please try again!")
        }
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'User logged out'})
})




export {
    registerUser,
    loginUser,
    logoutUser
}