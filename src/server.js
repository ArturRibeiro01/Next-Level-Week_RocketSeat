const express = require("express")
const server = express()


// configurar pasta pública
server.use(express.static("public"))



// Utilizando Template Engine ( Nunjucks) 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true

})


// Configurar os caminhos da minha aplicação. 
// Página inicial

// Req = Requisição 
// Res -= Resposta
server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um título"})
}) 

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
}) 
 



// Ligar o servidor 
server.listen(3000)