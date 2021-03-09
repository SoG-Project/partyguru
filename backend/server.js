import express from 'express';
import partypack from './partypack.js';
import partyinfo from './partyinfo.js'
import attendees from './attendees.js'
const app = express();

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


app.listen(5000, () => { console.log("Server started at http://localhost:5000") });
