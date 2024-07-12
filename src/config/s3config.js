const AWS = require('aws-sdk');

const S3BucketName = 'fack-bucket';

const S3Client = new AWS.S3({
    extends: 'http://localhost:4569',
    accessKeyId: 'fake-access-key',
    secretAccessKey: 'fake-secret-access-key',
})

module.exports = {
    S3BucketName,
    S3Client
}