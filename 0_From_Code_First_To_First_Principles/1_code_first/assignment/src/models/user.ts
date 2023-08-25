import * as mongoose from 'mongoose';
import Counter from './counter';
import {IUser} from '../interfaces/IUser';
import bcryptJs from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(    
    {  
      userId: { type: Number },
      email: {type: String, required: true, unique: true},
      username: {type: String, required: true, unique: true},
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      password: { type: String, required: true }
    }
);

userSchema.pre('save', async function(next) {
    if(!this.isNew) return next();

    const counter = await Counter.findByIdAndUpdate(
        {_id: 'userId'},
        {$inc: {seq: 1}},
        {new: true, upsert: true}
    )

    this.userId = counter.seq;    

    if(this.isModified('password')) {
        const salt = await bcryptJs.genSalt(SALT_WORK_FACTOR);
        const hash = await bcryptJs.hash(this.password, salt);
        this.password = hash;
        return next();
    }else {
        return next()
    }
})

const userModel = mongoose.model<IUser & mongoose.Document>('user', userSchema);
export default userModel;