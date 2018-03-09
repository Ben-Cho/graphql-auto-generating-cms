if (NODE_ENV === 'development') {
  require('./src/app.jsx')
}
else {
  require('./lib/app.jsx')
}
