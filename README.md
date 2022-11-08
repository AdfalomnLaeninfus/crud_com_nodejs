# CRUD

Projeto feito como um desafio dos meus conhecimentos com javascript e implementação
com node-js, tal projeto feito é para a complementar o teste do requisitado no
documento de estágio da empresa DAVINTI Soluções em Tecnologia.

## Instalação
Para que você consiga rodar o projeto em sua máquina para poder testar, você
deverá ter alguns programas e frameworks instalados na sua máquina afim de
que o sistema funcione sem problemas, são eles:

### Programas
- Node-JS ---------- [Site do Node-JS](https://nodejs.org/en/download/)
- MySQL Server ----- [Site do MySQL Server](https://dev.mysql.com/downloads/file/?id=488055)

### Framework
- Express ------- ( É um framework que fornece utilitário HTTP )
- Sequelize ----- ( É um framework de ORM que facilita a manipulação do banco de dados )

## Instalando as dependências
Para instalar os pacotes usados no projeto é um processo muito simples
basta apenas você executar o seguinte comando:

        npm install

Caso não consiga sugiro seguir os seguintes passos a segui.


## Instalando os frameworks individualmente.

Comando de instalação do express no Node-JS:

        npm install express --save

Comando de instalação do Sequelize no Node-JS:

        npm install sequelize

## Configurando o acesso ao banco de dados

O projeto para que o projeto consiga usar o banco de dados e fazer o cadastro de usuário e outras gestões que há de mexer com os dados do usuário precisamos configurar um arquivo para que isso seja feito, na pasta  **models/** edite o arquivo **db.js** os seguintes dados:

```js
const sequelize = new Sequelize(
    "Nome_do_banco_de_dados",
    "Nome_do_usuário_do_banco_de_dados",
    "Senha_do_banco_de_dados",
    {
        host: "localhost",
        dialect: "mysql"
    }
);
```

# Rodando o programa

Após o instalar todos os pacotes necessários, para iniciar o servidor usamos o seguinte comando no terminal:

        npm start

Isso irá iniciar o servido local para que possamos usar, o servidor local pode ser acessado pelo seguinte link:

http://localhost:8000/