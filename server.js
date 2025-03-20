var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    extname: '.handlebars',
    partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', productRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/products/:id', (req, res) => {
    res.render('openProduct');
});

app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});
