const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Base de Datos Mongo Online");
    } catch (error) {
        console.error(error);
        throw new Error("Error al iniciar Mongoose")
    }
}

module.exports = {
    dbConnection
}