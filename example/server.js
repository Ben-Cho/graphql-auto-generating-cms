import graphQLHTTP from 'express-graphql';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
import schema from './schema';
import CMSConfig from './cms_config';
import config from '../webpack.config';

const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * you can just use "import graphqlCMS from '';"
 * I use NODE_ENV only for development reason to be able use hot module reloading
 */
const folder = (NODE_ENV === 'development') ? 'src' : 'lib';
const graphqlCMS = require(`../${folder}/middleware`).default;

const app = express();

if (NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}
else {
  app.get('/app.js', (req, res) => res.sendFile(path.resolve(__dirname, './public/app.js')))
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')))
}

// running graphqlCMS middleware
app.use('/graphql_cms_endpoint', graphqlCMS(CMSConfig));
// running graphQL API endpoint
app.use('/graphql', graphQLHTTP({ schema, graphiql: true, pretty: true }));
// running server on http://localhost:7700/

app.listen(7700, function () {
  console.log('Example app listening on port 7700!\n');
});
