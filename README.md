## Coda Fullstack Hiring Challenge
This project is the backend for the project https://coda-front-end.netlify.app/
Backend is already deployed on https://pacific-stream-42469.herokuapp.com and you can access the apis as mentioned below. However, note that this deployment will only be active for 2 weeks from the date 20 December, 2020.


## Details
1. The project is developed on NestJS (library built on top of nodeJS)
2. It has 3 endpoints
    *  /leaderboard -- GET : This endpoint gives the paginated and sorted result of documents present in the database
      ```
      curl --location --request GET 'https://pacific-stream-42469.herokuapp.com/leaderboard'
      ```
    *  /leaderboard/teams/add -- POST : This endpoint is used to add a new team to the database
      ```
      curl --location --request POST 'http://pacific-stream-42469.herokuapp.com/leaderboard/teams/add' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "names" : [
            "demo team 2"
        ]
      }'
      ```
    *  /leaderboard/update -- POSt : This endpoint is used to update the wins/losses/ties between 2 or more teams
      ```
      curl --location --request POST 'https://pacific-stream-42469.herokuapp.com/leaderboard/update' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "teams": [
            {
                "_id": "5fd5103f95f40400176e00b2",
                "won": 1,
                "lose": 0,
                "tie": 0,
                "team_name": "demo team 1"
            }
          ]
        }'
      ```
3. The database used in the project is mongoDB
4. All the get queries are paginated and sorted by score and name.
5. Project also uses socket.io to notify the frontend client whenever an update happens in the database so that realtime data can be served

## Deployment Details
This project has a procfile, which means it can be deployed to heroku or similar deplyment engines.


## Running the project locally

1. Clone the project (assuming you have nodejs v8 or higher already installed)
2. Type ```npm i```
3. Connect a mongo database which has a db named coda and collection named leaderboards by updating the connection string present in app.module.ts
4. Type npm run start:dev
5. visit http://localhost:3000/leaderboard 