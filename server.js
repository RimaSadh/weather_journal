// Setup empty JS object to act as endpoint for all routes
var projectData = {
    date: '',
    temperature: {},
    user_response: '' 
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');


/* Middleware */
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.port || 8080;
const server = app.listen(port, () => {
    console.log('Server is running on local host port: ', port);
});


/* ----SET ROUTES---- */
// POST route that adds incoming data to projectData
app.post('/postWeather', (req, res) => {

    let newData = req.body;
    
    projectData.date = newData.date;
    projectData.temperature = newData.temperature;
    projectData.user_response = newData.user_response;

});

// GET route that returns the projectData object
app.get('/all', (req, res) => { 
    res.send(projectData);
});
