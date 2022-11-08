// Importações da bibliotecas.
const fs        = require("fs");
const path      = require("path");
const express   = require("express");

const app       = express();

// Manipuladores do banco de dados.
const db        = require("./models/db");
const Usuario   = require("./models/User");
const Telefone  = require("./models/Telefone");

// Apontamentos de pastas.
app.use(express.json())
app.use(express.static('public', {}));
app.use(express.static(path.join(__dirname, "views")));

// Rotas.
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/views/index.html`);
});

// Rotas do cadastro.
app.get("/cadastro", (req, res) => {
	res.sendFile(`${__dirname}/cadastro.html`)
});

app.post("/cadastro", async (req, res) => {
	try {
		// Armazena os dados do novo usuário (temporariamente).
		const novoUsuario = await Usuario.create({
			nome: req.body.user.nome,
			idade: req.body.user.idade
		});

		// Cria o novo telefone puxando o id do novo usuário.
		const novoTelefone = await Telefone.create({
			numero: req.body.user.numero,
			idContato: novoUsuario.id
		});

		res.send({
			erro: false,
			mensagem: "Cadastro realizado com sucesso."
		});
	} catch (err) {
		res.send({
			erro: true,
			mensagem: "Não foi possível realizar o cadastro tente novamente."
		});
	}
});

// Rotas da Visualização
app.get("/visualizar", (req, res) => {
	res.sendFile(`${__dirname}/visalizar.html`);
});

app.post("/visualizar", async (req, res) => {
	try {
		// Faz o query no sql dos dados necessários.
		const querySQL = await db.query(
			'SELECT c.id, c.nome, c.idade, t.numero, t.idContato FROM contatos c INNER JOIN telefones t ON c.id = t.idContato;'
		);

		res.send(querySQL[0]);
	}
	catch (err) {
		res.send({
			erro: true,
			mensagem: "Não foi possivel trazer os dados, por favor tente novamente."
		});
	}
});

// Define a rota de deletar o usuário.
app.post("/delete", async (req, res) => {
	try {

		// Faz a parada do código em caso não tenha o dado do ID.
		if ( !req.body.user.id ) {
			throw new Error("Não foi recebido os dados corretos tente novamente");
		}
		
		const user = { id: req.body.user.id };

		const dataTextQuery = await db.query(`SELECT c.id, c.nome, c.idade, t.idContato, t.numero FROM contatos c INNER JOIN telefones t ON c.id = ${Number(user.id)} AND t.idContato = ${Number(user.id)}`);
		const dataText = {
			nome: dataTextQuery[0][0].nome,
			numero: dataTextQuery[0][0].numero
		}

		// Faz a função de deletar primeiramente no telefone.
		const telData = await Telefone.destroy({
			where: {
				idContato: Number(user.id)
			}
		});

		// Deleta o usuário.
		const userData = await Usuario.destroy({
			where: {
				id: Number(user.id)
			}
		});


		/**
		 * Cria o arquivo de log de exclusão.
		 */

		// Cria uma pasta pra logs de exclusão.
		if (!fs.existsSync("logs")){
			fs.mkdirSync("logs");
		}

		// Cria o arquivo.

		let textTemplate = "";
		textTemplate += "Nome do log:    \"Excluir\"\n";
		textTemplate += "Fonte:          \"/delete\"\n";
		textTemplate += "Metodo:         \"post\"\n";
		textTemplate += `Data da ação:   "${String(new Date())}"\n`;
		textTemplate += "Dados: {\n";
		textTemplate += `	Nome: '${dataText.nome}',\n`;
		textTemplate += `	Numero: '${dataText.numero}'\n`;
		textTemplate += "}\n\n\n";

		fs.appendFile('./logs/log.txt', textTemplate, function (err) {
			if (err) throw err;
			console.log('Log salvo com sucesso!\n');
		});

		res.send({
			erro: false,
			mensagem: "Usuário deletado com sucesso."
		})
	} catch (err) {
		res.send({
			erro: true,
			mensagem: "Não foi possível deletar usuário específicado, tente novamente." + err
		})
	}
});

app.post("/alter", async (req, res) => {
	try {
		if ( req.body.user ) {
			const user = {
				id: req.body.user.id,
				nome: req.body.user.nome,
				idade: req.body.user.idade,
				numero: req.body.user.numero
			};

			// Faz update no usuário.
			const newUser = await Usuario.update({
				nome: user.nome,
				idade: user.idade,
			}, {
				where: {
					id: user.id
				}
			});

			// Faz update no número.
			const newTel = await Telefone.update({
				numero: user.numero,
			}, {
				where: {
					idContato: user.id
				}
			});

			res.send({
				erro: false,
				mensagem: "Usuário alterado com sucesso!"
			});
		} else {
			throw new Error("Não foi possível alterar os dados, tente novamente.");
		}
	} catch ( err ) {
		res.send({
			erro: true,
			mensagem: "Não foi possível alterar os dados, tente novamente."
		});
	}
});

app.post("/filter", async (req, res) => {
	try {
		if ( req.body.filterData ) {
			const filterData = {
				by: req.body.filterData.by,
				data: req.body.filterData.data
			}

			
			switch(filterData.by) {
				case 'nome':
					const sqlContatos = await db.query(`select c.id, c.nome, c.idade, t. numero, t.idContato  from contatos c inner join telefones t where c.nome = '${filterData.data}' and c.id = t.idContato;`);
					const sendDataContatos = {
						erro: false,
						data: sqlContatos[0]
					};
					res.send(sendDataContatos);
					break;
					
				case 'telefone':
					const sqlTelefones = await db.query(`select c.id, c.nome, c.idade, t. numero, t.idContato  from contatos c inner join telefones t where t.numero = '${filterData.data}' and c.id = t.idContato;`);
					const sendDataTelefones = {
							erro: false,
							data: sqlTelefones[0]
						};
					res.send(sendDataTelefones);
					break;
					
			}

		} else {
			throw new Error("Dados não compatíveis para a requisição.")
		}
	} catch(err) {
		res.send({
			erro: true,
			mensagem: "Ocorreu um erro na filtragem tente novamente." + err
		});
	}
});

// Define a porta do servidor.
try {
	app.listen(8000);
} catch ( err ) {
	console.log("Não foi possivel roda o servidor.");
}