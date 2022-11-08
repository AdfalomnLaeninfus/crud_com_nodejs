// Importações de bibliotecas.
const db        = require("./db");
const Sequelize = require("sequelize");

// Usuário modelo.
const Usuario = require("./User");

// Telefone modelo.
const Tel = db.define("telefone", {
    id: {
        type: Sequelize.INTEGER(length=14),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    numero: {
        type: Sequelize.STRING(length=16),
        allowNull: false
    },
    idContato: {
        type: Sequelize.INTEGER(length=14),
        allowNull: false
    }
});

Tel.belongsTo(Usuario, { foreignKey: "idContato", allowNull: false })

Tel.sync();

// Exportação.
module.exports = Tel;