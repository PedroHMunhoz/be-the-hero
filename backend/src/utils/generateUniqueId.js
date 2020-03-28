const crypto = require("crypto"); //Importa o pacote crypto, disponíve no Node
module.exports = function gerenateUniqueId() {
  return crypto.randomBytes(4).toString("HEX");
};
