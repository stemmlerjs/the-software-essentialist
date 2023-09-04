import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
});

const model = mongoose.model('counter', schema);

export default model;