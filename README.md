# Labenu Music Awards

## Sobre o Projeto
O **LAMA**, *Labenu Musical Awards*, é um festival com várias bandas famosas para a formatura da nossa turma Gebru!

## Funcionalidades
[X] Cadastro de Usuário: O nosso sistema permite o registro dos usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha. Você pode ser um cliente (NORMAL) ou um administrador do sistema (ADMIN). O usuário pode se logar automaticamente após o cadastro.

[X] Login: Para realizar o login, basta informar seu e-mail e a sua senha cadastrados. O retorno contém um token de autenticação.

[X] Cadastrar Banda: O nosso sistema deixa registrado todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, você precisa ser um ADMIN, e precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela).

[X] Ver detalhes de uma Banda: Fornecendo o id da banda você consegue ver todas as informações salvas sobre ela.

[X] Adicionar shows: Para cadastrar um show você precisa ser um ADMIN, e precisa fornecer o id da banda, o dia (SEXTA, SABADO ou DOMINGO) e o horário em que ela irá se apresentar.

[X] Ver todos os shows de uma data: Informando o dia, você consegue visualizar todos os shows que irão acontecer.

## Tecnologias Utilizadas
```
Server (NodeJS + Typescript)
    Express
    Cors
    KnexJS
    ts-node
    dotENV
    BbcryptJS
    JSON Web Token
    MySQL
    UUID
    Jest
```

## Desenvolvido por:
[Helaine Ribeiro](https://github.com/HelaineRibeiro)

[Mileny Faria](https://github.com/milenyfaria)