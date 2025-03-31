
const express = require('express');
const app = express();
const PORT = process.env.PORT;

const users = [
    { username: "admin", password: "1234", validUntil: "2025-12-31" },
];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`<form method="POST" action="/login">
        <input name="username" placeholder="Usuário" />
        <input name="password" type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
    </form>`);
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const today = new Date().toISOString().split("T")[0];
        if (today <= user.validUntil) {
            return res.send(`Login OK<br><a href="/lista.m3u8">Abrir Lista</a>`);
        } else {
            return res.send("Sua conta expirou.");
        }
    }
    res.send("Usuário ou senha inválidos.");
});

app.get("/lista.m3u8", (req, res) => {
    res.set("Content-Type", "application/x-mpegURL");
    res.send(`#EXTM3U
#EXTINF:-1,Canal Teste
https://embedcanaisdetv.site/espn4/video.m3u8`);
});

app.listen(PORT, () => {
    console.log("Painel IPTV rodando na porta " + PORT);
});
