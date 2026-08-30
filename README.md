# API RESTful de Produtos

API desenvolvida em Node.js com Express para a atividade prática de DIAW.
Os produtos são guardados em memória, em um array JavaScript, sem banco de dados.

## Recurso Produto

```json
{
  "id": 1,
  "descricao": "Teclado Mecânico",
  "preco": 249.9,
  "categoria": "Periféricos",
  "estoque": 15
}
```

A API já inicia com 5 produtos cadastrados.

## Operações

| Método   | Rota            | Operação                      | Status de sucesso |
| -------- | --------------- | ----------------------------- | ----------------- |
| `GET`    | `/produtos`     | Retorna todos os produtos     | `200 OK`          |
| `GET`    | `/produtos/:id` | Retorna um produto específico | `200 OK`          |
| `POST`   | `/produtos`     | Cadastra um novo produto      | `201 Created`     |
| `PUT`    | `/produtos/:id` | Altera um produto existente   | `200 OK`          |
| `DELETE` | `/produtos/:id` | Exclui um produto             | `204 No Content`  |

Quando o `id` informado não existe, a API responde `404 Not Found`.

## Executando localmente

```bash
npm install && npm start
```

A API sobe em `http://localhost:3000`.

## API publicada

URL: _(preencher com a URL gerada pelo Render)_

## Testes no Postman

O arquivo `API-Produtos.postman_collection.json` contém a Collection com os 10 cenários
de teste pedidos no enunciado.

1. No Postman, clique em **Import** e selecione o arquivo.
2. Abra a coleção, vá na aba **Variables** e coloque a URL do Render na variável `baseUrl`
   (sem barra no final). Clique em **Save**.
3. Execute as requisições **na ordem**, ou use o **Collection Runner**. A requisição 04 guarda
   o id do produto criado na variável `novoProdutoId`, que é usada pelas requisições seguintes.

| #  | Requisição                                | Status esperado |
| -- | ----------------------------------------- | --------------- |
| 01 | Consultar todos os produtos               | `200`           |
| 02 | Consultar um produto existente            | `200`           |
| 03 | Consultar um produto inexistente          | `404`           |
| 04 | Cadastrar um novo produto                 | `201`           |
| 05 | Consultar o produto recém-cadastrado      | `200`           |
| 06 | Alterar um produto existente              | `200`           |
| 07 | Verificar se a alteração foi realizada    | `200`           |
| 08 | Tentar alterar um produto inexistente     | `404`           |
| 09 | Excluir um produto existente              | `204`           |
| 10 | Verificar que o produto excluído sumiu    | `404`           |

## Arquivos

```
index.js      A API completa (array de produtos e as 5 rotas)
package.json  Dependências e o comando de start
API-Produtos.postman_collection.json   Plano de testes do Postman
```
