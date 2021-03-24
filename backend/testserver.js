/*const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');*/
import express from 'express';
//const express = require('express')
import bodyParser from 'body-parser';
import cors from 'cors';
import MongoClient from 'mongodb';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import partypack from './partypack.js';
import partyinfo from './partyinfo.js';
import attendees from './attendees.js' ;
import gurus from './gurus.js';
const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());
var date = new Date();
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
const uri = "mongodb+srv://sogtietokanta:schoolofgamingtietokantaprojekti@cluster0.wqxpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

//Partyguru schema and model
const guruSchema = new mongoose.Schema({
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

//Attendee list schema and model
const attendeesSchema = new mongoose.Schema({
    partyid:String,
    attendees: [{name: String, 
                email: String, 
                attends: Boolean, 
                discord: Boolean, 
                game: Boolean}]
  });
  const Attendees= new mongoose.model('Attendees',attendeesSchema);
  
  //A single party's schema and model
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
  
//Party package schema and model
  const partypackSchema = new mongoose.Schema({
      name: String,
      image: String,
      price: Number,
      guru:[String],
      description: String,
      scheduleitems: [String]
  })
  const Partypack= new mongoose.model('Partypack',partypackSchema);


//serveri lähtee päälle, kun teet "npm start" komennon juurikansiossa (eli se mistä pääsee backend tai singlepage kansioihin.)
//Se toimii koska juurikansion package.json:ssa on määritelty toi npm start skripti avaamaan backendin dev-tilassa

//Koska package.json:ssa on proxy-kenttä laitettu, voi requestit laittaa tulemaan samaan urliin kuin ne on tässä merkitty
// eli jos haluaa "/api/packages" urlista tavaraa, voi sanoa axiosille että url on vaan "/api/packages" ja sen pitäs reitittää se oikein

//Jos dataa pitää getata sivunlatauksen alussa
// Laita se useEffect hookkiin (niinkuin esim HomeScreen.js)

/**Esimerkkihookki:
   useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/packages').then(response => {
      setProduct(response.data);
    })}
    fetchData();
    return () => {
      //
    };
  }, []);
  
 */


/*REQUEST: GET all party packages

      axios.get('/api/packages').then(response => {
      setState(response.data);
      console.log(response.data)
})
*/

app.get("/api/packages", (req, res) => {
  Partypack.find().then(result => {
    res.json(result);
    result.forEach(item => {
      console.log(item)
    })
  })
});

/*REQUEST: GET package by ID

let id=1;
//remember the backticks on the url
axios.get(`/api/packages/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
*/
app.get('/api/packages/:id', (req, res) => {
  const id = req.params.id
  Partypack.find({_id:id}).then(result => {
    res.json(result[0]);
    result.forEach(note => {
      console.log(note)
    })
  })
})

//REQUEST: GET party by ID
//Returns a Partyinfo object
/**  
let id=1;
axios.get(`/api/parties/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/parties/:id', (req, res) => {
  const id = req.params.id
  Partyinfo.find({_id:id}).then(result => {
    res.json(result[0]);
    result.forEach(note => {
      console.log(note)
    })
  })
})

/* TODO: poista nämä
//GET kaikki partyt, testiä varten
app.get("/api/parties", (req, res) => {
  res.send(partyinfo.parties);
});

//GET kaikki attendeet, testiä varten
app.get("/api/attendees", (req, res) => {
  res.send(attendees);
});
*/

//REQUEST: GET attendees by party id
//Parameters: party id in URL
//Returns an Attendees object
/**  
let id=1;
axios.get(`/api/attendees/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/attendees/:id', (req, res) => {
  const id = req.params.id
  Attendees.find({partyid:id}).then(result => {
    if(!result.length){
      res.status(400);
      res.send('Error: no attendees found.');
    }
    else{
    res.json(result);
    result.forEach(note => {
      console.log(note)
    })}
  })
  
})

//Request: GET all gurus (for tests) X

app.get('/api/gurus', (req, res) => {

    Guru.find({}).then(result => {
      res.json(result);
      result.forEach(note => {
        console.log(note)
      })
    })
  })

//REQUEST: GET guru by ID
//Parameters: guru's _id in URL
//Returns a Guru object
/**  
let id=1;
axios.get(`/api/gurus/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/gurus/:id', (req, res) => {

  const id = req.params.id;
  Guru.find({_id:id}).then(result => {
    res.json(result);
    result.forEach(note => {
      console.log(note)
    })
  })
 
})

//REQUEST: POST a new party
//Parameters: Partyinfo-object in JSON-body
//Lähetä vaikka tyhjä stringi jos kaikkia ei oo saatavilla, niin se ei jää undefinediksi
//_id tulee itsestään, ei tarvi sendiä sitä
app.post('/api/parties', (req, res) => {

   if(req.body.packageid===undefined){
    res.status(400);
    res.send('Error. no packageid')
  }
   if(req.body.guruid===undefined){
    res.status(400);
    res.send('Error. no guru')
  }
   if(req.body.datetime===undefined){
    res.status(400);
    res.send('Error. no date/time')
  }
   if(req.body.duration===undefined){
    res.status(400);
    res.send('Error. no duration')
  }
   if(req.body.email===undefined){
    res.status(400);
    res.send('Error. no email')
  }
   if(req.body.phone===undefined){
    res.status(400);
    res.send('Error. no phone')
  }
   if(req.body.num_attendees===undefined){
    res.status(400);
    res.send('Error. no number of attendees')
  }
   if(req.body.schedule===undefined){
    res.status(400);
    res.send('Error. no schedule')
  }
   if(req.body.likes===undefined){
    res.status(400);
    res.send('Error. no likes')
  }
   if(req.body.description===undefined){
    res.status(400);
    res.send('Error. no description')
  }
  
  const newParty= new Partyinfo({
    packageid: req.body.packageid,
    guruid: req.body.guruid,
    datetime: Date.now(),
    duration:req.body.duration,
    email: req.body.email,
    phone: req.body.phone,
    num_attendees: req.body.num_attendees,
    schedule: req.body.schedule,
    likes: req.body.likes,
    description: req.body.description
});
    newParty.save().then(result=>{
      console.log(result);
      res.send(result);
    })

  
});
//REQUEST: POST a new attendee list
//Parameters: Attendees-object in JSON-body
/*
   axios.post('/api/attendees',{JSONHERE}).then(response => {
      console.log(response.data);
})
*/

/** Formaatti jsonille:
 * {
 *  partyid: String,
    attendees: [{name: String, 
                email: String, 
                attends: Boolean, 
                discord: Boolean, 
                game: Boolean}]
  } 
  */
app.post('/api/attendees', (req, res) => {
  if(req.body.partyid===undefined){
   res.status(400);
   res.send('Error. no party id');
 }
 else{
   var entry = new Attendees();
   entry.partyid = req.body.partyid;
   entry.attendees=req.body.attendees;
   entry.save().then(result=>{
    console.log(result);
    res.send(result);
  })
   
 }
});
//REQUEST: PUT update Partyinfo object by ID
//Parameters: party's _id in the URL, to-be-updated fields in the JSON-body
//Returns status 200 if something got updated, 400 if not
/*
  let id=1;
   axios.put('/api/parties/:id',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/parties/:id', function (req, res) {
  const id = req.params.id;
  //Find the party to be updated
  Partyinfo.find({_id:id}).then(updatableParty => {
    const updatedParty=updatableParty[0];
    //TODO: Mitä mongo lähettää jos id ei löydy CATCH THAT SHIT

   //If the field exists in the json-body, overwrite that field.
    if(req.body.packageid!==undefined){
      updatedParty.packageid=req.body.packageid;
    }
    if(req.body.guruid!==undefined){
      updatedParty.guruid=req.body.guruid;
    }
    if(req.body.datetime!==undefined){
      updatedParty.datetime=req.body.datetime;
    }
    if(req.body.duration!==undefined){
      updatedParty.duration=req.body.duration;
    }
    if(req.body.email!==undefined){
      updatedParty.email=req.body.email;
    }
    if(req.body.phone!==undefined){
      updatedParty.phone=req.body.phone;
    }
    if(req.body.num_attendees!==undefined){
      updatedParty.num_attendees=req.body.num_attendees;
    }
    if(req.body.schedule!==undefined){
      updatedParty.schedule=req.body.schedule;
    }
    if(req.body.likes!==undefined){
      updatedParty.likes=req.body.likes;
    }
    if(req.body.description!==undefined){
      updatedParty.description=req.body.description;
    }
    //Replace the old Partyinfo-object with the new one
    Partyinfo.updateOne({"_id": id }, { $set: updatedParty}, (error, result) => {
      if (error) throw error;
      if(result.nModified===0){
        res.status(400);
        res.send('Error. Nothing got updated.');
      }
      else{
        res.status(200);
      res.send(result);
      }
    });
    
  })
  /*
  const partyinformation = partyinfo.parties.find(party => party._id === id)
  if(partyinformation === undefined){
    res.status(400);
    res.send('<h1>THERE IS NO PARTY WITH THAT ID. SAD! ID: </h1>' + id)}
  else{    
    // entry === party mitä päivität
    var entry = new Object();
    entry=partyinformation;
    // Tämä tarkistaa, mitä kenttiä on tullut requestin mukana
    // Kaikki requestin mukana tulleet kentät laitetaan oikeille paikoilleen entry-objektiin
    if(req.body.packageid!==undefined){
      entry.packageid=req.body.packageid;
      updated+=1;
    }
    if(req.body.guruid!==undefined){
      entry.guruid=req.body.guruid;
      updated+=1;
    }
    if(req.body.datetime!==undefined){
      entry.datetime=req.body.datetime;
      updated+=1;
    }
    if(req.body.duration!==undefined){
      entry.duration=req.body.duration;
      updated+=1;
    }
    if(req.body.email!==undefined){
      entry.email=req.body.email;
      updated+=1;
    }
    if(req.body.phone!==undefined){
      entry.phone=req.body.phone;
      updated+=1;
    }
    if(req.body.num_attendees!==undefined){
      entry.num_attendees=req.body.num_attendees;
      updated+=1;
    }
    if(req.body.schedule!==undefined){
      entry.schedule=req.body.schedule;
      updated+=1;
    }
    if(req.body.likes!==undefined){
      entry.likes=req.body.likes;
      updated+=1;
    }
    if(req.body.description!==undefined){
      entry.description=req.body.description;
      updated+=1;
    }
    
    //filtteröi päivitettävän partyn pois (koska siinä on vanhat tiedot)
    let newParties=partyinfo.parties.filter(function(item){
      return item._id!==id;
    })
    //Päivitettiinkö edes mitään?
    if(updated===0){
      res.status(400);
      res.send('Nothing got updated.');
    }
    else{
      //Lisää päivitetyn partyn listaan
      newParties.push(entry);
      partyinfo.parties=newParties;
      res.status(200);
      res.send('Party updated. ID: ' + entry._id + '. ' + updated + ' fields were updated.');
    }
  }*/
})
//REQUEST: PUT update a guru by ID
//Parameters: Guru's _id in the URL, to-be-updated fields in the JSON-body
//Old fields will be overwritten with the field in the JSON-body, no appends
/*
  let id=1;
   axios.put('/api/gurus/:id',<JSONTÄHÄN>).then(response => {
      console.log(response.data);

})
*/
app.put('/api/gurus/:id', function (req, res) {
  const id = req.params.id;
  //Fetch the guru with the right id, update the fields that were sent with the request body, replace the old entry
  Guru.find({_id:id}).then(foundGuru => {
    if(req.body.name!==undefined){
      foundGuru[0].name=req.body.name;
    }
    if(req.body.nick!==undefined){
      foundGuru[0].nick=req.body.nick;
    }
    if(req.body.email!==undefined){
      foundGuru[0].email=req.body.email;
    }
    if(req.body.packages!==undefined){
      foundGuru[0].packages=req.body.packages;
    }
    if(req.body.partyreservations!==undefined){
      foundGuru[0].partyreservations=req.body.partyreservations;
    }
    if(req.body.video!==undefined){
      foundGuru[0].video=req.body.video;
    }
    if(req.body.image!==undefined){
      foundGuru[0].image=req.body.image;
    }
    if(req.body.availability!==undefined){
      foundGuru[0].availability=req.body.availability;
    }
    if(req.body.bio!==undefined){
      foundGuru[0].bio=req.body.bio;
    }
    Guru.updateOne({"_id": id }, { $set: foundGuru[0]}, (error, result) => {
      if (error) throw error;
      res.send(result);
  });
  })

})
 
