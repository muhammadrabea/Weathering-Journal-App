/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// The base URL and the API key aquired from OpenWeatherMap
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKEY = "&appid=aed66684a26613bcfed1b5b0beb9ca51";

// POST request on the client side
const addData = async (url = "", data = {}) => {
    const req = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // making sure the data are of JSON type
    });
    // Testing the code for errors 
    try { //In case the code went all fine
        const newData = await req.json()
        return newData;
    } catch (error) { // In case the code went wrong
        console.log(error);
    }
};

// fetching the url parts together to get a dynamic one
const getWeatherAPI = async (baseURL ,zipCode, apiKEY) => { // putting a variable for the full URL
    const res = await fetch(baseURL + zipCode + apiKEY); // fetching the URL parts together
    try {
        const userInput = await res.json();
        return userInput;
    } catch (error) {
        console.log('error', error);
    };

}// Add event listener to the Generate key
document.getElementById('generate').addEventListener('click', performAction);

// Setting up the action function for the event listener
function performAction(e) {
    const zipCode = document.getElementById('zip').value; // get the zip input from the user
    const content = document.getElementById('feelings').value; // get the feelings content given by the user

    getWeatherAPI(baseURL,zipCode,apiKEY)
    .then(function (userInput) {
        addData('/add', {date: newDate, temp: userInput.main.temp, content}); // add the updated data by the user to a post request for the server
    }).then(function (updateData) {
        updateUI(); // use the data updated to update the UI
    });
};

//setting uo the updateUI function
const updateUI = async () => {
    const request = await fetch ('/all');
    try {
        const allData = await request.json()
        // use the data after fetching it to the data object in server in the updateUI function
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} K`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.content}`;
    } catch (error) {
        console.log('error')
    }
}