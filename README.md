# Job Board Web App

Job Board Web App - это TGMiniApp для публикации и поиска вакансий. Оно позволяет пользователям добавлять вакансии, искать работу и управлять списком вакансий с авторизацией. Приложение предназначено для использования как в Telegram Mini App, так и как отдельное веб-приложение.

## Основные функции
- **Просмотр вакансий**: Список вакансий отображается в виде карточек, каждая карточка содержит название, описание и кнопку для получения подробной информации.
- **Добавление вакансий**: Пользователи могут добавить новую вакансию, указав название, описание и ссылку на подробности вакансии. Эта функция доступна только после авторизации.
- **Удаление вакансий**: Авторизованные пользователи могут удалять существующие вакансии.
- **Авторизация**: Пользователи должны авторизоваться с использованием специального ключ-пароля для получения доступа к функционалу добавления и удаления вакансий.

## Технологический стек
- **Backend**: Python (Flask)
- **Frontend**: HTML, CSS, JavaScript
- **База данных**: SQLite
- **Дополнительные библиотеки**: Flask-CORS

## Установка и запуск проекта
### 1. Клонирование репозитория
Склонируйте репозиторий на локальный компьютер:
```bash
$ git clone <URL репозитория>
$ cd job-board-web-app
```

### 2. Установка зависимостей
Создайте виртуальное окружение и установите необходимые зависимости:
```bash
$ python3 -m venv venv
$ source venv/bin/activate  # для Windows: venv\Scripts\activate
$ pip install -r requirements.txt
```

### 3. Запуск сервера
Запустите сервер Flask:
```bash
$ python jobboard_backend.py
```
Сервер будет запущен по адресу `http://127.0.0.1:5000`.

### 4. Запуск фронтенда
Используйте VS Code с расширением Live Server для запуска HTML файла:
1. Откройте файл `Jobboard_interface.html` в VS Code.
2. Нажмите "Go Live", чтобы запустить Live Server.
HTML будет доступен по адресу, например, `http://127.0.0.1:5500`.

## Использование
- При заходе на веб-страницу пользователи видят кнопки "Найти работу" и "Опубликовать вакансию".
- Кнопка "Опубликовать вакансию" доступна только после авторизации.
- Для авторизации пользователь должен ввести ключ-пароль, нажав на кнопку "Войти".
- После успешной авторизации пользователь видит кнопку "Выйти", а также может добавлять и удалять вакансии.

## Структура проекта
- **jobboard_backend.py**: Основной backend файл для запуска Flask сервера и обработки API запросов.
- **Jobboard_interface.html**: Основной HTML файл для интерфейса пользователя.
- **styles.css**: CSS файл для стилизации интерфейса.
- **script.js**: JavaScript файл для реализации логики взаимодействия фронтенда с backend.
- **requirements.txt**: Список зависимостей для установки Python библиотек.
- **jobs.db**; База данных с вакансиями

## Проблемы и ограничения
- Логотипы компаний временно не поддерживаются из-за проблем с доступом к изображениям на Google Drive.
- При перезагрузке страницы авторизация сохраняется с помощью `localStorage`.

## Будущие улучшения
- Интеграция с Telegram Mini App для работы непосредственно в Telegram.
- Улучшение функционала хранения логотипов компаний.
- Миграция с SQLite на PostgreSQL для поддержки большего количества пользователей.
