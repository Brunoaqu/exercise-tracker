const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    _user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    description: { type: String },
    duration: { type: Number },
    date: { type: Date }
}, { versionKey: false });

const Exercise = mongoose.model('exercise', ExerciseSchema);
module.exports = Exercise;