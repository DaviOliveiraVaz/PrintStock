
# 🖥️ Controle de Estoque - PrintStock

Uma aplicação web para controle de estoque com interface moderna, utilizando Node.js, Express, EJS e MongoDB.

## 🚀 Funcionalidades

- Listagem e exibição de produtos
- Alteração dinâmica da quantidade em estoque
- Interface responsiva com modais estilizados
- Confirmação de ações via modal
- Integração com MongoDB

---

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) — Ambiente de execução JavaScript
- [Express.js](https://expressjs.com/) — Framework web para Node.js
- [EJS](https://ejs.co/) — Template engine para renderizar HTML no servidor
- [MongoDB](https://www.mongodb.com/) — Banco de dados NoSQL
- [Feather Icons](https://feathericons.com/) — Ícones vetoriais leves e personalizáveis
- **HTML5, CSS3 e JavaScript** — Tecnologias padrão para desenvolvimento web

---

## 🧑‍💻 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/DaviOliveiraVaz/PrintStock
```

2. Acesse a pasta do projeto:
```bash
cd PrintStock
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor com `nodemon`:
```bash
npx nodemon index.js
```

> Certifique-se de que o [Node.js](https://nodejs.org/) está instalado em sua máquina.

---

## 💾 Conexão com MongoDB

Para funcionar corretamente, crie um arquivo `.env` com sua string de conexão MongoDB:

```env
MONGODB_URI=mongodb+srv://seu_usuario:senha@seucluster.mongodb.net/?retryWrites=true&w=majority
SESSION_SECRET=sua_chave_secreta
```

---

## 🧪 Teste Rápido

Acesse no navegador:

```
http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
📦 PrintStock
├── 📁 config
├── 📁 model
├── 📁 public
├── 📁 views
├── 📄 index.js
├── 📄 package.json
└── 📄 README.md
```

---

## 📌 Autor

Desenvolvido por **Davi de Oliveira Vaz**  
[🔗 LinkedIn](https://www.linkedin.com/in/davi-vaz-63359b217/) • [📧 Email](davi.oliveira.vaz@gmail.com)