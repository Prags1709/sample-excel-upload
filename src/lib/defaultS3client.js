const {
    S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand,
  } = require('@aws-sdk/client-s3');
  const {
    getSignedUrl,
  } = require("@aws-sdk/s3-request-presigner");
  
  if (!global.logger) {
    global.logger = console;
  }
  class DefaultS3Client {
    static init(s3Config) {
      if (!s3Config || !s3Config.profile || !s3Config.region) {
        throw new Error('DefaultS3Client not initialized!. please provide valid configs');
      }
      if (!DefaultS3Client.prototype.client) {
        DefaultS3Client.prototype.client = new DefaultS3Client();
        DefaultS3Client.prototype.client.defaultS3Client = new S3Client({
          region: s3Config.region,
          endpoint: 'http://localhost:4569'
        });
        Object.freeze(DefaultS3Client.prototype.client);
      }
      return DefaultS3Client.prototype.client;
    }
  
    static getClient() {
      if (!DefaultS3Client.prototype.client || !DefaultS3Client.prototype.client.defaultS3Client) {
        throw new Error('DefaultS3Client not initialized!');
      }
      return DefaultS3Client.prototype.client.defaultS3Client;
    }
  
    static async getObject(key, bucketName) {
      const result = await this.getClient()
        .send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
      return result;
    }
  
    static async deleteObject(key, bucketName) {
      const deleteObj = await this.getClient()
        .send(new DeleteObjectsCommand({ Bucket: bucketName, Key: key }));
      return deleteObj;
    }
  
    static async uploadStreamV2(bucketName, filename, stream) {
      if (!bucketName || !filename) {
        throw new Error('File name and bucket name is mandatory.');
      }
      const fileObject = {
        Bucket: bucketName,
        Key: filename,
        Body: stream,
      };
      const s3Result = await this.getClient().send(new PutObjectCommand(fileObject));
      return { stream, s3Result };
    }
  
    static createPresignedUrlWithClient({ region, bucket, key, expiry = 3600 }) {
      const command = new GetObjectCommand({ Bucket: bucket, Key: key });
      return getSignedUrl(this.getClient(), command, { expiresIn: expiry });
    };
  }
  
  module.exports = DefaultS3Client;
  