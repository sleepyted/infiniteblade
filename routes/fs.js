/**
 * Created by matengfei1 on 2018/2/3.
 */
let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/read', function (req, res, next) {
    console.log(req.path)
    // next()
    // res.redirect('/fs/read/async')
    let options = {
        root: 'public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }

    let fileName = 'data/app.json'
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err)
            next(err);
        } else {
            console.log('Sent:', fileName)
        }
    })
})

let readFile = function(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile(url, 'UTF-8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                // res.send(data)
                resolve(data)
            }
        })
    })
}

router.get('/read/async', function (req, res, next) {
    readFile('public/data/app.json').then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
    // fs.readFile('public/data/app.json', 'UTF-8', function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.send(err)
    //     } else {
    //         res.send(data)
    //     }
    // })
    // res.sendfile('public/data/app.json')
    // res.send(data)
})

router.get('/read/sync', function (req, res, next) {
    try {
        let data = fs.readFileSync('public/data/app.json', 'UTF-8');
        res.send(data)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/write/:content', function (req, res, next) {
    console.log(req.params.content);
    fs.writeFile('public/data/content.txt', req.params.content, function (err) {
        if (err) {
            res.send(err)
        } else {
            res.send('OK')
        }
    })
})

router.get('/write/sync/:content', function (req, res, next) {
    console.log(req.params.content);
    try {
        fs.writeFileSync('public/data/content.txt', req.params.content);
    } catch (e) {
        res.send(e)
    }
    res.send("OK")
})

router.get('/')

module.exports = router