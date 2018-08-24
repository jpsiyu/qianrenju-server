const common = require('./common.js')
const {Feedback} = require('./database.js')

const addFeedback = (req, res, database) => {
    const feedback = new Feedback({
        owner: req.body.owner,
        msg: req.body.msg,
        createDate: new Date(),
    })

    const insertCallback = feedback => {
        if(feedback)
            common.serverMsg(res, 200, true, 'ok', {feedback})
        else
            common.serverMsg(res, 200, false, 'error', null)
    }
    database.addFeedback(feedback, insertCallback, common.serverErrMsg)
}

module.exports = {
    addFeedback
}