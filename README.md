# Call For Papers

## Introdução

Este projeto consiste em uma aplicação baseada no framework Quarkus para o back-end e um front-end desenvolvido em React utilizando Vite.

## Requisitos

Antes de iniciar, certifique-se de que os seguintes softwares estão instalados:

- [Docker](https://www.docker.com/get-started)
- [Maven](https://maven.apache.org/download.cgi)
- [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) (Node.js na versão 22.14.0)

## Instalação e Execução

### Back-end

#### Opção 1: Executar com Docker

1. Certifique-se de que o Docker esteja instalado e em execução.
2. Acesse a pasta do back-end do projeto:
   ```sh
   cd tdc/cfp
   ```
3. Construa e inicie os contêineres:
   ```sh
   docker-compose up --build
   ```
4. Com os contêineres em execução, inicie a aplicação Quarkus:
   ```sh
   mvn quarkus:dev
   ```
5. A aplicação estará acessível em: [http://localhost:8080/](http://localhost:8080/)

### Front-end

1. Acesse a pasta do front-end do projeto:
   ```sh
   cd tdc/cfp-front
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Execute o projeto:
   ```sh
   npm run dev
   ```
4. O front-end estará acessível em: [http://localhost:5173](http://localhost:5173) (ou conforme configurado)

## Exemplo de Submissão

Para referência, consulte o exemplo de submissão disponível:
[Exemplo de Submissão](https://github.com/user-attachments/assets/1d6fc434-53c6-413a-be8a-4c8cf5663ff7)

