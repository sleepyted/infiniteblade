/**
 * Created by matengfei1 on 2018/2/6.
 */
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('testws')
});

module.exports = router;
