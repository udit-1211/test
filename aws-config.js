// aws-config.js
const AWS = require('aws-sdk');
require("dotenv/config");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new AWS.S3({ /* other options */ });
module.exports = s3;