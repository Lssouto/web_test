var router = require('express')();

var body_parser = require('body-parser');
router.use(body_parser.urlencoded({ extended: false }));
router.use(body_parser.json());

var produtos = [
 {codigo: 1, tipo:"Escolar", nome:"Caderno", qtd: 10, preco: 100, tpNeg:"venda"},
 {codigo: 2, tipo:"Escritorio", nome:"Mesa", qtd: 2, preco: 180, tpNeg:"compra"},
 {codigo: 3, tipo:"Eletronico", nome:"Impressora", qtd: 1, preco: 1000, tpNeg:"venda"},
 {codigo: 4, tipo:"Informatica", nome:"Mouse", qtd: 1, preco: 80, tpNeg:"venda"},
 {codigo: 5, tipo:"Escola", nome:"Caderno", qtd: 100, preco: 20, tpNeg:"compra"}
];

router.get('/produtos', function (req, res) {
  res.send(produtos);
});

router.post('/produtos', function (req, res) {
   req.body.codigo = (produtos[produtos.length-1].codigo)+1;
   produtos.push(req.body);
   res.end();
});

router.options('/produtos', function (req, res) {
  res.end();
});

module.exports = router;