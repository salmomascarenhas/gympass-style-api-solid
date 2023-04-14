
# GymPass Style App

## Documentação da API Backend :weight_lifting:
Este repositório contém a implementação da Gympass Style API Solid (similar ao Gympass), uma API RESTful em:
- Node.js 18
- NPM 9.5.1
- Docker 23.0.1

A API utiliza princípios SOLID com partes de Arquitetura Limpa para manter o código modular e escalável.

## Instalação e configuração :computer:
- Faça o clone deste repositório: `git clone`
- Certifique-se de ter o Node.js 18 e NPM 9.5.1 instalados em sua máquina.
- Instale o **Docker 23.0.1** em sua máquina.
- Copie o arquivo **.env.example** para **.env** na raiz do projeto e defina as variáveis de ambiente necessárias para o seu ambiente.
- Execute `docker-compose up` na pasta raiz do projeto para criar e executar os containers da API.
- Após subir o banco de dados com sucesso, execute `npx prisma migrate dev` para preparar o banco de dados.
- Por fim, execute `npm run start:dev` para subir a aplicação em modo de desenvolvimento.

## Endpoints :earth_americas:
A API oferece os seguintes endpoints:

**GET** /check-ins/history :clipboard:
Retorna o histórico de check-ins do usuário autenticado.

**GET** /check-ins/metrics :chart_with_upwards_trend:
Retorna as métricas de check-ins do usuário autenticado.

**POST** /gyms/**:gymId**/check-ins :heavy_check_mark:
Registra um check-in do usuário autenticado na academia identificada por gymId.

**PATCH** /check-ins/**:checkInId**/validate :white_check_mark:
Valida o check-in identificado por checkInId.

**GET** /gyms/search :mag:
Busca academias por nome ou endereço.

**GET** /gyms/nearby :round_pushpin:
Retorna as academias próximas à localização do usuário autenticado.

**POST** /gyms :weight_lifting_man:
Registra uma nova academia na base de dados.

**POST** /users :busts_in_silhouette:
Registra um novo usuário na base de dados.

**POST** /sessions :key:
Realiza a autenticação do usuário e retorna um token de acesso.

**PATCH** /token/refresh :arrows_counterclockwise:
Atualiza o token de acesso do usuário autenticado.

**GET** /me :bust_in_silhouette:
Retorna as informações do usuário autenticado.

## Autenticação :closed_lock_with_key:
A API utiliza autenticação por token. Para acessar os endpoints que requerem autenticação, é necessário enviar um token de acesso válido no header Authorization da requisição. O token pode ser obtido através do endpoint **/sessions**.


## RFs (Requisitos funcionais)
O usuário vai fazer X na aplicação.

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível um usuário realizar um check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)
O que o usuário vai poder fazer X na aplicação com condições (similar aos ifs).

- [x] O usuário não deve se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Regas não-funcionais)
Requisitos mais técnicos.

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostegreSQL;
- [x] Todas as listas de dados precisam estar paginados com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (Jason Web Token);

## Licença :scroll:
Este projeto é licenciado sob a licença MIT.
