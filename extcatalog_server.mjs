import axios from 'axios'; // Import Axios for making HTTP requests
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 1000;
const baseUrl = "https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/products-search/v1?"
const jew1 = "ids=10AB0025                         X" ; 
const jew2 = "&ids=10AB0045                         X" ; 
const jew3 = "&ids=10AH0410                         X" ; 
const wat1 = "&ids=BG220049                         X" ; 
const wat2 = "&ids=BL260353                         X" ; 
const wat3 = "&ids=BL600058                         X" ; 


// Encode username and password for Basic Authentication
const username = '90571062_002_TEST\\Harris';
const password = 'Cegid2';
const auth = Buffer.from(`${username}:${password}`).toString('base64');

const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json' // Adjust content type if needed
};

// Middleware to allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update * to your specific origin if needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// All Customer Orders
app.get('/items/getAllCatalog', async (req, res) => {
  try {
    
    const url = baseUrl + jew1+jew2+jew3+wat1+wat2+wat3;
    // Make a GET request to the Swagger page with defined headers
    const response = await axios.get(url, { headers });

    // Assuming the Swagger page returns JSON data
    const swaggerData = response.data;
    console.log('Received JSON data All catalog:', swaggerData);
	
    // Respond with the data received from the API
    res.json(swaggerData);
  } catch (error) {
    console.error('Error fetching data All catalog:', error);
    res.status(500).send('Error fetching data All catalog');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
