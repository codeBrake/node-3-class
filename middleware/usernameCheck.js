module.exports = function (req, res, next) {
    if(req.body.username !== 'Zach') {
        return res.sendStatus(403)
    }
    next()
}