import React, { useState } from 'react';
import S3 from 'react-aws-s3'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styles } from "../styles";

window.Buffer = window.Buffer || require("buffer").Buffer;

export const ImageUploader = ({ name, id, label }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET,
    dirName: "character-images", //folder within s3 to upload to
    region: "eu-west-1",
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  }

  // set selected file in state
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

  // https://${bucketName}.s3.eu-west-1.amazonaws.com/${dirName}/${file.name}


  return <>
    <TextField
      type="file"
      onChange={handleFileInput}
      margin="normal"
      id={id}
      //  label={label}
      name={name}
      variant="outlined"
      fullWidth
      sx={{ marginTop: 2.5 }} />
    <Button
      color='primary'
      sx={styles.loadingButton}
      onClick={() => uploadFile(selectedFile)}>Upload</Button>
  </>
}