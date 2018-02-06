/**
 * Created by matengfei1 on 2018/2/6.
 */
/***
 * @param res
 * @param msg
 * @constructor
 */
exports.OK = function(res, msg) {
    res.status(200).json({
        code: 200,
        status: 'ok',
        msg: msg ? msg : ''
    })
}
exports.ERROR = function(res, msg) {
    res.status(500).json({
        code: 500,
        status: 'error',
        msg: msg ? msg : ''
    })
}