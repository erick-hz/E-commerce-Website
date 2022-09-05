const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const port = 3000


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

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
