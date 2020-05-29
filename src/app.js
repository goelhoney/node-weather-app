const express  = require('express');
const path     = require('path');
const hbs      = require('hbs');
const geocode  = require('../utils/geocode');
const forecast = require('../utils/forecast')


const app = new express();

const filePath    = path.join(__dirname, '../public');
const viewPath    = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(filePath)); // To make the static content available

app.get('', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('index', {
        title: 'Weather Title',
        name:'Hemant'
    });
});

app.get('/about', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('about', {
        title: 'About Title',
        name:'Hemant'
    });
});

app.get('/help', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('help', {
        helpMsg: 'Help Message',
        title: 'Help Title',
        name:'Hemant'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter address'
        });
    } else {
        geocode(req.query.address, (error, data) => {
            if(error == undefined) {
                forecast(data, (ferror, fdata) => {
                    if(ferror == undefined) {
                        res.send({
                            'Location':fdata
                        });
                    } else {
                        res.send({
                            'Location':ferror
                        });
                    }
                })
            } else {
                res.send({
                    'Location':error
                });
            }
        }); 
    }
    
});

app.get('/products', (req, res) => {
    
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help article not found',
        title: 'Help Title',
        name:'Hemant'
    })
});

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Page not found',
        title: 'Help Title',
        name:'Hemant'
    })
});

app.listen(3000, () => {
    console.log('Server started  at port 3000');
});