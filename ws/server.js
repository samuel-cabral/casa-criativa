// usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();


const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2621/2621018.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2741/2741162.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    url: "https://fitdance.com/"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2770/2770487.svg",
    title: "Devocional Diário",
    category: "Leitura",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    url: "https://devocionaldiario.com.br/"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2663/2663838.svg",
    title: "Lavar as mãos",
    category: "Higiene",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    url: "https://protex-soap.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/png/512/2755/2755310.png",
    title: "Receitas de bolos",
    category: "Culinária",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    url: "https://tudogostoso.com.br/categorias/1000-bolos-e-tortas-doces"
  },
  {
    img: "https://image.flaticon.com/icons/png/512/822/822174.png",
    title: "Mantas de crochê para bebê",
    category: "Casa",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    url: "https://dicasdemulher.com.br/manta-de-croche-para-bebe/"
  }
]


// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))


// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true, //boolean
})


// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

  const reversedIdeas = [...ideas].reverse()

  let lastIdeas = []
  for (let idea of reversedIdeas) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea);
    }
  }
  
  return res.render("index.html", { ideas: lastIdeas });
})

server.get("/ideias", function(req, res) {

  const reversedIdeas = [...ideas].reverse()

  return res.render("ideias.html", { ideas: reversedIdeas})
})

// liguei meu servidor na porta 3000
server.listen(3000)