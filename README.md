<div align="center">

![Spring Boot][SpringBoot.io]
![Next.js][Nextjs.io]
![PostgreSQL][Postgres.io]
![Java][Java.io]
![TypeScript][TypeScript.io]

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]

  <a href="https://github.com/bgluis/student-coin/">
    <img src="docs/img/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3>Student Coin</h3>
</div>

# 💰 STUDENT-COIN: Sistema de Moeda Estudantil

## 🎯 Sobre o Projeto

O **STUDENT-COIN** é um sistema desenvolvido para estimular e reconhecer o mérito estudantil através de uma moeda virtual. Professores distribuem a moeda por bom desempenho e participação, e alunos a utilizam para resgatar vantagens, produtos e descontos oferecidos por empresas parceiras.

Este projeto foi desenvolvido seguindo a arquitetura **MVC (Model-View-Controller)** e os requisitos da **Release 1** do Sistema de Moeda Estudantil.

## 💻 Tecnologias Utilizadas

O projeto adota uma arquitetura _full-stack_ dividida, utilizando tecnologias modernas:

### Backend

-   **Linguagem:** Java
-   **Framework:** Springboot
-   **Banco de Dados:** PostgreSQL

### Frontend

-   **Framework/Biblioteca:** Next
-   **Linguagem:** TypeScript
-   **Estilização:** Tailwind

### Infraestrutura/DevOps

-   **Conteinerização:** Docker / `docker-compose.yml`
-   **Controle de Versão:** Git / GitHub

## 🛠️ Como Executar o Projeto

Escolha uma das opções abaixo — **Com Docker (recomendado)** ou **Sem Docker (manual)** — dependendo do seu fluxo de trabalho.

**Observação:** o repositório inclui arquivos de configuração (`docker-compose.yml`, `./.env.example` e `./backend/.env.example`) usados para facilitar o setup. Usar Docker Compose é a forma mais simples para reproduzir o ambiente completo.

---

### 🐳 Com Docker (recomendado)

1. Clone o repositório e copie os arquivos de exemplo:

```bash
git clone https://github.com/BGLuis/student-coin.git
cd student-coin
cp .env.example .env
cp backend/.env.example backend/.env
# Edite os arquivos `.env` se quiser alterar portas ou credenciais
```

2. Suba os containers com `docker-compose`:

```bash
docker-compose up --build -d
docker-compose logs -f   # ver logs
```

3. Mapeamento rápido dos serviços (conforme `docker-compose.yml`):

-   `db` (Postgres): porta externa -> variável `DB_PORT` (ex.: `3306`); dentro do compose a aplicação usa `jdbc:postgresql://db:5432/${DB_NAME}`.
-   `localstack`: S3 compatível (endpoint `http://localstack:4566`) — variáveis `S3_ENDPOINT_URL`, `AWS_*`.
-   `mailhog`: interface web em `http://localhost:${WEB_MAIL_PORT}` (variável `WEB_MAIL_PORT`) para visualizar e-mails.
-   `api` (backend Spring Boot): expõe porta interna `8080` mapeada para `API_PORT` do `.env`.
-   `app` (frontend Next.js): expõe porta interna `3000` mapeada para `APP_PORT` do `.env`.

4. Acessos comuns:

-   Frontend: `http://localhost:${APP_PORT}` (ou `http://localhost:4200` se usar o `.env` atual do repositório).
-   API: `http://localhost:${API_PORT}` (ou `http://localhost:3000` conforme seu `.env`).
-   Swagger da API (quando informado pelo app): `http://localhost:${API_PORT}/swagger-ui/index.html`.

Vantagens desta opção: ambiente reproduzível, containers já configurados (DB, S3, SMTP) e menos variação entre máquinas.

---

### 🧩 Sem Docker (manual)

Use esta opção se quiser rodar o backend e frontend diretamente na sua máquina.

1. Banco de dados e serviços externos

O projeto depende de Postgres, S3 (ou um endpoint S3-compatível) e um servidor SMTP. Ao rodar sem Docker você deve prover esses serviços localmente ou apontar para instâncias hospedadas:

