<img width="1920" height="1080" alt="Financy - Desafio de pós-graduação" src="https://github.com/user-attachments/assets/5d0cb181-ef20-4af1-8f7a-2c3ce9be20cb" />

<p align="center">
  <img alt="Repo size"  src="https://img.shields.io/github/repo-size/geovaneborba/ftr-pos-desafio-financy?color=4f46e5&style=for-the-badge">
  <img alt="GitHub top language"  src="https://img.shields.io/github/languages/top/geovaneborba/ftr-pos-desafio-financy?color=4f46e5&style=for-the-badge"> 
  <img alt="GitHub language count"  src="https://img.shields.io/github/languages/count/geovaneborba/ftr-pos-desafio-financy?color=4f46e5&style=for-the-badge">
</p>
<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0;
  <a href="#clipboard-functionalities">Funcionalidades</a> &#xa0; | &#xa0;
  <a href="#books-aprendizado">Aprendizado</a> &#xa0; | &#xa0;
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#warning-pré-requisitos"> Pré requisitos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a> &#xa0;
</p>
<br>

## :dart: Sobre

Este repositório contém o projeto Financy, uma aplicação financeira desenvolvida como desafio da pós-graduação da Faculdade de Tecnologia Rocketseat.

### Projeto Financy

Sistema de gestão financeira com backend em Node.js e frontend em React. Utiliza GraphQL para comunicação entre cliente e servidor, com banco de dados SQLite através do Prisma ORM. A aplicação oferece funcionalidades completas de autenticação, gerenciamento de transações financeiras, categorização personalizada e dashboard interativo para visualização de dados.

## 📋 Funcionalidades

- ✅ **Autenticação Segura**: Login, registro com JWT + Refresh Token + Recuperação de senha
- ✅ **Gestão de Transações**: Criar, editar, deletar e listar transações, com filtros por categoria, período e paginação
- ✅ **Categorias Personalizadas**: Sistema de categorias com cores e ícones
- ✅ **Isolamento de Dados**: Cada usuário acessa apenas seus dados
- ✅ **Dashboard Financeiro**: Visualização interativa de dados
- ✅ **API GraphQL**: Schema completo com resolvers otimizados

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :books: Aprendizado

- Implementação de API GraphQL com Type-GraphQL
- Integração de frontend React com Apollo Client
- Gerenciamento de estado com Zustand
- Autenticação JWT + Refresh Token
- Design de interfaces com TailwindCSS e Radix UI
- Persistência de dados com Prisma ORM e SQLite

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :rocket: Tecnologias

As seguintes tecnologias foram usadas na construção do projeto:

- **Node.js**
- **Express.js**
- **React.js**
- **TypeScript**
- **GraphQL**
- **Prisma ORM**
- **SQLite**
- **Apollo Server & Client**
- **TailwindCSS**
- **Radix UI**
- **Zustand**
- **React Hook Form**
- **JWT**

Outras dependências e ferramentas utilizadas podem ser encontradas no arquivo
package.json dos projetos.

- Backend: [package.json](./backend/package.json)
- Frontend: [package.json](./frontend/package.json)

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :warning: Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>

## :checkered_flag: Começando

### Backend

```bash
# Entre na pasta do projeto
$ cd financy
# Entre no diretório backend e instale as dependências
$ cd backend && npm install
# Preencha as variáveis de ambiente no arquivo .env utilizando o arquivo .env.example como referência
$ cp .env.example .env
# Execute as migrações e o seed do banco de dados
$ npm run migrate
$ npm run seed
# Inicie o backend (rodará em http://localhost:4000/graphql)
$ npm run dev
```

### Frontend

```bash
# Frontend (em outro terminal)
$ cd frontend && npm install
$ npm run dev
# Frontend rodará em http://localhost:5173
```

<p align="right">(<a href="#top">Voltar para o topo</a>)</p>
<p align="center">Feito com ❤️ por <a href="https://github.com/geovaneborba" target="_blank">Geovane Borba</a></p>
