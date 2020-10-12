if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SAM_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require('stripe')(stripeSecretKey)
console.log(stripeSecretKey);
console.log(stripePublicKey);

const express = require('express');
const app = express();
const fs = require('fs');
const { json } = require('express');
var expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(express.json())
app.use(expressLayouts); //now we can use a place to store layouts

app.use(express.static('public'));

app.get('/store', function(req, res) {
fs.readFile('items.json', function(error, data){
    if(error){
        res.status(500).end();
    } else {
        res.render('pages/store', {
            stripePublicKey: stripePublicKey,
            items: JSON.parse(data)
        })
    }
    })
})

app.get('/index', function(req, res){
    res.render('pages/index');
});

app.get('/', function(req, res){
    res.render('pages/index');
});

app.get('/register', function(req, res){
    res.render('pages/register');
});

app.get('/login', function(req, res){
    res.render('pages/login');
});

app.get('/address', function(req, res){
    res.render('pages/address');
});
app.get('/account', function(req, res){
    res.render('pages/account');
});

app.post('/purchase', function(req, res) {
    fs.readFile('items.json', function(error, data){
        if(error){
            res.status(500).end();
        } else {
            const itemsJson = JSON.parse(data)
            const itemsArray = itemsJson.Popular.concat(itemsJson.Kebab)
            let total = 0
            req.body.items.forEach(function(item) {
                const itemsJson = itemsArray.find(function(i){
                    return i.id == item.id
                })
                total = total + itemsJson.price * item.quantity 
            });

            stripe.charges.create({
                amount: total,
                source: req.body.stripeTokenId,
                currency: 'gbp'
            }).then(function(){
                console.log('Succesful')
                res.json({ message: 'Successfully purchased items'})
            }).catch(function(){
                console.log("Charge failed")
                res.status(500).end()
            })
        }
        })
    })

app.listen(process.env.PORT || 5000)

