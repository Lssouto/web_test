var router = require('express')();

var produtos = [
 {codigo: 1, tipo:"Escolar", nome:"Caderno", qtd: 10, preco: 100, tpNeg:"venda"},
 {codigo: 2, tipo:"Escritorio", nome:"Mesa", qtd: 2, preco: 180, tpNeg:"compra"},
 {codigo: 3, tipo:"Eletronico", nome:"Impressora", qtd: 1, preco: 1000, tpNeg:"venda"},
 {codigo: 4, tipo:"Informatica", nome:"Mouse", qtd: 1, preco: 80, tpNeg:"venda"},
 {codigo: 5, tipo:"escola", nome:"caderno", qtd: 100, preco: 20, tpNeg:"compra"},
 
];

router.get('/produtos', function (req, res) {
  res.send(produtos);
});

router.post('/produtos', function (req, res) {
  var produto = req.body;
  produtos.push(JSON.parse(produto));
  cd = cd +1;
  res.end();
});

router.options('/produtos', function (req, res) {
  res.end();
});

module.exports = router;