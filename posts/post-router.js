const express = require('express');

// database access using knex
const knex = require('../data/db-config.js'); //renamed to knex from db

const router = express.Router();

// return a list of posts from the database
router.get('/', (req, res) => {
    // select * from posts
    knex.select('*').from('posts')
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "Error getting the post"})
    })

});

router.get('/:id', (req, res) => {
const id = req.params.id;
//select * from posts where id = req.params.id
knex.select('*').from('posts').where({id: id}).first() //first to get rid of array around obj, equivalent to posts[0]
.then(post => {
    res.status(200).json(post)
})
.catch(error => {
    console.log(error)
    res.status(500).json({error: "Error retrieving the specific post"})
})
});

//start here
router.post('/', (req, res) => {
    //insert into () values()
    const postData = req.body;
    //imagine i validated data
    // one way -> knex.insert(postData).into('posts')
    knex("posts")
    .insert(postData, "id")//second argument not needed on sqllite -> what you will get back 
    .then(ids => {
        //returns an array of one element, the id of the last record inserted
        const id = ids[0];
        return knex("posts") //return when nested promise calls
        .where({id})
        .first()
        .then(post => {
            res.status(201).json(post)
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({errorMessage: "Error adding the post "})
    })

      
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    // imagine we validated here 
    knex('posts')
        .where({id}) // always filter on update and delete
        .update(changes)
        .then( count => {
            if(count > 0) {
                res.status(200).json({message:`${count} record(s) updated`})
            } else {
                res.status(404).json({message: "Record not found"})
            }
            
        })
        .catch( error => {
            console.log(error)
            res.status(500).json({errorMessage: "Error editing the post"})
        })


});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    // imagine we validated here 
    knex('posts')
    .where({id}) // always filter on update and delete
    .del()
    .then( count => {
         res.status(200).json({message:`${count} record(s) updated`})
    })
    .catch( error => {
        console.log(error)
        res.status(500).json({errorMessage: "Error editing the post"})
    })



});

module.exports = router;