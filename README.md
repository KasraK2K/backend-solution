# Backend Solution

This project is a `Node JS Boilerplate` in which the general needs of each project are tried to be available and to start coding and create the desired challenges such as login, GRPC, system log, config, caching, database orm, etc., do not be an obstacle.

Using this boilerplate you can start your desired project as soon as possible and i have the extended my project using this boilerplate at the enterprise level.

In the meantime, a lot of effort and time has been spent on using the correct solution and we hope that this project will be the answer to your needs.

---

## Install

install dependencies:

```bash
npm install
```

You can see list of all dependencies or scripts in `package.json`.
&nbsp;

## Scripts

In this project i have writen some script and i explate them step by step to undrestand `why` and `how`.
&nbsp;

```bash
npm run kill # Kill or clear port.
npm run prebuild # Remove last build folder before new build.
npm run build # Build project with production configs using webpack.
npm run start # Run builded application with production config.
npm run build:dev # Build project with development configs using webpack.
npm run start:dev # Run builded application with development config.
npm run dev # Serve typescript using ts-node-dev and it should use in development time.
npm run pm2 # Serve builded project using pm2 with production config existed in ecosystem.config.js file.
npm run pm2:dev # Serve typescript using pm2 with development config existed in ecosystem.config.js file.
npm run lint # Linting the project using eslint configs existed in .eslintrc.yml file.
npm run format # Prettier codes using prettier config existed in .prettierrc file.
npm run docs # Generate documentation for project by using typodoc and configuration is in typedoc.json file.
npm run prepare # Prepare husky to prettier codes before commit.
```

_**Note**_: For using `pm2:dev` you need to install typescript for pm2 with this command

```bash
pm2 install typescript
```

## Structure

Some folder should explain to undrestand what am i doing in this project.

1. **/config**: folder is configuration files i used in hole project and it is not secure most of the time. It has three different config files to separate local, development and production values. It also has an interface file i used that to solve typescript problem and make code more clear.
2. /**docs**: When you run `docs` command, the project create documentation in this folder.
3. **/logs**: If you change `logger.logOnFile` to true the backend logs save in this folder and in production i dont make logs pretty but in development i have forced that to be pretty to make it more redable.
4. **/src**: After all everything we talk about that is in this folder so i have to explain this folder separatly but i would like to say the code of application is there.
&nbsp;

### src/app

This folder is a place to hold sub app (child nodes).
for example i run my prometheus metric server as child node and i place it in src/app/prometheus.
&nbsp;

### src/base

This folder is used to put my parent classes like ORM logic. As you heard now i created some repositories in there and it solve some of every day chalanges like saving object and creating queries and convert string to ObjectID and so on.
In the other side i put my main Controller , Service and Repository class in there.
&nbsp;

### src/bootstrap

Bootstrap is a place to gather together every pice of code should run before application run. for example i have to use `reflect-metadata` or register my `environments` or check environment existance i called `requirements` or register `cron jobs` or `RabbitMQ consummers` befor application runs.
&nbsp;

### src/common

This folder is for holding global and public features like `decorators`, general porpuse `enums` and `interfaces` and `seeders` to insert initial data before run the applications and `utils` to write simple functions we need them everyvere and `helper` to use utils or write code to solve problems bigger than utils.
&nbsp;

### src/integrations

Everyday we need to use some third parties such as `firebase` or `twilio` or `mailgun` or we need to create some part of code  and never think about how it work again and just focusing to our development for example using `BullMQ` and create queue worker by using integration and it should be simple such as calling sdk so i create integrations folder to put every integrations in there and now we can everyday add new integrations and it can be copy to other projects without any trible.
&nbsp;

### src/middlewares

As you know middlewares are very useful and i put all middleware classes in this folder. I have created rate limitter, multipart problem solver and some useful middleware in this folder.
&nbsp;

### src/migrations

Mirations is another useful things i think we have to hold it in our project because many junior developers don't know how to create database, add user to that database or add privilages to that database. Many of junior developers forget how they created this things or it can be a good example code for indexinf columns or etc.
&nbsp;

### src/modules

Modules is MVC artichecture for `Rest API` and each module has own `router`, `controller`, `service`, `repository`, `query generator` and `validation schema` and `_rest.http` file useful to send request in development time.

**NOTE**: Auth is a module i writed by using `passport` to add login and register feature and it can extend more and more in the future.
&nbsp;

### src/routes

This folder is for my router files and i separated them with api versions like `v1` and each router call another router to aggrigrate that router, routes. After all version routers call modules routers.
&nbsp;

## How To Use

In each functions or integrations or helper or etc i have a sections with `How To Use` title and i wrote some example to use the features. So you need just open the files and read them. I think everything is clear.
&nbsp;