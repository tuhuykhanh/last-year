const mongoose = require('mongoose')

async function connect(){
        try {
            await mongoose.connect('mongodb://localhost:27017/review_site_db',{
                //  useCreateIndex:true,
                // useUnifiedTopology: true,  
                useNewUrlParser: true,
                useUnifiedTopology: true,     
            })
            console.log('connected to DB!')
        } catch (error) {
            handleError(error);
            console.log('connect failure!')
        }

}

module.exports = { connect }



