const express = require('express')
const router = express.Router()
const fileUpload = require("express-fileupload")

require('dotenv').config()

router.post('/upload_video', async (req, res) => {

    let filename = req.files.file.name
    let filedata = req.files.file.data

    // Load the AWS SDK for Node.js
    let AWS = require('aws-sdk');
    // Set the region 
    AWS.config.update({region: 'us-east-2'});

    // Create S3 service object
    let s3 = new AWS.S3();

    // call S3 to retrieve upload file to specified bucket
    let uploadParams = {Bucket: 'rmrvbucket', Key: filename, Body: filedata}

    // call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
        if (err) {
            res.send(err)
            console.log("Error", err);
        } 
        if (data) {
            console.log("Upload Success", data.Location);
            res.send(data.Location)
    }
    })

})


module.exports = router