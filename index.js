const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;




// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w3hjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const itemsCollection = client.db("carnation").collection("inventory");



        // get data from database****************

        app.get('/inventory', async (req, res) => {

            const query = {};
            const cursor = itemsCollection.find(query);
            const inventory = await cursor.toArray();
            res.send(inventory);
        });


        // get data from database****************





        // show data from database****************



        app.get('/inventory/:id', async (req, res) => {

            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const inventory = await itemsCollection.findOne(query);
            res.send(inventory);
        });




        // show data from database****************



    } finally {
        // await client.close();
    }
}
run().catch(console.dir)






































app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})