const conexao = require("../config/database");
const { Schema, model } = require("mongoose");

const ProdutoSchema = new Schema({
  codigo:       { type: String, required: true },
  nome:         { type: String, required: true },
  tipo:         { type: String, required: true },
  quantidade:   { type: Number, required: true },
});

module.exports = model("Produto", ProdutoSchema, "produtos");