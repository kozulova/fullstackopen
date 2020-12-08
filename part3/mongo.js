require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})

person.save().then(res=>{
    console.log("saved", process.argv[2], process.argv[3])

    Person.find({}).then(res =>{
        res.forEach(p=>console.log(p))
        mongoose.connection.close()
    })
})


