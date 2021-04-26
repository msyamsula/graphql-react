const express = require("express")
const expressGraphQL = require("express-graphql")
const app = express();


// use graphql
app.use("/graphql", expressGraphQL({
    graphiql: true
}))


app.listen(5000, () => {
    console.log("listen to port 5000");
})