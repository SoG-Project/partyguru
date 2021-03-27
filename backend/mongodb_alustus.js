
import MongoClient from 'mongodb';
import mongoose from 'mongoose';
import Schema from 'mongodb';


const uri = "mongodb+srv://sogtietokanta:schoolofgamingtietokantaprojekti@cluster0.wqxpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//j
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const attendeesSchema = new mongoose.Schema({
  attendees: [{name: String, email: String, attends: Boolean, discord: Boolean, game: Boolean}]
});
const Attendees= new mongoose.model('Attendees',attendeesSchema);

const guruSchema = new mongoose.Schema({
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
const Guru= new mongoose.model('Guru',guruSchema);

const partyinfoSchema= new mongoose.Schema({
    packageid: String,
    guruid: String,
    datetime: {type: Date, default: Date.now},
    duration:Number,
    email: String,
    phone: String,
    num_attendees: Number,
    schedule: [String],
    likes: [String],
    description: String
});
const Partyinfo= new mongoose.model('Partyinfo',partyinfoSchema);

const partypackSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    guru:[String],
    description: String,
    scheduleitems: [String]
})
const Partypack= new mongoose.model('Partypack',partypackSchema);

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  
});

mongoose.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('taasss');
  // perform actions on the collection object
  client.close();
});

const guru1= new Guru({
  name: 'Jasaddsadsamppa tuominen',
  nick: 'Damppa Juodsadsaminen',
  email: 'Strindsadsag',
  partyreservations:[1,5,8],
  video: 'Strindsag',
  image: 'Strinsaddsaag',
  availability:['trisasang'],
  bio: 'asddsadsadsadsasasa'
})
guru1.save().then(response=>{
console.log('guru savee');

})

Guru.find({}).then(result => {
  console.log('voivvitttuu');
  console.log(result);
  result.forEach(guru => {
    console.log(guru)
  })
  
})
process.exit();

/*
const partyinfo= new Partyinfo({
    packageid: 'Dikki dii',
    guruid: 'Dikki dii',
    duration:1,
    email: 'Dikki dii',
    phone: 'Dikki dii',
    num_attendees: 2,
    schedule: ['Dikki dii','Dikki dii'],
    likes: ['String','Dikki dii'],
    description: 'String'
});
*/

/*
partyinfo.save().then(response=>{
    console.log('partypack saved');
    mongoose.connection.close();
})
*/
/*
const guru1= new Guru({
        name: 'Jamppa tuominen',
        nick: 'Damppa Juominen',
        email: 'String',
        partyreservations:[1,5,8],
        video: 'String',
        image: 'String',
        availability:['tring'],
        bio: 'asddsadsadsadsa'
})
guru1.save().then(response=>{
    console.log('guru savee');
    mongoose.connection.close();
})
*/
/*
const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})


const blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });*/