const homeRouter  = require('./home')
const acountRouter  = require('./account')
const adminRouter  = require('./admin')


function route(app) {
    app.use('/account',acountRouter)
    app.use('/admin',adminRouter)     
    app.use('/',homeRouter)     
}
module.exports = route;