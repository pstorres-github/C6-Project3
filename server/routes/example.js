require('dotenv').config()

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});
// console.log('process.env.AWS_REGION', process.env.AWS_REGION)

// Create S3 service object
var s3 = new AWS.S3();

// console.log('process.env.AWS_BUCKET', process.env.AWS_BUCKET)

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: 'rmrvbucket', Key: '', Body: ''};
var file = process.argv[2];

// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
