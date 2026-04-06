const express = require('express');
const router = express.Router();
  
router.route('/').get((req, res)=>{
    res.send('User List');
}).post((req, res) =>{
    const {firstName, lastName, gender, age} = req.body;
    const isValid = firstName !=="";
    if (isValid){
        console.log(`Adding user: ${firstName} ${lastName} ${gender} ${age}`);
        users.push({firstName, lastName, gender, age});
        res.redirect('/users/list');
        
       // res.render('users/list', {users})
    }
    else{
        console.log("Error adding user");
        res.render('users/new', {firstName:firstName, lastName:lastName, gender: gender, age:age})
    }
});
router.get('/list', (req, res) =>{
    res.render('users/list', {users});
})
router.get('/new', (req, res)=>{ // /users/new
    res.render('users/new', {firstName: "Test"})
});


const users = [
    { firstName: "Mohammed", lastName: "Abedin", gender: "Male", age: 20},
    {firstName: "Alex", lastName: "Hills", gender:"Male", age: 32}
]

// res.send(`Getting User Data: ${req.params.id}`);
// });

router.route('/:id').get((req, res) => {

    const user = users[req.params.id];
    res.render('users/showAll', {user});
    // console.log(req.user);
    // console.log('Getting user data!')
    // res.send(`Getting User data for id: ${req.params.id}`);
}).delete((req, res) => {
    res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res) => {
    res.send(`Updating User data for id: ${req.params.id}`);
});
router.param("id", (req, res, next, id)=>{
    console.log(id);
    next();
})

module.exports = router;