// Importações das bibliotecas.
const db        = require("./db");
const Sequelize = require("sequelize");

// Usuário modelo
const Usuario = db.define("contato", {
    id: {
        type: Sequelize.INTEGER(length=14),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    idade: {
        type: Sequelize.STRING(length=10),
        allowNull: false,
    }
});

Usuario.sync();

// Exportação.
module.exports = Usuario;