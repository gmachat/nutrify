const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY
const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY


export const awsConfig = {
  bucketName: 'nutrify-images',
  dirName: 'recipe-images', 
  region: 'us-east-2',
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
}

