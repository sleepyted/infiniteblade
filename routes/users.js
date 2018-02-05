const express = require('express');
const router = express.Router();
const userDb = require('../db/dbai/user')
const Util = require('../common/utils')
/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    // myDb.query(UserSQL.getUserById, req.query.id)
    //     .then(data => res.send(data))
    //     .catch(err => res.send(err))

    res.render('user')
})

router.post('/', function (req, res, next) {
    // req.query()
    // req.body()
    console.log(req.body)
    // myDb.connect()
    let userDto = {
        name: req.body.name,
        password: req.body.password
    }
    if(Util.validateDto(userDto)) {
        userDb.insert(userDto)
            .then(data => res.send(data))
            .catch(err => res.send(err))
    }else {
        res.send("Param lost")
    }
    // myDb.disconnect()
})


module.exports = router;

//TODO
// CRUD
// file upload/download
// websocket
