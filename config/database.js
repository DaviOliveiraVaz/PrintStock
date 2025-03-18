require('dotenv').config();

const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

console.log("🔍 Tentando conectar ao MongoDB...");

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Conectado ao MongoDB com sucesso!"))
    .catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

module.exports = mongoose;