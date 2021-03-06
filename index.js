const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require('dotenv').config()

// 44tvWIItEMzIruva

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gum7d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const todoCollection = client.db("todo").collection("todoList");

        app.post('/todo', async (req, res) => {
            const todo = req.body;
            console.log(todo)
            const result = await todoCollection.insertOne(todo);
            res.send(result)
        })

        app.get('/todo',async(req,res)=>{
            const todo= await todoCollection.find().toArray()
            res.send(todo)
        })
    }
    finally {

    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})