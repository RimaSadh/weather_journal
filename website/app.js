/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Set API Credintials
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ca671f7f06c4ee24ea9de753e9804d8b';


const performAction = (e) => {

    // Hide Error Message
    document.getElementById('error').style.display = 'none';

    // Get zip code entered by user, and perform validation
    let zipCode = document.getElementById('zip').value;

    if(zipCode.length != 0){ // Check it is not empty

        getWeatherData(zipCode)
        .then( (data) => {
            
            console.log("POST start"); // JSON
            postWeatherData('http://localhost:8080/postWeather', data);
            console.log("POST end");

        })
        .then( () => {
            updateUI();
        })
        
    }else{
        // Zipcode field is empty --> Show Error Message
        document.getElementById('error').style.display = 'block';
    }
}

// Create event listener
const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', performAction);


// Async GET data from API
const getWeatherData = async(zipCode) => {

    const response = await fetch(baseURL+zipCode+apiKey);

    try{

        const data = await response.json();
        console.log("API GET RESPONSE: ", data);
        return data;

    }catch(error){
        console.log("Error (getWeatherData): ", error);
    }

}

// Async POST response to server 
const postWeatherData = async(url, data) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        console.log("API POST DONE", newData);
        return newData;

    }catch(error){
        console.log("Error (postWeatherData): ", error);
    }

}


// Function to update the UI and render the response
const updateUI = async() => {
    
    console.log("UPDATE UI start");

    getAllData('http://localhost:8080/all')
    
    .then( (allData) => {

        let date = document.getElementById('date');
        let temp = document.getElementById('temp');
        let content = document.getElementById('content');
    
        console.log("UPDATE UI MED : " + allData );
    
        // TODO: Rendered JSON data
        date.innerHTML = allData.date;
        temp.innerHTML = allData.temperature;
        content.innerHTML = allData.user_response;
    })

}


// GET request the projectData object 
const getAllData = async(url) => {

    const response = await fetch(url);

    try{

        const allData = await response.json();

        console.log("ALL APP function " + allData.temperature);

        return allData;

    }catch(error){
        console.log("Error (updateUI): ", error);
    }

}

// Create UI element