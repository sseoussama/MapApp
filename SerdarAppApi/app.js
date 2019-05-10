var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://reactdev:oussama123@cluster0-goqaa.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var collection;
client.connect(err => {
     collection = client.db("mappbase").collection("mappcollection");
    console.log("successfully Connected to the database")
})
app.get('/api/markers', (req, res) => {
    if(req.query.type)
    {
    if(collection)
    {
        switch(req.query.type)
        {
            case "1" :  
            
            collection.find({Category1:"Type 2"}).toArray(function(err, result) {
             if (err) throw err;
            
            res.status(200).send({
                 success: true,
                 message: 'markers type 1 retrieved successfully',
                 data:result
             })
             
           });break;
           case "2" : 
           
           collection.find({Category2:"Type 3"}).toArray(function(err, result) {
             if (err) throw err;
            
            res.status(200).send({
                 success: true,
                 message: 'markers type 2  retrieved successfully',
                 data:result
             })
             
           });break;
           case "3" :  collection.find({Category3:"Type 4"}).toArray(function(err, result) {
             if (err) throw err;
            
            res.status(200).send({
                 success: true,
                 message: 'markers type 3 retrieved successfully',
                 data:result
             })
             
              
           });break;
           default: break;
        }
        
    }
    else  res.status(200).send({
        success: false,
        message: 'There is a probleme with the connection',
       
    })
 
    }
    else 
    res.status(200).send({
        success: false,
        message: 'you have to specify the type',
        
    })
      
  });
 


console.log('RESTful API server started on: ' + port);