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

//Partygurun skeema ja model:
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

//Osallistujalistan skeema ja model:
const attendeesSchema = new mongoose.Schema({
    partyid:String,
    attendees: [{name: String, 
                email: String, 
                attends: Boolean, 
                discord: Boolean, 
                game: Boolean}]
  });
  const Attendees= new mongoose.model('Attendees',attendeesSchema);
  
  //Yksittäisen juhlan skeema ja model:
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
  
//Party packagen skeema ja model:
  const partypackSchema = new mongoose.Schema({
      name: String,
      image: String,
      price: Number,
      guru:[String],
      description: String,
      scheduleitems: [String]
  })
  const Partypack= new mongoose.model('Partypack',partypackSchema);
  
/*client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/
 
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


/*REQUEST: GET kaikki packaget

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

/*REQUEST: GET package ID:n mukaan (huom URL on backtickien ympäröimä, ei normisinglequoteissa)

let id=1;
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

//REQUEST: GET party id:n mukaan (huom URL on backtickien ympäröimä, ei normisinglequoteissa)
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

//REQUEST: GET juhliin osallistujat juhlaid mukaan X
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

//Request: GET all gurus (for tests)

app.get('/api/gurus', (req, res) => {

    Guru.find({}).then(result => {
      res.json(result);
      result.forEach(note => {
        console.log(note)
      })
    })
  })

//REQUEST: GET gurut id:n mukaan X
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
//REQUEST: GET kaikki gurut
/*
   axios.get('/api/gurus').then(response => {
      setState(response.data);
      console.log(response.data)
})
*/
/*
app.get("/api/gurus", (req, res) => {
    Guru.find({}).toArray(function(error, documents) {
        if (err) throw error;
        res.json(documents);
    });

});
*/

