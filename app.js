const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// Invoke the function
const app = express();

// Connect to mongoDB
const dbURI = 'mongodb+srv://emmy12:emmy1@cluster0.ip3c79z.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000, () => {
        console.log('Listening on port 3000, Database connected successfully')
    }))
    .catch(err => console.log(err))

// Regster view engine
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// Blog routes
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.render('404', { title: '404' })
})