require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const { request } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('data', (req,res)=>{
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));


let persons = [
    {
        id: 1,
        name: "Arto Hellass",
        number: "044-123456"
    },
    {
        id: 2,
        name: "Ada Loverance",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mara Popendic",
        number: "39-23-6423122"
    }
  ]

const generateId = () =>{
    return Math.floor(Math.random()*10000) + 4;
}

app.post('/api/persons', (req,res, next)=>{
    const body = req.body;

    const person = new Person( {
        name: body.name,
        number: body.number
    })

   person.save().then(savedPerson=>{
    res.json(savedPerson);
   })
   .catch(err=>next(err))

})

app.delete('/api/persons/:id', (req,res)=>{
    Person.findByIdAndRemove(req.params.id)
    .then(result=>res.status(204).end())
    .catch(err=>next(err))
})

app.put('/api/persons/:id', (req, res, next)=>{
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson =>{
        res.json(updatedPerson)
    })
    .catch(err=>next(err))
})

app.get('/', (req, res)=>{
    res.send("Hello Word ");
})

app.get('/api/persons', (req,res)=>{
    //res.json(persons);
    Person.find({}).then(people =>{
        res.json(people)
    })

})
app.get('/api/persons/:id', (req, res, next)=>{
    Person.findById(req.params.id)
    .then(person=>{
        if(person){
            res.json(person)
        }
        else{
            res.status(404).end()
        }
        
    })
    .catch(err=>next(err))
});

app.get('/info', (req, res)=>{
    const date = new Date();
    res.send(`Phonebook has info for ${persons.length} </br> ${date}`);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)  


const errorHandler = (err, req, res, next) =>{
    console.log(err)
    if(err.name === 'CastError'){
        return res.status(400).send({error: "wrong id"})
    }
    else if(err.name === 'ValidationError'){
        return res.status(400).json({err: err.message})
    }

    next(err)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
