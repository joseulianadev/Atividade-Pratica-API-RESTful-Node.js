# API de Produtos

Trabalho da disciplina de DIAW. É uma API REST feita com Node.js e Express que permite
consultar, cadastrar, alterar e excluir produtos.

Parti do projeto lab-express que a gente fez em aula (https://github.com/rommelcarneiro/lab-express),
que já tinha o servidor, a lista de produtos e os dois GETs prontos, e completei com o POST, o PUT
e o DELETE.

Os produtos ficam guardados em memória, num array dentro do arquivo `server.js`. Não tem banco de
dados, então toda vez que a API reinicia os dados voltam a ser os 12 produtos iniciais.

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
  "descricao": "Notebook Dell Inspiron 15",
  "categoria": "Informática",
  "preco": 3499.90,
  "estoque": 12
}
```

No POST e no PUT o corpo da requisição é esse mesmo objeto, só que sem o id. No POST o id é
gerado pela API.

## Mudanças em relação ao código da aula

- O atributo dos produtos que na aula se chamava `nome` virou `descricao`, porque é esse o nome
  que o enunciado do trabalho pede.
- A porta agora é `process.env.PORT || 3000` em vez de fixa em 3000, porque o Render define a
  porta por variável de ambiente e a aplicação não sobe se ficar presa na 3000.
- O `app.listen` agora recebe `0.0.0.0` como segundo parâmetro. Sem isso o Node escutava só em
  IPv6 dentro do container e o roteador do Render não conseguia alcançar a aplicação de forma
  confiável: cerca de 2 em cada 3 requisições voltavam 404. Com o bind explícito, 30 de 30
  requisições respondem 200.
- Adicionei o `app.use(express.json())`, senão o `req.body` do POST e do PUT vem vazio.
- No package.json deixei só o express nas dependências (o da aula tinha knex, pg, bcryptjs e
  jsonwebtoken sobrando de outros exercícios) e coloquei o script `start`, que é o comando que o
  Render usa para subir a aplicação.

## API publicada

https://api-produtos-f4vn.onrender.com

Para testar, é só abrir a URL acima com /produtos no final.

## Rodando na minha máquina

```
npm install
npm start
```

A API sobe em http://localhost:3000

## Testes no Postman

O arquivo `API-Produtos.postman_collection.json` é a collection com os 10 testes.

Para usar: importar o arquivo no Postman e rodar. A variável `baseUrl` já vem preenchida com a
URL da API publicada, então não é preciso configurar nada. Ela fica na aba Variables da coleção,
caso queira apontar os testes para outro endereço (por exemplo http://localhost:3000).

As requisições precisam ser executadas na ordem, porque a de número 04 guarda o id do produto
que foi criado numa variável chamada novoProdutoId, e as requisições 05, 06, 07, 09 e 10 usam
esse id. Dá para rodar tudo de uma vez pelo Collection Runner.

A requisição 02 também usa uma variável (`produtoExistenteId`) em vez de um id fixo: a
requisição 01 guarda nela o id do primeiro produto da lista. Assim o teste continua passando
mesmo que algum produto tenha sido excluído antes, já que os dados ficam em memória e não
voltam ao estado inicial enquanto o serviço não reinicia.

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
