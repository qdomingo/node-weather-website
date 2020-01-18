const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Usefull varieables
console.log(__dirname);
console.log(__filename);

// Using path module to manipulate paths
console.log(path.join(__dirname,'../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and view locations
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com
// app.com/help
// app.com/about

// Here we are going to use the hbs file
app.get('', (req, res) => {
    res.render('index', 
    {
        'title': 'Weather Application',
        'name': 'E. Domingo Muñoz'
    }
    );
})

app.get('/about', (req, res) => {
    res.render('about', 
    {
        'title': 'About',
        'appTitle': 'Weather Application',
        'name': 'E. Domingo Muñoz'
    }
    );
})

app.get('/help', (req, res) => {
    res.render('help', 
    {
        'helpText': 'Here we are going to provide some tips',
        'title': 'Help',
        'name': 'E. Domingo Muñoz'
    }
    );
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send(
            {
            'error': 'You have to provide an address'
            });
    }

    // Geocoding (mapbox)
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send(
                {
                'error': error
                });
        } else { 
            // Dark Sky services
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send(
                        {
                        'error': error
                        });
                } else {
                    res.send(
                        {
                            'location': location,
                            'forecast': forecastData,
                            'address': req.query.address
                        });
                }
            });
        }
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if(!req.query.search) {
        return res.send(
            {
            'error': 'You have to provide a search query'
            });
    }
    res.send(
        {
        'products': []
        });
});

// default handler inside help part
app.get('/help/*', (req, res) => {
    res.render('404',
        {
            'title': '404',
            'errorMessage': 'Help article not found',
            'name': 'E. Domingo Muñoz'
        });
});

// default handler
app.get('*', (req, res) => {
    res.render('404',
        {
            'title': '404',
            'errorMessage': 'Page Not Found',
            'name': 'E. Domingo Muñoz'
        });
});

// Now we need to start the server up

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});