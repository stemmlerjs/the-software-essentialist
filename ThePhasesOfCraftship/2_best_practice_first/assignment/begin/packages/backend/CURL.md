curl -X POST -H "Content-Type: application/json" -d '{
  "email": "example@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe"
}' http://localhost:3000/users/new

# 

curl -X POST -H "Content-Type: application/json" -d '{
  "firstName": "Johnathan",
  "lastName": "Doel"
}' http://localhost:3000/users/edit/1



curl http://localhost:3000/users?email=someuser@gmail.com


