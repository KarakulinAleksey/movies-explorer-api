# Дипломный проект Movies-explorer-api :tv: (backend).  
Бэкенд-часть дипломного проекта для аутентификации пользователей и сохранения фильмов.  
Backend размещен на облачном сервере *Я.Облоко* `https://api.mov-exp.karakulin.nomoredomains.work`

### Функциональность:
- Регистрация и авторизация пользователей.
- Сохранение и передача пользователю карточки фильма по запросу.
- Проверка токена.
- Запись cookie.
- Сохранение информацию о профиле пользователя.

### :computer: Технологии
- Node.js,
- mongoDB,
- express.js,
- mongoose,
- celebrate,
- winston - логирование запросов и ошибок,
- CORS.

### :rocket: Установка и запуск проекта
*1. Клонируйте репозиторий:*<br/>
`git clone https://github.com/KarakulinAleksey/movies-explorer-api.git`<br/>
*2. Установите зависимости:*<br/>
 `npm install`<br/>
*3. Запустите проект:*<br/>
 `npm run dev` - для отладки <br/>
 `npm run start` - для запуска <br/>
Проект запуститься на локальном сервере по адресу: `http://localhost:3000`  
Перед запуском проекта не забудьте запустить сервер базы данных mongoDB, командой `mongod`
