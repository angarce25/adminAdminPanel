const express = require('express');
const app = express();
const port = 3000;
let bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const { Schema } = mongoose;
let cors = require('cors');
const jwt = require('jsonwebtoken');
const { log } = require('console');


const privateKey= 'sdghhfdshgfhsdgjkfvcXCVXCV'
app.use(cors())
mongoose.connect('mongodb+srv://admin:rTEL9TJ8ke285dmL@cluster0.ycczup5.mongodb.net/ecom')
    .then(() => console.log('DB Connected!'))
// model user
    const userSchema = new Schema({
    firstName: String,
    lastName: String,
    contact: String,
    email: String,
    password: String,
    confirmPassword: String,
})
const User = mongoose.model('User', userSchema);
// model product
const productSchema = new Schema({
    productId:String,
    productName:String,
    productRate:Number,
    productQnty:Number,
})
const Product = mongoose.model('Product', productSchema);

// app.use(jsonParser)
app.get('/', (req, res) => {
    res.send('hello world')
})
app.post('/register', jsonParser, (req, res) => {
    console.log("body data:", req.body);

    const { firstName, lastName, contact, email, password, confirmPassword } = req.body;

    const createNewUser = new User({
        firstName: firstName,
        lastName: lastName,
        contact: contact,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    })
    createNewUser.save().then((result) => {
        res.status(201).json({ msg: 'New User Created Successfull!', result })
    })
})
function generateToken(payload){
    const token = jwt.sign(payload , privateKey);
    return token
}
app.post('/login', jsonParser, (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    User.findOne({email:email }).then((result) => {
        console.log(result)
        if (result) {
            if (result.password==password) {
                res.status(200).send({ msg: 'Login Successfull', result, token:generateToken({email:email, password:password})})
            } else {
                res.status(500).send({ msg: 'PLease Enter valid e-mail & password', result })
            }
        } else {
            res.status(500).send({ msg: 'PLease Enter valid e-mail', result })
        }
    })
})


const verifyToken = (req , res , next)=>{
    console.log("headers",req.headers);
    console.log("token:",req.headers.authorization);

    const token = req.headers.authorization;
    
   
        jwt.verify(token, privateKey, function(err,decoded){
            

            if(err){
                res.status(401).send({msg:'Invalid Token'})
            }else{

                console.log(decoded)
                next();
            }
    
           
    
        });
   
  
    

    
}



//add new product
app.post('/product', verifyToken, jsonParser,(req,res)=>{
    
   console.log('product api')
    const { productId, productName, productRate, productQnty } = req.body;

    const createNewProduct = new Product({
        productId: productId,
        productName: productName,
        productRate: productRate,
        productQnty: productQnty
    })
    createNewProduct.save().then((result) => {
        res.status(201).json({ msg: "New product added successfully", result })
    })


    
})


app.listen(port, () => {
    console.log("Server running on port", port)
});
