import { useState } from "react";

const VideoUploadForm = () => {

  // const [selectedFile, setSelectedFile] = useState();
	// const [isSelected, setIsSelected] = useState(false);

	// const changeHandler = (event) => {
	// 	setSelectedFile(event.target.files[0]);
	// 	setIsSelected(true);
	// };

  // console.log("selectedFile:", selectedFile)

	// const handleSubmission = () => {
	// 	const formData = new FormData();

	// 	formData.append('File', selectedFile);

  //   console.log("formData:", formData)

	// 	fetch(
	// 		'http://localhost:3001/api/aws/upload_video',
	// 		{
	// 			method: 'POST',
	// 			body: selectedFile,
  //       headers: {
  //         "Content-type": "multipart/form-data"
  //       },
  //       mode: "no-cors"
	// 		}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			console.log('Success:', result);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error);
	// 		});
	// };


	// return(
  //  <div>
	// 		<input type="file" name="file" onChange={changeHandler} />
	// 		{isSelected ? (
	// 			<div>
	// 				<p>Filename: {selectedFile.name}</p>
	// 				<p>Filetype: {selectedFile.type}</p>
	// 				<p>Size in bytes: {selectedFile.size}</p>
	// 				<p>
	// 					lastModifiedDate:{' '}
	// 					{selectedFile.lastModifiedDate.toLocaleDateString()}
	// 				</p>
	// 			</div>
	// 		) : (
	// 			<p>Select a file to show details</p>
	// 		)}
	// 		<div>
	// 			<button onClick={handleSubmission}>Submit</button>
	// 		</div>
	// 	</div>
	// )


 
  const [fileInput, setFileInput] = useState()
 
  const videoUpload = async (e) => {
    const file = e.target.files[0];
    console.log('file:', file)
    const fileName = encodeURIComponent(file.name);
    console.log('fileName:', fileName)
    const formData = new FormData();
    
    formData.append('file', e.target.files[0]);
    
    for (var value of formData.values()) {
      console.log(value);
   }
    const upload = await fetch("http://localhost:3001/api/aws/upload_video", {
      method: "POST",
      // headers: {
      //   "Content-type": "multipart/form-data"
      // },
      // mode: "no-cors",
      body: formData,
    });

    setFileInput(fileName);

    await upload;
  }

  return (
    <>
      <form>
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
        <button type="submit">upload</button>
      </form>
    </>
  );
};

export default VideoUploadForm;
