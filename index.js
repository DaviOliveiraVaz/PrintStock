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

app.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.send(
        `<script>alert("Cadastro não encontrado."); window.history.back();</script>`
      );
    }

    const match = await bcrypt.compare(senha, usuario.senha);

    if (match) {
      req.session.id_usuario = usuario._id;
      req.session.email = usuario.email;
      return res.redirect("/home");
    } else {
      return res.send(
        `<script>alert("E-mail ou senha incorretos."); window.history.back();</script>`
      );
    }
  } catch (error) {
    console.error("Erro ao consultar o banco de dados: ", error);
    return res.status(500).send(
      `<script>alert("Ocorreu um erro ao consultar o banco de dados."); window.history.back();</script>`
    );
  }
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

app.get("/sair", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao finalizar a sessão:", err);
      return res
        .status(500)
        .send(
          `<script>alert("Ocorreu um erro ao sair da conta."); window.history.back();</script>`
        );
    }
    res.redirect("/");
  });
});

app.get("/home", function (req, res) {
  try {
      const id_usuario = req.session.id_usuario;

      if (!id_usuario) {
        return res.redirect("/");
      }

      res.render("home.ejs", {});

  }catch (error) {
    console.error("Erro: ", error);
    res.status(500).send("Ocorreu um erro ao carregar a página.");
}
});

app.get("/perfil", function (req, res) {
  try {
      const id_usuario = req.session.id_usuario;

      if (!id_usuario) {
        return res.redirect("/");
      }

      res.render("perfil.ejs", {});

  }catch (error) {
    console.error("Erro: ", error);
    res.status(500).send("Ocorreu um erro ao carregar a página.");
}
});

app.get("/cadastrar_produto", function (req, res) {
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/");
    }

    res.render("cadastro_produto.ejs", {});

}catch (error) {
  console.error("Erro: ", error);
  res.status(500).send("Ocorreu um erro ao carregar a página.");
}
});

app.post('/cadastrar_produto', async function(req, res){
  try {
    const { 
      codigo, 
      nome, 
      tipo, 
      tecnologia, 
      categoria,
      estado, 
      quantidade, 
      qtde_min
    } = req.body;

    const produtoExistente = await Produto.findOne({ codigo });

    if (produtoExistente) {
      return res.send("<script>alert('Erro: Já existe um produto com este código.'); window.history.back();</script>");
    }

    const produto = new Produto({
      codigo,
      nome,
      tipo,
      tecnologia,
      categoria,
      estado,
      quantidade,
      qtde_min,
    });

    await produto.save();

    res.send("<script>alert('Produto cadastrado com sucesso!'); window.history.back();</script>");
  } catch (err) {
    res.send("<script>alert('Erro ao salvar o produto: " + err + "'); window.history.back();</script>");
  }
});

app.post("/atualizar_quantidade/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const produto = await Produto.findById(id);

    if (!produto) {
      return res.status(404).send('Produto não encontrado');
    }

    produto.quantidade = quantidade;
    await produto.save();

    res.json({ success: true, quantidade: produto.quantidade });
  } catch (error) {
    console.error("Erro ao atualizar a quantidade: ", error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar a quantidade' });
  }
});

app.get("/impressoras", async function (req, res) {
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/");
    }

    Produto.find({}).then(function (docs) {
      res.render("impressoras.ejs", { Produtos: docs });
    });
  } catch (error) {
    console.error("Erro: ", error);
    res.status(500).send("Ocorreu um erro ao carregar os produtos.");
  }
});

app.get("/suprimentos", async function (req, res) {
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/");
    }

    Produto.find({}).then(function (docs) {
      res.render("suprimentos.ejs", { Produtos: docs });
    });
  } catch (error) {
    console.error("Erro: ", error);
    res.status(500).send("Ocorreu um erro ao carregar os produtos.");
  }
});

app.get("/pecas", async function (req, res) {
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/");
    }

    Produto.find({}).then(function (docs) {
      res.render("pecas.ejs", { Produtos: docs });
    });
  } catch (error) {
    console.error("Erro: ", error);
    res.status(500).send("Ocorreu um erro ao carregar os produtos.");
  }
});

app.get("/equipamentos", async function (req, res) {
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/");
    }

    Produto.find({}).then(function (docs) {
      res.render("equipamentos.ejs", { Produtos: docs });
    });
  } catch (error) {
    console.error("Erro: ", error);
    res.status(500).send("Ocorreu um erro ao carregar os produtos.");
  }
});

app.get("/editar-produto/:id", function(req, res){
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/");
    }

  Produto.findById(req.params.id).then(function(docs){
      res.render("editar_produto.ejs", { Produto: docs});
  });

  }catch (error) {
    console.error("Erro: ", error);
    res.status(500).send("Ocorreu um erro.");
  }
});

app.post('/editar-produto/:id', async function(req, res) {
  try {
    await Produto.findByIdAndUpdate(req.params.id, {
      codigo: req.body.codigo,
      nome: req.body.nome,
      tipo: req.body.tipo,
      tecnologia: req.body.tecnologia,
      categoria: req.body.categoria,
      estado: req.body.estado,
      quantidade: req.body.quantidade,
      qtde_min: req.body.qtde_min
    });
    res.send(`
      <script>
        alert('Produto editado com sucesso!');
        window.location.href = "/home";
      </script>
    `);
  } catch (err) {
    res.send("<script>alert('Erro ao editar o produto: " + err + "'); window.history.back();</script>");
  }
});

app.get('/deletar-produto/:id', async function(req, res) {
  try {
    const id_usuario = req.session.id_usuario;

    if (!id_usuario) {
      return res.redirect("/");
    }

    await Produto.findByIdAndDelete(req.params.id);

    res.send(`
      <script>
        alert('Produto deletado com sucesso!');
        window.location.href = "/home";
      </script>
    `);

  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.send("<script>alert('Erro ao deletar o produto: " + error + "'); window.history.back();</script>");
  }
});

app.get("/teste", function (req, res) {
  res.render("TESTE.ejs", {});
});

app.listen("3000", function () {
  console.log("🚀 Servidor rodando na porta 3000!");
});