const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../db/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Routes Paths
        this.paths = {
            auth:        '/api/auth',
            categories:  '/api/categories',
            products:    '/api/products',
            search:      '/api/search',
            uploads:     '/api/uploads',
            users:       '/api/users',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/category.routes'));
        this.app.use(this.paths.products, require('../routes/product.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Parse Body
        this.app.use(express.json());

        // Public Directory
        this.app.use(express.static('public'));

        // File Upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening on port', this.port)
        });
    }

}

module.exports = Server;