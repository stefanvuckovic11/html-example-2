const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// postavljamo handlebars kao view engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', extname: '.handlebars' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// serviramo statičke fajlove iz "dist" foldera
app.use(express.static(path.join(__dirname, 'dist')));

// koristimo rute
app.use('/', productRoutes);

app.listen(PORT, () => {
    console.log(`server radi na http://localhost:${PORT}`);
});
