const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://wafa:test123@wafa.m9y2d.mongodb.net/wafa?retryWrites=true&w=majority";

  /*   const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const database = await listDatabases(client);
    console.log("databse______________", database);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  } */
  MongoClient.connect(
    uri,
    {
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) return console.error(err);
      const db = client.db("wafa");
      const questionsCollection = db.collection("questions");

      app.post("/questions", (req, res) => {
        questionsCollection
          .insertOne(req.body)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => console.error(error));
      });
      return client;
    }
  );
}

main().catch(console.error);
