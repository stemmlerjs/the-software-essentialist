# Code-First

- Run the app with docker:
> docker-compose build && docker-compose up

- For an existing image after the migration was added, run the following commands:
> docker-compose down && docker-compose build && docker-compose run web npx prisma migrate dev --name update-user && docker-compose up

- To test the app manually, copy `postmanconfig.json` from the root directory and import into postman.com workspace
