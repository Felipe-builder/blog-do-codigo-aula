
<div align="center">
<p style="font-weight: bold;">Segurança em APIs REST</p>
  <h1>API - Blog-aulas</h1>
  <h3>Aplicando conceitos de segurança numa api express nodejs</h3>
  <p style="indent-text"><p>
</div>


## Pre Requisites
<a href="https://nodejs.org/en/download/"><img src="https://img.shields.io/badge/nodejs-v16.14.0-green?style=for-the-badge&logo=node.js"/></a></br>
<a href="https://www.mysql.com/downloads/"><img src="https://img.shields.io/badge/mysql-yellowgreen?style=for-the-badge&logo=mysql"/></a></br>
<a href="https://docs.npmjs.com/about-npm"><img src="https://img.shields.io/badge/npm-v8.3.1-yellow?style=for-the-badge&logo=npm"/></a></br>
<a href="https://redis.io/docs/getting-started/installation/"><img src="https://img.shields.io/badge/redis-yellow?style=for-the-badge&logo=redis"/></a>
<a href="https://code.visualstudio.com/download"><img src="https://img.shields.io/badge/vscode-yellow?style=for-the-badge&logo=Visual Studio Code"/></a>

# Summay

 - Identifique e solucione problemas de segurança em sistemas de autenticação;
 - Entenda o que são funções de hashing e como usá-las para guardar senhas de forma mais segura;
 - Construa um sistema de autenticação usando tokens;
 - Entenda o funcionamento do JSON Web Token e como usá-lo para autenticação
 - Utilize um banco de dados chave-valor em memória na sua aplicação.

 - Construa uma allowlist para guardar tokens opacos
 - Implemente refresh tokens que atualizam JSON Web tokens
 - Desenhe uma interface para o uso padronizado de tokens
 - Aprenda a enviar e-mails através de Node.js
 - Construa um sistema de verificação de e-mails usando tokens

 - Conceitos de Docker


## Recursos
### Consumido
> ## API
>
>
> ### Pessoas
>   - GET '/usuario'
>   - POST '/usuario'
>   - DELETE '/usuario/:id'
>   - GET '/usuario/verifica_email/:token'
>   - POST '/usuario/login'
>   - POST '/usuario/atualiza_token'
>   - POST '/usuario/logout'
>
> ### Turmas
>   - GET '/post'
>   - POST '/post'



[Postman Collections](./postman/Blog do Codigo.postman_collection.json)

# Compilation Guide

## DOCKER


### 1. INSTALL DOCKER

> https://docs.docker.com/engine/install/

### 2. Push Image

> https://hub.docker.com/repository/registry-1.docker.io/8841523/api-blog/general
>
> <br>
>
>```
>docker push 8841523/api-blog:tagname
>```
>```
>docker network create redis
>```
>```
>docker run -d -p 6379:6379 --net "redis" --name redis redis
>```
>```
>docker run -p 3000:3000 --net "redis" -v $(pwd):/usr/api-blog -d --name node 8841523/api-blog:1.1
>```
> <br>

## Without Docker

### 1. Clone the project from GitHub:

```
git clone https://github.com/Felipe-builder/blog-do-codigo-aula.git
```


### 2. Install depencendies

```
npm install
```
    
### 3. Run

```
npm run dev
```
or

```
npm run start
```



The application will respond on port `3000`, to test if it has been correctly uploaded, just access [localhost:3000](http://localhost:3000).

To end an application just press `ctrl+c` in the terminal.

## Application access

The application will respond on port `3000`, to test if it has been correctly uploaded, just access [localhost:3000](http://localhost:3000).
test users usernames and passwords 

## References

> https://nodejs.org/docs/latest-v16.x/api/index.html

> https://dev.mysql.com/doc/

> https://mongoosejs.com/docs/api.html

> https://momentjs.com/docs/