const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

// connect to MongoDB
const url = process.env.MONGODB_URI
console.log('Connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('ERROR: Could not connect to MongoDB', error.message)
    })

// setup person schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// modify response from MongoDB
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


// create and export model
module.exports = new mongoose.model('Person', personSchema)