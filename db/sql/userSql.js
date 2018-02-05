/**
 * Created by matengfei1 on 2018/2/5.
 */
let UserSQL = {
    insert: 'INSERT INTO user(name, password) VALUES (?, ?)',
    queryAll: 'SELECT * FROM User',
    getUserById: 'SELECT * FROM user WHERE id = ? ',
};
module.exports = UserSQL;
