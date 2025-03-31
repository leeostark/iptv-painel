// painel IPTV com múltiplos usuários e validade - Node.js + Express

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

// carregar usuários do arquivo JSON
function loadUsers() {
  try {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

app.get("/", (req, res) => {
  res.send(`<form method="POST" action="/login">
      <input name="username" placeholder="Usuário" />
      <input name="password" type="password" placeholder="Senha" />
      <button type="submit">Entrar</button>
  </form>`);
});

app.post("/login", (req, res) => {
  const users = loadUsers();
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.send("Usuário ou senha inválidos.");

  const today = new Date().toISOString().split("T")[0];
  if (today > user.validUntil) return res.send("Sua conta expirou.");

  res.send(`Login OK! <br><a href="/lista/${user.username}.m3u8">Abrir Lista IPTV</a>`);
});

// rota para entregar a lista .m3u8 personalizada
app.get("/lista/:user.m3u8", (req, res) => {
  const users = loadUsers();
  const user = users.find(u => u.username === req.params.user);

  if (!user) return res.status(403).send("Usuário não encontrado");
  const today = new Date().toISOString().split("T")[0];
  if (today > user.validUntil) return res.status(403).send("Conta expirada");

  res.set("Content-Type", "application/x-mpegURL");
  res.send(`#EXTM3U
#EXTINF:-1,ESPN 4
https://embedcanaisdetv.site/espn4/video.m3u8
#EXTINF:-1,ESPN 5
https://embedcanaisdetv.site/espn5/video.m3u8
#EXTINF:-1,ESPN 6
https://embedcanaisdetv.site/espn6/video.m3u8
#EXTINF:-1,MAX
https://embedcanaisdetv.site/max/video.m3u8
#EXTINF:-1,NOSSO FUTEBOL
https://embedcanaisdetv.site/nossofutebol/video.m3u8
#EXTINF:-1,Band SP
https://embedcanaisdetv.site/bandsp/video.m3u8
#EXTINF:-1,Globo BA
https://embedcanaisdetv.site/globoba/video.m3u8
#EXTINF:-1,Globo MG
https://embedcanaisdetv.site/globomg/video.m3u8
#EXTINF:-1,Globo RS
https://embedcanaisdetv.site/globors/video.m3u8
#EXTINF:-1,Globo SP
https://embedcanaisdetv.site/globosp/video.m3u8
#EXTINF:-1,Record MG
https://embedcanaisdetv.site/recordmg/video.m3u8
#EXTINF:-1,RedeTV
https://embedcanaisdetv.site/redetv/video.m3u8
#EXTINF:-1,A&E
https://embedcanaisdetv.site/aee/video.m3u8
#EXTINF:-1,Adult Swim
https://embedcanaisdetv.site/adultswim/video.m3u8
#EXTINF:-1,AMC
https://embedcanaisdetv.site/amc/video.m3u8
#EXTINF:-1,Cinemax
https://embedcanaisdetv.site/cinemax/video.m3u8
#EXTINF:-1,Darkflix
https://embedcanaisdetv.site/darkflix/video.m3u8
#EXTINF:-1,HBO
https://embedcanaisdetv.site/hbo/video.m3u8
#EXTINF:-1,HBO 2
https://embedcanaisdetv.site/hbo2/video.m3u8
#EXTINF:-1,HBO Family
https://embedcanaisdetv.site/hbofamily/video.m3u8
#EXTINF:-1,HBO Mundi
https://embedcanaisdetv.site/hbomundi/video.m3u8
#EXTINF:-1,HBO Plus
https://embedcanaisdetv.site/hboplus/video.m3u8
#EXTINF:-1,HBO Pop
https://embedcanaisdetv.site/hbopop/video.m3u8
#EXTINF:-1,HBO Signature
https://embedcanaisdetv.site/hbosignature/video.m3u8
#EXTINF:-1,HBO Xtreme
https://embedcanaisdetv.site/hboxtreme/video.m3u8
#EXTINF:-1,Megapix
https://embedcanaisdetv.site/megapix/video.m3u8
#EXTINF:-1,Sony Channel
https://embedcanaisdetv.site/sonychannel/video.m3u8
#EXTINF:-1,Space
https://embedcanaisdetv.site/space/video.m3u8
#EXTINF:-1,Spark TV Luz e Amor
https://embedcanaisdetv.site/sparktvluzeamor/video.m3u8
#EXTINF:-1,Star Channel
https://embedcanaisdetv.site/starchannel/video.m3u8
#EXTINF:-1,Studio Universal
https://embedcanaisdetv.site/studiouniversal/video.m3u8
#EXTINF:-1,Telecine Action
https://embedcanaisdetv.site/tcaction/video.m3u8
#EXTINF:-1,Telecine Cult
https://embedcanaisdetv.site/tccult/video.m3u8
#EXTINF:-1,Telecine Fun
https://embedcanaisdetv.site/tcfun/video.m3u8
#EXTINF:-1,Telecine Pipoca
https://embedcanaisdetv.site/tcpipoca/video.m3u8
#EXTINF:-1,Telecine Premium
https://embedcanaisdetv.site/tcpremium/video.m3u8
#EXTINF:-1,Telecine Touch
https://embedcanaisdetv.site/tctouch/video.m3u8
#EXTINF:-1,TNT
https://embedcanaisdetv.site/tnt/video.m3u8
#EXTINF:-1,TNT Novelas
https://embedcanaisdetv.site/tntnovelas/video.m3u8
#EXTINF:-1,TNT Series
https://embedcanaisdetv.site/tntseries/video.m3u8
#EXTINF:-1,Universal TV
https://embedcanaisdetv.site/universaltv/video.m3u8
#EXTINF:-1,USA
https://embedcanaisdetv.site/usa/video.m3u8
#EXTINF:-1,Warner Channel
https://embedcanaisdetv.site/warner/video.m3u8
#EXTINF:-1,Animal Planet
https://embedcanaisdetv.site/animalplanet/video.m3u8
#EXTINF:-1,Discovery Channel
https://embedcanaisdetv.site/discoverychannel/video.m3u8
#EXTINF:-1,Discovery H&H
https://embedcanaisdetv.site/discoveryhh/video.m3u8
#EXTINF:-1,Discovery Science
https://embedcanaisdetv.site/discoveryscience/video.m3u8
#EXTINF:-1,Discovery Theater
https://embedcanaisdetv.site/discoverytheater/video.m3u8
#EXTINF:-1,Discovery World
https://embedcanaisdetv.site/discoveryworld/video.m3u8
#EXTINF:-1,ID Discovery
https://embedcanaisdetv.site/discoveryid/video.m3u8
#EXTINF:-1,Discovery Turbo
https://embedcanaisdetv.site/discoveryturbo/video.m3u8
#EXTINF:-1,History
https://embedcanaisdetv.site/history/video.m3u8
#EXTINF:-1,History 2
https://embedcanaisdetv.site/history2/video.m3u8`);
});

app.listen(PORT, () => {
  console.log("Painel IPTV rodando na porta " + PORT);
});