-   Postgres: instale localmente e crie o banco `coin`, ou aponte `SPRING_DATASOURCE_URL` para sua instância (veja exemplo abaixo).
-   S3 / MinIO / AWS S3: configure `S3_ENDPOINT_URL` e credenciais `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`.
-   SMTP: configure `SMTP_HOST` e `SMTP_PORT` (e credenciais se necessário).

2. Exemplo de variáveis a ajustar (em `backend/.env` ou variáveis de ambiente do sistema):

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/coin
SPRING_DATASOURCE_USERNAME=coin_user
SPRING_DATASOURCE_PASSWORD=coin_secret

S3_ENDPOINT_URL=https://s3.amazonaws.com
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

SMTP_HOST=smtp.example.com
SMTP_PORT=587
```

3. Rodando o backend (local):

```bash
cd backend
./gradlew bootRun          # executa a API em http://localhost:8080 (por padrão)
# ou para gerar o jar:
./gradlew build
java -jar build/libs/*.jar
```

4. Rodando o frontend (local):

```bash
cd frontend
npm install   # ou pnpm i / yarn
npm run dev   # inicia o Next.js em http://localhost:3000
```

5. Observações importantes para esta opção:

-   Certifique-se que os serviços externos (DB, S3, SMTP) estejam acessíveis a partir do backend.
-   Ajuste `application.yml` ou as variáveis de ambiente para apontar aos hosts corretos.

Opção híbrida (opcional): você pode rodar o backend e frontend localmente, mas levantar apenas os serviços dependentes em containers (Postgres, MinIO, MailHog) — isso combina rapidez de desenvolvimento com isolamento das dependências.

Exemplo rápido (subir apenas serviços):

```bash
docker run -d --name coin-db -e POSTGRES_DB=coin -e POSTGRES_USER=coin_user -e POSTGRES_PASSWORD=coin_secret -p 5432:5432 postgres:18
docker run -d --name coin-mail -p 8025:8025 mailhog/mailhog
```

---

Precisa que eu formate as portas concretas no README (`APP_PORT`, `API_PORT`) com os valores atuais do `.env` do repositório? Posso substituir os placeholders pelos valores detectados se desejar.

## ⚙️ **Rodando localmente (sem Docker)**

Recomendamos usar Docker Compose, mas se você quer rodar cada parte localmente siga estes passos:

-   Backend (Java / Spring Boot):

```bash
cd backend
./gradlew bootRun
# ou para build e executar o jar:
./gradlew build
java -jar build/libs/*.jar
```

-   Frontend (Next.js):

```bash
cd frontend
npm install        # ou pnpm i / yarn
npm run dev        # inicia em http://localhost:3000
```

### Serviços externos (S3, SMTP, Banco de Dados)

O projeto depende de alguns serviços externos que o `docker-compose` já provisiona para desenvolvimento (Postgres, LocalStack para S3 e MailHog para SMTP). Se você optar por rodar a aplicação localmente sem Docker, deverá prover esses serviços na sua máquina ou apontar para instâncias hospedadas (cloud ou servidor remoto).

-   Banco de dados (Postgres): ajuste `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD` para apontar para a sua instância local/hosted.
-   S3 / CDN: se não estiver usando o `localstack`, aponte `S3_ENDPOINT_URL`, `AWS_REGION`, `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` para um S3 compatível (AWS S3, MinIO, etc.).
-   SMTP (envio de emails): ajuste `SMTP_HOST`, `SMTP_PORT` (e credenciais, se necessário) para o servidor SMTP que você escolher (MailHog local, Mailtrap, Amazon SES, etc.).

Exemplo rápido de variáveis que você pode ajustar no `backend/.env` ou via variáveis de ambiente do sistema:

```toml
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/coin
SPRING_DATASOURCE_USERNAME=coin_user
SPRING_DATASOURCE_PASSWORD=coin_secret

S3_ENDPOINT_URL=https://s3.amazonaws.com
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

SMTP_HOST=smtp.example.com
SMTP_PORT=587
```

Se você não tiver esses serviços localmente, pode usar provedores hospedados (ex.: RDS, S3 da AWS, serviços de e-mail) e configurar as variáveis acima apontando para eles.

## 🔑 **Variáveis de ambiente importantes**

-   Arquivo raiz: `./.env.example` — controla portas e credenciais usadas pelo `docker-compose`.
-   Backend: `./backend/.env.example` — variáveis usadas pelo container do backend. Exemplo (valores sensíveis OMITIDOS no repo):

```toml
JWT_KEY= # Uma string de 64 caracteres alfanumericos
SMTP_HOST=mailhog
SMTP_PORT=1025

S3_ENDPOINT_URL=http://localstack:4566
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=accesskey
AWS_SECRET_ACCESS_KEY=secretkey
```

Adapte essas variáveis ao seu ambiente. Nunca comite chaves reais em repositórios públicos.

## 🔌 **API Endpoints**

A seguir há uma tabela resumida dos principais endpoints expostos pelos controladores do backend. Para descrições completas (parâmetros, modelos e respostas), consulte o Swagger quando a API estiver rodando (ex.: `http://localhost:<API_PORT>/swagger-ui/index.html`).

| Endpoint                                     | **Método HTTP** | **Descrição**                                                                 |
| :------------------------------------------- | :-------------: | :---------------------------------------------------------------------------- |
| [`/auth`](#)                                 |      POST       | Registrar (student ou enterprise) — aceita JSON com base nos campos enviados  |
| [`/auth/login`](#)                           |      POST       | Autenticar usuário (retorna token)                                            |
| [`/account/reward/{uuid}`](#)                |       PUT       | Professor recompensa um aluno (cria transação de recompensa)                  |
| [`/account/redeem/{uuid}`](#)                |       PUT       | Aluno resgata vantagem (cria transação de resgate)                            |
| [`/account/balance`](#)                      |       GET       | Consulta de saldo/extrato (aceita filtros)                                    |
| [`/students/{id}`](#)                        |       GET       | Buscar aluno por ID                                                           |
| [`/students`](#)                             |       GET       | Listar alunos                                                                 |
| [`/students/{id}`](#)                        |      PATCH      | Atualizar dados do aluno                                                      |
| [`/students/me`](#)                          |     DELETE      | Deletar próprio usuário (aluno)                                               |
| [`/enterprises/{id}`](#)                     |       GET       | Buscar empresa por ID                                                         |
| [`/enterprises`](#)                          |       GET       | Listar empresas                                                               |
| [`/enterprises/{id}`](#)                     |      PATCH      | Atualizar empresa                                                             |
| [`/enterprises/me`](#)                       |     DELETE      | Deletar conta de empresa autenticada                                          |
| [`/enterprises/{id}/advantages`](#)          |       GET       | Listar vantagens de uma empresa (paginado)                                    |
| [`/enterprises/validate-redeem/{coupon}`](#) |      POST       | Validar cupom de resgate (usado por empresas)                                 |
| [`/advantages`](#)                           |       GET       | Listar vantagens (paginado)                                                   |
| [`/advantages/{id}`](#)                      |       GET       | Buscar vantagem por ID                                                        |
| [`/advantages/{id}/enterprise`](#)           |       GET       | Buscar empresa dona da vantagem                                               |
| [`/advantages`](#)                           |      POST       | Criar vantagem (multipart/form-data)                                          |
| [`/advantages/{id}`](#)                      |      PATCH      | Atualizar vantagem                                                            |
| [`/advantages/{id}`](#)                      |     DELETE      | Excluir vantagem                                                              |
| [`/api/test/email/welcome`](#)               |       GET       | Endpoint de teste de email de boas-vindas (query params)                      |
| [`/api/test/email/coins-received`](#)        |       GET       | Teste: email de moedas recebidas                                              |
| [`/api/test/email/coins-sent`](#)            |       GET       | Teste: email de moedas enviadas                                               |
| [`/api/test/email/advantage-redeemed`](#)    |       GET       | Teste: email de resgate de vantagem                                           |
| [`/api/test/email/password-reset`](#)        |       GET       | Teste: email de recuperação de senha                                          |
| [`/api/test/email/send`](#)                  |      POST       | Enviar email genérico (body com `to`, `subject`, `templateName`, `variables`) |

> Observação: a tabela acima é um resumo — para exemplos de requisição/resposta e modelos, abra o Swagger da API.

## 🗺️ **Diagrams / Arquitetura**

Diagramas do sistema e fluxos estão disponíveis na pasta `docs/` do repositório ou acessíveis no Figma atravez dos links.

-   [Pagginas dos sites](https://www.figma.com/design/CwoWYsl9Zy2AsitakLPjkb/Moeda-estudantil?node-id=52-2&p=f&t=BIwnycBPsusVCuVl-0)
-   [Historias de usuario](https://www.figma.com/design/CwoWYsl9Zy2AsitakLPjkb/Moeda-estudantil?node-id=0-1&p=f&t=BIwnycBPsusVCuVl-0)
-   [Diagrama de caso de uso](https://www.figma.com/design/CwoWYsl9Zy2AsitakLPjkb/Moeda-estudantil?node-id=1-2&p=f&t=BIwnycBPsusVCuVl-0)
-   [Diagrama de classes](https://www.figma.com/design/CwoWYsl9Zy2AsitakLPjkb/Moeda-estudantil?node-id=1-3&p=f&t=BIwnycBPsusVCuVl-0)
-   [Diagrama Entidade relacionamento](https://www.figma.com/design/CwoWYsl9Zy2AsitakLPjkb/Moeda-estudantil?node-id=92-3038&p=f&t=BIwnycBPsusVCuVl-0)
-   [Diagrama de Componetes](https://www.figma.com/design/CwoWYsl9Zy2AsitakLPjkb/Moeda-estudantil?node-id=1-4&p=f&t=BIwnycBPsusVCuVl-0)
-   [Diagrama MER](https://www.figma.com/design/CwoWYsl9Zy2AsitakLPjkb/Moeda-estudantil?node-id=33-55&p=f&t=BIwnycBPsusVCuVl-0)

## 📁 **Estrutura do Projeto**

Visão simplificada da árvore de pastas principal:

```
student-coin/
├─ backend/
│  ├─ src/
│  │  ├─ main/
│  │  │  ├─ java/com/student_coin/api/  # código Java (controllers, services, entities)
│  │  │  └─ resources/                  # application.yml, templates de email
│  ├─ build.gradle.kts
│  └─ Dockerfile.dev
├─ frontend/
│  ├─ app/                              # Next.js app (app router)
│  ├─ components/
│  ├─ services/
│  ├─ package.json
│  └─ Dockerfile.dev
├─ docker-compose.yml
└─ README.md
```

## 🤝 Contribuição

 <a href = "https://github.com/bgluis/student-coin/graphs/contributors">
   <img src = "https://contrib.rocks/image?repo=bgluis/student-coin"/>
 </a>

[repossitory-path]: bgluis/student-coin/
[contributors-shield]: https://img.shields.io/github/contributors/bgluis/student-coin.svg?style=for-the-badge
[contributors-url]: https://github.com/bgluis/student-coin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bgluis/student-coin.svg?style=for-the-badge
[forks-url]: https://github.com/bgluis/student-coin/network/members
[stars-shield]: https://img.shields.io/github/stars/bgluis/student-coin.svg?style=for-the-badge
[stars-url]: https://github.com/bgluis/student-coin/stargazers
[issues-shield]: https://img.shields.io/github/issues/bgluis/student-coin.svg?style=for-the-badge
[issues-url]: https://github.com/bgluis/student-coin/issues
[license-shield]: https://img.shields.io/github/license/bgluis/student-coin.svg?style=for-the-badge
[license-url]: https://github.com/bgluis/student-coin/blob/master/LICENSE.txt
[SpringBoot.io]: https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[Nextjs.io]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Postgres.io]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[Java.io]: https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white
[TypeScript.io]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
