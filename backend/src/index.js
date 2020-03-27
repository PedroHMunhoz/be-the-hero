const express = require("express"); //Importa a lib do Express pra dentro desta variável
const cors = require("cors"); //Importa o CORS para a aplicação
const routes = require("./routes"); //Importa a rota exportada do pacote routes.js

//Instancia um novo express na variável app
const app = express();

//Informa que o app deve usar a lib do CORS para segurança
app.use(cors());

//Informa ao Express para converter o corpo da requisição para JSON, permitindo a leitura do Body quando vier nesse formato
//Importante vir ANTES de todas as rotas, para deixar o Express configurado
app.use(express.json());

//Informa ao Express pra usar as rotas do arquivo routes
app.use(routes);

/**
 *  Rota / Recurso
 */

/**
 * Métodos HTTP:
 * GET: Buscar/listar uma informação no back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de Parâmetros:
 *
 * Query Params: parâmetros nomeados enviados na rota após o símbolo de "?" (Filtros, paginação) -> /users?Diego&idade=25 | Acessar através do request.query (Formato JSON)
 * Route Params: Parâmetros utilizados para identificar recursos -> /users/:id | Acessar através do request.params (Formato JSON)
 * Request Body: Corpo da requisção, utilizado para criar/alterar recursos -> /users | Acessar através do request.body (Formato JSON)
 */

/**
 * Tipos de Bancos de Dados
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */

/**
 * Driver: SELECT * FROM USERS
 * Query Builder: table('users').select('*').where()
 */

//Informa a porta onde a aplicação irá rodar, exemplo localhost:3333 no browser
app.listen(3333);

//npm install nodemon -D -> Para instalar o Nodemon somente em DEV
