// Database 
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "Nome_do_banco_de_dados",
    "Nome_do_usuário_do_banco_de_dados",
    "Senha_do_banco_de_dados",
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