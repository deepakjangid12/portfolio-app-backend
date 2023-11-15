const express = require('express')
// const FormData = require("./Models/query")
//router obj
const router = new express.Router()

router.get('/',(req,res)=>{
    res.send("hello postman")
  })

router.post('/api/form', async (req, res) => {
    res.send("hello form")
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


module.exports = router;