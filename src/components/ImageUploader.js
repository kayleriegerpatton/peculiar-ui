import React, { useState } from 'react';
import S3 from 'react-aws-s3'

window.Buffer = window.Buffer || require("buffer").Buffer;

export const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET,
    region: "eu-west-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  }

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }
  const ReactS3Client = new S3(config);
  const uploadFile = async (file) => {
    ReactS3Client
      .uploadFile(file, file.name)
      .then(data => console.log(data.location))
      .catch(err => console.error(err))
      // TODO: figure out response if possible in order to get the s3 url (maybe switch to using the SDK directly), otherwise template string the url;
      // TODO: work out adding images to a specific folder in s3, create uuid for file names instead of their defaults,
  }

  return <div>
    <div>React S3 File Upload</div>
    <input type="file" onChange={handleFileInput} />
    <br></br>
    <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
  </div>
}