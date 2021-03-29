import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());
const uri = "mongodb+srv://sogtietokanta:schoolofgamingtietokantaprojekti@cluster0.wqxpy.mongodb.net/sog?retryWrites=true&w=majority";
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
      guruid:[String],
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
      // Huom, normaalien single quotejen sijaan ympyröi url backtickeilla (`), jos URL on dynaaminen (sisältää esim id)
      axios.get('/api/packages').then(response => {
      setProduct(response.data);
    })}
    fetchData();
    return () => {
      //
    };
  }, []);
 */

/** ************************PARTY REQUESTS:******************************************
 * 
 * Partyinfo object format:
 * {
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
  }
 */

//REQUEST: GET party by ID
//Returns a Partyinfo object (successful) or status code 400 with error message (unsuccessful)
/**  Example hook:
let id=1;
axios.get(`/api/parties/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/parties/:id', (req, res) => {
  const id = req.params.id
  Partyinfo.find({_id:id})
  .then(result => {
    res.json(result[0]);
    result.forEach(item => {
      console.log('Party fetched:');
      console.log(item)
    })
  })
  .catch(error => {
    console.log('Party not fetched, error:');
    console.log(error.message);                    
    res.status(400);
    res.send(error.message);});
})

//REQUEST: POST a new party
//Parameters: Partyinfo-object in JSON-body
//Returns status code 200 (successful) or 400 with error message (unsuccessful)

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
   datetime: req.body.datetime,
   duration:req.body.duration,
   email: req.body.email,
   phone: req.body.phone,
   num_attendees: req.body.num_attendees,
   schedule: req.body.schedule,
   likes: req.body.likes,
   description: req.body.description
});
   newParty.save()
   .then(result=>{
    console.log('Party saved to db:');
     console.log(result);
     res.send(result);
    })
    .catch(error => {
      console.log('Party not saved to db, error:');
      console.log(error.message);
      res.status(400);
      res.send(error.message);});
});


//REQUEST: PUT update Partyinfo object by ID
//Parameters: party's _id in the URL, to-be-updated fields in the JSON-body
//Returns status code 200 (successful) or 400 with error message (unsuccessful)
/*
  let id=1;
   axios.put(`/api/parties/{id}`,<JSONTÄHÄN>).then(response => {
      console.log(response.data);
})
*/
app.put('/api/parties/:id', function (req, res) {
  const id = req.params.id;
  //Find the party to be updated
  Partyinfo.find({_id:id})
  .then(updatableParty => {
    const updatedParty=updatableParty[0];

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
        throw new Error ('Nothing got updated by your request');
      }
      else{
        res.status(200);
        res.send(result);
      }
    });
  })
  .catch(error => {
    console.log('Party not updated, error:');
    console.log(error.message);
    res.status(400);
    res.send(error.message);
    }
    );
})

/** **********************GURU REQUESTS *****************************************/

/** Guru object format:
 * {
  name: String,
  nick: String,
  email: String,
  partyreservations:[Number],
  video: String,
  image: String,
  availability:[String],
  bio: String
} */


//Request: GET all gurus 
//Returns an array of Guru-objects (successful) or status code 400 with error message (unsuccessful)

app.get('/api/gurus', (req, res) => {
    Guru.find({})
    .then(result => {
      res.json(result);
      result.forEach(note => {
        console.log('Guru fetched:');
        console.log(note)
      })
    }).catch(error => {
      console.log('Guru not fetched, error:');
      console.log(error.message);
      res.status(400);
      res.send(error.message);});
  })

//REQUEST: GET guru by ID
//Parameters: guru's _id in URL
//Returns a Guru object (successful) or status code 400 with error message (unsuccessful)

