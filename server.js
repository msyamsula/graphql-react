import express from "express"
import { users, hello } from "./model/users.js"
import { graphqlHTTP } from "express-graphql"
import { schema } from "./schema/schema.js"
import { db } from "./connection/mongo.js"



const app = express();

// use graphql
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.get("/hello", async(req, res) => {
    // console.log(req);
    console.log(db);
    res.send(hello)
})


app.listen(3000, () => {
    console.log("listen to port 5000");
    console.log(hello);
    console.log(users);
})