// REQUEST: PUT update attendee information / add new attendees
// The request checks whether the attendees in the JSON-body were already in the database.
// If they were, their entry is replaced with the entry in the JSON-body.
// If no such attendee was found, their entry is added to the attendee array.
// Parameters: id in the url corresponds to the party id whose attendees are updated
// Body must have a json with key "attendees", and an array of attendees included
// If the attendee with the same email is found in the same party's attendees, their information will be replaced with the new information
/*
  let id=1; TODO backticks
   axios.put('/api/attendees/{id}',{JSONHERE}).then(response => {
      console.log(response);
})
*/
app.put('/api/attendees/:id', function (req, res) {
  const id = req.params.id;
  //Päivitettävä juhlijalista
  Attendees.find({partyid:id}).then(returnedItems=>{
    const attendeeList=returnedItems[0];
    //Check whether the fetched list is empty
    if(!returnedItems.length) throw new Error("No attendee information found with that partyid. ID:" + id + ". Perhaps send a POST instead of PUT?");
    //Iterate over the json-body and the fetched list, trying to match emails 
    for(var i=0;i<req.body.attendees.length;i++){
      var changed=false;
      for (var k = 0; k < attendeeList.attendees.length; k++) {
        //If the same email is found, insert the entry in the request body in the place of the fetched entry
        if (attendeeList.attendees[k].email === req.body.attendees[i].email) {
          attendeeList.attendees.splice(k,1,req.body.attendees[i]);
          changed=true;
        }
       }
       //If the same email isn't found, push the entry into the list
       if(changed===false){
        attendeeList.attendees.push(req.body.attendees[i]);
      }
    }
  })
  .catch(error => {console.log(error.message);
                    res.status(400);
                    res.send(error.message);});
/*
  const lista = attendees.attendees.find(juhlija => juhlija._id === id)
  if(lista === undefined){
    res.status(400);
    res.send('<h1>THERE IS NO PARTY WITH THAT ID. SAD! ID: </h1>' + id)}
  else{
    for(var i=0;i<req.body.attendees.length;i++){
      //lista.attendees.push(req.body.attendees[i]);
      //req.body.attendees[i].email 
      var changed=false;
      for (var k = 0; k < lista.attendees.length; k++) {
        if (lista.attendees[k].email === req.body.attendees[i].email) {
          lista.attendees.splice(k,1,req.body.attendees[i]);
          changed=true;
        }
       }
       //Jos samannimistä juhlijaa ei löytynyt, lisätään se uutena listaan
       if(changed===false){
         lista.attendees.push(req.body.attendees[i]);
       }
    }
    //filtteröi vanhan listan pois
    let newAttendees=attendees.attendees.filter(function(item){
      return item._id!==id;
    })
    //Lisää päivitetyn listan isompaan listaan
    newAttendees.push(lista);
    attendees.attendees=newAttendees;
    res.status(200);
    res.send('Attendees updated. ID: ' + id);
  }
  */
})
//REQUEST: DELETE juhlija 
//Parametrit: URLiin partyn id, bodyyn JSON jossa kenttä email
app.delete('/api/attendees/:id', function (req, res) {
  const id = req.params.id;
  const deletoitava=req.body.email;
  if(req.body.email===undefined){
    res.status(400);
    res.send('You have to send a JSON with an email field with this request');
  }
  //Päivitettävä juhlijalista
  const lista = attendees.attendees.find(juhlija => juhlija._id === id)
  if(lista === undefined){
    res.status(400);
    res.send('<h1>THERE IS NO PARTY WITH THAT ID. SAD! ID: </h1>' + id)}
  else{
    var changed=false;
    for (var k = 0; k < lista.attendees.length; k++) {
      if (lista.attendees[k].email === req.body.email) {
        lista.attendees.splice(k,1);
        changed=true;
      }
     }
     //Jos samannimistä juhlijaa ei löytynyt, lisätään se uutena listaan
     if(changed===false){
       res.status(400);
       res.send('Attendee with that email not found.');
     }

    res.status(200);
    res.send('Attendees deleted. ID: ' + id);
  }
})


//REQUEST: PUT uusia guruja TODO muuta tämä databasea kannattamaan
//Parametrit: bodyyn JSON- jossa key "gurus" ja sisällä array numeroita (ne tulee olemaan numeroita mongodb:ssä)
/*
  let id=1;
   axios.put('/api/partypack/{id}/gurus',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/partypack/:id/gurus', (req, res) => {
  const id = req.params.id
  const toBeAdded= req.body.gurus;
  const partyinformation = partypack.products.find(party => party._id === id);
  // entry === party mitä päivität
  var entry = new Object();
  entry=partyinformation;
  /*for (var k = 0; k < toBeAdded.length; k++) {
    entry.guru.push(toBeAdded[k]);
   }*/
  entry.guru=req.body.gurus;
   //filtteröi päivitettävän partyn pois (koska siinä on vanhat tiedot)
   let newPacks=partypack.products.filter(function(item){
    return item._id!==id;
  })
  
    //Lisää päivitetyn partyn listaan
    newPacks.push(entry);
    partypack.products=newPacks;
    res.status(200);
    res.send('Partypack updated. with new gurus');
  });


app.listen(5001, () => { console.log("Server started at http://localhost:5001") });
