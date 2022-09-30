const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
const session = require('express-session');


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret" }))

function isProductInCart(cart, id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            return true;
        }
    }

    return false;

}

function calculateTotal(cart, req) {
    total = 0;
    for (let i = 0; i < cart.length; i++) {
        // if we're offering a discounted price
        if (cart[i].sales_price) {
            total = total = (cart[i].sale_price * cart[i].quantity);
        } else {
            total = total = (cart[i].price * cart[i].quantity)
        }
    }
    req.session.total = total;
    return total;

}

app.get('/', (req, res) => {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "node_project"
    })

    connection.query("SELECT * FROM products", (err, result) => {

        res.render('pages/index', { result: result });

    })


});

app.post('/add_to_cart', function (req, res) {

    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let sale_price = req.body.sale_price;
    let quantity = req.body.quantity;
    let image = req.body.image;
    let product = { id: id, name: name, price: price, sale_price: sale_price, quantity: quantity, image: image }

    if (req.session.cart) {
        let cart = req.session.cart;

        if (!isProductInCart(cart, id)) {
            cart.push(product);
        }
    } else {
        req.session.cart = [product];
        let cart = req.session.cart;
    }
 
    //calculate total
    calculateTotal(cart, req);

    //return to cart page
    res.redirect('/cart', function(req, res) {
        let cart = req.session.cart;
        let total = req.session.total;

        res.render('pages/cart',{cart:cart, total:total});
    });
});


app.get('/cart', function (req, res) {

});
