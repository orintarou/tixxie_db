# tixxie_db

```npm install``` to install necessary packages.\
```npm rebuild``` to fix any dependancy issues.\
```node server.js``` to run server\


endpoints:\
```localhost:8000/``` GET - returns all posts and associated comments.\
```localhost:8000/post/:id``` GET - returns data for a single post as requested by id\
 
 
 
```localhost:8000/post/``` POST - creates a new post entry\
example: ```curl -d "title=New-Post-Title" -X POST http://localhost:8000/post/```



```localhost:8000/comment/``` POST - creates a new comment entry\
example: ```curl -d "name=kumaC&postId=1" -X POST http://localhost:8000/comment/```

After running server - user can use postman to make requests against localhost:8000
