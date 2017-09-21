var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: '정보입력'});
});

router.post('/', function (req, res) {
    let receiver = req.body.receiver;

    if (!receiver) {
        return res.send('<script>alert("보호자 전화번호를 입력해 주세요!"); history.back(); </script>');
    }

    let caller = req.body.caller;

    if (!caller) {
        return res.send('<script>alert("사용자 전화번호를 입력해 주세요!"); history.back(); </script>');
    }

    req.session.receiver = receiver;
    req.session.caller = caller;
    res.redirect("/main");
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
