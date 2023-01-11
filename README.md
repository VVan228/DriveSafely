# DriveSafely

<img src="https://github.com/loud1y/DriveSafely/blob/main/ds.jpg" width="300"/>

*Краткое описание бизнес-процессов, реализованных в проекте*

## Идея проекта

Web3 игра, использующая блокчейн Ethereum. Она позволяет игрокам осуществлять различные действия с токенами на автомобильную тематику (купля, продажа, улучшение характеристик). Основная механика игры заключается в определении правильной схемы проезда участников дорожного движения в соответствии с ПДД.

### Использованные технологии

В проекте реализованы 2 программных модуля:
1. Смарт контракты, описывающие основную бизнес-логику проекта и позволяющие взаимодействовать с сетью Ethereum (Solidity)
2. Web-интерфейс для взаимодействия с контрактами из п.1 (React, Ethers.js)

Тестирование контрактов выполнялось в локальной сети, развёрнутой с помощью возможностей [Ganache](https://trufflesuite.com/docs/ganache/) с применением инструментов [Truffle](https://trufflesuite.com/docs/truffle/).

## Регистрация в приложении

Для доступа к приложению пользователю необходимо:

- установить расширение для браузера **MetaMask**
- при необходимости создать Ethereum кошелёк
- войти в свой кошелёк для получения возможности выполнения транзакций

## NFT's 👾

<img src="https://github.com/loud1y/DriveSafely/blob/main/CarView.png" width="600"/>

Каждый пользователь приложения может выполнять различные действия с 3 видами игровых токенов:

- Машина (Car)
- Двигатель (Engine)
- Шасси (Chassis)

**Машины** являются основным игровым токеном, они имеют название и уникальный vin-номер, определяющий форму их кузова и цвет. Сразу после регистрации для каждого пользователя создаётся новая **Машина** и прикрепляется к адресу его кошелька.

**Двигатель** и **Шасси** - вторичные игровые токены, также выдаются всем игрокам при регистрации и "устанавливаются" в созданную машину. 

**Двигатель** обладает такими характеристиками, как кол-во лошадиных сил и потребление бензина (литров / 10 км). Для **Шасси** определён запас прочности (в км). Для создания равных начальных условий всем игрокам выдаются токены с характеристиками по умолчанию.

Также, за каждым новым пользователем закрепляется **Фабрика** по производству бензина, обладающая характеристиками максимальной вместимости (в литрах) и скоростью производства топлива (литров / час). Данные параметры аналогично задаются по умолчанию одинаковыми для всех новых игроков. **Машина** заправляется бензином, который производит **Фабрика**, и только после этого игрок может заходить в раздел соревнований приложения.

> Note:  В отличие от **Машин, Двигателей и Шасси**, `Фабрика не является игровым токеном`, её нельзя продать, отправить на другой кошелёк или купить ещё одну. Каждому аккаунту всегда соответствует ровно одна **Фабрика**.


## Игровые Миры

<img src="https://github.com/loud1y/DriveSafely/blob/main/WorldView.png" width="600"/>

Для участия в соревнованиях в Машину должны быть установлены Двигатель и Шасси. Тогда, для Машины будут доступны игровые Миры тех рангов (от 1 до 10), которым соответствует уровень данной Машины.
 
> Note: Для Машин с 1 по 9 уровень доступен Мир только 1 ранга; для Машин с 10 по 19 уровень доступны Миры с 1 по 2 ранг и т.д.

Увеличение ранга игрового Мира влияет на размер награды за победу (увеличивается) и расстояние, которое проходит Машина за одно соревнование (уменьшается). Таким образом, запас прочности Шасси расходуется дольше, и увеличивается количество соревнований, в которые может зайти пользователь с тем же количеством бензина на Фабрике.


## Режим соревнования

Основным бизнес-процессом приложения является соревнование игроков, которое происходит следующим образом:

1. Игрок заходит в раздел соревнований, выбирает доступный ему мир и Машину
2. Для игрока ищется подходящая комната (с участниками ранга выбранного Мира)
3. Когда комната заполнена, генерируется случайный перекрёсток с дорожными знаками и расположение Машин игроков на нём
4. Все участники комнаты оповещаются о начале игры и получают информацию о перекрёстке в закодированном виде, после чего он отрисовывается в интерфейсе у каждого игрока
5. Игроки выбирают в какой последовательности должны проезжать участники комнаты в соответствии со знаками, направлениями движения на сгенерированном перекрёстке и ПДД
6. При отправке решения каждого игрока, сохраняется время, за которое он дал ответ, после чего решение проверяется на правильность
7. После того, как все игроки отправят свои решения, для каждого участника комнаты определяется его рейтинг в текущем соревновании, который рассчитывается в зависимости от правильности данного ответа, скорости его отправки и мощности Двигателя, установленного в Машине в момент заезда (в зависимости от мощности двигателя высчитывается время, которое отнимается от времени потраченного игроком на "решение" перекрёстка)
8. Игроки, давшие правильный ответ, получают вознаграждение в зависимости от ранга Мира и занимаемого ими места по скорости отправки ответа; те игроки, которые ответили неправильно, ничего не получают


После каждого участия в соревновании для Фабрики пользователя уменьшается её заполненность бензином в соответствии с расстоянием, которое проходит Машина в каждом заезде (зависит от ранга игрового Мира) и расходом топлива Двигателя, который установлен в Машине. Если текущее количество топлива на Фабрике меньше, чем потребуется для совершения заезда, то соревнование будет недоступно.

Также уменьшается доступный ресурс пробега для Шасси, которое было установлено в момент соревнования в Машине.


## Тачку на прокачку

<img src="https://github.com/VVan228/DriveSafely/blob/master/frontend/src/images/pmr.svg" width="600"/>

В приложении для всех игровых токенов и Фабрики предусмотрена функциональность для улучшения их показателей. 

1. Увеличение вместимости Фабрики и её скорости производства бензина:
    - При регистрации каждый игрок получает Фабрику с вместимостью 60 литров и скоростью производства бензина 5 литров в час
2. Увеличение количества лошадиных сил и уменьшение расхода бензина для Двигателя:
    - При регистрации каждый игрок получает Двигатель с количеством лошадиных сил в диапазоне от 80 до 90 и расходом бензина = 10 литров/10км

3. Увеличение запаса прочности для Шасси:
    - При регистрации каждый игрок получает Шасси с запасом прочности в диапазоне от 100 до 120 тыс. км
    - После каждого участия в соревновании для Шасси уменьшается ресурс (в км) на величину, зависящую от Мира, в котором играет пользователь

> Note: За улучшение каждого показателя с игрока взимается плата, рассчитанная в зависимости от текущей величины прокачиваемой характеристики и количества единиц, на которое игрок хочет улучшить её

4. Увеличение уровня для Машины:
    - При регистрации всем игрокам выдаётся Машина 1-го уровня
    - Максимальный достижимый уровень в игре = 99
    - Для того, чтобы прокачать Машину, количество одержанных побед для неё должно быть не меньше чем номер текущего уровня
    - При переходе на каждый новый уровень счётчик побед сбрасывается
    - С игрока взимается плата, размер которой зависит от величины текущего уровня

## Маркет 📦

Каждый игрок имеет возможность выставлять принадлежащие ему токены на продажу и назначать за них свою цену, а также покупать в маркете токены других игроков.

> Note: с аккаунта нельзя отправлять или продавать токен, если у игрока это единственный токен данного типа.

Владелец контракта имеет возможность создавать токены с кастомными характеристиками и размещать их в маркете для продажи другим игрокам. В дальнейшем планируется добавить функцию бридинга токенов для получения нового NFT в свою коллекцию, который будет обладать характеристиками, которые устанавливаются в зависимости от параметров токенов, участвовавших в его создании.
