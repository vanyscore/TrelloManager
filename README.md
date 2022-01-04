# TrelloManager

Список методов

<table>
  <tr>
    <th>Тип</th>
    <th>Путь</th>
    <th>Состояние</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/invite</td>
    <td>Не готов</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/register</td>
    <td>Готов (ожидается связка с /invite)</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth</td>
    <td>Готов</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/profile</td>
    <td>Не готов</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/user/{n}</td>
    <td>Не готов</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/users</td>
    <td>Не готов</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/cards</td>
    <td>Не готов</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/card/{n}</td>
    <td>Не готов</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/card/{n}</td>
    <td>Не готов</td>
  </tr>
</table>

<p>Для работы сервера необходимо установить MySQL СУБД у себя на компьютере.</p>
<p>Для корректного взамодействия с доской trello необходимо создать у себя файл такого типа в корне проекта: (на данный момент он помечен как игнорируемый в .gitignore)</p>

> Для получения ключей нужно перейти по ссылке [Trello Keys](https://trello.com/app-key)

<p>Название файла в корне проекта - trello_keys.js</p>


```
module.exports.apiKey = '';
module.exports.serverToken = '';
```
