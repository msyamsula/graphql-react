import MongoClient from "mongodb"

const mongouri = "mongodb://mongo:mongo@localhost:27017/admin"
const dbName = "graphql"
export let db;
MongoClient(mongouri, (error, client) => {
    if (error) {
        console.log("error connecting to database");
        console.log(error);
    }
    db = client.db(dbName)
})

// let main = async() => {
//     console.log("goes here");
//     try {
//         await client.connect()
//         console.log(client);
//     } catch (error) {
//         console.log("error connecting to mongo");
//         console.log(error);
//     }
//     // list = client.db().admin().listDatabases()
//     // list.databases.forEach(db => {
//     //     console.log(db.name);
//     // });
// }

// main()