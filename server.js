require('dotenv').config()

const app = require('./app');
const port = process.env.PORT;
const db = require('./database');
require('./redis/blocklist-access-token');
require('./redis/allowlist-refresh-token');

const routes = require('./rotas');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
