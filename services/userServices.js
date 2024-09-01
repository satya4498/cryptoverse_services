const {User}  = require('../model/userModel')


const getUser = async (user) => {
    const foundUser = await User.findOne({email: user.email})
    if (!foundUser) {
        return false
    }
    return foundUser
}

const createUser = async (user) => {
    const foundUser = await User.findOne({email: user.email})
    if (foundUser) {
        return {message: 'Email already exists'}
    }
    const newUser = new User(user)
    await newUser.save()
    return newUser
}


module.exports = {
    getUser,
    createUser
}