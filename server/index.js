require('dotenv').config();
const app = require('./server');

const { PORT = 3332, HOST = '0.0.0.0' } = process.env;

const server = app.listen(PORT, HOST, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});

require('./process-handlers')(server);
