const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Public Directory
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port)
        });
    }

}

module.exports = Server;