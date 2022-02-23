const homeRouter  = require('./home')
const acountRouter  = require('./account')
const adminRouter  = require('./admin')
const postRouter = require('./post')

function route(app) {
    
    app.use('/getvalue',postRouter)
    app.use('/account',acountRouter)
    app.use('/admin',adminRouter)     
    app.use('/post',postRouter)     
    app.use('/',homeRouter)     
}
module.exports = route;