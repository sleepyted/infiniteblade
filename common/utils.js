/**
 * Created by matengfei1 on 2018/2/5.
 */
const crypto = require("crypto")

const secret = 'asdfji'
const Util = {
    encode: function encoder(str, flag) {
        if(str === undefined) throw new Error('str undefined')
        let encoder = flag ? flag : 'sha256'
        const hash = crypto.createHmac(encoder, secret)
            .update(str)
            .digest('hex');
        return hash
    },
    validateDto :function (dto) {
        for(let key in dto){
            if (dto[key] == undefined){
                return false
            }
        }
        return true
    }
}


module.exports = Util