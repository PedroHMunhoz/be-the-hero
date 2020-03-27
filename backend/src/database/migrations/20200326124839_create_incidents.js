exports.up = function(knex) {
  return knex.schema.createTable("incidents", function(table) {
    table.increments(); //Cria uma coluna auto_increment na tabela
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();
    table.string("ong_id").notNullable(); //Para servir de chave pra tabela ONGS

    //Cria a FK com ONGS
    table
      .foreign("ong_id")
      .references("id")
      .inTable("ongs");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("incidents");
};
