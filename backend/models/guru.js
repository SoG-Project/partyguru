import mongoose from 'mongoose';

const uri = "mongodb+srv://sogtietokanta:schoolofgamingtietokantaprojekti@cluster0.wqxpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
          console.log('connected to MongoDB')  })  
  .catch((error) => {    
      console.log('error connecting to MongoDB:', error.message)  })
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


module.exports = mongoose.model('Guru', GuruSchema);

export default Guru;