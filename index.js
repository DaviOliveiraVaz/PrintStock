const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const conexao = require("./config/database");
const Usuario = require("./model/Usuario");
const Produto = require("./model/Produto");
require('dotenv').config();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", function (req, res) {
  res.render("login.ejs", {});
});

app.get("/cadastro", function (req, res) {
  res.render("cadastro.ejs", {});
});

app.post('/cadastro', async function(req, res){
  try {
    const hash = await bcrypt.hash(req.body.senha, saltRounds);

    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: hash,
      telefone: req.body.telefone
    });

    await usuario.save();
    res.redirect("/");
  } catch (err) {
    res.send("Erro ao salvar o usuário: " + err);
  }
});

app.listen("3000", function () {
  console.log("🚀 Servidor rodando na porta 3000!");
});