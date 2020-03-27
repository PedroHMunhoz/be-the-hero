const express = require("express"); //Instancia o Express na variável
const OngController = require("./controllers/OngController"); //Importa a Controller de Ongs
const IncidentController = require("./controllers/IncidentController"); //Importa a Controller de Incidents
const ProfileController = require("./controllers/ProfileController"); //Importa a Controller de Profile
const SessionController = require("./controllers/SessionController"); //Importa a Controller de Sessions
const routes = express.Router(); //Intsancia um objeto Router do Express

//Cria uma rota padrão na raiz do site, que retorna um objeto JSON
//Usando o objeto routes do Express criado acima
// routes.get("/", (request, response) => {
//   return response.json({
//     evento: "Semana OminStack 11.0",
//     aluno: "Pedro Henrique Munhoz Costa"
//   });
// });

routes.post("/sessions", SessionController.create);

//Rota de Listagem das ONGS cadastradas
routes.get("/ongs", OngController.index);

//Rota para Criação de uma ONG
routes.post("/ongs", OngController.create);

//Rota de Listagem das Incidents/Casos cadastradas para cada ONG
routes.get("/profile", ProfileController.index);

//Rota de Listagem das Incidents/Casos cadastradas
routes.get("/incidents", IncidentController.index);

//Rota para Criação de um Incident/Caso
routes.post("/incidents", IncidentController.create);

//Rota para Deletar de um Incident/Caso
routes.delete("/incidents/:id", IncidentController.delete);

//Exporta a variável routs para ficar acessível do restante da aplicação Node
module.exports = routes;
