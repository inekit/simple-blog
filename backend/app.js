const express = require('express');
const passport = require('passport');

const bodyParser = require('body-parser');

const { spawnSync } = require('child_process');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

var app = require('./app-preferences');

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRouter);
app.use('/api/admin', adminRouter);

app.use(function (req, res, next) {
  const err = new Error('Страница не найдена!');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

const host = '127.0.0.1';
const port = process.env.PORT ?? 10000;
let server = app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));

const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://192.168.0.102:8080', 'https://188.255.83.97'],
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('error', (socket) => {
  console.log('err', err);

  const child = spawnSync('sudo', ['killall', '-9', 'node']);
  if (child.error) console.log(child.error);
});

server.on('error', (err) => {
  console.log('err', err);

  const child = spawnSync('sudo', ['killall', '-9', 'node']);
  if (child.error) console.log(child.error);
});
