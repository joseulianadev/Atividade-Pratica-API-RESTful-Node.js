# API de Produtos

Trabalho da disciplina de DIAW. É uma API REST feita com Node.js e Express que permite
consultar, cadastrar, alterar e excluir produtos.

Os produtos ficam guardados em memória, num array dentro do arquivo `index.js`. Não usei
banco de dados, então toda vez que a API reinicia os dados voltam a ser os 5 produtos iniciais.

## Rotas

- `GET /produtos` lista todos os produtos
- `GET /produtos/:id` busca um produto pelo id
- `POST /produtos` cadastra um produto novo
- `PUT /produtos/:id` altera um produto que já existe
- `DELETE /produtos/:id` exclui um produto

Os status que a API devolve: 200 nas consultas e na alteração, 201 quando cadastra,
204 quando exclui e 404 quando o id informado não existe.

Exemplo de produto:

```json
{
  "id": 1,
  "descricao": "Teclado Mecânico",
  "preco": 249.9,
  "categoria": "Periféricos",
  "estoque": 15
}
```

No POST e no PUT o corpo da requisição é esse mesmo objeto, só que sem o id. No POST o id é
gerado pela API.

## API publicada

COLOCAR_A_URL_DO_RENDER_AQUI

Para testar, é só abrir a URL acima com /produtos no final.

## Rodando na minha máquina

```
npm install
npm start
```

A API sobe em http://localhost:3000

## Testes no Postman

O arquivo `API-Produtos.postman_collection.json` é a collection com os 10 testes.

Para usar: importar o arquivo no Postman, abrir a coleção, ir na aba Variables e colocar a URL
do Render na variável baseUrl (sem a barra no final), e salvar.

As requisições precisam ser executadas na ordem, porque a de número 04 guarda o id do produto
que foi criado numa variável chamada novoProdutoId, e as requisições 05, 06, 07, 09 e 10 usam
esse id. Dá para rodar tudo de uma vez pelo Collection Runner.

Os testes são estes:

1. Consultar todos os produtos (espera 200)
2. Consultar um produto existente (espera 200)
3. Consultar um produto inexistente (espera 404)
4. Cadastrar um novo produto (espera 201)
5. Consultar o produto recém-cadastrado (espera 200)
6. Alterar um produto existente (espera 200)
7. Verificar se a alteração foi feita (espera 200)
8. Tentar alterar um produto inexistente (espera 404)
9. Excluir um produto existente (espera 204)
10. Consultar o produto excluído (espera 404)

## Observação sobre o Render

Como está no plano gratuito, o serviço hiberna depois de uns 15 minutos sem ninguém acessar.
Quando isso acontece a primeira requisição demora quase um minuto para responder, porque o
Render precisa ligar a aplicação de novo. Depois disso ela responde normal.
