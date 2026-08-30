const express = require('express');

const app = express();
app.use(express.json());

// Coleção de produtos mantida em memória.
let produtos = [
  { id: 1, descricao: 'Teclado Mecânico', preco: 249.9, categoria: 'Periféricos', estoque: 15 },
  { id: 2, descricao: 'Mouse sem fio', preco: 89.9, categoria: 'Periféricos', estoque: 25 },
  { id: 3, descricao: 'Monitor 24 polegadas', preco: 899.9, categoria: 'Monitores', estoque: 8 },
  { id: 4, descricao: 'Headset Gamer', preco: 199.9, categoria: 'Áudio', estoque: 12 },
  { id: 5, descricao: 'SSD 1TB', preco: 549.9, categoria: 'Armazenamento', estoque: 20 }
];

let proximoId = 6;

// GET /produtos - retorna todos os produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// GET /produtos/:id - retorna um produto específico
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  res.status(200).json(produto);
});

// POST /produtos - cadastra um novo produto
app.post('/produtos', (req, res) => {
  const novoProduto = {
    id: proximoId,
    descricao: req.body.descricao,
    preco: req.body.preco,
    categoria: req.body.categoria,
    estoque: req.body.estoque
  };

  proximoId++;
  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
});

// PUT /produtos/:id - altera um produto existente
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  produto.descricao = req.body.descricao;
  produto.preco = req.body.preco;
  produto.categoria = req.body.categoria;
  produto.estoque = req.body.estoque;

  res.status(200).json(produto);
});

// DELETE /produtos/:id - exclui um produto
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = produtos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  produtos.splice(indice, 1);

  res.status(204).send();
});

// O Render define a porta pela variável de ambiente PORT.
const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log('API rodando na porta ' + porta);
});
