const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: "GET Api"
            });
        });

        this.app.put('/api', (req, res) => {
            res.json({
                msg: "PUT Api"
            });
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: "POST Api"
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: "DELETE Api"
            });
        });
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