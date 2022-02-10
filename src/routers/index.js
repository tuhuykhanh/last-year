const homeRouter  = require('./home')
const acountRouter  = require('./account')

function route(app) {
    app.use('/account',acountRouter)     
    app.use('/',homeRouter)     
}
module.exports = route;