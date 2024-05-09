curl -X POST -H "Content-Type: application/json" -d '{
  "email": "example1@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe2"
}' http://localhost:3000/users/new


curl -X POST -H "Content-Type: application/json" -d '{
  "firstName": "Johnathan",
  "lastName": "Doel"
}' http://localhost:3000/users/edit/7



curl http://localhost:3000/users?email=someuser@gmail.com


