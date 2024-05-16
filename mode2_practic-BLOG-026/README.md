Области хранения данных:

- база данных на json-server
- BFF (посредник между сервером и клиентом)
- redux store на клиенте

Сущности приложения:

- пользователь: БД(список пользовтаелей), BFF (ссесия текущего пользователя), стор (отображение в брауз)
- роль пользователя: БД (список ролей), BFF(ссесия пользователя с ролью), стор (отображение контента в зависимости от роли)
- статья: БД (список статей), стор (отображение в браузере)
- комментарий: БД (список комментариев), стор (отображение в браузере)

таблицы БД:

- пользователи - users: id / login / password / registed_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url / content / published_at
- комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для redux store (на клиенте):

- user: id / login / roleId
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registedAt / role
