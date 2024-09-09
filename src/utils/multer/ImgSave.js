const multer = require('multer')
const path = require('path')
const iconv = require('iconv-lite')

const changPhoto = {
    toUrl() {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'uploads/');
            },
        
            filename: function(req, file, cb) {
                const originalname = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8')
                cb(null, Date.now() + originalname)
            }
        });

        const uploads = multer({storage: storage})
        return uploads;
    }
}

module.exports = changPhoto


