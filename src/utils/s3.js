import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadToS3 = async (objectFile, objectId, folder) => {
  const client = new S3Client({ region: "eu-west-1" })
  const input = {
    Bucket: process.env.AWS_BUCKET,
    // bucket folders: character-images,
    Key: `${folder}/${objectId}`,
    Body: objectFile
  }

  const command = new PutObjectCommand(input)
  try {
    const response = await client.send(command)
    return response
  } catch (error) {
    console.log(`ERROR: error`);
  }
}

module.exports = {
  uploadToS3
}