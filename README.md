# TrelloManager

Список методов

<table>
  <tr>
    <th>Тип</th>
    <th>Путь</th>
    <th>Состояние</th>
    <th>Роль</th>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/invite</td>
    <td>Готов</td>
    <td>Админ</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/register</td>
    <td>Готов</td>
    <td>*</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth</td>
    <td>Готов</td>
    <td>*</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/profile</td>
    <td>Готов</td>
    <td>*</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/user/{n}</td>
    <td>Готов</td>
    <td>Админ</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/users</td>
    <td>Готов</td>
    <td>Админ</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/cards</td>
    <td>Не готов</td>
    <td>Админ/Клиент</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/card/{n}</td>
    <td>Не готов</td>
    <td>Админ/Клиент</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/api/card/{n}</td>
    <td>Не готов</td>
    <td>Клиент</td>
  </tr>
</table>

<p>Для работы сервера необходимо установить MySQL СУБД у себя на компьютере.</p>
<p>Для корректного взамодействия с доской trello необходимо создать у себя файл такого типа в корне проекта: (на данный момент он помечен как игнорируемый в .gitignore)</p>

> Для получения ключей нужно перейти по ссылке [Trello Keys](https://trello.com/app-key)

<p>Название файла в корне проекта - trello_keys.js</p>


```
module.exports.apiKey = ''
module.exports.serverToken = ''
```
