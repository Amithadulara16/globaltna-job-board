const mongoose = require('mongoose');


// Define the JobRequest schema
const jobRequestSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    category: { type: String }, 
    location: { type: String }, 
    contactName: { type: String }, 
    contactEmail: { 
        type: String, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
    },
    status: { 
        type: String, 
        enum: ["Open", "In Progress", "Closed"], 
        default: "Open" 
    },
    createdAt: { type: Date, default: Date.now } 
});


// Export the model
module.exports = mongoose.model('JobRequest', jobRequestSchema);