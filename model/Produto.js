const conexao = require("../config/database");
const { Schema, model } = require("mongoose");

const ProdutoSchema = new Schema({
  codigo:       { type: String, required: true },
  nome:         { type: String, required: true },
  tipo:         { type: String, required: true },
  quantidade:   { type: Number, required: true },
  estado:       { type: String, required: true },
  tecnologia:   { type: String, required: true },
  categoria:    { type: String, required: true },
  qtde_min:     { type: Number, required: true },
  qtde_max:     { type: Number, required: false },
  valor:        { type: Number, required: false },
});

module.exports = model("Produto", ProdutoSchema, "produtos");