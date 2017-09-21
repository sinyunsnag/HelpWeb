
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '', // <= 데이터베이스 URL 지정하세요
    port: 0, // <= 데이터베이스 포트 숫자 지정하세요
    user: '', // <= 데이터베이스 계정명 입력하세요
    password: '', // <= 데이터베이스 비밀번호 입력하세요
    database: '', // <= 데이터베이스 스키마 이름 입력하세요
    connectionLimit: 3,
    waitForConnections: true,
    supportBigNumbers: true,
    bigNumberStrings: true
});

exports.pool = pool;