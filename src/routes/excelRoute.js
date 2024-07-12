const ExcelController = require("../controllers/excelController");
const FileUploadPreHandler = require("../middleware/fileUploader");
const { uploadS3 } = require("../middleware/fileUploader");

class clientIndex {
    static async getRoutes(fastify){
        fastify.post('/bulkupload', {preHandler: [FileUploadPreHandler.hook]}, ExcelController.excleUpload);
        
    }
}

module.exports = clientIndex.getRoutes;