const express = require('express');
const router = express.Router();
  
router.route('/').get((req, res)=>{
    res.send('User List');
}).post((req, res) =>{
    const firstName = req.body.firstname;
    const isValid = firstname !=="";
    if (isValid){
        console.log(`Adding user: ${firstName}`);
        user.push({name:firstName});
        res.send('User Created!');
    }
    else{
        console.log("Error adding user");
        res.send('users/new', {firstName:firstName})
    }
});
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
    console.log(req.user);
    console.log('Getting user data!')
    res.send(`Getting User data for id: ${req.params.id}`);
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