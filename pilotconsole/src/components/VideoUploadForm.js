import { useState, useContext } from "react";

import Axios from 'axios'

import JobDetailContext from "../JobDetailContext";

const VideoUploadForm = () => {

  const [fileInput, setFileInput] = useState()
  const [videoName, setVideoName] = useState()

  const jobContext = useContext(JobDetailContext)
 
  const videoUpload = async (e) => {
    const file = e.target.files[0]
    console.log('file:', file)
    const fileName = encodeURIComponent(file.name)
    console.log('fileName:', fileName)
    setFileInput(file)
    setVideoName(fileName)
  }

  const submitFileToAWS = async () => {
    const formData = new FormData()
    
    formData.append('file', fileInput)
      
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
        method: 'PATCH',
        data: { videoURL: `http://localhost:3001/api/aws/download_video/${videoName}` },
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
          <label htmlFor="video-upload">
            Upload Video
          </label>
          <input
            id="file"
            name="file"
            type="file"
            // accept="image/*"
            onChange={videoUpload}
          />
          <button type="submit" onClick={submitFileToAWS}>upload video</button>
      </>
    );
  } else {
    return null
  }

};

export default VideoUploadForm;
