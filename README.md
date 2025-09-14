# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

《《《《 Nocturnum 》》》》

NocturnumMovie — SPA (Single Page Application) на React для просмотра информации о фильмах, выполненная в футуристичном стиле.
Проект использует TMDB API для получения данных о фильмах, React Query для работы с API и Tailwind CSS для стилизации.

┅┅┅┅┅┅┅┅┅┅【Функционал】┅┅┅┅┅┅┅┅┅┅┅

┇┇Просмотр популярных фильмов  

┇┇Поиск фильмов по названию с подсказками  

┇┇Добавление и удаление фильмов в избранное 
 
┇┇Адаптивный дизайн для мобильных и десктопных устройств 
 
┇┇Просмотр странниц деталей фильма через модальное окно

┇┇Избранное с боковой панелью

┇┇Бесконечный скролл и кнопка навверх

┇┇Сортировка фильмов по популярности, рейтингу, дате и названию

┇┇Интеграция с React Query для кеширования запросов



┅┅┅┅┅┅┅┅┅┅【Технологии】┅┅┅┅┅┅┅┅┅┅┅

┇┇React 18 + JSX

┇┇Vite — быстрый сборщик

┇┇React Router v6 — маршрутизация

┇┇React Query (@tanstack/react-query) — удобная работа с асинхронными запросами

┇┇Tailwind CSS — стилизация и адаптивность

┇┇Prettier + ESLint — форматирование и контроль качества кода

┇┇TMDB API — источник данных о фильмах

┅┅┅┅┅┅┅┅┅┅【Установка и запуск】┅┅┅┅┅┅┅┅┅┅┅


┇┇1. Клонируем репозиторий:

git clone https://github.com/pickmekota/nocturnimmovie.git
cd nocturnummovie


┇┇2. Устанавливаем зависимости:

npm install


┇┇3. Создаём .env файл с ключом TMDB API:

VITE_TMDB_API_KEY=ваш_api_key


┇┇4. Запускаем проект в режиме разработки:

npm run dev


┇┇5. Открываем проект в браузере:

http://localhost:5173

┅┅┅┅┅┅┅┅┅┅【Структура проекта】┅┅┅┅┅┅┅┅┅┅┅

/nocturnummovies
│
├─ src/
│   ├─ api/                 # Запросы к TMDB API
│   ├─ components/          # Компоненты (MovieModal, SearchBar, FavoritesSidebar, ScrollToTop)
│   ├─ pages/               # Страницы приложения (MovieDetails)
│   ├─ store/               # Состояние избранного
│   ├─ App.jsx              # Главный компонент приложения
│   ├─ main.jsx             # Точка входа приложения
│   └─ index.css            # Tailwind стили
│
├─ .prettierrc              # Конфиг Prettier
├─ eslint.config.js         # Конфиг ESLint
├─ tailwind.config.js       # Конфиг Tailwind
├─ vite.config.js           # Конфиг Vite
└─ package.json

┅┅┅┅┅┅┅┅┅┅【Особенности】┅┅┅┅┅┅┅┅┅┅┅

┇┇Поиск фильмов с подсказками

┇┇Просмотр странниц деталей фильма через модальное окно

┇┇Избранное с боковой панелью

┇┇Бесконечный скролл и кнопка навверх

┇┇Сортировка фильмов по популярности, рейтингу, дате и названию

┇┇Полностью адаптивный дизайн для мобильных устройств

┇┇Интеграция с React Query для кеширования запросов


┅┅┅┅┅┅┅┅┅┅【Форматирование и линтинг】┅┅┅┅┅┅┅┅┅┅┅

┇┇Запуск линтера:┇

npm run lint


┇┇Автоформатирование Prettier:

npx prettier --write .

┅┅┅┅┅┅┅┅┅┅【Ссылки】┅┅┅┅┅┅┅┅┅┅┅

┇┇TMDB API - https://www.themoviedb.org/documentation/api

┇┇Tailwind CSS - https://tailwindcss.com/

┇┇React Query - https://tanstack.com/query/v4

┇┇React Router - https://reactrouter.com/


︽︽︽︽︽︽
«««Автор»»»
︾︾︾︾︾︾
「 Виктория — начинающий специалист, увлечённая созданием красивых и атмосферных проектов 」
