# GymPass Style App
API similar ao Gympass (filial de academias) desenvolvido utilizando princípios SOLID.


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
