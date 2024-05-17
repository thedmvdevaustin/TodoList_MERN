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
    // logic for this is to create a new http only cookie and make it expire immediately
    res.cookie('jwt', process.env.JWT_SECRET, {
        httpOnly: true,
        expires: new Date(0), // makes it expire immediately
    })
    res.status(200).json({message: 'User logged out'})
})

//Add a update profile function that allows the user to update their login information
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user){
        res.status(404).json({message: "User not found"})
    } else {
        const { name, email, password } = req.body
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            user.password = password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            email: updatedUser.email,
            name: updatedUser.name,
            _id: updatedUser._id
        })
    }

    // await User.findOneAndUpdate({ email }, {
    //     name,
    //     email,
    //     password
    // })
    // res.status(200).json({message: 'User was updated'})
})


export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser
}