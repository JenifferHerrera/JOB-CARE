const mongoose = require('mongoose');


const resettokenSchema = new mongoose.Schema({
_userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
resettoken: { type: String, required: true },
createdAt: { type: Date, required: true, default: Date.now, expires: 100000 },
});


module.exports = mongoose.model('passwordResetToken', resettokenSchema);