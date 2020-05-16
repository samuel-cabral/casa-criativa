// usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require("./db")

// const ideas = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2621/2621018.svg",
//     title: "Cursos de Programação",
//     category: "Estudo",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2741/2741162.svg",
//     title: "Exercícios",
//     category: "Saúde",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//     url: "https://fitdance.com/"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2770/2770487.svg",
//     title: "Devocional Diário",
//     category: "Leitura",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//     url: "https://devocionaldiario.com.br/"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2663/2663838.svg",
//     title: "Lavar as mãos",
//     category: "Higiene",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//     url: "https://protex-soap.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/png/512/2755/2755310.png",
//     title: "Receitas de bolos",
//     category: "Culinária",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//     url: "https://tudogostoso.com.br/categorias/1000-bolos-e-tortas-doces"
//   },
//   {
//     img: "https://image.flaticon.com/icons/png/512/822/822174.png",
//     title: "Mantas de crochê para bebê",
//     category: "Casa",
//     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//     url: "https://dicasdemulher.com.br/manta-de-croche-para-bebe/"
//   }
// ]


// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))


// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true, //boolean
})


// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {


  db.all(`SELECT * FROM ideas`, function(err, rows) {
    // Tratar erro no banco de dados
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
    
    const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }
    
    return res.render("index.html", { ideas: lastIdeas });
	})

})

server.get("/ideias", function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    // Tratando erro no banco de dados
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()
    return res.render("ideias.html", { ideas: reversedIdeas})
  })
})

server.post("/", function(req, res) {
  // Inserir dados na tabela
	const query = `
	INSERT INTO ideas(
		image,
		title,
		category,
		description,
		link
	) VALUES (?,?,?,?,?);
	`

	const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
	]

	db.run(query, values, function(err) {
    // Tratando erro no banco de dados
		if (err) {
      console.log(err)
      return res.send("Erro no bando de dados!")
    }
    // redirecionar para a página de todas as ideias
    return res.redirect("/ideias")
  })
})

// liguei meu servidor na porta 3000
server.listen(3000)