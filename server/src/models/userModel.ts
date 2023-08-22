import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Setup user interface
interface IUser extends Document {
    name: string
    email: string
    password: string
    matchPassword: (password: string) => Promise<boolean>
}

// Create user schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true })

userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified()) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 13)
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password) 
}

// Export user model
export const User = model<IUser>('User', userSchema)