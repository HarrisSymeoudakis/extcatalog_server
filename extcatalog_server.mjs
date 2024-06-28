import axios from 'axios'; // Import Axios for making HTTP requests
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const fs = fs();

const app = express();
const port = process.env.PORT || 1000;
const baseUrl = "https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/products-search/v1"
const jew1 = "?ids=10AB0025                         X" ; 
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

//https://extcatalog-server.onrender.com/items/getAllCatalog
// All Customer Orders
app.get('/items/getAllCatalog', async (req, res) => {
  try {
    
    // const url = baseUrl + jew1+jew2+jew3+wat1+wat2+wat3;
	  const url= "https://90571062-test-retail-ondemand.cegid.cloud/Y2/90571062_002_TEST/api/items/10AB0025%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20X/images/v1";
    
//     const response = await axios.get(url, { headers });

//     // Assuming the Swagger page returns JSON data
//     const swaggerData = new Blob([response.data], { type: 'image/jpg' });  // Create a Blob object// response.data;
//     console.log('Received JSON data All catalog:', swaggerData);
// 	const objectURL = URL.createObjectURL(swaggerData); 
//     // Respond with the data received from the API
//     res.json(objectURL);
//   } catch (error) {
//     console.error('Error fetching data All catalog:', error);
//     res.status(500).send('Error fetching data All catalog');
//   }
// });





const response = await axios.get(url, { headers });

    if (response.status === 200 ) {  // Check for successful response and image type
      const blob = new Blob([response.data], { type: 'image/jpg' });  // Create a Blob object
      const objectURL = URL.createObjectURL(blob);  // Create an object URL

      // Respond with the objectURL
      res.json({ imageURL: objectURL });
    } else {
      console.error('Error fetching or invalid image data');
      res.status(500).send('Error fetching image data');
    }
  } catch (error) {
    console.error('Error fetching data All catalog:', error);
    res.status(500).send('Error fetching data All catalog');
  }
});
	  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
