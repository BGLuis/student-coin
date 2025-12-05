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

## ✨ Funcionalidades Principais (Release 1)

O sistema atende aos seguintes perfis de usuário:

| Perfil               | Funcionalidades Principais                                                                                                          | Requisitos Atendidos                                                      |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **Aluno**            | Cadastro completo, consulta de saldo/extrato, e resgate/troca de moedas por vantagens.                                              | Notificação por email ao receber moeda; Extrato de recebimentos e trocas. |
| **Professor**        | Envio de moedas aos alunos com motivo (limite de 1000 moedas/semestre acumuláveis), consulta de saldo/extrato de envios.            | Autenticação, gestão de saldo, registro da transação.                     |
| **Empresa Parceira** | Cadastro, inclusão de vantagens (descrição, foto, custo em moedas) e recebimento de notificação/código para conferência de resgate. | Autenticação, gestão de catálogo de vantagens, fluxo de troca.            |

---

## 💻 Tecnologias Utilizadas

O projeto adota uma arquitetura _full-stack_ dividida, utilizando tecnologias modernas:

### Backend

-   **Linguagem:** Java
-   **Framework:** Springboot
-   **Banco de Dados:** PostgreSQL

### Frontend

-   **Framework/Biblioteca:** Next(15.5.5)
-   **Linguagem:** TypeScript(5)
-   **Estilização:** Tailwind(4)

### Infraestrutura/DevOps

-   **Conteinerização:** Docker / `docker-compose.yml` (2)
-   **Controle de Versão:** Git / GitHub

---

## 🛠️ Como Executar o Projeto

Para executar o sistema localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

### Passos

1.  **Clone o Repositório:**
    ```bash
    git clone github.com/BGLuis/student-coin
    cd STUDENT-COIN
    ```
2.  **Configurar Variáveis de Ambiente:**
    Crie o arquivo `.env` a partir do `.env.example` e preencha as variáveis de banco de dados e portas conforme necessário.
    ```bash
    cp .env.example .env
    # Edite o arquivo .env
    ```
3.  **Subir os Containers:**
    Utilize o Docker Compose para construir e iniciar os serviços (backend, frontend e banco de dados).
    ```bash
    docker-compose up --build -d
    ```
4.  **Acessar o Sistema:**
    O frontend estará acessível em `http://localhost:4200`.
    O backend (API) estará acessível em `http://localhost:13000`.

## Deploy

### Backend - Render

O backend é deployado na plataforma **Render** utilizando Docker:

1. Conecte seu repositório GitHub ao Render
2. Crie um novo serviço Web Service
3. Configure o `Dockerfile` na raiz do projeto
4. Defina as variáveis de ambiente necessárias (banco de dados, portas, etc.)
5. O deploy é acionado automaticamente a cada push na branch principal

**URL do Backend:** `https://student-coin-api.onrender.com`

### Frontend - Vercel

O frontend é deployado na **Vercel**:

1. Importe o repositório na Vercel
2. Configure a raiz do projeto como `./frontend`
3. Defina o comando de build: `npm run build`
4. Configure variáveis de ambiente (API_URL, etc.)
5. Cada push dispara um novo deploy automático

**URL do Frontend:** `https://student-coin.vercel.app`

### Armazenamento - Cloudflare R2

Imagens e arquivos são armazenados no **Cloudflare R2**:

1. Crie um bucket no R2
2. Configure credenciais de acesso (API Token)
3. Defina as variáveis de ambiente: `R2_BUCKET_NAME`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY`, `R2_SECRET_KEY`
4. Upload de imagens de vantagens e avatars é feito via API do backend

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

## 🤝 Contribuição

 <a href = "https://github.com/bgluis/student-coin/graphs/contributors">
   <img src = "https://contrib.rocks/image?repo=bgluis/student-coin"/>
 </a>
