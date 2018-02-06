/**
 * Created by matengfei1 on 2018/2/5.
 */
const crypto = require("crypto")

const secret = 'asdfji'
const Util = {
    encode: function encoder(str, flag) {
        if (str === undefined) throw new Error('str undefined')
        let encoder = flag ? flag : 'sha256'
        const hash = crypto.createHmac(encoder, secret)
            .update(str)
            .digest('hex');
        return hash
    },
    validateParam: function () {
        //todo validateParam
        return true
    },
    getParameter: function (req) {
        let parameter = {};
        if (req.params) {
            for (let p in req.params) {
                parameter[p] = req.params[p];
            }
        }
        if (req.body) {
            for (let p in req.body) {
                parameter[p] = req.body[p];
            }
        }
        if (req.query) {
            for (let p in req.query) {
                parameter[p] = req.query[p];
            }
        }
        return parameter
    }
}


module.exports = Util