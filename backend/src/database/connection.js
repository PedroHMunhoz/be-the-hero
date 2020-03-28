const knex = require("knex"); //Instancia o Knex
const configuration = require("../../knexfile"); //Busca o arquivo de configurações do Knex

//Configura o ambiente que está sendo usado, através da variávle de ambiente criada
const config =
  process.env.NODE_ENV === "test"
    ? configuration.test
    : configuration.development;

const connection = knex(config); //Seta no Knex a configuração a ser usada, conforme configurado na variável config acima

module.exports = connection; //Exporta a conexão para uso em outros locais
