import cors from 'cors';
import MongoClient from 'mongodb';
import mongoose from 'mongoose';
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
  
  const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)

  const guru1= new Guru({
    name: 'Damppa Duominen',
    nick: 'Xamppa Xuominen',
    email: 'SSString',
    partyreservations:[1,5,8],
    video: 'StrinSSSg',
    image: 'StrSSSing',
    availability:['tSSSring'],
    bio: 'asddsadsadsadSSSSsa'
})
guru1.save().then(response=>{
console.log('guru savee');
mongoose.connection.close();
})