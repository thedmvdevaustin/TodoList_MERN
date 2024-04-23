import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
},
{
    timestamps: true
})
// calling .methods creates a method named whatever is after the . after methods; in this case it creates
// a method called matchPassword; remember to use regular function name whenever you use the this keyword
// instead of using the arrow function
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//the .pre allows for pre method operations; the method performed is the callback which is the last parameter that is passed in
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const User = new mongoose.model('User', UserSchema)

export default User