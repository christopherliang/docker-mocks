const Koa = require('koa');
const logger = require('koa-logger');
const xmlParser = require('koa-xml-body');
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const port = 3000;

app
    .use(logger())
    .use(xmlParser({
        encoding: 'utf8',
        xmlOptions: {
            explicitArray: false
        }
    }))
    .use(bodyParser());

require('./routes')(app);

console.log('Listening on port: 3000');
app.listen(port);