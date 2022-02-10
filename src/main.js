const express = require('express');
const { reset } = require('nodemon');
const {engine} = require("express-handlebars");
const path = require('path');
const app = express();
const port = 3000;
const route = require('./routers/index')
const db = require('./config/db/index')
const methodOverride = require('method-override');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan')

//midleware
const checkAuthen = require('./app/middlewares/CheckLogOut')

//midleware upload
db.connect();

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.set('trustproxy', true)

app.use(express.json())
app.use(express.urlencoded({
    extended:true
  }))

app.use(session({
  secret: ' hard ',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create(
    { mongoUrl: 'mongodb://localhost:27017/review_site_db' }
    )
  }));
app.use(checkAuthen.checkLocalAuthen);

// app.use( morgan('combined'));

app.engine('.hbs',engine({
    extname:'.hbs'
}))
app.set('view engine','.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port,console.log(`app is runing with port ${port}`));