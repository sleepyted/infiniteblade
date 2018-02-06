/**
 * Created by matengfei1 on 2018/2/5.
 */
let userSql = require('../sql/userSql')
let myDb = require('./base')
const Util = require('../../common/utils')

let userDb = (function () {
    return {
        getAllUser : function () {
            return myDb.query(userSql.queryAll)
        },
        getUserById:function (id) {
            return myDb.query(userSql.getUserById, id)
        },
        insert:function (userDto) {
            return myDb.query(userSql.insert, [userDto.name,Util.encode(userDto.password)])
        }
    }
})()

module.exports = userDb