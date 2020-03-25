const express = require('express');
const hbs = require('hbs');
const path = require('path');
const GeoMap = require('./GeoMap');
const foreCast = require('./ForeCast');
const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('Index', {
        title: 'Weather',
        createdBy: 'Sahil'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        createdBy: 'Sahil'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        createdBy: 'Sahil'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please add the address'
        })
    }
    else {
        GeoMap.getLocationMap(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            foreCast.getForeCast(latitude, longitude, (error, forecastedData) => {
                if (error) {
                    return res.send({
                        error: error
                    });                    
                } else if (forecastedData) {
                    return res.send({
                        forecast: forecastedData,
                        location: location
                    });
                }
            })

        })
    }
})

app.get('*', (req, res) => {
    res.send('My Error page');
})

app.listen(port, () => {
    console.log('Server is up on 3000');
});