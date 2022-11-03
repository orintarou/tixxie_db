# tixxie_db

```npm install``` to install necessary packages.\
```npm rebuild``` to fix any dependancy issues.\
```node server.js``` to run server\


endpoints:\
GET - ```localhost:8000/``` - returns all posts and associated comments.\
GET - ```localhost:8000/post/:id``` - returns data for a single post as requested by id\
 
 
 
POST - ```localhost:8000/post/``` - creates a new post entry\
example: ```curl -d "title=New-Post-Title" -X POST http://localhost:8000/post/```



POST - ```localhost:8000/comment/``` - creates a new comment entry\
example: ```curl -d "name=kumaC&postId=1" -X POST http://localhost:8000/comment/```

After running server - user can use postman to make requests against localhost:8000
