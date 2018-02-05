/**
 * Created by matengfei1 on 2018/2/5.
 */
const mysql = require('mysql')
const config = require('../dbConfig')
const myDb = (function () {

    /**
     * flag of the connection status
     * @type {boolean} true: connection available, false: connection lost
     * @private
     */
    let _connectionFlag = false
    let pool
    let _connect = function () {
        pool = mysql.createPool(config.mysql)
        _connectionFlag = true
    }

    /**
     * execute query sql and return a promise
     * @param sql
     * @param options the query options
     * @returns {Promise} resolved : the result, rejected: error occurred
     * @private
     */
    let _query = function (sql, options) {
        return new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                }
                else {
                    connection.query(sql, options, function (error, results, fields) {
                        connection.release();
                        if (error) reject(error)
                        resolve(results)
                    })
                }
            })
        })

    }

    /**
     * disconnect and close the pool
     * @private
     */
    let _disconnect = function () {
        if (pool) pool.end()
        _connectionFlag = true
    }

    return {
        connect: function () {
            _connect()
        },
        disconnect: function () {
            _disconnect()
        },
        create: function () {

        },
        read: function () {

        },
        update: function () {

        },
        delete: function () {

        },
        query: function (sql, options) {
            return _query(sql, options)
        }
    }
})()

myDb.connect()
module.exports = myDb