const express = require('express');
const ejs = require('ejs');

const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.listen(port, () => {
    console.log(`Server on port ${port}`)
});

