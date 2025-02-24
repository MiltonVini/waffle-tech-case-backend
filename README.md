# The News - Tech Case (Backend)

Este é o backend para o teste técnico do **Case Waffle**, que envolve a criação de um sistema de gestão de usuários e leituras.

## Tecnologias Utilizadas

- **Fastify**: Framework web para Node.js, utilizado para construir o servidor.
- **TypeScript**: Para garantir um código mais robusto e tipado.
- **Vitest**: Para testes unitários.
- **MySQL2**: Para conexão com o banco de dados MySQL.
- **JWT (JSON Web Tokens)**: Para autenticação de usuários.
- **Zod**: Para validação de dados.
- **ESLint**: Para garantir a qualidade do código.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Para acessar a plataforma, é necessário que o backend do projeto esteja em funcionamento.


## Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/MiltonVini/waffle-tech-case-backend.git

2. Acesse a pasta do projeto:
   ```bash
    cd waffle-tech-case-backend

3. Instale as dependências:
   ```bash
    npm install

4. Inicie o servidor de desenvolvimento:
   ```bash
    npm run dev

5. Build para produção:
    ```bash
    npm run build

6. Rodar os teste:
    ```
    npm run test

7. Configure as Variaveis de Ambiente
    ```
    cp .env.example .env

    JWT_SECRET=your-secret-key
    DATABASE_URL="mysql://root:dockerdocker@localhost:3306/the-news"
    JWT_SECRET=
    EXPIRES_IN_TOKEN="24h"
    FRONTEND_URL="http://127.0.0.1:5173"


## Estrutura do Projeto:
- **/src**:
    - **/env**
    - **/http**
        - **/controllers**
            - **routes.ts**
        - **/admin-statistics**
            - **routes.ts**
        - **/authenticate**
            - **routes.ts**
        - **/badges**
            - **routes.ts**
        - **/user**
            - **routes.ts**
        - **/user-readings**
            - **routes.ts**
        - **/user-statistics**
            - **routes.ts**
    - **/lib**
    - **/middlewares**
    - **/repositories**
        - **/mysql2**
        - **/in-memory**
    - **/use-cases**
    - **app.ts**
    - **server.ts**
    

## Rotas

### `GET /`
- **Descrição**: Recebe os dados do webhook e processa as informações.

### `GET /authenticate?email="test@example.com"`
- **Descrição**: Recebe um e-mail e gera um token de autenticação e um link de auto login para o frontend.

## Fluxo de Autenticação
1. É realizado uma requisição para a rota `/authenticate?email=user@example.com`.
2. O backend gera um link de auto login com um token JWT.
3. O frontend redireciona o usuário para o link de auto login, validando o token e realizando o login automaticamente.

## Funcionalidades do Projeto
- Autenticação: Geração de tokens JWT para auto login.
- Gestão de Leituras: Registra as leituras dos usuários.
- Gestão de Streak do Usuário: Regista e verifica todas as regras para gerar a sequência de leitura do usuário
- Estatísticas de Usuário: Acesso a estatísticas relacionadas ao uso da plataforma.
- Estatísticas de Administrador: Acesso a estatísticas relacionadas ao uso da plataforma engajamento voltados para os administradores.



## Autor
Desenvolvido por Milton Vinicius. Caso tenha dúvidas ou sugestões, sinta-se à vontade para entrar em contato!