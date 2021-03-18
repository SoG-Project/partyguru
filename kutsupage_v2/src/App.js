import "./styles.css";
import React, { useState } from "react";

//textarea rivillä 47 temp placeholderi kun en parempaan keksinyt
//toinen ongelma on että kun add element nappia painaa niin tulee uusi lista mutta niitä pitäisi
//pystyä muokkaamaan erikseen

//en ole ylpeä tästä
export default function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemName2, setItemName2] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    setItems([
      ...items,
      {
        id: items.length,
        name: itemName
      }
    ]);
    setItemName("");
  };

  return (
    <div>
      <h1 className="Test2">Kutsupage</h1>
      <h2 className="Test2">Kutsu kamusi juhlimaan!</h2>
      <input
        className="Test"
        name="item"
        type="text"
        value={itemName2}
        onChange={(e) => setItemName2(e.target.value)}
      />
      <button onClick={addItem}>Add element</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              name="item"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </li>
        ))}
      </ul>
      <h2 className="Test2">Kirjoita oma kutsukirjeesi seuraavaan kenttään :)</h2>
      <textarea> 
        Morjesta pöytää, tulkaa juhliin ja antakaa lahjoja pls!!1
        </textarea> 
    </div>
  );
}
