const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

// Middlewares
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://hackathonAdmin:NKx3NMkHOfPrMoCb@cluster0.ib1rp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

(async () => {
    try {
        await client.connect();
        const challengeCollection = client.db("dphi_hackathon_app").collection("challenge");

        // Create new challenge api
        app.post('/challenge', async (req, res) => {
            const data = req.body
            const result = await challengeCollection.insertOne(data);
            res.send(result)
        })

        // Get all challenges api
        app.get('/challenge', async (req, res) => {
            const query = req.query
            const data = await challengeCollection.find(query);
            const result = await data.toArray()
            return res.send(result)
            
        })

        // Get filter challenges api
        app.get('/challenge/filter', async (req, res) => {
            const query = req.query
            if (query.all) {
                const data = await challengeCollection.find({});
                const result = await data.toArray()
                return res.send(result)
            } if (query.active) {
                const filter = ({ type: 'active' })
                const data = await challengeCollection.find(filter);
                const result = await data.toArray()
                return res.send(result)
            } if (query.upcoming) {
                const filter = ({ type: 'upcoming' })
                const data = await challengeCollection.find(filter);
                const result = await data.toArray()
                return res.send(result)
            } if (query.fast) {
                const filter = ({ type: 'upcoming' })
                const data = await challengeCollection.find(filter);
                const result = await data.toArray()
                return res.send(result)
            } else {
                const data = await challengeCollection.find({});
                const result = await data.toArray()
                return res.send(result)
            }

        })

        // Get all challenges api
        app.get('/challenge/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await challengeCollection.findOne(query);
            res.send(result)
        })

        // Update a spcecific challenge api
        app.put('/challenge/:id', async (req, res) => {
            const id = req.params.id
            const data = req.body
            console.log(id, data)
            const query = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: data
            }
            const result = await challengeCollection.updateOne(query, updateDoc, options);
            res.send(result)
        })

        //  Deltete a challenges api
        app.delete('/challenge/:id', async (req, res) => {
            const id = req.params.id
            const filter = ({ _id: ObjectId(id) })
            const result = await challengeCollection.deleteOne(filter)
            res.send(result)
        })



    } finally {

    }

})().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello world')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


//  hackathonAdmin
// NKx3NMkHOfPrMoCb