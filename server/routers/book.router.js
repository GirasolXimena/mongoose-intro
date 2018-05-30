const express = require('express');
const router = express.Router();

//Require in our Mongoose Model
const Book = require('../modules/models/book.schema')
router.get('/', (req,res) => {
    Book.find({})
    .then( (data) => {
        //we got stuff back from the databuse (no error)
        console.log('Got stuff back from mongo:', data);
        res.send(data);
    }).catch( error => {
    //Got an error from database
    console.log('Error from mongo:', error);
    res.sendStatus(500); //status for bad stuff happened

})});

router.post('/', (req, res) => {
    let bookData = req.body;
    console.log(`Got the book data from request: ${bookData}`);
    //Creat a new instance of our Model
    let newBook = new Book (bookData);
    console.log(`New book is ${newBook}`);
    //Save the new book model to the database
    newBook.save()
    .then(() => {
        res.sendStatus(201);  
    })

.catch((error) => { //Bad stuff happened, but good servers still respond
console.log('Error adding book:', error);
res.sendStatus(500);
})})

router.delete('/', (req,res) => {
    //Delete doesn't use data, so we're going to use params instead
    //data is req.body
    // params is req.query
    console.log(`Id for request is ${req.query._id}`);
    
    Book.findByIdAndRemove(req.query._id)
    .then(() => {
        //Good servers always respond. Say OK
        res.sendStatus(200);
    })

.catch((error) => {
    console.log('Error removing book:', error);s
    
})});
module.exports = router;