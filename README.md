# Motors Shop

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
  - [Scripts](#34-scripts)
- [Endpoints](#4-endpoints)
- [Desenvolvedores](#5-desenvolvedores)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Pg](https://www.npmjs.com/package/pg)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Pg](https://www.npmjs.com/package/pg)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Cross-env](https://www.npmjs.com/package/cross-env)
- [Cors](https://www.npmjs.com/package/cors)

A URL base da aplicação: https://motor-shop-api.onrender.com/

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem como as relações entre as tabelas do banco de dados.

<p align="center">
   <img src="https://i.imgur.com/j4sNZpN.png" alt="Diagrama ER"  width="800" height="500"/>
</p>

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

### 3.4. Scripts

Executar aplicação em ambiente de desenvolvimento:

```
yarn dev
```

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-Users)
- [Login](#2-Login)
- [Profile](#3-Profile)
- [Vehicles](#4-Vehicles)
- [Comments](#5-Comments)
- [Address](#6-Address)
- [Photos](#7-Photos)

---

## 4.1. **Users**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota            | Descrição                                                     |
| ------ | --------------- | ------------------------------------------------------------- |
| POST   | /users          | Criação de um usuário.                                        |
| GET    | /users          | Lista todos os usuários                                       |
| GET    | /users/:user_id | Lista um usuário usando seu ID como parâmetro                 |
| PATCH  | /users          | Editar as informações do usuário usando seu ID como parâmetro |
| DELETE | /users          | Deletar usuário usando seu ID como parâmetro                  |

---

### 4.1.1. **Criação de Usuário**

### `POST/users`

### Exemplo de Request:

```
POST /users
Host: https://motor-shop-api.onrender.com
Authorization: None
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "name": "Diogo Steiner 001",
  "email": "steine3@mail.com",
  "cpf": "419.222.333-12",
  "number": "(41) 8 8871-0212",
  "dateBirth": "14/07/01",
  "description": "Olá, sou o Steiner",
  "password": "123456",
  "isAdvertiser": true,
  "address": {
    "zip_code": "23530-025",
    "state": "RJ",
    "city": "RJ",
    "street": "Rua Ramiro",
    "number": "190",
    "complement": "Casa"
  }
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "09827302-3bc4-4fc6-a22d-2114f344767f",
  "name": "Diogo Steiner 001",
  "email": "steine3@mail.com",
  "cpf": "41922233312",
  "number": "41888710212",
  "dateBirth": "140701",
  "description": "Olá, sou o Steiner",
  "isAdvertiser": true,
  "isActive": true,
  "updatedAt": "2023-05-11T13:27:05.436Z",
  "createdAt": "2023-05-11T13:27:05.436Z",
  "address": {
    "zip_code": "23530025",
    "state": "RJ",
    "city": "RJ",
    "street": "Rua Ramiro",
    "number": "190",
    "complement": "Casa",
    "updatedAt": "2023-05-11T13:27:06.125Z",
    "createdAt": "2023-05-11T13:27:06.125Z"
  }
}
```

O campo password não deve ser retornado, updatedAt, createdAt e id (do tipo uuid e gerado automáticamente no banco de dados) não são passados na requisição mas devem ser retornados na reposta.

### Possíveis Erros:

| Código do Erro  | Descrição                     |
| --------------- | ----------------------------- |
| 400 Bad Request | Corpo da requisição inválido. |
| 409 Conflict    | User already exists.          |

---

### 4.1.2. **Listando Usuários**

### `GET/users` (Rota protegida - apenas ADMIN pode acessar)

### Exemplo de Request:

```
GET/users
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: None
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "c5d7fe9f-7267-4c95-9b69-c084c45b6fdf",
    "name": "Diogo Steiner 001",
    "email": "steine001@mail.com",
    "cpf": "11122233312",
    "number": "20988710212",
    "dateBirth": "140701",
    "description": "Olá, sou o Steiner",
    "isAdvertiser": true,
    "isActive": true,
    "updatedAt": "2023-05-10T14:37:29.139Z",
    "createdAt": "2023-05-10T14:37:29.139Z",
    "address": {
      "zip_code": "23530025",
      "state": "RJ",
      "city": "RJ",
      "street": "Rua Ramiro",
      "number": "190",
      "complement": "Casa",
      "updatedAt": "2023-05-10T14:37:30.055Z",
      "createdAt": "2023-05-10T14:37:30.055Z"
    }
  },
  {
    "id": "0751e061-0e90-4500-b16d-357c4b051f00",
    "name": "Victor Hugo Santos Silva",
    "email": "victorhugo110199@gmail.com",
    "cpf": "49267986899",
    "number": "18998024893",
    "dateBirth": "110199",
    "description": "Vendedor de carros velhos",
    "isAdvertiser": false,
    "isActive": true,
    "updatedAt": "2023-05-10T21:52:05.231Z",
    "createdAt": "2023-05-10T21:52:05.231Z",
    "address": {
      "zip_code": "19063350",
      "state": "SP",
      "city": "Presidente Prudente",
      "street": "Rua Pascoal Vernille",
      "number": "274",
      "complement": "Casa",
      "updatedAt": "2023-05-10T21:52:05.882Z",
      "createdAt": "2023-05-10T21:52:05.882Z"
    }
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição              |
| -------------- | ---------------------- |
| 403 Forbiden   | Missing authorization. |

---

### 4.1.3. **Listar Usuário por ID**

### `GET/users/:user_id`

### Exemplo de Request:

```
GET/users/0751e061-0e90-4500-b16d-357c4b051f00
Host: https://motor-shop-api.onrender.com
Content-type: None
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| user_id   | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "0751e061-0e90-4500-b16d-357c4b051f00",
  "name": "Victor Hugo Santos Silva",
  "email": "victorhugo110199@gmail.com",
  "cpf": "49267986899",
  "number": "18998024893",
  "dateBirth": "110199",
  "description": "Vendedor de carros velhos",
  "isAdvertiser": false,
  "isActive": true,
  "updatedAt": "2023-05-10T21:52:05.231Z",
  "createdAt": "2023-05-10T21:52:05.231Z",
  "vehicles": []
}
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 404 Not Found      | User not found.                     |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

### 4.1.4. **Editar Usuário por ID**

### `PATCH/users`

### Exemplo de Request:

```
PATCH/users
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Diogo Updated"
}
```

Apenas os campos name, email, cpf, number, dateBirth, descriptions e password podem ser editados e todos eles são opcionais.

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "006bf6da-d9ec-4ca3-aeeb-4717e2da6a4e",
  "name": "Diogo Updated",
  "email": "steine3@mail.com",
  "cpf": "41922233312",
  "number": "41888710212",
  "dateBirth": "140701",
  "description": "Olá, sou o Steiner",
  "isAdvertiser": true,
  "isActive": true,
  "updatedAt": "2023-05-11T13:38:25.974Z",
  "createdAt": "2023-05-11T12:32:39.625Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                        |
| ---------------- | -------------------------------- |
| 401 Unauthorized | Invalid token.                   |
| 409 Conflict     | Email/CPF/Number already exists. |

---

### 4.1.5. **Deletar Usuário por ID**

### `DELETE/users`

### Exemplo de Request:

```
DELETE/users
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: None
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

## 4.2. **Login**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota   | Descrição                                       |
| ------ | ------ | ----------------------------------------------- |
| POST   | /login | Autentica o usuário para ter acesso ao sistema. |

### `POST/login`

### Exemplo de Request:

```
POST/login
Host: https://motor-shop-api.onrender.com
Authorization: None
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "email": "steine3@mail.com",
  "password": "123456"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODM4MTE4MTUsImV4cCI6MTY4Mzk4NDYxNSwic3ViIjoiMDA2YmY2ZGEtZDllYy00Y2EzLWFlZWItNDcxN2UyZGE2YTRlIn0.Oo-zfoPMYpqtF8BrsUfb1BBiK09n-HXp6_oFU_2x1jE",
  "user": {
    "id": "006bf6da-d9ec-4ca3-aeeb-4717e2da6a4e",
    "name": "Diogo Steiner 001",
    "email": "steine3@mail.com",
    "cpf": "41922233312",
    "number": "41888710212",
    "description": "Olá, sou o Steiner",
    "dateBirth": "140701",
    "isAdvertiser": true,
    "isActive": true,
    "updatedAt": "2023-05-11T12:32:39.625Z",
    "createdAt": "2023-05-11T12:32:39.625Z"
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                  |
| ---------------- | -------------------------- |
| 401 Unauthorized | Email or password invalid. |

---

## 4.3. **Profile**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota     | Descrição                        |
| ------ | -------- | -------------------------------- |
| GET    | /profile | Lista os dados do usuário logado |

---

### Exemplo de Request:

```
GET/profile
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "006bf6da-d9ec-4ca3-aeeb-4717e2da6a4e",
  "name": "Diogo Updated",
  "email": "steine3@mail.com",
  "cpf": "41922233312",
  "number": "41888710212",
  "dateBirth": "140701",
  "description": "Olá, sou o Steiner",
  "isAdvertiser": true,
  "password": "$2b$10$xeVEQFe2.KInS0j.QNbIiuxbHM2k3MT5rdLc.98AdeQCwNlc/xtUK",
  "userToken": null,
  "isActive": true,
  "createdAt": "2023-05-11T12:32:39.625Z",
  "updatedAt": "2023-05-11T13:38:25.974Z",
  "vehicles": [
    {
      "id": "7e4de561-9ad7-4f1f-b8a7-29f159a5e97a",
      "title": "corolla altis hybrid 1.8 16v aut.",
      "brand": "toyota",
      "model": "corolla altis hybrid 1.8 16v aut.",
      "year": 2022,
      "fuel": "HÍBRIDO",
      "mileage": 10000,
      "price": 190000,
      "color": "Branco",
      "description": "Carro para pessoas de idade avançada",
      "coverUrl": "https://www.automaistv.com.br/wp-content/uploads/2020/10/P_20200925_161354_edited-990x595.jpg",
      "bellowFipe": false,
      "fipe": "178908",
      "createdAt": "2023-05-11T13:05:03.929Z",
      "updatedAt": "2023-05-11T13:05:03.929Z",
      "isActive": true
    },
    {
      "id": "40253e6c-0d52-4cf5-ba60-e6e659f44b72",
      "title": "aircross live bus. 1.6 flex 5p aut.",
      "brand": "citroën",
      "model": "aircross live bus. 1.6 flex 5p aut.",
      "year": 2020,
      "fuel": "FLEX",
      "mileage": 20000,
      "price": 280000,
      "color": "Branco ",
      "description": "Carro maneiro pra familia",
      "coverUrl": "https://www.azisencoes.com.br/wp-content/uploads/2020/02/Citro%C3%ABn-Aircross-PCD-2020-LIVE-1.jpg",
      "bellowFipe": false,
      "fipe": "72408",
      "createdAt": "2023-05-11T12:54:53.429Z",
      "updatedAt": "2023-05-11T13:05:31.529Z",
      "isActive": true
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

## 4.4. **Vehicles**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota                  | Descrição                                                         |
| ------ | --------------------- | ----------------------------------------------------------------- |
| POST   | /vehicles             | Criação de um anuncio de veículo.                                 |
| GET    | /vehicles             | Lista todos os anuncios de veículos.                              |
| GET    | /vehicles/:vehicle_id | Busca as informações de um veículo usando seu ID como parâmetro.  |
| PATCH  | /vehicles/:vehicle_id | Editar as informações de um veículo usando seu ID como parâmetro. |
| DELETE | /vehicles/:vehicle_id | Deleta um veículo usando seu ID como parâmetro.                   |

---

### 4.4.1. **Criação de um anuncio de veículo**

### Exemplo de Request:

```
POST/vehicles
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "title": "titulo teste",
  "brand": "marca teste",
  "model": "modelo teste",
  "year": 1998,
  "fuel": "Gasolina",
  "color": "Blue",
  "mileage": 190800,
  "price": 20000,
  "description": "descrição teste",
  "coverUrl": "https://search.brave.com/imagesq=imagem+de+carro&source=web&img=1",
  "bellowFipe": true,
  "fipe": "20.000,00",
  "photos": {
    "photourl": ["urlteste", "urlteste2", "urlteste3"]
  }
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "updatedAt": "2023-05-11T13:59:25.014Z",
  "createdAt": "2023-05-11T13:59:25.014Z",
  "isActive": true,
  "fipe": "20.000,00",
  "bellowFipe": true,
  "coverUrl": "https://search.brave.com/imagesq=imagem+de+carro&source=web&img=1",
  "description": "descrição teste",
  "price": 20000,
  "mileage": 190800,
  "color": "Blue",
  "fuel": "Gasolina",
  "year": 1998,
  "model": "modelo teste",
  "brand": "marca teste",
  "title": "titulo teste",
  "id": "c00b52bf-eff4-4552-bee9-61ad6785685c",
  "photos": ["urlteste", "urlteste2", "urlteste3"]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                     |
| ---------------- | ----------------------------- |
| 400 Bad Request  | Corpo da requisição inválido. |
| 401 Unauthorized | Invalid token.                |

---

### 4.4.2. **Listando Veículos**

### `GET/vehicles`

### Exemplo de Request:

```
GET/vehicles
Host: https://motor-shop-api.onrender.com
Authorization: None
Content-type: None
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "user": "Diogo Steiner 001",
    "updatedAt": "2023-05-10T14:37:59.139Z",
    "createdAt": "2023-05-10T14:37:59.139Z",
    "isActive": true,
    "fipe": "20.000,00",
    "bellowFipe": true,
    "coverUrl": "https://cdn.motor1.com/images/mgl/zxp3Mb/s3/bugatti-chiron-profilee-2022.webp",
    "description": "Assim como foi com o Veyron, o Bugatti Chiron gerou várias edições especiais ao longo de seu ciclo de vida. O Profilée deveria ser mais uma delas, já que a Bugatti pretendia fazer uma série de poucas unidades. Mas todas as alocações por um Chiron.",
    "price": 20000,
    "mileage": 190800,
    "color": "Blue",
    "fuel": "Gasolina",
    "year": 220,
    "model": "Bugatti Chiron Profilée",
    "brand": "Bugatti",
    "title": "Bugatti Chiron",
    "id": "2c7e5b02-d353-47f1-aeca-2bbe7e0a1d58"
  },
  {
    "user": "Diogo Updated",
    "updatedAt": "2023-05-11T13:59:25.014Z",
    "createdAt": "2023-05-11T13:59:25.014Z",
    "isActive": true,
    "fipe": "20.000,00",
    "bellowFipe": true,
    "coverUrl": "https://search.brave.com/imagesq=imagem+de+carro&source=web&img=1",
    "description": "descrição teste",
    "price": 20000,
    "mileage": 190800,
    "color": "Blue",
    "fuel": "Gasolina",
    "year": 1998,
    "model": "modelo teste",
    "brand": "marca teste",
    "title": "titulo teste",
    "id": "c00b52bf-eff4-4552-bee9-61ad6785685c"
  }
]
```

---

### 4.4.3. **Listando veículos por ID**

### `GET/vehicles/:vehicle_id`

### Exemplo de Request:

```
GET/vehicles/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                      |
| ---------- | ------ | ------------------------------ |
| vehicle_id | string | Identificador único do veículo |

### Exemplo de Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "user": {
    "id": "006bf6da-d9ec-4ca3-aeeb-4717e2da6a4e",
    "name": "Diogo Updated",
    "email": "steine3@mail.com",
    "cpf": "41922233312",
    "number": "41888710212",
    "dateBirth": "140701",
    "description": "Olá, sou o Steiner",
    "isAdvertiser": true,
    "isActive": true,
    "updatedAt": "2023-05-11T13:38:25.974Z",
    "createdAt": "2023-05-11T12:32:39.625Z"
  },
  "comments": [],
  "photos": [
    {
      "id": "0da2ca98-8528-4884-829d-be624828bbd6",
      "photourl": "urlteste"
    },
    {
      "id": "2f1d1d7c-471e-4592-af14-dd6559c05c01",
      "photourl": "urlteste2"
    },
    {
      "id": "62646bbc-6feb-47d6-898c-2f1e6cb92b35",
      "photourl": "urlteste3"
    }
  ],
  "updatedAt": "2023-05-11T13:59:25.014Z",
  "createdAt": "2023-05-11T13:59:25.014Z",
  "isActive": true,
  "fipe": "20.000,00",
  "bellowFipe": true,
  "coverUrl": "https://search.brave.com/imagesq=imagem+de+carro&source=web&img=1",
  "description": "descrição teste",
  "price": 20000,
  "mileage": 190800,
  "color": "Blue",
  "fuel": "Gasolina",
  "year": 1998,
  "model": "modelo teste",
  "brand": "marca teste",
  "title": "titulo teste",
  "id": "c00b52bf-eff4-4552-bee9-61ad6785685c"
}
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 401 Unauthorized   | Invalid token.                      |
| 404 Not Found      | Vehicle not found.                  |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

### 4.4.4. **Editando veículo por ID**

### `PATCH/vehicles/:vehicle_id`

### Exemplo de Request:

```
PATCH/vehicle/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                      |
| ---------- | ------ | ------------------------------ |
| vehicle_id | string | Identificador único do veículo |

### Corpo da Requisição:

```json
{
  "title": "att teste 2",
  "color": "Azul"
}
```

Os campos title, brand, model, year, fuel, color, mileage, description, coverUrl, belowFipe e fipe podem ser alterados e são opcionais.

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "5134e4d4-2f67-4356-8868-cf9563bdb4ac",
  "title": "att teste 2",
  "brand": "marca teste",
  "model": "modelo teste",
  "year": 1998,
  "fuel": "Gasolina",
  "mileage": 190800,
  "price": 20000,
  "color": "Azul",
  "description": "descrição teste",
  "coverUrl": "https://search.brave.com/imagesq=imagem+de+carro&source=web&img=1",
  "bellowFipe": true,
  "fipe": "20.000,00",
  "createdAt": "2023-05-11T14:09:42.788Z",
  "updatedAt": "2023-05-11T14:22:02.682Z",
  "isActive": true
}
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 401 Unauthorized   | Invalid token.                      |
| 404 Not Found      | Question not found.                 |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

### 4.4.5. **Deletar Veículo por ID**

### `DELETE/vehicle/:vehicle_id`

### Exemplo de Request:

```
DELETE/vehicle/5134e4d4-2f67-4356-8868-cf9563bdb4ac
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: None
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                      |
| ---------- | ------ | ------------------------------ |
| vehicle_id | string | Identificador único do veículo |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

```json
Vazio
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 401 Unauthorized   | Invalid token.                      |
| 404 Not Found      | Vehicle not found.                  |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

## 4.5. **Comments**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota                  | Descrição                           |
| ------ | --------------------- | ----------------------------------- |
| POST   | /comments/:vehicle_id | Cria um comentário em um anuncio.   |
| PATCH  | /comments/:comment_id | Edita um comentário em um anuncio.  |
| DELETE | /comments/:comment_id | Deleta um comentário em um anuncio. |

### 4.5.1. **criar um comentário em um anuncio.**

### `POST/comments/:vehicle_id`

### Exemplo de Request:

```
POST/comments/5134e4d4-2f67-4356-8868-cf9563bdb4ac
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "commenttext": "Texte teste 001"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "updatedAt": "2023-05-04T23:39:00.227Z",
  "createdAt": "2023-05-04T23:39:00.227Z",
  "commenttext": "Texte teste 001",
  "id": "28a3883a-a58b-4147-b6a9-e44b448ded85"
}
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 400 Not found      | Vehicle not found.                  |
| 401 Unauthorized   | Invalid token.                      |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

### 4.5.2. **Editar um comentário em um anuncio.**

### `PATCH/comments/:comment_id`

### Exemplo de Request:

```
PATCH/comments/28a3883a-a58b-4147-b6a9-e44b448ded85
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "commenttext": "AAAAAA"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "28a3883a-a58b-4147-b6a9-e44b448ded85",
  "commenttext": "AAAAAA",
  "createdAt": "2023-05-04T23:39:00.227Z",
  "updatedAt": "2023-05-04T23:42:10.962Z"
}
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 400 Not found      | Vehicle not found.                  |
| 401 Unauthorized   | Invalid token.                      |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

### 4.5.3. **Deletando um comentário em um anuncio.**

### `DELETE/comments/:comment_id`

### Exemplo de Request:

```
DELETE/comments/28a3883a-a58b-4147-b6a9-e44b448ded85
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 400 Not found      | Vehicle not found.                  |
| 401 Unauthorized   | Invalid token.                      |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

## 4.6. **Address**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota     | Descrição         |
| ------ | -------- | ----------------- |
| PATCH  | /address | Edita o endereço. |

### `PATCH/address`

### Exemplo de Request:

```
PATCH/address
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "zip_code": "23530-001",
  "state": "SP",
  "city": "SP",
  "street": "Rua Casa Grande"
}
```

Os campos zip_code, state, city, street, number e complement podem ser alterados e são opcionais.

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "fa227d80-859a-40e3-ad11-c4686f4c22da",
  "zip_code": "23530-001",
  "state": "SP",
  "city": "SP",
  "street": "Rua Casa Grande",
  "number": "190",
  "complement": "Casa",
  "createdAt": "2023-05-04T22:06:19.540Z",
  "updatedAt": "2023-05-04T23:53:45.312Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 400 Not found    | User not found. |
| 401 Unauthorized | Invalid token.  |

---

## 4.7. **Photos**

[ Voltar para o topo ](#tabela-de-conteúdos)

### Endpoints

| Método | Rota                | Descrição                     |
| ------ | ------------------- | ----------------------------- |
| POST   | /photos/:vehicle_id | Adiciona fotos em um anuncio. |
| PATCH  | /photos/:photo_id   | Edita as fotos em um anuncio. |
| DELETE | /photos/:photo_id   | Deleta fotos em um anuncio.   |

### 4.7.1. **Adiciona fotos em um anuncio.**

### `POST/photos/:vehicle_id`

### Exemplo de Request:

```
POST/photos/3dea7ce0-cfdb-4fbf-a274-373971d2b046
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "photourl": "teste001.com"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "photourl": "teste001.com",
  "id": "ac7452a9-cb93-404e-a8d5-43f1aace0d06"
}
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 400 Not found      | Vehicle not found.                  |
| 401 Unauthorized   | Invalid token.                      |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

### 4.7.2. **Editar uma foto em um anuncio.**

### `PATCH/photos/:photo_id`

### Exemplo de Request:

```
PATCH/photos/01da7b3d-724c-4ded-b9d0-2d7dc6602d8c
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
{
  "photourl": "teste002.com"
}
```

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "01da7b3d-724c-4ded-b9d0-2d7dc6602d8c",
  "photourl": "teste002.com"
}
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 400 Not found      | User not found.                     |
| 401 Unauthorized   | Invalid token.                      |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

### 4.7.3. **Deletando uma foto em um anuncio.**

### `DELETE/photos/:photo_id`

### Exemplo de Request:

```
DELETE/photos/71d404d6-557e-4f29-97d1-407776594046
Host: https://motor-shop-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Exemplo de Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

### Possíveis Erros:

| Código do Erro     | Descrição                           |
| ------------------ | ----------------------------------- |
| 400 Not found      | Vehicle not found.                  |
| 401 Unauthorized   | Invalid token.                      |
| 406 Not Acceptable | Invalid input syntax for type uuid. |

---

## 5. Desenvolvedores

[ Voltar para o topo ](#tabela-de-conteúdos)

| [<img src="https://avatars.githubusercontent.com/u/104766684?v=4" width=115><br><sub>Wesley Matos</sub>](https://github.com/wesleydematos) | [<img src="https://avatars.githubusercontent.com/u/106822915?v=4" width=115><br><sub>Enrico Vieira</sub>](https://github.com/enricovieira) |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |

| [<img src="https://avatars.githubusercontent.com/u/106779643?v=4" width=115><br><sub>Victor Santos</sub>](https://github.com/VictorHugo110199) | [<img src="https://avatars.githubusercontent.com/u/106714068?v=4" width=115><br><sub>Diogo Steiner</sub>](https://github.com/steinerstt) |
| :--------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |

| [<img src="https://avatars.githubusercontent.com/u/103224058?v=4" width=115><br><sub>Mateo Gaboardi</sub>](https://github.com/mateogaboardidev) |     |
| :---------------------------------------------------------------------------------------------------------------------------------------------: | :-: |
