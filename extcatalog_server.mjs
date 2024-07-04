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

  // const url = baseUrl + jew1+jew2+jew3+wat1+wat2+wat3;

// Middleware to allow CORS
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
    console.log('Received JSON data from Customer User fields:', swaggerData);

    // Respond with the data received from the API
    res.json(swaggerData);
  } catch (error) {
    console.error('Error fetching data for customer User fields:', error);
    res.status(500).send('Error fetching data for customer User fields');
  }}
);


// All Customer Orders
// app.get('/items/getAllCatalog', async (req, res) => {
//   try {
    
  
// 	  const url= "https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/items/10AB0025%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20X/images/v1";

// const response = await axios.get(url, { headers });

//     if (response.status === 200 ) {  // Check for successful response and image type
//       const blob = new Blob([response.data], { type: 'image/jpeg' });  // Create a Blob object
// 	    console.log(blob);
//       // const objectURL = URL.createObjectURL(blob);  // Create an object URL

//       // Respond with the objectURL
// 	    // console.log(objectURL);
//       // res.json({ imageURL: objectURL });
// 	    res.json({ imageURL: blob });
//     } else {
//       console.error('Error fetching or invalid image data');
//       res.status(500).send('Error fetching image data');
//     }
//   } catch (error) {
//     console.error('Error fetching data All catalog:', error);
//     res.status(500).send('Error fetching data All catalog');
//   }
// });


app.get('/items/Image', async (req, res) => {
	// const itemCode = req.query.itemCode; // Get item code from query parameters

	// if (!itemCode) {
	// 	return res.status(400).send('Item code is required');
	// }
  try {
		const imageUrl = `https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/items/${encodeURIComponent("10AB0025                         X")}/images/v1/ola`;

    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer', // Important for handling binary data
      headers: headers // Include headers here
    });

    res.set('Content-Type', response.headers['content-type']);
	  res.set
	  console.log("response.data:" + response.data);
	  console.log("res:" + res);
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
