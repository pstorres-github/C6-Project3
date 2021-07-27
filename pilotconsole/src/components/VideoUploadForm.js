import { useState, useContext } from "react";

import { useHistory } from 'react-router-dom'

import Axios from 'axios'

import JobDetailContext from "../JobDetailContext";

const VideoUploadForm = () => {

  const [fileInput, setFileInput] = useState()
  const [videoName, setVideoName] = useState()

  const history = useHistory()

  const jobContext = useContext(JobDetailContext)
 
  const videoUpload = async (e) => {
    const file = e.target.files[0];
    console.log('file:', file)
    const fileName = encodeURIComponent(file.name)
    console.log('fileName:', fileName)
    //await jobContext.updateVideoFilename(fileName)
    setFileInput(file)
    setVideoName(fileName)
  }
  console.log('jobContext.activeJob:', jobContext.activeJob)

  const submitFileToAWS = async () => {
    const formData = new FormData();
    
    formData.append('file', fileInput);
    
    // for (var value of formData.values()) {
      //   console.log(value);
      
      try {
        const upload = await Axios({
        method: "POST",
        url: "http://localhost:3001/api/aws/upload_video",
        data: formData,
      });
    } catch (err) {
      console.log("Error:", err)
    }

    let videoFilenameUpdate
      try {
        videoFilenameUpdate = await Axios({
        // method: 'PUT',
        method: 'PATCH',
        data: { videoURL: `http://rmrvbucket.s3.us-east-2.amazonaws.com/${videoName}` },
        withCredentials: true,
        url: `http://localhost:3001/api/work_orders/work_order/${jobContext.activeJob}`,
    })
    console.log(videoFilenameUpdate)
    
      } catch (err) {
        console.log("Error:", err)
      }
    
  }

  if(jobContext.activeJob) {

    return (
      <>
          <input
            id="file"
            name="file"
            type="file"
            // accept="image/*"
            onChange={videoUpload}
          />
          <label htmlFor="video-upload">
            Upload Video
          </label>
          <button type="submit" onClick={submitFileToAWS}>upload</button>
      </>
    );
  } else {
    return null
  }

};

export default VideoUploadForm;
