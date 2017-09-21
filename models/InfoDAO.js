
var pool = require('../database/DatabaseConfiguration').pool;
var InfoDTO = require('./InfoDTO');
var dateFormat = require('dateformat');

module.exports.selectInfo = function (receiver, caller, callback) {
    const sql = "SELECT * FROM info WHERE receiver = ? AND caller = ? ORDER BY time DESC";

    pool.getConnection(function (err, conn) {
        if (err) {
            callback("DbError", null);
            conn.release();
        } else {
            conn.query(sql, [receiver, caller], function (err, rows) {
                if (err) {
                    callback("DbError", null);
                    conn.release();
                } else {
                    if (rows.length == 0 || rows == null) {
                        callback("Empty", null);
                        conn.release();
                    } else {
                        var resultList = [];

                        for (var i = 0; i < rows.length; i++) {
                            var each = rows[i];
                            resultList.push(new InfoDTO(each.id, each.receiver, each.caller, each.location, dateFormat(each.time, "yyyy-mm-dd HH:MM:ss"), each.file, each.car_number));
                        }

                        callback(null, resultList);
                        conn.release();
                    }
                }
            })
        }
    })
};

module.exports.selectInfoById = function (id, callback) {
    const sql = "SELECT location FROM info WHERE id = ? ORDER BY time DESC";

    pool.getConnection(function (err, conn) {
        if (err) {
            callback("DbError", null);
            conn.release();
        } else {
            conn.query(sql, [id], function (err, rows) {
                if (err) {
                    callback("DbError", null);
                    conn.release();
                } else {
                    if (rows.length == 0 || rows == null) {
                        callback("Empty", null);
                        conn.release();
                    } else {
                        var each = rows[0];
                        callback(null, JSON.parse(each.location));
                        conn.release();
                    }
                }
            })
        }
    })
};

module.exports.inputInfo = function (info, callback) {
    const SQL = "INSERT INTO info (receiver, caller, location, time, file, car_number) VALUES (?, ?, ?, NOW(), ?, ?)";
    console.log(info);
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            callback(false, {message: "DbError"});
            conn.release();
        } else {
            conn.query(SQL, [info.receiver, info.caller, info.location, info.file, info.car_number], function (err, result) {
                if (err) {
                    console.log(err);
                    callback(false, {message: "SqlError"});
                    conn.release();
                } else {
                    callback(true, {message: '성공'});
                    conn.release();
                }
            })
        }
    })
};