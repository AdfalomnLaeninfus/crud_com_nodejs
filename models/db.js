// Database 
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "crud",
    "adr",
    "1234",
    {
        host: "localhost",
        dialect: "mysql"
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Conexão ao banco de dados realizado com sucesso.");
    })
    .catch(() => {
        console.log("Error: Não foi possivel efetuar conexão ao banco de dados.")
    })

// Exportação.
module.exports = sequelize;