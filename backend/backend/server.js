/*const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import partypack from './partypack.js';
import partyinfo from './partyinfo.js';
import attendees from './attendees.js' ;
const app = express()
app.use(express.static('build'))
app.use(bodyParser.json());
app.use(cors());
var date = new Date();
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

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
  res.json(partypack)
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
  const partyinformation = partyinfo.parties.find(product => product._id === id)
  res.json(partyinformation)
})

app.get("/api/parties", (req, res) => {
  res.send(partyinfo.parties);
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


app.get("/api/gurus", (req, res) => {
  res.send(gurus.gurus);
});

//REQUEST: post uusi party

app.post('/api/parties', (req, res) => {

  //const nameDuplicate = notes[0].persons.find(note => note.name === req.body.name);
  
   if(req.body.packageid===undefined){
    res.status(400);
    res.send('Error. no packageid')
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
app.listen(5000, () => { console.log("Server started at http://localhost:5000") });
