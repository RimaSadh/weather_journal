/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Set API Credintials
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=c*****************b';


const performAction = (e) => {

    // Hide Error Message
    document.getElementById('error').style.display = 'none';

    // Get zip code entered by user, and perform validation
    let zipCode = document.getElementById('zip').value;
    let userFeeling = document.getElementById('feelings').value;

    if(zipCode.length != 0){ // Check it is not empty
 
        getWeatherData(zipCode)
        .then( (data) => {
            
            postWeatherData('http://localhost:8080/postWeather', data, userFeeling);

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
        return data;

    }catch(error){
        console.log("Error (getWeatherData): ", error);
    }

}

// Async POST response to server 
const postWeatherData = async(url, data, feeling) => {

    // Create Post Request Body
    let requestBody = {
        date: newDate,
        temperature: data,
        user_response: feeling 
    };

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
    });

    try{

        const newData = await response.json();
        return newData;

    }catch(error){
        console.log("Error (postWeatherData): ", error);
    }

}


// Function to update the UI and render the response
const updateUI = async() => {
    
    getAllData('http://localhost:8080/all')
    
    .then( (allData) => {
        // Render JSON data
        createUIelement('date', allData.date);
        createUIelement('temp', allData.temperature.main.temp);
        createUIelement('content', allData.user_response);

    })

}

// GET request the projectData object 
const getAllData = async(url) => {

    const response = await fetch(url);

    try{

        const allData = await response.json();
        return allData;

    }catch(error){
        console.log("Error (getAllData): ", error);
    }

}

// Create UI element
const createUIelement = (parentElementID, content) => {

    let ElementId = document.getElementById(parentElementID);
    let ElementTitleText = parentElementID.charAt(0).toUpperCase() + parentElementID.slice(1);

    let childElement = document.createElement('h3');
    childElement.innerText = `${ElementTitleText} :`;

    let contentElement = document.createElement('p');
    if(content == ""){
        contentElement.innerText = `No Feeling Recorded..`;
    }else{
        contentElement.innerText = `${content}`;
    }

    ElementId.innerHTML = '';
    ElementId.append(childElement);
    ElementId.append(contentElement);
    
}
