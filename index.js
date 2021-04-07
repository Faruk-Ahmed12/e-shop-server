const express = require('express')
const app = express()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 4000;



app.use(cors())
app.use(express.json());
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kxc43.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
client.connect(err => {
    const shopCollection = client.db("eShopStore").collection("shop");

    app.get('/products', (req, res) => {
        shopCollection.find()
            .toArray((err, documents) => {
                res.send(documents)
            })
    })


    app.post('/addProducts', (req, res) => {
        const eShop = req.body;
        shopCollection.insertOne(eShop)
            .then(result => {
                res.send(result.insertedCount > 0)
            })

    })
    console.log('database connected successfully')

});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port)










