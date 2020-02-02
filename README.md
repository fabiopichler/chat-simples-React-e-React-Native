## Chat simples com React (web) e React Native - Monorepo 

Um chat básico e simples usando WebSockets.

Este repositório é um monorepo e contém:
- 1 aplicativo web com React: app-web;
- 1 aplicativo mobile com React Native: app-mobile;
- 1 pacote com código comum entre os aplicativos: app-modules;
- 1 Servidor em Node.js: server.

### Como executar

Baixe o repositório com o git, ou baixe o Zip pela página deste repositório, após isso, entre na pasta do projeto e execute os próximos passos:

#### Instalar as dependências

```shell
yarn
```

#### Iniciar o servidor

```shell
yarn serve
```

#### Iniciar o aplicativo web

```shell
yarn web
```

#### Instalar o aplicativo Android

Primeiro, é preciso executar o servidor JS do React Native:

```shell
yarn mobile
```

Após o servidor do React Native estar rodando, instale o aplicativo no dispositivo Android:

```shell
yarn android
```
