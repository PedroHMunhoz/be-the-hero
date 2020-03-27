const knex = require("knex"); //Instancia o Knex
const configuration = require("../../knexfile"); //Busca o arquivo de configurações do Knex
const connection = knex(configuration.development); //Seta no Knex a configuração que está na tag development do arquivo

module.exports = connection; //Exporta a conexão para uso em outros locais
