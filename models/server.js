const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World')
        });
    }

    middlewares() {
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