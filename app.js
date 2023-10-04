// app.js
const express = require('express');
const multer = require('multer');
const s3 = require('./aws-config');
require("dotenv/config");
const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).send('Error uploading file to S3.');
    }
    res.send('File uploaded successfully.');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
