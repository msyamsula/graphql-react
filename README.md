# graphql

REQUIREMENTS
1. balsamiq.com
2. node
3. npm
4. nodejs autocomplete and linter, es6
--- npm package ---
4. express: backend service
5. graphql: graphql
6. express-graphql: graphql
7. lodash: walk through collection of data
8. axios: http call
9. nodemon: like spring-dev-tools, for auto restart for change, see package.json for nodemon implementation
10. mongoose: to connect to mongodb
10. this project dependent to "restapi-java" project
-- db --
1. Mysql database with user "root", password "mysql", dbname "gorm"
    Table Person (id, name, address, account_id)
    Table Account (id, username, password)
    Table Student (id, grades), see restapi-java properties for uri
2. mongodb user "mongo" pass "mongo", database "graphql", collection "Person", see connection/mongo.js


WHAT IS GRAPHQL
1. is the way computer send and receive the data (more like rest api)
2. it is introduce to address several restapi downside like "strict" verb method, redundant data

GRAPHQL SCHEMA
1. graphql schema is the way we define graph in graphql
2. root query: is a first node in our graph to be search (entrypoint to our graph)
3. graphql schema implementation is in schema/schema.js
4. see schema/schema.js to see how to connect graphqltype (Person and Account connection)
5. mutation: is an entrypoint for our POST, PUT, DELETE in graphql.. and you can think that root query is entrypoint for GET in graphql

NOTES
1. see graphql boilerplate for node js in server.js
2. user standard export in js, if can't, specify "type: module" in package json
3. see how import and export in model/users.js, schema/schema.js, and server.js
4. graphql comes with graphiql module (it's like swagger in api, check it out)
5. use arrow function for fields in graphQLType to resolve circular reference. check closure and closure scope in javascript
6. graphql client module in js, lokka, apollo, relay. check it out

DOCUMENTATION


USEFULL COMMAND
1. node "filename.js" run nodejs app