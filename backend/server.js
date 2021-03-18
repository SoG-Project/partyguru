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
//const MongoClient = require('mongodb').MongoClient;

/*
const uri = "mongodb+srv://sogtietokanta:schoolofgamingtietokantaprojekti@cluster0.wqxpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//j
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
*/

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
  res.send(partypack.products);
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
  const partypackage = partypack.products.find(product => product._id === id)
  res.json(partypackage)
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
  const partyinformation = partyinfo.parties.find(party => party._id === id)
  res.json(partyinformation)
})

//GET kaikki partyt, testiä varten
app.get("/api/parties", (req, res) => {
  res.send(partyinfo.parties);
});

//GET kaikki attendeet, testiä varten
app.get("/api/attendees", (req, res) => {
  res.send(attendees);
});

//REQUEST: GET juhliin osallistujat juhlaid mukaan
/**  
let id=1;
axios.get(`/api/attendees/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/attendees/:id', (req, res) => {
  const id = req.params.id
  const juhlijat = attendees.attendees.find(attendee => attendee._id === id)
  res.json(juhlijat)
})


//REQUEST: GET gurut id:n mukaan
/**  
let id=1;
axios.get(`/api/gurus/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/gurus/:id', (req, res) => {
  const id = req.params.id
  const gurut = gurus.gurus.find(guru => guru._id === id)
  res.json(gurut)
})
//REQUEST: GET kaikki gurut
/*
   axios.get('/api/gurus').then(response => {
      setState(response.data);
      console.log(response.data)
})
*/
app.get("/api/gurus", (req, res) => {
  res.send(gurus.gurus);
});
//REQUEST: post uusi party
//Tämä requesti odottaa, että lähetät ihan kaikki fieldit.
//Lähetä vaikka tyhjä stringi jos kaikkia ei oo saatavilla, niin se ei jää undefinediksi
//_id tulee itsestään, ei tarvi sendiä sitä
app.post('/api/parties', (req, res) => {

   if(req.body.packageid===undefined){
    res.status(400);
    res.send('Error. no packageid')
  }
  else if(req.body.guruid===undefined){
    res.status(400);
    res.send('Error. no guru')
  }
  else if(req.body.datetime===undefined){
    res.status(400);
    res.send('Error. no date/time')
  }
  else if(req.body.duration===undefined){
    res.status(400);
    res.send('Error. no duration')
  }
  else if(req.body.email===undefined){
    res.status(400);
    res.send('Error. no email')
  }
  else if(req.body.phone===undefined){
    res.status(400);
    res.send('Error. no phone')
  }
  else if(req.body.num_attendees===undefined){
    res.status(400);
    res.send('Error. no number of attendees')
  }
  else if(req.body.schedule===undefined){
    res.status(400);
    res.send('Error. no schedule')
  }
  else if(req.body.likes===undefined){
    res.status(400);
    res.send('Error. no likes')
  }
  else if(req.body.description===undefined){
    res.status(400);
    res.send('Error. no description')
  }
  else{
    const newID = uuidv4(); 
    var entry = new Object();
    entry.guruid = req.body.guruid;
    entry.duration=req.body.duration;
    entry._id=newID;
    partyinfo.parties.push(entry);
    res.send('Succéss' + entry.guruid)
  }
});
//REQUEST: post uusi juhlijalista
//ID pitää lähettää, se on sen partyn ID mihin juhlijat menee.
//Tää ei tee sen suurempaa inputin validointia, että BETTER WATSH OUTS!!!s
/*
   axios.post('/api/attendees',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.post('/api/attendees', (req, res) => {
  if(req.body._id===undefined){
   res.status(400);
   res.send('Error. no party id')
 }
 else{
   var entry = new Object();
   entry._id = req.body._id;
   entry.attendees=req.body.attendees;
   attendees.attendees.push(entry);
   res.send('Succéss, id: ' + entry._id)
 }
});
//REQUEST: PUT update party id:n mukaan
//Kandee lähettää oikeat kentät, koska tässä ei validoida mitään
//Paitsi lopussa tarkistetaan, päivittikö funktio mitään
//Jos mitään ei päivitetty, tulee statuskoodi 400
/*
  let id=1;
   axios.put('/api/parties/{id}',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/parties/:id', function (req, res) {
  //muuttuja, että tiedetään päivitettiinkö mitään
  let updated=0;
  const id = req.params.id;
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
  }
})
//REQUEST: PUT update guru ID:n mukaan
//Kandee lähettää oikeat kentät, koska tässä ei validoida mitään
//Paitsi lopussa tarkistetaan, päivittikö funktio mitään
//Jos mitään ei päivitetty, tulee statuskoodi 400
//Jos kenttä koostuu useammasta osasta (esim packages), sun pitää lähettää kaikki vanhat ja uudet osat samassa listassa
//eli jos haluat lisätä packagen gurulle, lähetä sekä vanhat että uudet packaget listassa
/*
  let id=1;
   axios.put('/api/gurus/{id}',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/gurus/:id', function (req, res) {
  //muuttuja, että tiedetään päivitettiinkö mitään
  let updated=0;
  const id = req.params.id;
  const updateGuru = gurus.gurus.find(guru => guru._id === id)
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
// REQUEST: PUT update attendees
// lähetettävä id on valitsemasi partyn id
//lähetetyt juhlijat lisätään listaan
//Jos samannimisiä juhlijoita oli jo, ne poistetaan ensin.
/*
  let id=1;
   axios.put('/api/attendees/{id}',<JSONTÄHÄN>).then(response => {
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
app.listen(5000, () => { console.log("Server started at http://localhost:5000") });
