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

  <!-- <a href="https://github.com/bgluis/student-coin/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3>Student Coin</h3>
</div>

# 💰 STUDENT-COIN: Sistema de Moeda Estudantil

## 🎯 Sobre o Projeto

O **STUDENT-COIN** é um sistema desenvolvido para estimular e reconhecer o mérito estudantil através de uma moeda virtual. Professores distribuem a moeda por bom desempenho e participação, e alunos a utilizam para resgatar vantagens, produtos e descontos oferecidos por empresas parceiras.

Este projeto foi desenvolvido seguindo a arquitetura **MVC (Model-View-Controller)** e os requisitos da **Release 1** do Sistema de Moeda Estudantil.

## ✨ Funcionalidades Principais (Release 1)

O sistema atende aos seguintes perfis de usuário:

| Perfil | Funcionalidades Principais | Requisitos Atendidos |
| :--- | :--- | :--- |
| **Aluno** | Cadastro completo, consulta de saldo/extrato, e resgate/troca de moedas por vantagens. | Notificação por email ao receber moeda; Extrato de recebimentos e trocas. |
| **Professor** | Envio de moedas aos alunos com motivo (limite de 1000 moedas/semestre acumuláveis), consulta de saldo/extrato de envios. | Autenticação, gestão de saldo, registro da transação. |
| **Empresa Parceira** | Cadastro, inclusão de vantagens (descrição, foto, custo em moedas) e recebimento de notificação/código para conferência de resgate. | Autenticação, gestão de catálogo de vantagens, fluxo de troca. |

---

## 💻 Tecnologias Utilizadas

O projeto adota uma arquitetura *full-stack* dividida, utilizando tecnologias modernas:

### Backend
* **Linguagem:** Java
* **Framework:** Springboot
* **Banco de Dados:** PostgreSQL

### Frontend
* **Framework/Biblioteca:** Next
* **Linguagem:** TypeScript
* **Estilização:** Tailwind

### Infraestrutura/DevOps
* **Conteinerização:** Docker / `docker-compose.yml`
* **Controle de Versão:** Git / GitHub

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

---

## 🤝 Contribuição

Gabriel Assis
João Pedro Peres
Luis Henrique
Marcela Mendes

---


goColor=white
