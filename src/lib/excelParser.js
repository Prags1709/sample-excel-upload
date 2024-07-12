const xlsx = require('xlsx');

class ExcelParser {
    constructor(filePath, S3BufferData){
        this.filePath = filePath;
        this.S3BufferData = S3BufferData
    }

    toJson() {
        const workbook = xlsx.read(this.S3BufferData, {type: 'buffer'});
        const wsname = workbook.SheetNames;
        let json = xlsx.utils.sheet_to_json(workbook.Sheets[wsname[0]], {
            defval: '',
        })

        return json;
    }
}

module.exports = ExcelParser