const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const privateKey = 'sdghhfdshgfhsdgjkfvcXCVXCV';

app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://admin:rTEL9TJ8ke285dmL@cluster0.ycczup5.mongodb.net/ecom', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected!'))
    .catch(err => console.error(err));

// Definir el tiempo de expiración del token
const tokenExpirationTime = 3 * 60 * 60 * 1000;

// Limitar la cantidad de intentos de inicio de sesión
const limitLogin = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 3, // Max number of entries to try log in
    message: 'Too many fail requests, try again in 15 minutes',
});

// Modelos de MongoDB
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    contact: String,
    email: String,
    password: String,
    confirmPassword: String,
});
const User = mongoose.model('User', userSchema);

const productSchema = new Schema({
    productId: String,
    productName: String,
    productRate: Number,
    productQnty: Number,
    category:String,
});
const Product = mongoose.model('Product', productSchema);

// Rutas
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Registro de usuarios
app.post('/register', (req, res) => {
    const { firstName, lastName, contact, email, password, confirmPassword } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        contact,
        email,
        password,
        confirmPassword,
    });

    newUser.save()
        .then(result => {
            res.status(201).json({ msg: 'New User Created Successfully!', result });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Generar token
function generateToken(payload) {
    return jwt.sign(payload, privateKey, { expiresIn: tokenExpirationTime });
}

// Inicio de sesión
app.post('/login', limitLogin, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user && user.password === password) {
                const token = generateToken({ email, password });
                res.status(200).json({ msg: 'Login Successful', token });
            } else {
                res.status(401).json({ msg: 'Invalid email or password' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    console.log("headers", req.headers);
    console.log("token:", req.headers.authorization);
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        req.user = decoded;
        console.log(decoded)
        next();
    });
};

// Añadir un nuevo producto
app.post('/product', verifyToken, (req, res) => {
    const { productId, productName, productRate, productQnty } = req.body;

    const newProduct = new Product({
        productId,
        productName,
        productRate,
        productQnty,
    });

    newProduct.save()
        .then(result => {
            res.status(201).json({ msg: 'New product added successfully', result });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

//actualizar productos
app.put('/product', verifyToken, (req, res) => {

    console.log(req.body);
    const { productId, productName, productQnty, productRate, _id } = req.body;

    Product.findByIdAndUpdate({ _id: _id }, {
        $set: {
            productId: productId,
            productName: productName,
            productRate: productRate,
            productQnty: productQnty,

        }
    },{new:true}).then((result) => {
        res.status(201).json({ msg: 'Update successfully' })
    }).catch((e) => {
        console.log(e)
        res.status(500).json({ msg: 'Internal Server error', e })
    })

    

});

// Listar productos
app.get('/product', verifyToken, (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

//borrar producto
app.delete("/product/:id", verifyToken, (req,res)=>{

    console.log(req.params.id);
    Product.findOneAndDelete({_id:req.params.id}).then((result)=>{
        res.status(200).json({msg:'Item deleted successfully',result})
    })
   
})


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
