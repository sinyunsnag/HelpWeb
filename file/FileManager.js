
var fs = require('fs');

// 녹음 파일 업로드 경로
const UPLOAD_PATH = "../public/uploads/";


/**
 * JSP 의 cos 라이브러리 처럼, 지정한 임시 폴더에 먼저 파일을 저장하고 이후에 이동시킨다.
 *
 */
module.exports.moveFileFromTempPath = function (file, callback) {
    var destPath = UPLOAD_PATH;

    var tempPath = file.path;
    var originalFileName = file.originalname;

    destPath += (new Date).getTime() + '_' +  originalFileName;


    var tempStream = fs.createReadStream(tempPath);
    var destStream = fs.createWriteStream(destPath);
    tempStream.pipe(destStream);

    tempStream.on('end', function () {
        var length = destPath.length;
        removeFile(tempPath, function (cb) {
            console.log("Temp file deleted!")
        });
        callback(destPath.substring(9, length));
    });
};

var removeFile = function (path, callback) {
    fs.unlink(path, function (err) {
        if (err) {
            callback(false);
        } else {
            callback(true);
        }
    })
};
