const express = require('express');
const app = express();

app.use((request, response, next) => {  
  console.log(request.headers);
  next();
})

app.use((request, response, next) => {  
  request.chance = Math.random();
  next();
})

app.post('/', (request, response) => {  
  response.send("4");
})

app.listen(3000);