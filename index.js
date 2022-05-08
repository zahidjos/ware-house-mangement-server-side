const express= require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port=process.env.PORT||5000
const app=express();
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.S3_USER}:${process.env.SECRET_PASSWORD}@cluster0.ub6pc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  const collection = client.db("test").collection("devices");
  async function run(){

    try{ 
        await client.connect();
        const collection = client.db("Data").collection("truck");
        app.get('/service',async(req,res)=>{
            const query={};
            const cursor=collection.find(query);
            const serviceData=await cursor.toArray();
            res.send(serviceData);
        })
        app.get('/home',async(req,res)=>{
          const query={};
          const cursor=collection.find(query);
          const serviceData=await cursor.limit(6).toArray();
          res.send(serviceData);
      })
        app.get('/service/:id',async(req,res)=>{
          const updateId=req.params.id;
          console.log(updateId);
          const query={_id:ObjectId(updateId)};
          const service= await collection.findOne(query);
          res.send(service);
            
        })
        app.put('/user/:id', async(req,res)=>{
            const id=req.params.id;
            const updateBody=req.body;
            console.log(updateBody);
            const query={_id:ObjectId(id)};
            const options = { upsert: true };
            const updateDoc = {
              $set: {
                quantity:updateBody.number
              },
            };
            const result=await collection.updateOne(query,updateDoc,options);
            res.send(result);
        })
        app.delete('/delete/:id', async(req,res)=>{
          const id =req.params.id;
          const query={_id:ObjectId(id)};
          const result=await collection.deleteOne(query);
          res.send(result);
        })
        app.post('/service',async (req,res)=>{
          const newService=req.body;
          const result=await collection.insertOne(newService);
          res.send(result)
        })

        app.get('/item',async(req,res)=>{
          const query={email:"zahidhasanjos90@gmail.com"};
          const cursor=collection.find(query);
          const serviceData=await cursor.toArray();
          res.send(serviceData);
      })
        
        
    }
    finally{

    }
    

  }
  run().catch(console.dir);


  app.get('/hi',(req,res)=>{
    res.send("welcome our hi k");
})


app.listen(port,()=>{
    console.log("Crud server", port);
})