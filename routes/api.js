var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest: '../public/uploads/temp/'});
var FileManager = require('../file/FileManager');
var InfoDAO = require('../models/InfoDAO');
var InfoDTO = require('../models/InfoDTO');


/* GET home page. */
router.post('/info', upload.single('recordFile'), function (req, res) {
    let file = req.file;

    if (!file) {
        console.log("녹음 파일이 존재하지 않습니다!");
        return res.status(400).json({message: "녹음 파일이 존재하지 않습니다!"});
    }

    const mimetype = file.mimetype.split("/")[0];
    console.log(file.mimetype);

    if (mimetype != 'audio') {
        console.log("녹음 파일의 마임 타입이 오디오 타입이 아닙니다!");
        return res.status(400).json({message: "녹음 파일의 마임 타입이 오디오 타입이 아닙니다!"});
    }

    let info = req.body.info;

    if (!info) {
        console.log("데이터는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "데이터는 공백이 허용되지 않습니다!"});
    }

    try {
        info = JSON.parse(info);
    } catch (e) {
        console.log("데이터가 JSON 형식이 아닙니다!");
        return res.status(400).json({message: "데이터가 JSON 형식이 아닙니다!"});
    }

    const receiver = info.receiver;

    if (!receiver) {
        console.log("보호자 전화번호는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "보호자 전화번호는 공백이 허용되지 않습니다!"});
    }

    const caller = info.caller;

    if (!caller) {
        console.log("사용자 전화번호는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "사용자 전화번호는 공백이 허용되지 않습니다!"});
    }

    let location = info.location;

    if (!location) {
        console.log("발신 위치는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "발신 위치는 공백이 허용되지 않습니다!"});
    }

    info.location = JSON.stringify(location);

    const car_number = info.car_number;

    if (!car_number) {
        console.log("차량 번호는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "차량 번호는 공백이 허용되지 않습니다!"});
    }

    info.time = new Date().getTime();

    FileManager.moveFileFromTempPath(file, function (uploadPath) {
        console.log(uploadPath);
        InfoDAO.inputInfo(new InfoDTO(0, info.receiver, info.caller, info.location, info.time, uploadPath, info.car_number), function (isSuccessful, message) {
            if (isSuccessful) {
                return res.status(201).json(message);
            } else {
                return res.status(500).json(message);
            }
        })
    })
});

router.post('/info/data_only', function (req, res) {
    let info = req.body.info;

    if (!info) {
        console.log("데이터는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "데이터는 공백이 허용되지 않습니다!"});
    }

    try {
        info = JSON.parse(info);
    } catch (e) {
        console.log("데이터가 JSON 형식이 아닙니다!");
        return res.status(400).json({message: "데이터가 JSON 형식이 아닙니다!"});
    }

    const receiver = info.receiver;

    if (!receiver) {
        console.log("보호자 전화번호는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "보호자 전화번호는 공백이 허용되지 않습니다!"});
    }

    const caller = info.caller;

    if (!caller) {
        console.log("사용자 전화번호는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "사용자 전화번호는 공백이 허용되지 않습니다!"});
    }

    let location = info.location;

    if (!location) {
        console.log("발신 위치는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "발신 위치는 공백이 허용되지 않습니다!"});
    }

    info.location = JSON.stringify(location);

    const car_number = info.car_number;

    if (!car_number) {
        console.log("차량 번호는 공백이 허용되지 않습니다!");
        return res.status(400).json({message: "차량 번호는 공백이 허용되지 않습니다!"});
    }

    info.time = new Date().getTime();

    InfoDAO.inputInfo(new InfoDTO(0, info.receiver, info.caller, info.location, info.time, null, info.car_number), function (isSuccessful, message) {
        if (isSuccessful) {
            return res.status(201).json(message);
        } else {
            return res.status(500).json(message);
        }
    })
});


module.exports = router;
