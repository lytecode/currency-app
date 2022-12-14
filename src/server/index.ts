import app from '../app';
import http from 'http';
import config from '../config';

const port = config.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);