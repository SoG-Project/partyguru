
import MongoClient from 'mongodb';
import mongoose from 'mongoose';
import Schema from 'mongodb';
import close from 'mongodb';
import db from 'mongodb';


const uri = "mongodb+srv://sogtietokanta:schoolofgamingtietokantaprojekti@cluster0.wqxpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//j
//await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//const client = new MongoClient(uri);

mongoClient.connect(url, function(error, client){
    if (error) return console.log(error);
    var database = client.db("myFirstDatabase");
    console.log("Database connected.");
  });

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


async function main(){

    console.log("started");
 
    try {
            console.log("trying");
            const client = await MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
                if (error) {
                    
                return console.log("Connection failed for some reason");
                }
                console.log("Connection established - All well");

            });
        // Connect to the MongoDB cluster
        //await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.log("errored");
        console.error(e);
        console.log(e);
    } finally {
        console.log("finaled");
        await client.close();
    }
}

main().catch(console.error);

/*
async function yo(){
await client.connect();}
yo();
const guruSchema = new client.Schema({
    //_id: String,
    name: String,
    nick: String,
    email: String,
    partyreservations:[Number],
    video: String,
    image: String,
    availability:[String],
    bio: String
});
const Guru= new client.model('Guru',guruSchema);


const guru1= new Guru({
    name: 'Jasaddsadsamppa tuominen',
    nick: 'Damppa Juodsadsaminen',
    email: 'Strindsadsag',
    partyreservations:[1,5,8],
    video: 'Strindsag',
    image: 'Strinsaddsaag',
    availability:['trisasang'],
    bio: 'asddsadsadsadsasasa'
  });

  guru1.save().then(response=>{
  console.log('guru savee');
  });

mongoose.connection.close();
*/
//process.exit();