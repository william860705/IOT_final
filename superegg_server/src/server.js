const express = require('express');

//const postRouter = require('./routers/posts.js');
//const todoRouter = require('./routers/todos.js');
const sleepRouter = require('./routers/sleeps.js');
const phoneRouter = require('./routers/phones.js');
const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

// app.use(requestLogger);
app.use(express.static('dist', {
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'public, s-maxage=86400');
    }
}));
//app.use('/api', postRouter);
//app.use('/api', todoRouter);
app.use('/api', sleepRouter);
app.use('/api', phoneRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port =5431;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
