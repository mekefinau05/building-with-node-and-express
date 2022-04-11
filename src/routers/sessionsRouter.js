const express = require("express");
const debug = require('debug')('app:sessionRouter')
const {MongoClient, ObjectId} = require('mongodb')
const sessions = require('../data/sessions.json')

const sessionsRouter = express.Router()
sessionsRouter.use((req, res, next) => {
    if(req.user) {
        next()
    }else{
        res.redirect('/auth/signIn')
    }
})


sessionsRouter.route('/').get((req, res) => {
    const url = 
    'mongodb+srv://<username>:<password>@globomantics.ajv0r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbName = 'globomantics'

    (async function mongo() {
        let client
        try {
            client = await MongoClient.connect(url)
            debug('Connect to the mongo DB')

            const db = client.db(dbName)

            const sessions = await db.collection('sessions').find().toArray()
            res.render = ('sessions', {sessions})

        } catch (error) {
            debug(error.stack)
        }
        client.close()
    })
})
sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id
    const url = 
    'mongodb+srv://<username>:<password>@globomantics.ajv0r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const dbName = 'globomantics'

    (async function mongo() {
        let client
        try {
            client = await MongoClient.connect(url)
            debug('Connect to the mongo DB')

            const db = client.db(dbName)

            const sessions = await db.collection('sessions').findOne({_id: new ObjectId(id)})
            res.render = ('sessions', {session,})

        } catch (error) {
            debug(error.stack)
        }
        client.close()
    })
})
    
  

module.exports = sessionsRouter;