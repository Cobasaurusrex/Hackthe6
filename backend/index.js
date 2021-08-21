// dependencies
const express = require('express');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');


// init app
const app = express();
app.use(fileUpload());

// routes
app.get('/', (req, res) => {
  res.send('GCP App Engine!');
});

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  let filename = uuidv4();

  // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv('./uploads/'.concat(filename, ".jpg"), function(err) {
  sampleFile.mv('uploads/'.concat(filename, ".jpg"), function(err) {
    if (err)
      return res.status(500).send(err);

    res.send(`File ${filename}.jpg uploaded!`);
  });
});

// init listening to app on port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});