/**  Example:
let id=1;
axios.get(`/api/gurus/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/gurus/:id', (req, res) => {
  const id = req.params.id;
  Guru.find({_id:id})
  .then(result => {
    res.json(result);
    result.forEach(note => {
      console.log('Guru fetched:');
      console.log(note)
    })
  })
  .catch(error => {
    console.log('Guru not fetched, error:');
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
 
})

//REQUEST: POST new guru
//Parameters: Guru-object in JSON-body
//Returns status code 200 (successful) or 400 with error message (unsuccessful)
app.post('/api/gurus', (req, res) => {
  //Construct the guru object
  var entry = new Guru({
    name: req.body.name,
    email: req.body.email,
    partyreservations: req.body.partyreservations,
    video: req.body.video,
    image: req.body.image,
    availability: req.body.availability,
    bio: req.body.bio
  });
  //Save the guru object
  entry.save()
  .then(result=>{
    console.log('Guru POSTed:');
    console.log(result);
    res.send(result);
 })
 .catch(error => {
    console.log('Guru not POSTed. Error:');
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
});

//REQUEST: PUT update a guru by ID
//Parameters: Guru's _id in the URL, to-be-updated fields in the JSON-body
//Old fields will be overwritten with the field in the JSON-body, no appends
//Returns status code 200 (successful) or 400 with error message (unsuccessful)
/*
  let id=1;
   axios.put('/api/gurus/:id',<JSONTÄHÄN>).then(response => {
      console.log(response.data);
})
*/
app.put('/api/gurus/:id', function (req, res) {
  const id = req.params.id;
  //Fetch the guru with the right id
  Guru.find({_id:id})
  .then(foundGuru => {
    console.log('Guru found with id: ' + id);
    // Update only the fields that came in with the JSON-body
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
    // Save the updated guru
    Guru.updateOne({"_id": id }, { $set: foundGuru[0]}, (error, result) => {
      if (error) throw error;
      console.log('Guru updated successfully. ID: ' + id);
      res.send(result);
  });
  }).catch(error => {
    console.log('Guru not updated. Error:')
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
})

 /************************************ATTENDEE REQUESTS****************** */
/** Attendee format:
 * {
 *  partyid: String,
    attendees: [{name: String, 
                email: String, 
                attends: Boolean, 
                discord: Boolean, 
                game: Boolean}]
  } 
  */

//REQUEST: GET attendees by party id
//Parameters: party id in URL
//Returns an Attendees object (successful), 400 + error message (unsuccessful)
/**  
let id=1;
axios.get(`/api/attendees/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
   */
app.get('/api/attendees/:id', (req, res) => {
  const id = req.params.id
  //Find the correct attendee
  Attendees.find({partyid:id})
  .then(result => {
    if(!result.length){
      throw new Error('Error. No attendees found.');
    }
    else{
      //Send the correct attendee
      res.json(result);
      result.forEach(note => {
        console.log('Attendees found:');
        console.log(note)
    })}
  })
  .catch(error => {
    console.log('Attendees not fetched. Error:')
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
  
})


//REQUEST: POST a new attendee list
//Parameters: Attendees-object in JSON-body
//Returns status code 200 (successful) or 400 with error message (unsuccessful)
/*
   axios.post('/api/attendees',{JSONHERE}).then(response => {
      console.log(response.data);
})
*/
app.post('/api/attendees', (req, res) => {
  if(req.body.partyid===undefined){
   throw new Error('Error. no party id');
 }
 else{
   //Construct Attendees object
   var entry = new Attendees({
     partyid: req.body.partyid,
     attendees: req.body.attendees
   });
   //Save Attendees object
   entry.save()
   .then(result=>{
    console.log('New attendee list created:')
    console.log(result);
    res.send(result);
  }).catch(error => {
    console.log(error.message);
    res.status(400);
    res.send(error.message);});   
 }
});

// REQUEST: PUT update attendee information / add new attendees
// The request checks whether the attendees in the JSON-body were already in the database.
// If they were, their entry is replaced with the entry in the JSON-body.
// If no such attendee was found, their entry is added to the attendee array.
// Parameters: 1. id in the url corresponds to the party id whose attendees are updated
//             2. JSON-body with key "attendees", formatted like in the Schema above
// If the attendee with the same email is found in the same party's attendees, their information will be replaced with the new information
//Returns status code 200 (successful) or 400 with error message (unsuccessful)
/*
  let id=1; 
   axios.put(`/api/attendees/{id}`,{JSONHERE}).then(response => {
      console.log(response);
})
*/
app.put('/api/attendees/:id', function (req, res) {
  const id = req.params.id;
  //Attendee list to be updated
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
          console.log('Attendee updated with this email:' + req.body.attendees[i].email);
        }
       }
       //If the same email isn't found, push the entry into the list
       if(changed===false){
        attendeeList.attendees.push(req.body.attendees[i]);
        console.log('Attendee added to the list as a new entry. Attendee email: ' + req.body.attendees[i].email);
      }
    }
    //Save the updated list
    Attendees.updateOne({partyid: id }, { $set: attendeeList}, (error, result) => {
      if (error) throw error;
      if(result.nModified===0){
        throw new Error ('Nothing got updated by your request');
      }
      else{
        console.log('Attendee list saved to cloud.');
        res.status(200);
        res.send(result);
      }
    });
  })
  .catch(error => {
    console.log('Attendees not updated. Error:')
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
})
//REQUEST: DELETE attendees
//Parametrit: partyid-string in URL, email-field in the JSON-body. Any entrants with that email will be deleted.
//Returns status code 200 (successful) or 400 with error message (unsuccessful)
app.delete('/api/attendees/:id', function (req, res) {
  const id = req.params.id;
  const deletoitava=req.body.email;
  if(req.body.email===undefined){
    res.status(400);
    res.send('You have to send a JSON with an email field with this request');
  }
  //Attendee list to be updated
  Attendees.find({partyid: id}).then(returnedItems=>{
    if(!returnedItems.length) throw new Error('No party found with that id.');
    var attendeeList = returnedItems[0];
    var changed=false;
    for (var k = 0; k < attendeeList.attendees.length; k++) {
      if (attendeeList.attendees[k].email === req.body.email) {
        attendeeList.attendees.splice(k,1);
        changed=true;
      }
     }
     if(changed===false) throw new Error('No attendee with that email was found');
    //Save the updated list
    Attendees.updateOne({partyid: id }, { $set: attendeeList}, (error, result) => {
      if (error) throw error;
      if(result.nModified===0){
        throw new Error ('Nothing got deleted by your request');
      }
      else{
        console.log('Attendee list with deletions saved to cloud.');
        res.status(200);
        res.send(result);
      }
    });
  })
  .catch(error => {
    console.log('Attendees not deleted. Error:')
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
 
})

/*******************************PARTY PACKAGE REQUESTS ******************** */
/**
 * Partypack object format:
 {
      name: String,
      image: String,
      price: Number,
      guruid:[String],
      description: String,
      scheduleitems: [String]
  }
 */

//REQUEST: POST new party package
//Returns status code 200 (successful) or 400 with error message (unsuccessful)
app.post('/api/packages', (req, res) => {
  var entry = new Partypack({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    guruid: req.body.guruid,
    description: req.body.description,
    scheduleitems: req.body.scheduleitems
  });
  entry.save()
  .then(result=>{
    console.log('New party package posted:')
   console.log(result);
   res.send(result);
 })    
  .catch(error => {
    console.log("Party package not posted. Error:");
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
});

//REQUEST: PUT uusia guruja TODO muuta tämä databasea kannattamaan
//Parametrit: bodyyn JSON- jossa key "gurus" ja sisällä array numeroita (ne tulee olemaan numeroita mongodb:ssä)
/*
  let id=1;
   axios.put(`/api/partypack/{id}/gurus`,<JSONHERE>).then(response => {
      console.log(response.data);
      //onko tuo oikea tapa logittaa vastaus, en tiä
})
*/
app.put('/api/packages/:id/gurus', (req, res) => {
  const id = req.params.id;
  //Fetch the correct partypack
  Partypack.find({_id:id})
  .then(returnedItems => {
    var updatedPackage=returnedItems[0];
    //Iterate over the partypack's gurus and JSON-body's gurus, flipping hasGuru if such guru exists
    for(var i=0;i<req.body.guruid.length;i++){
      var hasGuru=false;
      for(var k=0;k<updatedPackage.guruid.length;k++){
        if(updatedPackage.guruid[k]===req.body.guruid[i]){
          hasGuru=true;
        }
      }
      //If hasGuru was not flipped, req.body.guruid[i] can be saved
      if(hasGuru===false){
        updatedPackage.guruid.push(req.body.guruid[i])
      }
    }
    //Save the updated list
    Partypack.updateOne({_id:id }, { $set: updatedPackage}, (error, result) => {
      if (error) throw error;
      if(result.nModified===0){
        throw new Error ('Nothing got updated by your request');
      }
      else{
        console.log('Partypack with new gurus saved to cloud.');
        res.status(200);
        res.send(result);
      }
    });
  })  
  .catch(error => {
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
  });

/*REQUEST: GET all party packages
  Returns a list of Partypack-objects (successful) or status 400 + error message (unsuccessful)
      axios.get('/api/packages').then(response => {
      setState(response.data);
      console.log(response.data)
})
*/

app.get("/api/packages", (req, res) => {
  Partypack.find()
  .then(result => {
    console.log('All party packages fetched.')
    res.json(result);
  })
  .catch(error => {
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
});

/*REQUEST: GET package by ID
 Parameters: package's id in url
 Returns a package object (successful) or status code 400 with error message (unsuccessful)

Example request:
let id=1;
axios.get(`/api/packages/${id}`).then(response => {
  setState(response.data);
  console.log(response.data);
})
*/
app.get('/api/packages/:id', (req, res) => {
  const id = req.params.id
  Partypack.find({_id:id})
  .then(result => {
    res.json(result[0]);
    result.forEach(note => {
      console.log(note)
    })
  })  
  .catch(error => {
    console.log(error.message);
    res.status(400);
    res.send(error.message);});
})

app.listen(5000, () => { console.log("Server started at http://localhost:5000. This is the server that connects to the database and is up to date.") });
