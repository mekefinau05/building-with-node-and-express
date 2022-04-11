const passport = require('passport')
require('./strategies/local.strategy')()

module.exports = function passportConfig(app){
    app.use(passportinitialize())
    app.use(passport.session())

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}