//REQUEST: post uusi party X
//Tämä requesti odottaa, että lähetät ihan kaikki fieldit.
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
//REQUEST: post uusi juhlijalista X
//ID pitää lähettää, se on sen partyn ID mihin juhlijat menee.
//Tää ei tee sen suurempaa inputin validointia, että BETTER WATSH OUTS!!!s
/*
   axios.post('/api/attendees',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
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
   res.send('Error. no party id')
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
//REQUEST: PUT update party id:n mukaan X
//Kandee lähettää oikeat kentät, koska tässä ei validoida mitään
//Paitsi lopussa tarkistetaan, päivittikö funktio mitään
//Jos mitään ei päivitetty, tulee statuskoodi 400
/*
  let id=1;
   axios.put('/api/parties/:id',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/parties/:id', function (req, res) {
  //muuttuja, että tiedetään päivitettiinkö mitään
  let updated=0;
  const id = req.params.id;
  Partyinfo.find({_id:id}).then(updatableParty => {
    const updatedParty=updatableParty[0];
    //TODO: Mitä mongo lähettää jos id ei löydy
   // res.status(200);
   // res.send(updatedParty);
    if(req.body.packageid!==undefined){
      updatedParty.packageid=req.body.packageid;
      updated+=1;
    }
    if(req.body.guruid!==undefined){
      updatedParty.guruid=req.body.guruid;
      updated+=1;
    }
    if(req.body.datetime!==undefined){
      updatedParty.datetime=req.body.datetime;
      updated+=1;
    }
    if(req.body.duration!==undefined){
      updatedParty.duration=req.body.duration;
      updated+=1;
    }
    if(req.body.email!==undefined){
      updatedParty.email=req.body.email;
      updated+=1;
    }
    if(req.body.phone!==undefined){
      updatedParty.phone=req.body.phone;
      updated+=1;
    }
    if(req.body.num_attendees!==undefined){
      updatedParty.num_attendees=req.body.num_attendees;
      updated+=1;
    }
    if(req.body.schedule!==undefined){
      updatedParty.schedule=req.body.schedule;
      updated+=1;
    }
    if(req.body.likes!==undefined){
      updatedParty.likes=req.body.likes;
      updated+=1;
    }
    if(req.body.description!==undefined){
      updatedParty.description=req.body.description;
      updated+=1;
    }
    if(updated===0){
      res.status(400);
      res.send('Error: nothing got updated.');
    }
    else{
      Partyinfo.updateOne({"_id": id }, { $set: updatedParty}, (error, result) => {
        if (error) throw error;
        if(result.nModified===0){
          res.status(400);
          res.send('Error. Nothing got updated.');
        }
        else{
        res.send(result);
        }
    });
    }
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
//REQUEST: PUT update guru ID:n mukaan X
//Kandee lähettää oikeat kentät, koska tässä ei validoida mitään
//Paitsi lopussa tarkistetaan, päivittikö funktio mitään
//Jos mitään ei päivitetty, tulee statuskoodi 400
//Jos kenttä koostuu useammasta osasta (esim packages), sun pitää lähettää kaikki vanhat ja uudet osat samassa listassa
//eli jos haluat lisätä packagen gurulle, lähetä sekä vanhat että uudet packaget listassa
/*
  let id=1;
   axios.put('/api/gurus/:id',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/gurus/:id', function (req, res) {
  const id = req.params.id;
  //Promise chain: 1. etsi :id-guru 2. muuta sen fieldejä 3. kutsu updateOnea ja laita foundGuru[0] oikealle paikalleen.
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
    return foundGuru;})
    .then(foundGuru=>{
    Guru.updateOne({"_id": id }, { $set: foundGuru[0]}, (error, result) => {
      if (error) throw error;
      res.send(result);
  });
  })

})
  /*
  const updateGuru = Guru.find({_id:id}).then(result => {

    result.forEach(note => {
      console.log(note)
    })
  })
  if(updateGuru === undefined){
    res.status(400);
    res.send('<h1>THERE IS NO GURU WITH THAT ID. SAD! ID: </h1>' + id)}
  else{    
    // entry === party mitä päivität
    var entry = new Object();
    entry=updateGuru;
    // Tämä tarkistaa, mitä kenttiä on tullut requestin mukana
    // Kaikki requestin mukana tulleet kentät laitetaan oikeille paikoilleen entry-objektiin
    if(req.body.name!==undefined){
      entry.name=req.body.name;
      updated+=1;
    }
    if(req.body.nick!==undefined){
      entry.nick=req.body.nick;
      updated+=1;
    }
    if(req.body.email!==undefined){
      entry.email=req.body.email;
      updated+=1;
    }
    if(req.body.packages!==undefined){
      entry.packages=req.body.packages;
      updated+=1;
    }
    if(req.body.partyreservations!==undefined){
      entry.partyreservations=req.body.partyreservations;
      updated+=1;
    }
    if(req.body.video!==undefined){
      entry.video=req.body.video;
      updated+=1;
    }
    if(req.body.image!==undefined){
      entry.image=req.body.image;
      updated+=1;
    }
    if(req.body.availability!==undefined){
      entry.availability=req.body.availability;
      updated+=1;
    }
    if(req.body.bio!==undefined){
      entry.bio=req.body.bio;
      updated+=1;
    }
    //filtteröi päivitettävän partyn pois (koska siinä on vanhat tiedot)
    let newGurus=partyinfo.parties.filter(function(item){
      return item._id!==id;
    })
    //Päivitettiinkö edes mitään?
    if(updated===0){
      res.status(400);
      res.send('Nothing got updated.');
    }
    else{
      //Lisää päivitetyn gurun listaan
      newGurus.push(entry);
      gurus.gurus=newGurus;
      res.status(200);
      res.send('Guru updated. ID: ' + entry._id + '. ' + updated + ' fields were updated.');
    }
  }
})
*/
// REQUEST: PUT update attendees Y
// lähetettävä id on valitsemasi partyn id
//lähetetyt juhlijat lisätään listaan
//Jos samannimisiä juhlijoita oli jo, ne poistetaan ensin.
/*
  let id=1;
   axios.put('/api/attendees/:id',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/attendees/:id', function (req, res) {
  const id = req.params.id;
  //Päivitettävä juhlijalista
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
