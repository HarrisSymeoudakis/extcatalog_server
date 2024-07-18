import axios from 'axios'; // Import Axios for making HTTP requests
import express from 'express';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 1000;
const baseUrl = "https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/products-search/v1"
const jew1 = "?ids=10AB0025                         X" ; 
const jew2 = "&ids=10AB0045                         X" ; 
const jew3 = "&ids=10AH0410                         X" ; 
const wat1 = "&ids=BG220049                         X" ; 
const wat2 = "&ids=BL260353                         X" ; 
const wat3 = "&ids=BL600058                         X" ; 
const fields = "&fields=UserFields";

// const jew1 = "10AB0025                         X" ; 
// const jew2 = "10AB0045                         X" ; 
// const jew3 = "10AH0410                         X" ; 
// const wat1 = "BG220049                         X" ; 
// const wat2 = "BL260353                         X" ; 
// const wat3 = "BL600058                         X" ; 

// Encode username and password for Basic Authentication
const username = '90571062_002_TEST\\Harris';
const password = 'Cegid2';
const auth = Buffer.from(`${username}:${password}`).toString('base64');

const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json' // Adjust content type if needed
};


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update * to your specific origin if needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//https://extcatalog-server.onrender.com/items/getAllCatalog
app.get('/items/getAllCatalog', async (req, res) => {
try{
    
    const url = baseUrl + jew1+jew2+jew3+wat1+wat2+wat3+fields;
    // Define the headers for the request
  
    // Make a GET request to the Swagger page with defined headers
    const response = await axios.get(url, { headers });

    // Assuming the Swagger page returns JSON data
    const swaggerData = response.data;
    console.log('Received JSON data from item User fields:', swaggerData);

    // Respond with the data received from the API
    res.json(swaggerData);
  } catch (error) {
    console.error('Error fetching data for item User fields:', error);
    res.status(500).send('Error fetching data for item User fields');
  }}
);

// Get price Lists
app.get('/items/getAllPrices', async (req, res) => {
try{
    
    const url =  'https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/items-selling-prices-settings/v1?request.itemCodes=10AB0025&request.itemCodes=10AB0045&request.itemCodes=10AH0410&request.itemCodes=BG220049&request.itemCodes=BL260353&request.itemCodes=BL600058&request.fields=';
  
    // Make a GET request to the Swagger page with defined headers
    const response = await axios.get(url, { headers });

    // Assuming the Swagger page returns JSON data
    const swaggerData = response.data;
    console.log('Received JSON data from Retail Price:', swaggerData);

    // Respond with the data received from the API
    res.json(swaggerData);
  } catch (error) {
    console.error('Error fetching data for Retail Price:', error);
    res.status(500).send('Error fetching data for Retail Price');
  }}
);

app.get('/items/Image/:itemCode', async (req, res) => {
	const itemCode = req.params.itemCode; // Get item code from query parameters

	if (!itemCode) {
		return res.status(400).send('Item code is required');
	}
  try {
		const imageUrl = `https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/items/${encodeURIComponent(itemCode)}/images/v1`;

    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer', // Important for handling binary data
      headers: headers // Include headers here
    });

    res.set('Content-Type', response.headers['content-type']);
	 
    res.send(response.data);
      } catch (error) {
    console.error('Error fetching data item image:', error);
    res.status(500).send('Error fetching data item image');
  }
});
	  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

