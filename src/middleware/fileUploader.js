const DefaultS3Client = require("../lib/defaultS3client");
const {nanoid} = require('nanoid');
const { S3BucketName, S3Client } = require('../config/s3config')

class FileUploadPreHandler {
  static async hook(request, reply) {
    try {
      const data = await request.file();
      const buffer = await data.toBuffer();
      const { filename, file } = data;
      const fileExtension = filename.split('.').pop();
      const allowedExtension = ['xlsx', 'xlsm', 'xls', 'ods'];
      if (allowedExtension.includes(fileExtension)) {
        const transactionId = nanoid();
        const uploadFilename = `sample-upload/${transactionId}_${filename}`;
        const { s3Result } = await DefaultS3Client.uploadStreamV2(S3BucketName, uploadFilename, buffer);
        request.uploadStatus = {
          Key: uploadFilename,
          Bucket: `${S3BucketName}`,
        };
      } else {
        reply.status(400).send(`Only Excel files (xlsx, xls, xlsm, ods) are allowed.`);
      }
    } catch (error) {
      console.error(`[FileUploadPreHandler] - ${error}`);
      throw error;
    }
  }
}

module.exports = FileUploadPreHandler;
