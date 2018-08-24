const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose')

class Database {

    constructor() {
        this.db = null
    }

    err(err, errCallback) {
        if (errCallback)
            errCallback()
        console.log('Err', err)
    }

    // connect to database
    connect(callback) {
        //mongoose.connect('mongodb://localhost/tombstone-wx')
        const options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        }
        mongoose.connect('mongodb://jpsiyu:123456Tombstone@ds151530.mlab.com:51530/tombstone', options)
        this.db = mongoose.connection
        this.db.on('error', err => this.err(err))
        this.db.on('open', () => {
            callback()
        })
    }

    // fetch stones
    fetchStones(owner, callback, errCallback) {
        Stone.find({ owner }, (err, stones) => {
            if (err)
                this.err(err, errCallback)
            else
                callback(stones)
        })
    }

    // insert stone
    insertStone(stone, callback, errCallback) {
        stone.save((err, stone) => {
            if (err)
                this.err(err, errCallback)
            else
                callback(stone)
        })
    }

    // find stone by id
    findStoneById(id, callback, errCallback) {
        Stone.findById(id, (err, stone) => {
            if (err)
                this.err(err, errCallback)
            else
                callback(stone)
        })
    }

    //delte stone by id
    deleteStoneById(id, owner, callback, errCallback) {
        const objId = ObjectId(id)
        Stone.remove({ _id: id, owner }, (err) => {
            if (err)
                this.err(err, errCallback)
            else
                callback()

        })
    }

    addFeedback(feedback, callback, errCallback) {
        feedback.save((err, feedback) => {
            if (err)
                this.err(err, errCallback)
            else
                callback(feedback)
        })
    }
}

const stoneSchema = mongoose.Schema({
    owner: Object,
    name: String,
    age: Number,
    gender: String,
    location: [Number],
    locationName: String,
})
const Stone = mongoose.model('Stone', stoneSchema)

const feedbackSchema = mongoose.Schema({
    owner: Object,
    msg: String,
    createDate: Date,
})
const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = {
    Database,
    Stone,
    Feedback,
}