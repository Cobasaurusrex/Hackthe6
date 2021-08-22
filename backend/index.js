// dependencies
const express = require('express');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const Sequelize = require("sequelize-cockroachdb");
const cors = require('cors');
var sys = require('sys');
var exec = require('child_process').exec;
const axios = require('axios');

function puts(error, stdout, stderr) { sys.puts(stdout) }

// For secure connection:
const fs = require('fs');

// init app
const app = express();
app.use(fileUpload());
app.use(cors());

// Connect to CockroachDB through Sequelize.
var dbConfig = require('./config');
var sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  dialectOptions: {
    ssl: {
      // For secure connection:
      ca: fs.readFileSync('certs/root.crt')
        .toString()
    },
  },
  logging: false,
});

// set up model for cars table 
const Cars = sequelize.define("car_images", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  filename: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  img: {
    type: Sequelize.BLOB('long')
  }
});

// routes -----------------------
app.get('/', (req, res) => {
  res.send('GCP App Engine!');
});

app.post('/upload', function (req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ status: 'error', details: 'No files uploaded' });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let carFile = req.files.carFile;

    let filename = uuidv4();

    // upload to database
    Cars.sync().then(async () => {
      // console.log('cars sync complete');
      let uploaded = await Cars.create({ id: filename, filename: carFile.name, img: carFile });

      // let carsData = await Cars.findAll();

      // carsData.forEach((car) => console.log(car));

      // send to Google Cloud Vision API ---
      let gKey = '';
      let processedImg = Buffer.from(carFile.data).toString('base64');
      let gcpBody = {
        payload: {
          image: {
            imageBytes: processedImg
          }
        }
      }

      // get Google Cloud api key
      exec("gcloud auth application-default print-access-token", function (err, stdout, stderr) {
        gKey = "Bearer ".concat(stdout);

        // trim newline off the end
        gKey = gKey.substring(0, gKey.length - 2);

        let config = { headers: { Authorization: gKey } };

        axios.post(
          'https://automl.googleapis.com/v1beta1/projects/134821999686/locations/us-central1/models/IOD5852381536279592960:predict',
          gcpBody,
          config
        )
          .then(axoisRes => {

            try {
              // will only exist if dented, otherwise res.data will be empty
              if (axoisRes.data.payload[0].displayName == "dented") {
                // send res back to client
                res.status(200).json({ status: 'success', details: `File ${carFile.name} uploaded and processed.`, dented: true });
              } else {
                res.status(200).json({ status: 'success', details: `File ${carFile.name} uploaded and processed.`, dented: false });
              }
            } catch (e) {
              res.status(200).json({ status: 'success', details: `File ${carFile.name} uploaded and processed.`, dented: false });
            }

          }).catch(e => {
            res.status(200).json({ status: 'success', details: `File ${carFile.name} uploaded and processed.`, dented: false });
          });
      });
    })

  } catch (e) {
    res.status(500).send(e);
  }

});

// init listening to app on port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});