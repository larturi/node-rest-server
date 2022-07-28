const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Database connection
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Parse Body
        this.app.use(express.json());

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