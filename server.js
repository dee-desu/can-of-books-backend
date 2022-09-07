'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json())
const { response } = require('express');


// mongoose config

mongoose.connect('mongodb://localhost:27017/Books', {useNewUrlParser: true, useUnifiedTopology: true});

const booksSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String
});

const book = mongoose.model('Books', booksSchema);
 
// Seed data
async function seedData() {
  const firstBook = new book({
    title: "The Alchemist",
    description: "The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
    status:"Available"
  })

  const secondBook = new book({
    title: " Crime and Punishment",
    description: "It is a murder story, told from a murder;s point of view, that implicates even the most innocent reader in its enormities.",
    status:"Available"
  })
    
  const thirdBook = new book({
    title: "Kafka on the Shore",
    description: "by Japanese author Haruki Murakami. Its 2005 English translation was among The 10 Best Books of 2005",
    status:"Available"
  })
  
 
  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
  
}

  seedData();


const PORT = process.env.PORT;

app.get('/', homeRouteHandler)

function homeRouteHandler(req,res){
  res.send('Welcome to the home route') 
}

app.get('/books', booksRouteHandler)

function booksRouteHandler(req,res){
  book.find({},(err,result) =>{
    if(err){
      console.log(err)
    }
    else 
    {
      res.send(result)
    }
  })
}

app.get('/test', (req,res) => {

  res.send('test request received')

})

app.get('*', errorRouteHandler)

function errorRouteHandler(req,res){
  res.send('404 PAGE NOT FOUND!') 
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
