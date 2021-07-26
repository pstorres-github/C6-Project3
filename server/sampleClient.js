require('dotenv').config()

// Import required AWS SDK clients and commands for Node.js.

const {S3Client} = require("@aws-sdk/client-s3")
const REGION = "us-east-2";
const s3Client = new S3Client({ region: REGION });

const {PutObjectCommand} = require('@aws-sdk/client-s3')
const {CreateBucketCommand} = require('@aws-sdk/client-s3')


// Set the parameters
const params = {
  Bucket: "rmrvbucket",  // The name of the bucket. For example, 'sample_bucket_101'.
  Key: "sample_upload.txt", // The name of the object. For example, 'sample_upload.txt'.
  Body: "Hello world!" // The content of the object. For example, 'Hello world!".
};

const createBucket = async () => {

  console.log('createBucket called')  
  // Create an Amazon S3 bucket.
  try {
    const data = await s3Client.send(
        new CreateBucketCommand({ Bucket: params.Bucket })
    );
    console.log(data);
    console.log("Successfully created a bucket called ", data.Location);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }

}

const createAndUpload = async () => {

    console.log('createAndUpload called')  

    // Create an object and upload it to the Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
        "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
    );
    return results; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}


<<<<<<< HEAD
createBucket()
=======
>>>>>>> 8e5ab3b (working on the component to add a video on AWS uploading the file on the dashboard app)
createAndUpload()