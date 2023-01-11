# DriveSafely

*Краткое описание бизнес-процессов и программных модулей, реализованных в проекте*

## Идеология проекта



## Регистрация в приложении



## NFT's 👾

Каждый пользователь приложения может выполнять различные действия с 3 видами игровых токенов:

-Машина (Car)
-Двигатель (Engine)
-Шасси (Chassis)

**Машины** являются основным игровым токеном, они имеют название и уникальный vin-номер, определяющий форму их кузова и цвет. Сразу после регистрации для каждого пользователя создаётся новая **Машина** и прикрепляется к адресу его кошелька.

**Двигатель** и **Шасси** - вторичные игровые токены, также выдаются всем игрокам при регистрации и "устанавливаются" в созданную машину. 

**Двигатель** обладает такими характеристиками, как кол-во лошадиных сил и потребление бензина (литров / 10 км). Для шасси определён запас прочности (в км). Для создания равных начальных условий всем игрокам выдаются токены с характеристиками по умолчанию.

Также, за каждым новым пользователем закрепляется **Фабрика** по производству бензина, обладающая характеристиками максимальной вместимости (в литрах) и скоростью производства топлива (литров / час). Данные параметры аналогично задаются по умолчанию одинаковыми для всех новых игроков. **Машина** заправляется бензином, который производит **Фабрика**, и только после этого игрок может заходить в раздел соревнования приложения.

> Note:  В отличие от **Машин, Двигателей и Шасси**, `Фабрика не является игровым токеном`, её нельзя продать, отправить на другой кошелёк или купить ещё одну. Каждому аккаунту всегда соответствует ровно одна **Фабрика**.

Также, с аккаунта нельзя отправлять или продавать токен, если у игрока это единственный токен данного типа. Таким образом, каждый аккаунт приобретает ценность.

## Тачку на прокачку
[![N|Solid](https://carsnpeople.ru/wp-content/uploads/2016/08/Pimp_my_Ride_preview.png)]()

В приложении для всех игровых токенов и Фабрики предусмотрена функциональность для улучшения их показателей. 

1. Увеличение вместимости Фабрики и её скорости производства бензина:
    - При регистрации каждый игрок получает Фабрику с вместимостью 60 литров и скоростью производства бензина 5 литров в час
    - За увеличение каждого показателя с игрока взимается плата, рассчитанная в зависимости от текущей величины прокачиваемой характеристики и количества единиц, на которое игрок хочет улучшить её

2. Увеличение уровня для Машины:
    - При регистрации всем игрокам выдаётся Машина 1-го уровня
    - Максимальный достижимый уровень в игре = 99
    - Для того, чтобы прокачать Машину, количество одержанных побед для неё должно быть не меньше чем номер текущего уровня
    - При переходе на каждый новый уровень счётчик побед сбрасывается
    - Для увеличения уровня с игрока взимается плата, размер которой зависит от величины уровня

3. Увеличение количества лошадиных сил и уменьшение расхода бензина для двигателя:
    - 

- Машин увеличение уровня (в самом начале у всех игроков Машины 1-го уровня, максимальный уровень 99)
# Dillinger
## _The Last Markdown Editor, Ever_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
AngularJS-powered HTML5 Markdown editor.

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features

- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech

Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
to Markdown converter
- [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

## Docker

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart=always --cap-add=SYS_ADMIN --name=dillinger <youruser>/dillinger:${package.json.version}
```

> Note: `--capt-add=SYS-ADMIN` is required for PDF rendering.

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:8000
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>




# DriveSafely

<img src="https://github.com/loud1y/DriveSafely/blob/main/ds.jpg" width="300"/>


## Пользовательский интерфейс

### Гараж:

<img src="https://github.com/loud1y/DriveSafely/blob/main/CarView.png" width="600"/>


### Выбор игрового мира:

<img src="https://github.com/loud1y/DriveSafely/blob/main/WorldView.png" width="600"/>
