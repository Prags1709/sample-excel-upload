const DefaultS3Client = require("../lib/defaultS3client");
const ExcelParser = require("../lib/excelParser");
const Producer = require("../task-queue-management/producer/producer");
const UserValidator = require("../validator/user-validator");

class ExcelController {
    static async excleUpload(req, res, next){
        try {
            //get excel data from S3bucket and parse into JOSN formate
            const {uploadStatus: data} = req;
            const { Key, Bucket: bucketName } = data;
            const s3Data = await DefaultS3Client.getObject(Key, bucketName);
            const s3ResponseBuffer = await s3Data.Body.toArray();
            const excelParser = new ExcelParser( Key, Buffer.concat(s3ResponseBuffer));
            const excelData = excelParser.toJson();

            const filterValidation = new UserValidator('list');
            if(!filterValidation.validate(excelData)){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                //pass queue name and job data to producer
                await Producer.insertJob('create-user-detail', excelData)
                res.code(204).send('Process done');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ExcelController