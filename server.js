
const express = require('express');
require('dotenv').config();
const FormData = require("./Models/query");
const bodyParser = require('body-parser');
const db = require("./db/conn");
const cors = require('cors');
 
const app = express();
const PORT = process.env.PORT_NO;

// Enable CORS for all routes
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/api/form', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Create a new FormData document
    const formData = new FormData({ name, email, message });

    // Save the form data to MongoDB
    await formData.save();

    res.status(200).send('Data saved successfully!');
  } catch (error) {
    console.error('Error occurred while saving the data:', error);
    res.status(500).send('Error occurred while saving the data.');
  }
});

// Route to handle admin login and fetch form data
app.post('/api/admin-login', async (req, res) => {
  const { email, password } = req.body;

  // Replace the hardcoded email and password with your actual admin credentials
  if (email === process.env.ADMIN && password === process.env.PASSWORD) {
    try {
      const formDataList = await FormData.find();

      if (formDataList.length > 0) {
        res.status(200).json(formDataList);
      } else {
        res.status(404).send('No data found');
      }
    } catch (error) {
      console.error('Error occurred while fetching form data:', error);
      res.status(500).send('Error occurred while fetching form data.');
    }
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Route to handle form data deletion
app.delete('/api/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the form data with the given id
    const deletedData = await FormData.findByIdAndDelete(id);

    if (deletedData) {
      res.status(200).json({ message: 'Form data deleted successfully' });
    } else {
      res.status(404).send('Form data not found');
    }
  } catch (error) {
    console.error('Error occurred while deleting form data:', error);
    res.status(500).send('Error occurred while deleting form data.');
  }
});

db();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

