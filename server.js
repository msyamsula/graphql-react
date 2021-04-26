import express from "express"
import { users, hello } from "./model/users.js"
import { graphqlHTTP } from "express-graphql"
import { schema } from "./schema/schema.js"
import axios from "axios"


const app = express();

// use graphql
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.get("/hello", async(req, res) => {
    console.log(req);
    res.send(hello)
})


app.listen(3000, () => {
    console.log("listen to port 5000");
    console.log(hello);
    console.log(users);
})