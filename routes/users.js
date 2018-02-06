const express = require('express');
const router = express.Router();
const userDb = require('../db/dbapi/user')
const Util = require('../common/utils')
/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    // myDb.query(UserSQL.getUserById, req.query.id)
    //     .then(data => res.send(data))
    //     .catch(err => res.send(err))
    res.locals.title = "users"
    res.locals.user = {name: 'welcome'}
    res.render('user')
})

router.post('/', function (req, res, next) {
    // req.query()
    // req.body()
    // console.log(req.body)

    // myDb.connect()
    let id
    let userDto = Util.getParameter(req)
    if (Util.validateParam(userDto)) {
        userDb.insert(userDto)
            .then(data => {
                id = data.insertId
                userDb.getUserById(id)
                    .then(data => {
                        res.locals.user = {name: "welcome " + data[0].name}
                        res.render('user')
                    })
                    .catch(err => res.send("error getUserById"))
            })
            .catch(err => res.send("error insertUser"))

    } else {
        res.send("error validate failed")
    }
    // myDb.disconnect()
})


module.exports = router;

//TODO
// CRUD
// file upload/download
// websocket
